
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
    BaseEditor,
    Path,
    Node as SlateNode,
} from 'slate'

import { ReactEditor } from "slate-react";
import { TextElement } from '../types';

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

export const isBlockActive = (editor: ReactEditor, format: string, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n: any) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                (n as any)[blockType] === format,
        })
    )

    return !!match
}

export const toggleBlock = (editor: ReactEditor, format: string) => {
    const isActive = isBlockActive(
        editor,
        format,
        'type'
        // TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    // const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n),
        // LIST_TYPES.includes(n.type) &&
        // !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    });
    let newProperties: Partial<SlateElement> & { type: string };
    // if (TEXT_ALIGN_TYPES.includes(format)) {
    //     newProperties = {
    //         align: isActive ? undefined : format,
    //     }
    // } else {
    //     newProperties = {
    //         type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    //     }
    // }
    newProperties = {
        type: isActive ? 'paragraph' : format,
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    // if (!isActive && isList) {
    //     const block = { type: format, children: [] }
    //     Transforms.wrapNodes(editor, block)
    // }
}

// 根据selection获取当前选中的叶子节点，以及父节点（包括祖先节点）
export const getLeafNodeAncestors = (editor: ReactEditor) => {
    const { selection } = editor;
    if (!selection) return null;
    const nodes = Array.from(Editor.nodes(editor, {
        at: selection,
    })).filter(([node]) => {
        return !Editor.isEditor(node);
    });

    return nodes;
}

// Editor.leaf 对嵌套Element的兼容性不好
export const getLeafNode = (editor: ReactEditor) => {
    const { selection } = editor;
    if (!selection) return null;

    const nodes = Array.from(SlateNode.texts(editor, { from: selection.anchor.path, to: selection.focus.path }));

    return nodes;
}

export const getCurrentElement = (editor: BaseEditor & ReactEditor) => {
    // 获取当前选区的元素节点
    const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n as any)
    });

    if (match) {
        const [node, path] = match || [];
        if (SlateElement.isElement(node)) {
            // node 是当前选区的元素节点
            // path 是该元素节点在文档中的路径
            return [node, path] as [SlateElement, Path];
        }
    }
    return [null, null]
}

