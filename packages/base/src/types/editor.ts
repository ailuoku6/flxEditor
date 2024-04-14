import { BaseRange, NodeEntry } from 'slate';
import { EditableProps } from 'slate-react/dist/components/editable';

import { RenderElementProps, RenderLeafProps, ReactEditor } from 'slate-react';

export enum PluginType {
  Element = 'element',
  Leaf = 'leaf',
  ElementWrap = 'element-wrap',
}

interface IBasePlugin {
  name: string;
  type: PluginType;
  isVoid?: boolean;
  priority?: number; // 优先级越高 在越外层
  decorate?: (entry: NodeEntry) => Range[] | undefined;

  widget?: {
    toolbarWidget?: JSX.Element;
    popupWidget?: JSX.Element;
    category?: {
      label?: string;
      value?: string;
    };
  };
}

type ExtractParameter<T> = T extends (event: infer P) => any ? P : never;

export enum EventReturns {
  Continue = 'continue',
  Stop = 'stop',
}

type BooleanEventHandlers<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (event: ExtractParameter<T[K]>) => EventReturns
    : never;
};

// 事件处理，如果返回true，则不再继续传递给下一个插件
export type EditorEvents = Partial<
  BooleanEventHandlers<
    Required<Pick<EditableProps, 'onKeyDown' | 'onCopy' | 'onPaste'>>
  >
>;

export interface IRenderLeafContext {
  classNames: string[];
}

export interface IRenderElementContext {
  classNames: string[];
  style: React.CSSProperties;
}

export interface IFlxEditorLeafPlugin extends IBasePlugin, EditorEvents {
  type: PluginType.Leaf;
  matchLeaf?: (element: RenderLeafProps) => boolean;

  renderLeaf?: (
    props: RenderLeafProps,
    context: IRenderLeafContext,
  ) => JSX.Element | undefined;
}

export interface IFlxEditorElementPlugin
  extends Omit<IFlxEditorLeafPlugin, 'type'> {
  type: PluginType.Element | PluginType.ElementWrap;
  match?: (element: RenderElementProps) => boolean;

  renderElement?: (
    props: RenderElementProps,
    context: IRenderElementContext,
  ) => JSX.Element | undefined;
}

export type IFlxEditorPlugin = IFlxEditorLeafPlugin | IFlxEditorElementPlugin;

export type PluginFactory<T extends Record<string, any> = {}> = (
  args: { editor: ReactEditor } & T,
) => IFlxEditorPlugin;
