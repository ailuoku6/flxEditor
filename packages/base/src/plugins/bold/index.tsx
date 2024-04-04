import React from 'react';

import { IFlxEditorPlugin, PluginType, PluginFactory } from '../../types';

import { isMarkActive, toggleMark } from '../../utils';
import { ReactEditor, useSlate } from 'slate-react';
import { MarkButton } from '../../common/components';

const PluginName = "bold";

import { GoBold } from "react-icons/go";

export const BoldPluginFactory: PluginFactory = ({ editor }) => {
    return {
        name: PluginName,
        type: PluginType.Leaf,
        renderLeaf: (props) => {
            const { leaf } = props;
            if ((leaf as any)[PluginName]) {
                return <strong {...props.attributes}>{props.children}</strong>;
            }
        },

        widget: {
            toolBarWidget: (
                <MarkButton key={PluginName} format={PluginName} icon={<GoBold />} />
            ),
        },
    }
}
