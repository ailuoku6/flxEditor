import { IFlxEditorPlugin, PluginType, useSlate, Transforms, PluginFactory, LeafPlaceholder } from 'flx-editor-base';

import React from 'react';
import './index.css';
const PluginName = "resume-basic";

const BasicName = "resume-basic-name";
const BasicGender = "resume-basic-gender";
const BasicAddress = "resume-basic-address";
const BasicPhone = "resume-basic-phone";
const BasicEmail = "resume-basic-email";

const totalBasic = [BasicName, BasicGender, BasicAddress, BasicPhone, BasicEmail];

const BasicButton = () => {
    const editor = useSlate();
    return <button onClick={() => {
        Transforms.insertNodes(editor, {
            type: PluginName, children: totalBasic.map(field => {
                return { type: field, children: [{ text: '', leafType: field }] }
            })
        });
    }}>
        resume-basic
    </button>
}

export const ResumeBasicPluginFactory: PluginFactory = ({ editor }) => {
    return {
        name: PluginName,
        type: PluginType.Element,

        match: (props) => {
            return props.element.type === PluginName || totalBasic.some((name) => (props.element.type) === name);
        },

        renderElement: (props) => {
            return <div {...props.attributes} className={props.element.type}>
                {props.children}
            </div>
        },

        matchLeaf: (props) => {
            const { leaf } = props;
            return totalBasic.some((name) => (leaf.leafType) === name);
        },

        renderLeaf: (props) => {
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
    }
}

