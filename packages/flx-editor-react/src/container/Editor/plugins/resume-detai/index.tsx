import React from 'react';


import { IFlxEditorPlugin, PluginType, PluginFactory, useSlate, Transforms, genUUID, Node as SlateNode, Text as SlateText, LeafPlaceholder, getLeafNodeAncestors, BaseNode } from 'flx-editor-base';

import './index.css';

const PluginName = 'resume-detail';

const resumeDetailTitleDateWrap = 'resume-detail-title-date-wrap';

const resumeDetailTitle = 'resume-detail-title';
const resumeDetailDate = 'resume-detail-date';

const resumeDetailContent = 'resume-detail-content';

const unEnterable = new Set([resumeDetailTitle, resumeDetailDate]);

const totalEditField = [resumeDetailTitle, resumeDetailDate, resumeDetailContent];

const totalDetailElementField = [PluginName, resumeDetailTitleDateWrap, resumeDetailTitle, resumeDetailDate, resumeDetailContent];

const BasicButton = () => {
    const editor = useSlate();

    return <button onClick={() => {
        Transforms.insertNodes(editor, {
            type: PluginName,
            children: [{
                type: resumeDetailTitleDateWrap,
                children: [
                    { type: resumeDetailTitle, children: [{ text: '', leafType: resumeDetailTitle }] },
                    { type: resumeDetailDate, children: [{ text: '', leafType: resumeDetailDate }] }
                ]
            }, { type: resumeDetailContent, children: [{ text: '', leafType: resumeDetailContent }] }]
        });
    }}>
        resume-detail
    </button>
}

export const ResumeDetailPluginFactory: PluginFactory = ({ editor }) => {
    return {
        name: PluginName,
        type: PluginType.Element,
        match: (props) => {
            return totalDetailElementField.some((name) => (props.element.type) === name);
        },
        renderElement: (props) => {

            const { type } = props.element;

            return <div {...props.attributes} className={type}>
                {props.children}
            </div>
        },

        matchLeaf(props) {
            return totalEditField.some((name) => (props.leaf.leafType) === name);
        },

        renderLeaf(props, context) {

            if (props.leaf.text === '') {
                return <>
                    <LeafPlaceholder placeholder='enter some text...' />
                    {props.children}
                </>
            }

            return props.children;
        },

        widget: {
            toolBarWidget: (
                <BasicButton />
            ),
        },

        onKeyDown(e) {
            if (e.key === 'Enter') {
                const nodes = getLeafNodeAncestors(editor);

                const selected = nodes?.some((nodeInfo) => {
                    const node = nodeInfo[0] as any;
                    return unEnterable.has(node?.type || node?.leafType);
                });

                if (selected) {
                    return true;
                }
            }
            return false;
        },

        // TODO: 限制删除，回车行为
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
