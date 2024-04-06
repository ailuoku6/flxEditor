import React, { useMemo } from 'react';
import { RenderElementProps, useSlate } from 'slate-react';
import { IFlxEditorPlugin, PluginType } from '../../../../types';

import { Plus } from '@icon-park/react';
import { Trigger, Button, Divider } from "@arco-design/web-react";
import { Editor, Path, Transforms } from 'slate';

import './index.css';

interface SideMenuProps {
    renderElementProps: RenderElementProps;
    plugins: IFlxEditorPlugin[];
    path: Path
}

// 最外层插件才展示SideMenu，嵌套在里面的组件不展示
export const SideMenu = ({ plugins, renderElementProps, path }: SideMenuProps) => {

    const editor = useSlate();

    console.info('SideMenu renderElementProps:', plugins, renderElementProps);

    const popContent = useMemo(() => {

        const pluginWidgets = plugins.filter(p => p.widget?.sidebarWidget && p.type === PluginType.Element);

        return <div className='pop-content'>
            <div className='widgets' onMouseDownCapture={() => {
                const end = Editor.end(editor, path);
                Transforms.select(editor, end);
            }}>
                {pluginWidgets.map(plugin => {
                    return <div key={plugin.name} className='pop-item'>
                        {plugin.widget?.sidebarWidget}
                    </div>
                })}
            </div>
            <Divider />
            <div>
                <div onMouseDown={() => {
                    Transforms.removeNodes(editor, { at: path })
                }}>删除</div>
            </div>

            <Divider />

            <Trigger position='rt' popup={() => {
                return <div className='pop-content'>
                    <div className='widgets' onMouseDownCapture={() => {
                        // const range = Editor.range(editor, path);
                        const newPath = Path.next(path);
                        Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] }, { at: newPath });

                        const end = Editor.end(editor, newPath);
                        Transforms.select(editor, end);

                    }}>
                        {pluginWidgets.map(plugin => {
                            return <div key={plugin.name} className='pop-item'>
                                {plugin.widget?.sidebarWidget}
                            </div>
                        })}
                    </div>
                </div>
            }}>
                <div>
                    在下方添加
                </div>
            </Trigger>

        </div>
    }, []);

    const innerTriggerMenu = <Trigger position='bl' popup={() => popContent}><Button type='primary' icon={<Plus theme="outline" size="24" />} /></Trigger>;

    return <>
        <Trigger onVisibleChange={v => {
            // if (v) {
            //     const range = Editor.range(editor, path);
            //     Transforms.select(editor, range);
            // }
        }} popupAlign={{ left: 2 }} mouseEnterDelay={300} mouseLeaveDelay={300} position='left' popup={() => innerTriggerMenu}>
            <div>{renderElementProps.children}</div>
        </Trigger>
    </>;
}