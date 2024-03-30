import React from "react";

import { IFlxEditorPlugin, PluginType } from "../../types";
import { toggleMark } from "../../utils";
import { ReactEditor, useSlate } from "slate-react";

import { MarkButton } from "../../common/components";

const PluginName = "underline";


export const UnderlinePlugin: IFlxEditorPlugin = {
    name: PluginName,
    type: PluginType.Leaf,
    renderLeaf: (props) => {
        const { leaf } = props;
        if ((leaf as any)[PluginName]) {
            return <u {...props.attributes} >{props.children}</u>;
        }
    },
    widget: {
        toolBarWidget: (
            <MarkButton key={PluginName} format={PluginName} icon="U" />
        ),
    },
}
