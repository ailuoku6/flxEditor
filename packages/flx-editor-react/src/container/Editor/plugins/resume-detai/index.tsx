import React from 'react';


import { IFlxEditorPlugin, PluginType, PluginFactory, useSlate, Transforms, genUUID, Node as SlateNode, Text as SlateText } from 'flx-editor-base';

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
            children: [{ type: 'paragraph', children: [{ text: '', leafType: resumeDetailContent }] }]
        });
    }}>
        resume-detail
    </button>
}

const CustomInput = ({ value, id, field, className }: { value?: string, id: string, field: string; className?: string }) => {

    const editor = useSlate();

    const handleChange = (newValue: string) => {
        const newProperties = { [field]: newValue };
        Transforms.setNodes(editor, newProperties, { match: n => SlateNode.isNode(n) && (n as any).id === id });
    }

    return <input className={`resume-detail-input ${className}`} value={value} onChange={(e) => handleChange(e.target.value)} />
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
                    <CustomInput value={title} id={id} field='title' className='resume-detail-title' />
                    <CustomInput value={date} id={id} field='date' className='resume-detail-date' />
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

        // eventHandles: {
        //     onKeyDown: (e) => {
        //         if (e.key === 'Enter') {
        //             // e.preventDefault();
        //             // const text = { text: '' };
        //             // const paragraph = { type: 'paragraph', children: [text] };
        //             // Transforms.insertNodes(editor, paragraph);

        //             // 判断选区所处对象
        //             const { selection } = editor;
        //             if (selection) {
        //                 // 获取选区的开始位置对应的节点
        //                 let startNode = SlateNode.get(editor, selection.anchor.path);
        //                 console.log('---startNode', startNode);

        //                 // 获取选区的结束位置对应的节点
        //                 let endNode = SlateNode.get(editor, selection.focus.path);
        //                 console.log('-----endNode', endNode);

        //                 if ((startNode as any).leafType === resumeDetailContent) {
        //                     // Transforms.splitNodes(editor);
        //                     Transforms.splitNodes(editor, {
        //                         at: selection.anchor, match: n => {
        //                             const v = SlateText.isText(n);
        //                             return v;
        //                             // return (n as any).type === PluginName;
        //                         }
        //                     });
        //                     // Transforms.setNodes(editor, { children: [{ text: '90' }] }, {
        //                     //     at: selection, match: n => {
        //                     //         const v = (n as any).type === PluginName;
        //                     //         return v;
        //                     //     }
        //                     // });
        //                     return true;
        //                 }
        //             }
        //         }

        //         return false;
        //     }
        // }
    }
}
