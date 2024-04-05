import React, { useEffect, useMemo } from "react";

import "./index.scss";
import { IFlxEditorPlugin, initFlxEditor, Descendant, Editable, Slate, BoldPluginFactory, UnderlinePluginFactory, SideMenuPluginFactory, PluginFactory } from "flx-editor-base";

import { ResumeBasicPluginFactory } from "./plugins/resume-basic";
import { ResumeTitlePluginFactory } from "./plugins/resume-title";
import { ResumeDetailPluginFactory } from "./plugins/resume-detai";
// import { Descendant } from "slate";

import { EditorToolbar } from "flx-editor-base";

// import Toolbar from "./components/Toolbar";

const LocalDocDataKey = 'flx-resume-editor-doc-data';

const initValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

const pluginFactorys: PluginFactory<any>[] = [
  SideMenuPluginFactory,
  BoldPluginFactory,
  UnderlinePluginFactory,
  ResumeBasicPluginFactory,
  ResumeTitlePluginFactory,
  ResumeDetailPluginFactory
  // ItalicPlugin,
];


export default function FlxEditor() {
  const [editor, editorHelper] = useMemo(() => {
    return initFlxEditor(pluginFactorys);
  }, []);

  useEffect(() => {
    (window as any).editor = editor;
  }, []);

  const toolbar = useMemo(() => {
    // const toolBarWidgets = editorHelper.getPlugins()
    //   .filter((p) => p.widget?.toolBarWidget)
    //   .map((p) => p.widget?.toolBarWidget);

    // return <Toolbar>{toolBarWidgets}</Toolbar>;
    return <EditorToolbar plugins={editorHelper.getPlugins()} />
  }, []);

  const localData = useMemo(() => {
    const localData = localStorage.getItem(LocalDocDataKey);
    if (localData) {
      return JSON.parse(localData);
    }
    return initValue;
  }, []);

  const handleSave = () => {
    localStorage.setItem(LocalDocDataKey, JSON.stringify(editor.children));
  }

  const handleChange = (value: Descendant[]) => {

  }

  return (
    <div>
      <Slate editor={editor} initialValue={localData} onChange={handleChange}>
        <div className={"flx-editor-wrap"}>
          {/* {editorHelper.renderToolBar()} */}
          {toolbar}
          <Editable
            className="flx-editor"
            renderElement={editorHelper.renderElement}
            renderLeaf={editorHelper.renderLeaf}
            onKeyDown={editorHelper.onKeyDown}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
          />
        </div>
      </Slate>
      <div className="save-btn" onClick={handleSave}>save</div>
    </div>
  );
}
