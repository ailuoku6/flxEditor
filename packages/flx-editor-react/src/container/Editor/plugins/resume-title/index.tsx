import React from 'react';

import { IFlxEditorPlugin, PluginType, PluginFactory, useSlate, Transforms, LeafPlaceholder } from 'flx-editor-base';
import { BaseButton } from 'flx-editor-base';
import { ActivitySource } from '@icon-park/react';

import { Tooltip } from '@arco-design/web-react';
import './index.css';

const PluginName = 'resume-title';

const resumeTitleText = 'resume-title-text';

const BasicButton = () => {
    const editor = useSlate();

    return <Tooltip content="简历内容详情">
        <BaseButton onMouseDown={() => {
            Transforms.insertNodes(editor, {
                type: PluginName, children: [{ text: '', leafType: resumeTitleText }]
            });
        }} icon={<ActivitySource />} />
    </Tooltip>
}

export const ResumeTitlePluginFactory: PluginFactory = ({ editor }) => {
    return {
        name: PluginName,
        type: PluginType.Element,
        renderElement: (props, context) => {
            context.classNames.push('resume-title');

            return props.children;
        },
        matchLeaf(props) {
            return props.leaf.leafType === resumeTitleText;
        },

        renderLeaf(props, context) {
            if (props.leaf.text === '') {
                return <>
                    <LeafPlaceholder placeholder='enter some text...' />
                    {props.children}
                </>
            }
            return <span {...props.attributes} className={resumeTitleText}>{props.children}</span>;
        },
        widget: {
            toolbarWidget: (
                <BasicButton />
            ),
        },
    }
}
