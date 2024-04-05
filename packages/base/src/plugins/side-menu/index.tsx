import React from "react";

import { PluginFactory, PluginType } from "../../types";

import { EditorHelper } from "../../core";

import { SideMenu } from "./components/side-menu";
import { CustomTypes } from "slate";
import { ReactEditor } from "slate-react";

export const PluginName = "side-menu";

export const SideMenuPluginFactory: PluginFactory<{ editorHelper: EditorHelper }> = ({ editor, editorHelper }) => {
    return {
        name: PluginName,
        type: PluginType.ElementWrap,
        match: () => true,
        renderElement(props, context) {
            const path = ReactEditor.findPath(editor, props.element);
            if (path.length !== 1) {
                return props.children;
            }
            return <SideMenu path={path} renderElementProps={props} plugins={editorHelper.getPlugins()} />
        },
    }
}