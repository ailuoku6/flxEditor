import React from "react";

import { PluginFactory, PluginType } from "../../types";

import { EditorHelper } from "../../core";

import { SideMenu } from "./components/side-menu";
import { CustomTypes } from "slate";

export const PluginName = "side-menu";

export const SideMenuPluginFactory: PluginFactory<{ editorHelper: EditorHelper }> = ({ editor, editorHelper }) => {
    return {
        name: PluginName,
        type: PluginType.ElementWrap,
        match({ element }) {
            return new Set([...editor.children]).has(element);
        },
        renderElement(props, context) {
            return <SideMenu renderElementProps={props} plugins={editorHelper.getPlugins()} />
        },
    }
}