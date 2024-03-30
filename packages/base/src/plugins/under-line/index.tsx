import React from "react";

import { IFlxEditorPlugin, PluginType } from "../../types";
import { toggleMark } from "../../utils";
import { ReactEditor, useSlate } from "slate-react";

const PluginName = "underline";

const MarkButton = ({
    format,
    icon,
}: {
    format: string;
    icon: string;
}) => {
    const editor = useSlate();
    return (
        <button
            // type={isMarkActive(editor as ReactEditor, format) ? "primary" : "default"}
            // active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor as ReactEditor, format);
            }}
        >
            {icon}
        </button>
    );
};

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
