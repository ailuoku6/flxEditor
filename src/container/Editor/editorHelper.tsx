import React from "react";

import { RenderElementProps, RenderLeafProps } from "slate-react";

export interface IFlxEditorPlugin {
  name: string;
  isElement: boolean;
  isLeaf: boolean;
  isVoid?: boolean;

  renderElement?: (props: RenderElementProps) => JSX.Element | undefined;

  renderLeaf?: (props: RenderLeafProps) => JSX.Element | undefined;

  eventHandles?: { [key: string]: (args: any[]) => boolean };
}

// 接管编辑器的渲染及事件行为，分发给下属插件
export class EditorHelper {
  private plugins: IFlxEditorPlugin[];
  private elementPluginMap: Map<string, IFlxEditorPlugin>;
  private leafPlugins: IFlxEditorPlugin[];
  constructor(plugins: IFlxEditorPlugin[]) {
    this.plugins = plugins;

    this.elementPluginMap = new Map(
      plugins.filter((p) => p.isElement).map((p) => [p.name, p])
    );

    this.leafPlugins = plugins.filter((p) => p.isLeaf);
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
}

export const withEditorHelper = () => {};
