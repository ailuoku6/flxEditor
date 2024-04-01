
import { NodeEntry } from "slate";

import { RenderElementProps, RenderLeafProps, ReactEditor } from "slate-react";

export enum PluginType {
    Element = "element",
    Leaf = "leaf"
}

interface IBasePlugin {
    name: string;
    type: PluginType,
    isVoid?: boolean;
    priority?: number; // 优先级越高 在越外层
    decorate?: (entry: NodeEntry) => Range[];
}

export interface IFlxEditorPlugin extends IBasePlugin {

    match?: (element: RenderElementProps) => boolean;

    matchLeaf?: (element: RenderLeafProps) => boolean;

    renderElement?: (props: RenderElementProps) => JSX.Element | undefined;

    renderLeaf?: (props: RenderLeafProps) => JSX.Element | undefined;

    widget?: {
        toolBarWidget?: JSX.Element;
        renderWidgetOnPupup?: boolean;
        blockToolbarWidget?: boolean;
    };

    // 事件处理，如果返回true，则不再继续传递给下一个插件
    eventHandles?: { [key: string]: (event: React.KeyboardEvent<HTMLDivElement>) => boolean };
}

export type PluginFactory<T extends Record<string, any> = {}> = (args: { editor: ReactEditor } & T) => IFlxEditorPlugin



