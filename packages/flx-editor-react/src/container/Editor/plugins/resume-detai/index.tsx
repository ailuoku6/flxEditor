import React from 'react';

import { IFlxEditorPlugin, PluginType, useSlate, Transforms } from 'flx-editor-base';

import './index.css';

const PluginName = 'resume-detail';

const resumeDetailTitle = 'resume-detail-title';
const resumeDetailDate = 'resume-detail-date';

const resumeDetailContent = 'resume-detail-content';

const totalDetailField = [resumeDetailTitle, resumeDetailDate, resumeDetailContent];

const BasicButton = () => {
    const editor = useSlate();

    return <button onClick={() => {
        Transforms.insertNodes(editor, {
            type: PluginName, children: [{ text: ' ', leafType: resumeDetailTitle }, { text: ' ', leafType: resumeDetailDate }, { text: ' ', leafType: resumeDetailContent }]
        });
    }}>
        resume-detail
    </button>
}

export const ResumeDetailPlugin: IFlxEditorPlugin = {
    name: PluginName,
    type: PluginType.Element,
    renderElement: (props) => {
        return <div {...props.attributes} className='resume-detail'>
            {props.children}
        </div>
    },

    matchLeaf: (props) => {
        const { leaf } = props;
        return totalDetailField.some((name) => (leaf.leafType) === name);
    },

    renderLeaf: (props) => {
        const { leaf } = props;
        const field = totalDetailField.find((name) => (leaf.leafType) === name);
        if (field) {
            return <span {...props.attributes} className={field}>{props.children}</span>;
        }
    },

    widget: {
        toolBarWidget: (
            <BasicButton />
        ),
    },
}