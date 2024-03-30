import React, { useMemo } from 'react';
import { IFlxEditorPlugin, PluginType } from "../types";
import { HistoryEditor, withHistory } from "slate-history";

import { BaseEditor, BaseElement, createEditor } from 'slate';

import { ReactEditor, RenderElementProps, RenderLeafProps, withReact } from "slate-react";

export class EditorHelper {
    private plugins: IFlxEditorPlugin[];
    private elementPluginMap: Map<string, IFlxEditorPlugin>;
    constructor(editor: ReactEditor, plugins: IFlxEditorPlugin[]) {
        this.plugins = plugins.sort((a, b) => (a.priority || 0) - (b.priority || 0));

        this.elementPluginMap = new Map(
            plugins.filter((p) => p.type === PluginType.Element).map((p) => [p.name, p])
        );

        this.renderElement = this.renderElement.bind(this);
        this.renderLeaf = this.renderLeaf.bind(this);
        this.isVoid = this.isVoid.bind(this);

        this.initEditorHelper(editor);
    }

    private initEditorHelper(editor: ReactEditor) {
        editor.isVoid = this.isVoid;
    }

    getPlugins() {
        return this.plugins;
    }

    // 按照插件注册名称查找插件，否则遍历插件使用match逻辑
    renderElement(props: RenderElementProps) {
        const { element, attributes, children } = props;

        const type = (element as any).type as string;
        const elePlugin = this.elementPluginMap.get(type) || this.plugins.find((p) => p.match?.(props));
        return (
            elePlugin?.renderElement?.(props) || <p {...attributes} >{children}</p>
        );
    }

    // 叶子节点效果可叠加
    renderLeaf(props: RenderLeafProps) {
        const { attributes, children, leaf } = props;

        let leafNode = <span {...attributes}>{children}</span>;

        this.plugins.forEach((plugin) => {
            const name = plugin.name;
            if (plugin.type === PluginType.Element && plugin.matchLeaf?.(props) || (leaf as any)[name]) {
                leafNode = plugin.renderLeaf?.({
                    ...props, attributes: {} as any,
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

    // renderToolBar() {
    //   const toolBarWidgets = this.plugins
    //     .filter((p) => p.widget?.toolBarWidget)
    //     .map((p) => p.widget?.toolBarWidget);

    //   return <Toolbar>{toolBarWidgets}</Toolbar>;
    // }
};

export const initFlxEditor = (plugins: IFlxEditorPlugin[]): [BaseEditor & ReactEditor & HistoryEditor, EditorHelper] => {
    const editor = withHistory(withReact(createEditor()));
    const editorHelper = new EditorHelper(editor, plugins);
    return [editor, editorHelper];
}