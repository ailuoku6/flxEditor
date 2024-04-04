import React from "react";

import { IFlxEditorPlugin, PluginType, PluginFactory } from "../../types";
import { toggleMark } from "../../utils";
import { ReactEditor, useSlate } from "slate-react";

import { MarkButton } from "../../common/components";

import { TextUnderline } from '@icon-park/react';


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
                <MarkButton key={PluginName} format={PluginName} icon={<TextUnderline />} />
            ),
        },
    }
}
