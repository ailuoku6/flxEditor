import React from 'react';

import { PluginFactory, PluginType } from '../../types';
import { MarkButton } from '../../common';

import { TextItalic } from '@icon-park/react';

const PluginName = 'italic';

const BasicButton = () => {
  return (
    <MarkButton key={PluginName} format={PluginName} icon={<TextItalic />} />
  );
};

export const ItalicFactory: PluginFactory = ({ editor }) => {
  return {
    name: PluginName,
    type: PluginType.Leaf,
    renderLeaf(props, context) {
      return <em>{props.children}</em>;
    },

    widget: {
      popupWidget: <BasicButton />,
      toolbarWidget: <BasicButton />,
    },
  };
};
