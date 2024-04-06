import React, { useMemo } from 'react';

import { useSlate } from "slate-react";
import { BaseButton } from "../../common";
import { PluginFactory, PluginType } from "../../types";
import { Editor, Transforms, Element } from "slate";

import { Trigger } from '@arco-design/web-react';

import { AlignTextBoth, AlignTextLeft, AlignTextCenter, AlignTextRight } from '@icon-park/react';

import './index.css';
import { getCurrentElement } from '../../utils';


const PluginName = "align";

const aligns = [{ value: 'left', icon: <AlignTextLeft /> }, { value: 'center', icon: <AlignTextCenter /> }, { value: 'right', icon: <AlignTextRight /> }, { value: 'both', icon: <AlignTextBoth /> }];

const AlignButton = () => {

    const editor = useSlate();

    const [currentElement, path] = getCurrentElement(editor);

    const alignValue = currentElement?.[PluginName];

    const align = aligns.find((item) => item.value === alignValue) || aligns[0];

    const popContent = useMemo(() => {
        return <div className='align-pop-content'>
            {aligns.map((item) => {
                return <BaseButton selected={item.value === alignValue} icon={item.icon} onMouseDown={() => {
                    if (currentElement && path) {
                        Transforms.setNodes(editor, { [PluginName]: item.value }, { at: path });
                    }
                }} />
            })}
        </div>
    }, [align, alignValue, currentElement, path]);

    return <Trigger position='bottom' popup={() => popContent}>
        <div>
            <BaseButton icon={align.icon} />
        </div>
    </Trigger>
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