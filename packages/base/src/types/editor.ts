
import { BaseRange, NodeEntry } from "slate";
import { EditableProps } from "slate-react/dist/components/editable";

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
    decorate?: (entry: NodeEntry) => Range[] | undefined;
}

type ExtractParameter<T> = T extends (event: infer P) => any ? P : never;

type BooleanEventHandlers<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? (event: ExtractParameter<T[K]>) => boolean : never;
}

// 事件处理，如果返回true，则不再继续传递给下一个插件
export type EditorEvents = Partial<BooleanEventHandlers<Required<Pick<EditableProps, 'onKeyDown' | 'onCopy' | 'onPaste'>>>>;

export interface IRenderLeafContext {
    classNames: string[];
}

export interface IFlxEditorPlugin extends IBasePlugin, EditorEvents {

    match?: (element: RenderElementProps) => boolean;

    matchLeaf?: (element: RenderLeafProps) => boolean;

    renderElement?: (props: RenderElementProps) => JSX.Element | undefined;

    renderLeaf?: (props: RenderLeafProps, context: IRenderLeafContext) => JSX.Element | undefined;

    widget?: {
        toolBarWidget?: JSX.Element;
        renderWidgetOnPupup?: boolean;
        blockToolbarWidget?: boolean;
        category?: {
            label?: string;
            value?: string;
        }
    };
}

export type PluginFactory<T extends Record<string, any> = {}> = (args: { editor: ReactEditor } & T) => IFlxEditorPlugin
