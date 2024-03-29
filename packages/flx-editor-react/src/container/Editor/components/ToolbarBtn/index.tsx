import React from "react";

import { Element as SlateElement, Editor, Transforms, BaseEditor } from "slate";

import { ReactEditor, useSlate } from "slate-react";

import { Button } from "antd";

// const LIST_TYPES = ["numbered-list", "bulleted-list"];
// const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// const toggleBlock = (editor: ReactEditor, format: string) => {
//   const isActive = isBlockActive(
//     editor,
//     format,
//     TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
//   );
//   const isList = LIST_TYPES.includes(format);

//   Transforms.unwrapNodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) &&
//       SlateElement.isElement(n) &&
//       LIST_TYPES.includes(n.type) &&
//       !TEXT_ALIGN_TYPES.includes(format),
//     split: true,
//   });
//   let newProperties: Partial<SlateElement>;
//   if (TEXT_ALIGN_TYPES.includes(format)) {
//     newProperties = {
//       align: isActive ? undefined : format,
//     };
//   } else {
//     newProperties = {
//       type: isActive ? "paragraph" : isList ? "list-item" : format,
//     };
//   }
//   Transforms.setNodes<SlateElement>(editor, newProperties);

//   if (!isActive && isList) {
//     const block = { type: format, children: [] };
//     Transforms.wrapNodes(editor, block);
//   }
// };

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// const isBlockActive = (
//   editor: ReactEditor,
//   format: string,
//   blockType = "type"
// ) => {
//   const { selection } = editor;
//   if (!selection) return false;

//   const [match] = Array.from(
//     Editor.nodes(editor, {
//       at: Editor.unhangRange(editor, selection),
//       match: (n) =>
//         !Editor.isEditor(n) &&
//         SlateElement.isElement(n) &&
//         n[blockType] === format,
//     })
//   );

//   return !!match;
// };

const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean>;
  return marks ? marks[format] === true : false;
};

// export const BlockButton = ({
//   format,
//   icon,
// }: {
//   format: string;
//   icon: string;
// }) => {
//   const editor = useSlate();
//   return (
//     <Button
//       active={isBlockActive(
//         editor,
//         format,
//         TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
//       )}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   );
// };

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: string;
}) => {
  const editor = useSlate();
  return (
    <Button
      type={isMarkActive(editor as ReactEditor, format) ? "primary" : "default"}
      // active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor as ReactEditor, format);
      }}
    >
      {icon}
    </Button>
  );
};
