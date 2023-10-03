import React from "react";

import { BaseElement } from "slate";

import { RenderElementProps, RenderLeafProps, ReactEditor } from "slate-react";

import Toolbar from "./components/Toolbar";

export interface IFlxEditorPlugin {
  name: string;
  isElement: boolean;
  isLeaf: boolean;
  isVoid?: boolean;

  renderElement?: (props: RenderElementProps) => JSX.Element | undefined;

  renderLeaf?: (props: RenderLeafProps) => JSX.Element | undefined;

  widget?: {
    toolBarWidget?: JSX.Element;
    renderWidgetOnPupup?: boolean;
    blockToolbarWidget?: boolean;
  };

  eventHandles?: { [key: string]: (args: any[]) => boolean };
}

// 接管编辑器的渲染及事件行为，分发给下属插件
export class EditorHelper {
  private plugins: IFlxEditorPlugin[];
  private elementPluginMap: Map<string, IFlxEditorPlugin>;
  private leafPlugins: IFlxEditorPlugin[];
  constructor(editor: ReactEditor, plugins: IFlxEditorPlugin[]) {
    this.plugins = plugins;

    this.elementPluginMap = new Map(
      plugins.filter((p) => p.isElement).map((p) => [p.name, p])
    );

    this.leafPlugins = plugins.filter((p) => p.isLeaf);

    this.renderElement = this.renderElement.bind(this);
    this.renderLeaf = this.renderLeaf.bind(this);
    this.isVoid = this.isVoid.bind(this);

    this.initEditorHelper(editor);
  }

  private initEditorHelper(editor: ReactEditor) {
    editor.isVoid = this.isVoid;
  }

  renderElement(props: RenderElementProps) {
    const { element, attributes, children } = props;
    const type = (element as any).type as string;
    const elePlugin = this.elementPluginMap.get(type);
    return (
      elePlugin?.renderElement?.(props) || <p {...attributes}>{children}</p>
    );
  }

  // 叶子节点效果可叠加
  renderLeaf(props: RenderLeafProps) {
    const { attributes, children, leaf } = props;

    let leafNode = <span {...attributes}>{children}</span>;

    this.leafPlugins.forEach((leafP) => {
      const name = leafP.name;
      if ((leaf as any)[name]) {
        leafNode =
          leafP?.renderLeaf?.({
            ...props,
            attributes: {} as any,
            children: leafNode,
          }) || leafNode;
      }
    });

    return leafNode;
  }

  private isVoid(ele: BaseElement) {
    const type = (ele as any).type as string;
    const elePlugin = this.elementPluginMap.get(type);
    return elePlugin?.isVoid || false;
  }

  renderToolBar() {
    const toolBarWidgets = this.plugins
      .filter((p) => p.widget?.toolBarWidget)
      .map((p) => p.widget?.toolBarWidget);

    return <Toolbar>{toolBarWidgets}</Toolbar>;
  }
}

export const withEditorHelper = () => {};
