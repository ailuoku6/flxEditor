import React from 'react';

import { PluginFactory, PluginType } from '../../types';

import './index.css';
import { useSlate } from 'slate-react';
import { BaseButton } from '../../common';
import { Transforms } from 'slate';
import { Tooltip } from '@arco-design/web-react';

import { Quote } from '@icon-park/react';

import { paragraphType } from '../constants';

const PluginName = 'quote';

const BasicButton = () => {
  const editor = useSlate();
  return (
    <BaseButton
      onMouseDown={() => {
        Transforms.insertNodes(editor, {
          type: PluginName,
          children: [{ type: paragraphType, children: [{ text: '' }] }],
        });
      }}
      icon={
        <Tooltip content="引用">
          <Quote />
        </Tooltip>
      }
    />
  );
};

export const QuoteFactory: PluginFactory = ({ editor }) => {
  return {
    name: PluginName,
    type: PluginType.Element,
    renderElement(props, context) {
      return <blockquote className="quote-block">{props.children}</blockquote>;
    },
    widget: {
      toolbarWidget: <BasicButton />,
    },
  };
};
