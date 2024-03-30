import React from 'react';

import { IFlxEditorPlugin, PluginType, useSlate, Transforms } from 'flx-editor-base';

import './index.css';

const PluginName = 'resume-title';

const BasicButton = () => {
    const editor = useSlate();

    return <button onClick={() => {
        Transforms.insertNodes(editor, {
            type: PluginName, children: [{ text: '' }]
        });
    }}>
        resume-title
    </button>
}

export const ResumeTitlePlugin: IFlxEditorPlugin = {
    name: PluginName,
    type: PluginType.Element,
    renderElement: (props) => {
        return <div {...props.attributes} className='resume-title'>
            {props.children}
        </div>
    },
    widget: {
        toolBarWidget: (
            <BasicButton />
        ),
    },
}