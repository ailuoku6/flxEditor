import { Editor } from "slate";

import { ReactEditor } from "slate-react";

export const isMarkActive = (editor: ReactEditor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, boolean>;
    return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: ReactEditor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};