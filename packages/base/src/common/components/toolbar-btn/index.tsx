import { ReactEditor, useSlate } from "slate-react";
import { toggleMark, isBlockActive, isMarkActive, toggleBlock } from "../../../utils";

import { BaseButton } from "../button";
import React from "react";
export const MarkButton = ({
    format,
    icon,
}: {
    format: string;
    /** 推荐使用@icon-park/react的icon */
    icon: React.ReactNode;
}) => {
    const editor = useSlate();
    return (
        <BaseButton
            // type={isMarkActive(editor as ReactEditor, format) ? "primary" : "default"}
            // active={isMarkActive(editor, format)}
            selected={isMarkActive(editor as ReactEditor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor as ReactEditor, format);
            }}
            icon={icon}
        />
    );
};

export const BlockButton = ({ format, icon }: {
    format: string;
    /** 推荐使用@icon-park/react的icon */
    icon: React.ReactNode;
}) => {
    const editor = useSlate()
    return (
        <BaseButton
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
            icon={icon}
        />
    )
}