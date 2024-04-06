import React from 'react';

import { useSlate } from "slate-react";
import { BaseButton } from "../../common";
import { PluginFactory, PluginType } from "../../types";
import { Transforms } from "slate";

import { AlignLeft } from '@icon-park/react';

import './index.css';


const PluginName = "align";

const AlignButton = () => {

    const editor = useSlate();

    return <BaseButton icon={<AlignLeft />} onMouseDown={() => {
        Transforms.insertNodes(editor, { type: 'paragraph', [PluginName]: 'center', children: [{ text: '' }] })
    }} />
}

export const AlignPluginFactory: PluginFactory = (editor) => {

    return {
        name: PluginName,
        type: PluginType.ElementWrap,
        match: (props) => {
            return !!props.element[PluginName];
        },
        renderElement: (props, context) => {
            const align = props.element[PluginName];
            context.classNames.push(`align-${align}`)
            return props.children;
        },
        widget: {
            toolbarWidget: <AlignButton />,
            popupWidget: <AlignButton />
        }
    }
}