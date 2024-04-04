import { IFlxEditorPlugin, PluginType, useSlate, Transforms, PluginFactory } from 'flx-editor-base';

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
                return { type: field, children: [{ text: '' }] }
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

        // matchLeaf: (props) => {
        //     const { leaf } = props;
        //     return totalBasic.some((name) => (leaf.leafType) === name);
        // },

        // renderLeaf: (props) => {
        //     const { leaf } = props;
        //     const field = totalBasic.find((name) => (leaf.leafType) === name);
        //     if (field) {
        //         return <span {...props.attributes} className={field}>{props.children}</span>;
        //     }
        // },

        widget: {
            toolBarWidget: (
                <BasicButton />
            ),
        },
    }
}

