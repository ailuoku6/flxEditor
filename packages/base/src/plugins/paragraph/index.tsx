import { PluginFactory, PluginType } from '../../types';
import { BaseButton } from '../../common';
import { useSlate } from 'slate-react';
import { Tooltip } from '@arco-design/web-react';
import { Transforms } from 'slate';

import { paragraphType } from '../constants';

import React from 'react';

import { Text } from '@icon-park/react';

const PluginName = paragraphType;

const BasicButton = () => {
  const editor = useSlate();
  return (
    <BaseButton
      onMouseDown={() => {
        Transforms.insertNodes(editor, {
          type: PluginName,
          children: [{ text: '' }],
        });
      }}
      icon={
        <Tooltip content="文本">
          <Text />
        </Tooltip>
      }
    />
  );
};

export const ParagraphFactory: PluginFactory = ({ editor }) => {
  return {
    name: PluginName,
    type: PluginType.Element,
    renderElement(props, context) {
      return <p {...props.attributes}>{props.children}</p>;
    },

    widget: {
      toolbarWidget: <BasicButton />,
    },
  };
};
