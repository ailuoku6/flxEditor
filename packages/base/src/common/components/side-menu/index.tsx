import React from 'react';
import { RenderElementProps } from 'slate-react';
import { IFlxEditorPlugin } from '../../../types';

interface SideMenuProps {
    renderElementProps: RenderElementProps;
    plugins: IFlxEditorPlugin[];
}

// 最外层插件才展示SideMenu，嵌套在里面的组件不展示
export const SideMenu = ({ plugins, renderElementProps }: SideMenuProps) => {
    return <>
        <div style={{ userSelect: 'none' }}>151</div>
        {renderElementProps.children}
    </>;
}