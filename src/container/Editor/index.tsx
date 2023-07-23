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

import { EditorHelper, IFlxEditorPlugin } from "./editorHelper";

const initValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
] as any;

const plugins: IFlxEditorPlugin[] = [];

export default function FlxEditor() {
  const [editor, editorHelper] = useMemo(() => {
    const editor = withHistory(withReact(createEditor()));
    const editorHelper = new EditorHelper(editor, plugins);
    return [editor, editorHelper];
  }, []);

  useEffect(() => {
    (window as any).editor = editor;
  }, []);

  return (
    <Slate editor={editor} initialValue={initValue}>
      <div>
        {editorHelper.renderToolBar()}
        <Editable
          // renderElement={renderElement}
          // renderLeaf={renderLeaf}
          renderElement={editorHelper.renderElement}
          renderLeaf={editorHelper.renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
        />
      </div>
    </Slate>
  );
}
