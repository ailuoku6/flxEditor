import React, { useEffect, useMemo } from "react";

import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

const initValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
] as any;

const renderElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return <p {...attributes}>{children}</p>;
};

const renderLeaf = (props: RenderLeafProps) => {
  const { attributes, children } = props;
  return <span {...attributes}>{children}</span>;
};

export default function FlxEditor() {
  const editor = useMemo(() => {
    return withHistory(withReact(createEditor()));
  }, []);

  useEffect(() => {
    (window as any).editor = editor;
  }, []);

  return (
    <Slate editor={editor} initialValue={initValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
      />
    </Slate>
  );
}
