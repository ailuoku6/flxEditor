import React, { useEffect, useMemo } from 'react';

import './index.scss';
import {
  // IFlxEditorPlugin,
  initFlxEditor,
  Descendant,
  Editable,
  Slate,
  BoldPluginFactory,
  UnderlinePluginFactory,
  AlignPluginFactory,
  SideMenuPluginFactory,
  PluginFactory,
  ParagraphFactory,
  QuoteFactory,
  DeleteFactory,
  ItalicFactory,
  HeadPluginFactory,
  OrderListPluginFactory,
  paragraphType,
} from 'flx-editor-base';

import { ResumeBasicPluginFactory } from './plugins/resume-basic';
import { ResumeTitlePluginFactory } from './plugins/resume-title';
import { ResumeDetailPluginFactory } from './plugins/resume-detai';
// import { Descendant } from "slate";

import { EditorToolbar, FloatMenu } from 'flx-editor-base';

// import Toolbar from "./components/Toolbar";

const LocalDocDataKey = 'flx-resume-editor-doc-data';

const initValue: Descendant[] = [
  { type: paragraphType, children: [{ text: '' }] },
];

const pluginFactorys: PluginFactory<any>[] = [
  ParagraphFactory,
  HeadPluginFactory,
  SideMenuPluginFactory,
  BoldPluginFactory,
  UnderlinePluginFactory,
  ItalicFactory,
  DeleteFactory,
  AlignPluginFactory,
  QuoteFactory,
  OrderListPluginFactory,
  ResumeBasicPluginFactory,
  ResumeTitlePluginFactory,
  ResumeDetailPluginFactory,
  // ItalicPlugin,
];

export default function FlxEditor() {
  const [editor, editorAdapter] = useMemo(() => {
    return initFlxEditor(pluginFactorys);
  }, []);

  useEffect(() => {
    (window as any).editor = editor;
  }, []);

  // const toolbar = useMemo(() => {
  //   // const toolBarWidgets = editorAdapter.getPlugins()
  //   //   .filter((p) => p.widget?.toolBarWidget)
  //   //   .map((p) => p.widget?.toolBarWidget);

  //   // return <Toolbar>{toolBarWidgets}</Toolbar>;
  //   return <EditorToolbar plugins={editorAdapter.getPlugins()} />
  // }, []);

  const localData = useMemo(() => {
    const localData = localStorage.getItem(LocalDocDataKey);
    if (localData) {
      return JSON.parse(localData);
    }
    return initValue;
  }, []);

  const handleSave = () => {
    localStorage.setItem(LocalDocDataKey, JSON.stringify(editor.children));
  };

  const handleChange = (value: Descendant[]) => {};

  return (
    <div>
      <Slate editor={editor} initialValue={localData} onChange={handleChange}>
        <div className="editor-toolbar-wrap">
          <EditorToolbar
            plugins={editorAdapter.getPlugins()}
            className="toolbar"
          />
          <div className={'flx-editor-wrap'}>
            <FloatMenu editorAdapter={editorAdapter} />
            <Editable
              className="flx-editor"
              renderElement={editorAdapter.renderElement}
              renderLeaf={editorAdapter.renderLeaf}
              onKeyDown={editorAdapter.onKeyDown}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
            />
          </div>
        </div>
      </Slate>
      <div className="save-btn" onClick={handleSave}>
        save
      </div>
    </div>
  );
}
