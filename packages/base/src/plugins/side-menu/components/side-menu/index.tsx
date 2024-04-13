import React, { useMemo } from 'react';
import { RenderElementProps, useSlate } from 'slate-react';
import { IFlxEditorPlugin, PluginType } from '../../../../types';

import { Plus, DeleteOne } from '@icon-park/react';
import { Trigger, Button, Divider } from '@arco-design/web-react';
import { Editor, Path, Transforms } from 'slate';
import { paragraphType } from '../../../constants';
import './index.css';

interface SideMenuProps {
  renderElementProps: RenderElementProps;
  plugins: IFlxEditorPlugin[];
  path: Path;
}

// 最外层插件才展示SideMenu，嵌套在里面的组件不展示
export const SideMenu = ({
  plugins,
  renderElementProps,
  path,
}: SideMenuProps) => {
  const editor = useSlate();

  const innerTriggerMenu = (
    <div className="side-menu">
      <Button
        type="primary"
        onMouseDown={() => {
          const newPath = Path.next(path);
          Transforms.insertNodes(
            editor,
            { type: paragraphType, children: [{ text: '' }] },
            { at: newPath },
          );

          const end = Editor.end(editor, newPath);
          Transforms.select(editor, end);
        }}
        icon={<Plus theme="outline" size="24" />}
      />
      <Button
        onMouseDown={() => {
          Transforms.removeNodes(editor, { at: path });
        }}
        type="primary"
        icon={<DeleteOne theme="outline" size="24" />}
      />
    </div>
  );

  return (
    <>
      <Trigger
        onVisibleChange={(v) => {
          // if (v) {
          //     const range = Editor.range(editor, path);
          //     Transforms.select(editor, range);
          // }
        }}
        popupAlign={{ left: 2 }}
        mouseEnterDelay={300}
        mouseLeaveDelay={300}
        position="left"
        popup={() => innerTriggerMenu}
      >
        <div>{renderElementProps.children}</div>
      </Trigger>
    </>
  );
};
