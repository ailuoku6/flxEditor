import React from "react";

import { IFlxEditorPlugin, PluginType, PluginFactory } from "../../types";
import { toggleMark } from "../../utils";
import { ReactEditor, useSlate } from "slate-react";

import { MarkButton } from "../../common/components";

import { FaUnderline } from "react-icons/fa6";


const PluginName = "underline";

export const UnderlinePluginFactory: PluginFactory = ({ editor }) => {
    return {
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
                <MarkButton key={PluginName} format={PluginName} icon={<FaUnderline />} />
            ),
        },
    }
}
