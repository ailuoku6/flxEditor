import { ReactEditor, useSlate } from "slate-react";
import { toggleMark, isBlockActive, toggleBlock } from "../../utils";
import React from "react";
export const MarkButton = ({
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

export const BlockButton = ({ format, icon }: any) => {
    const editor = useSlate()
    return (
        <button
            // active={isBlockActive(
            //     editor,
            //     format,
            //     'type'
            //     // TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            // )}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor as ReactEditor, format)
            }}
        >
            {icon}
            {/* <Icon>{icon}</Icon> */}
        </button>
    )
}