import React, { useEffect, useMemo } from "react";

import { Editable, Slate } from "slate-react";

// import { createEditor, Descendant } from "slate";
// import { withHistory } from "slate-history";

// import { EditorHelper, IFlxEditorPlugin } from "./editorHelper";

// import { BoldTextPlugin } from "./plugins/BoldText";
// import { UnderlinePlugin } from "./plugins/Underline";
// import { ItalicPlugin } from "./plugins/Italic";

import "./index.scss";
import { IFlxEditorPlugin, initFlxEditor } from "flx-editor-base";
import { Descendant } from "slate";

// import { BoldPlugin, UnderlinePlugin } from "flx-editor-base";
import Toolbar from "./components/Toolbar";

const initValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
] as any;

const plugins: IFlxEditorPlugin[] = [
  // BoldPlugin,
  // UnderlinePlugin,
  // ItalicPlugin,
];

export default function FlxEditor() {
  const [editor, editorHelper] = useMemo(() => {
    // const editor = withHistory(withReact(createEditor()));
    // const editorHelper = new EditorHelper(editor, plugins);
    // return [editor, editorHelper];
    return initFlxEditor(plugins);
  }, []);

  useEffect(() => {
    (window as any).editor = editor;
  }, []);

  const toolbar = useMemo(() => {
    const toolBarWidgets = editorHelper.getPlugins()
      .filter((p) => p.widget?.toolBarWidget)
      .map((p) => p.widget?.toolBarWidget);

    return <Toolbar>{toolBarWidgets}</Toolbar>;
  }, [])

  return (
    <Slate editor={editor} initialValue={initValue}>
      <div className={"flx-editor-wrap"}>
        {/* {editorHelper.renderToolBar()} */}
        {toolbar}
        <Editable
          className="flx-editor"
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
