import React, { useMemo } from 'react';
import {
  EventReturns,
  IFlxEditorElementPlugin,
  IFlxEditorPlugin,
  IRenderElementContext,
  PluginFactory,
  PluginType,
} from '../types';
import { HistoryEditor, withHistory } from 'slate-history';
import { BaseEditor, BaseElement, CustomTypes, createEditor } from 'slate';

import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  withReact,
} from 'slate-react';

export class EditorHelper {
  private plugins: IFlxEditorPlugin[];
  private wrapPlugins: IFlxEditorElementPlugin[];
  private totalPlugins: IFlxEditorPlugin[];
  private elementPluginMap: Map<string, IFlxEditorPlugin>;
  constructor(
    editor: ReactEditor,
    pluginFactorys: PluginFactory<{ editorHelper: EditorHelper }>[],
  ) {
    const totalPlugins = pluginFactorys
      .map((genPlugin) => genPlugin({ editor, editorHelper: this }))
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));

    this.totalPlugins = totalPlugins;

    const plugins = totalPlugins.filter(
      (p) => p.type !== PluginType.ElementWrap,
    );
    this.wrapPlugins = totalPlugins.filter(
      (p) => p.type === PluginType.ElementWrap,
    ) as IFlxEditorElementPlugin[];

    this.plugins = plugins;

    this.elementPluginMap = new Map(
      plugins
        .filter((p) => p.type === PluginType.Element)
        .map((p) => [p.name, p]),
    );

    this.renderElement = this.renderElement.bind(this);
    this.renderLeaf = this.renderLeaf.bind(this);
    this.isVoid = this.isVoid.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.initEditorHelper(editor);
  }

  private initEditorHelper(editor: ReactEditor) {
    editor.isVoid = this.isVoid;
  }

  getPlugins() {
    return this.totalPlugins;
  }

  // 按照插件注册名称查找插件，否则遍历插件使用match逻辑
  renderElement(props: RenderElementProps) {
    const { element, attributes, children } = props;

    const context: IRenderElementContext = {
      classNames: [],
      style: {},
    };

    let child = children;

    this.wrapPlugins.forEach((plugin) => {
      if (plugin.match?.(props)) {
        const ele =
          plugin.renderElement?.({ ...props, children: child }, context) ||
          child;
        child = ele;
      }
    });

    const type = (element as any).type as string;
    const elePlugin =
      this.elementPluginMap.get(type) ||
      this.plugins.find((p) => (p as IFlxEditorElementPlugin).match?.(props));

    const renderEle = (elePlugin as IFlxEditorElementPlugin)?.renderElement?.(
      { ...props, children: child },
      context,
    );

    return (
      <div
        style={context.style}
        {...props.attributes}
        className={context.classNames.join(' ')}
      >
        {renderEle || child}
      </div>
    );
  }

  // 叶子节点效果可叠加
  renderLeaf(props: RenderLeafProps) {
    const { attributes, children, leaf } = props;

    let leafNode = children;

    const context = { classNames: [] };

    this.plugins.forEach((plugin) => {
      const name = plugin.name;
      if (
        (plugin.type === PluginType.Element && plugin.matchLeaf?.(props)) ||
        leaf.leafType === name ||
        leaf[name] === true
      ) {
        leafNode =
          plugin.renderLeaf?.(
            {
              ...props,
              attributes: {} as any,
              children: leafNode,
            },
            context,
          ) || leafNode;
      }
    });

    return (
      <span {...attributes} className={context.classNames.join(' ')}>
        {leafNode}
      </span>
    );
  }

  onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.nativeEvent.isComposing) return void 0;
    for (const item of this.plugins) {
      const onKeyDownEvent = item.onKeyDown;
      if (onKeyDownEvent?.(event) === EventReturns.Stop) {
        event.preventDefault();
        break;
      }
    }
  }

  private isVoid(ele: BaseElement) {
    const type = (ele as any).type as string;
    const elePlugin = this.elementPluginMap.get(type);
    return elePlugin?.isVoid || false;
  }

  // renderToolBar() {
  //   const toolBarWidgets = this.plugins
  //     .filter((p) => p.widget?.toolBarWidget)
  //     .map((p) => p.widget?.toolBarWidget);

  //   return <Toolbar>{toolBarWidgets}</Toolbar>;
  // }
}

export const initFlxEditor = (
  factorys: PluginFactory[],
): [BaseEditor & ReactEditor & HistoryEditor, EditorHelper] => {
  const editor = withHistory(withReact(createEditor()));
  const editorHelper = new EditorHelper(editor, factorys);
  return [editor, editorHelper];
};
