import React, { useMemo } from 'react';

import { PluginFactory, PluginType } from '../../types';
import {
  Text,
  H,
  H1 as H1Icon,
  H2 as H2Icon,
  H3 as H3Icon,
} from '@icon-park/react';
import { useSlate } from 'slate-react';
import { getCurrentElement } from '../../utils';
import { BaseButton } from '../../common';
import { Transforms } from 'slate';
import { Trigger } from '@arco-design/web-react';

import { paragraphType } from '../constants';

import './index.css';

const PluginName = 'head';

const H1 = 'h1';
const H2 = 'h2';
const H3 = 'h3';

const emptyHead = { value: PluginName, icon: <H /> };

const heads = [
  { value: H1, icon: <H1Icon /> },
  { value: H2, icon: <H2Icon /> },
  { value: H3, icon: <H3Icon /> },
];

const HeadTypeSet = new Set(heads.map((item) => item.value));

const HeadButton = () => {
  const editor = useSlate();

  const [currentElement, path] = getCurrentElement(editor);

  const headType = currentElement?.type;

  const head = heads.find((item) => item.value === headType) || emptyHead;

  const popContent = useMemo(() => {
    return (
      <div className="head-pop-content">
        <BaseButton
          selected={paragraphType === headType}
          icon={<Text />}
          onMouseDown={() => {
            if (currentElement && path) {
              Transforms.setNodes(
                editor,
                { type: paragraphType },
                { at: path },
              );
            }
          }}
        />
        {heads.map((item) => {
          return (
            <BaseButton
              selected={item.value === headType}
              icon={item.icon}
              onMouseDown={() => {
                if (currentElement && path) {
                  Transforms.setNodes(
                    editor,
                    { type: item.value },
                    { at: path },
                  );
                }
              }}
            />
          );
        })}
      </div>
    );
  }, [heads, headType, currentElement, path]);

  return (
    <Trigger position="bottom" popup={() => popContent}>
      <div>
        <BaseButton icon={head.icon} />
      </div>
    </Trigger>
  );
};

export const HeadPluginFactory: PluginFactory = (editor) => {
  return {
    name: PluginName,
    type: PluginType.ElementWrap,
    match: (props) => {
      return !!props.element.type && HeadTypeSet.has(props.element.type);
    },
    renderElement: (props, context) => {
      const type = props.element.type;
      if (type === H1) {
        return <h1 {...props.attributes}>{props.children}</h1>;
      }
      if (type === H2) {
        return <h2 {...props.attributes}>{props.children}</h2>;
      }
      if (type === H3) {
        return <h3 {...props.attributes}>{props.children}</h3>;
      }
    },
    widget: {
      toolbarWidget: <HeadButton />,
      popupWidget: <HeadButton />,
    },
  };
};
