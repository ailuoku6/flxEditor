import React from 'react';

import { PluginFactory, PluginType } from '../../types';
import { useSlate } from 'slate-react';
import { BaseButton } from '../../common';
import { isBlockActive } from '../../utils';
import { paragraphType } from '../constants';
import { Transforms, Element as SlateElement, Editor } from 'slate';

import { OrderedList } from '@icon-park/react';
const PluginName = 'order-list';
const listItem = 'order-list-item';

import './index.css';

const BasicButton = () => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, PluginName);
  return (
    <BaseButton
      onMouseDown={() => {
        Transforms.unwrapNodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            [PluginName, listItem].includes(n.type || ''),
          split: true,
        });
        let newProperties: Partial<SlateElement>;
        newProperties = {
          type: isActive ? paragraphType : listItem,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties);

        if (!isActive) {
          const block = { type: PluginName, children: [] };
          Transforms.wrapNodes(editor, block);
        }
      }}
      selected={isActive}
      icon={<OrderedList />}
    />
  );
};

export const OrderListPluginFactory: PluginFactory = ({ editor }) => {
  return {
    name: 'order-list',
    type: PluginType.Element,
    match(props) {
      return (
        props.element.type === PluginName || props.element.type === listItem
      );
    },
    renderElement(props, context) {
      if (props.element.type === PluginName) {
        return <ol className={PluginName}>{props.children}</ol>;
      } else if (props.element.type === listItem) {
        return <li className={listItem}>{props.children}</li>;
      }
      return undefined;
    },
    widget: {
      toolbarWidget: <BasicButton />,
    },
  };
};
