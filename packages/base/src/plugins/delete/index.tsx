import React from 'react';

import { MarkButton } from '../../common';
import { PluginFactory, PluginType } from '../../types';
import { Strikethrough } from '@icon-park/react';
const PluginName = 'delete';

const BasicButton = () => {
  return (
    <MarkButton key={PluginName} format={PluginName} icon={<Strikethrough />} />
  );
};

export const DeleteFactory: PluginFactory = ({ editor }) => {
  return {
    name: PluginName,
    type: PluginType.Leaf,
    renderLeaf(props, context) {
      return <del>{props.children}</del>;
    },

    widget: {
      popupWidget: <BasicButton />,
      toolbarWidget: <BasicButton />,
    },
  };
};
