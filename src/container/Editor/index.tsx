import React, { useEffect, useMemo } from "react";

import { Editable, withReact, Slate } from "slate-react";

import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

import { EditorHelper, IFlxEditorPlugin } from "./editorHelper";

import { BoldTextPlugin } from "./plugins/BoldText";
import { UnderlinePlugin } from "./plugins/Underline";

import "./index.scss";

const initValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
] as any;

const plugins: IFlxEditorPlugin[] = [BoldTextPlugin, UnderlinePlugin];

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
      <div className={"flx-editor-wrap"}>
        {editorHelper.renderToolBar()}
        <Editable
          className="flx-editor"
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
