import React from 'react';

import { PluginFactory, PluginType } from '../../types';

import { EditorAdapter } from '../../core';

import { SideMenu } from './components/side-menu';
import { CustomTypes } from 'slate';
import { ReactEditor } from 'slate-react';

export const PluginName = 'side-menu';

// 由于富文本有时候选区不是很友好，这里通过sidebar增强选区的交互
// 删除和新增行
export const SideMenuPluginFactory: PluginFactory<{
  editorAdapter: EditorAdapter;
}> = ({ editor, editorAdapter }) => {
  return {
    name: PluginName,
    type: PluginType.ElementWrap,
    match: () => true,
    renderElement(props, context) {
      const path = ReactEditor.findPath(editor, props.element);
      if (path.length !== 1) {
        return props.children;
      }
      return (
        <SideMenu
          path={path}
          renderElementProps={props}
          plugins={editorAdapter.getPlugins()}
        />
      );
    },
  };
};
