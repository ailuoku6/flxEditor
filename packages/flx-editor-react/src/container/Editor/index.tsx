import React, { useEffect, useMemo } from "react";

// import { Editable, Slate } from "slate-react";

// import { createEditor, Descendant } from "slate";
// import { withHistory } from "slate-history";

// import { EditorHelper, IFlxEditorPlugin } from "./editorHelper";

// import { BoldTextPlugin } from "./plugins/BoldText";
// import { UnderlinePlugin } from "./plugins/Underline";
// import { ItalicPlugin } from "./plugins/Italic";

import "./index.scss";
import { IFlxEditorPlugin, initFlxEditor, Descendant, Editable, Slate, BoldPluginFactory, UnderlinePluginFactory, PluginFactory } from "flx-editor-base";

import { ResumeBasicPluginFactory } from "./plugins/resume-basic";
import { ResumeTitlePluginFactory } from "./plugins/resume-title";
import { ResumeDetailPluginFactory } from "./plugins/resume-detai";
// import { Descendant } from "slate";

import Toolbar from "./components/Toolbar";

const initValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
] as any;

const pluginFactorys: PluginFactory[] = [
  BoldPluginFactory,
  UnderlinePluginFactory,
  ResumeBasicPluginFactory,
  ResumeTitlePluginFactory,
  ResumeDetailPluginFactory
  // ItalicPlugin,
];


export default function FlxEditor() {
  const [editor, editorHelper] = useMemo(() => {
    // const editor = withHistory(withReact(createEditor()));
    // const editorHelper = new EditorHelper(editor, plugins);
    // return [editor, editorHelper];
    return initFlxEditor(pluginFactorys);
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
          // onKeyDown={()=>{

          // }}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
        />
      </div>
    </Slate>
  );
}
