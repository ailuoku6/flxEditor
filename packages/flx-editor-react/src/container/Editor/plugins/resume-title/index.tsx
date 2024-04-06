import React from 'react';

import { IFlxEditorPlugin, PluginType, PluginFactory, useSlate, Transforms, LeafPlaceholder } from 'flx-editor-base';

import './index.css';

const PluginName = 'resume-title';

const resumeTitleText = 'resume-title-text';

const BasicButton = () => {
    const editor = useSlate();

    return <button onClick={() => {
        Transforms.insertNodes(editor, {
            type: PluginName, children: [{ text: '', leafType: resumeTitleText }]
        });
    }}>
        resume-title
    </button>
}

export const ResumeTitlePluginFactory: PluginFactory = ({ editor }) => {
    return {
        name: PluginName,
        type: PluginType.Element,
        renderElement: (props) => {
            return <div {...props.attributes} className='resume-title'>
                {props.children}
            </div>
        },
        matchLeaf(props) {
            return props.leaf.leafType === resumeTitleText;
        },

        renderLeaf(props, context) {
            console.log('-------renderLeaf', props);
            if (props.leaf.text === '') {
                return <>
                    <LeafPlaceholder placeholder='enter some text...' />
                    {props.children}
                </>
            }
            return <span {...props.attributes} className={resumeTitleText}>{props.children}</span>;
        },
        widget: {
            sidebarWidget: (
                <BasicButton />
            ),
        },
    }
}
