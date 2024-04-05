import React from 'react';
import { RenderElementProps } from 'slate-react';
import { IFlxEditorPlugin } from '../../../../types';

// import Trigger from 'rc-trigger';

import { Trigger } from "@arco-design/web-react";


interface SideMenuProps {
    renderElementProps: RenderElementProps;
    plugins: IFlxEditorPlugin[];
}

// 最外层插件才展示SideMenu，嵌套在里面的组件不展示
export const SideMenu = ({ plugins, renderElementProps }: SideMenuProps) => {

    console.info('SideMenu renderElementProps:', plugins, renderElementProps);

    const innerTriggerMenu = <div><Trigger popup={() => <div>menu</div>}><div>test</div></Trigger></div>;

    return <>
        <Trigger mouseEnterDelay={300} mouseLeaveDelay={300} position='lt' popup={() => innerTriggerMenu}>
            <div>{renderElementProps.children}</div>
        </Trigger>
    </>;
}