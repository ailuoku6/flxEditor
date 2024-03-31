import React from 'react';


import { IFlxEditorPlugin, PluginType, PluginFactory, useSlate, Transforms, genUUID, Node as SlateNode } from 'flx-editor-base';

import './index.css';

const PluginName = 'resume-detail';

const resumeDetailTitle = 'resume-detail-title';
const resumeDetailDate = 'resume-detail-date';

const resumeDetailContent = 'resume-detail-content';

const totalDetailField = [resumeDetailContent];

const BasicButton = () => {
    const editor = useSlate();

    return <button onClick={() => {
        Transforms.insertNodes(editor, {
            type: PluginName,
            id: genUUID(PluginName),
            title: '',
            date: '',
            children: [{ text: ' ', leafType: resumeDetailContent }]
        });
    }}>
        resume-detail
    </button>
}

const CustomInput = ({ value, id, field }: { value?: string, id: string, field: string }) => {

    const editor = useSlate();

    const handleChange = (newValue: string) => {
        const newProperties = { [field]: newValue };
        Transforms.setNodes(editor, newProperties, { match: n => SlateNode.isNode(n) && (n as any).id === id });
    }

    return <input className='resume-detail-input' value={value} onChange={(e) => handleChange(e.target.value)} />
}

export const ResumeDetailPluginFactory: PluginFactory = ({ editor }) => {
    return {
        name: PluginName,
        type: PluginType.Element,
        renderElement: (props) => {

            const { title, date, id } = props.element as unknown as { title: string; date: string; id: string };

            console.info('--------ResumedetailElement', props)

            return <div {...props.attributes} className='resume-detail'>
                <div contentEditable={false} className='detail-basewrap'>
                    <CustomInput value={title} id={id} field='title' />
                    <CustomInput value={date} id={id} field='date' />
                    {/* <div >{title}</div>
                    <div>{date}</div> */}
                </div>
                <div>
                    {props.children}
                </div>

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

        eventHandles: {

        }
    }
}
