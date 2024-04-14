import {
  IFlxEditorPlugin,
  PluginType,
  useSlate,
  Transforms,
  PluginFactory,
  LeafPlaceholder,
  getLeafNodeAncestors,
  Editor,
  Node as SlateNode,
  getLeafNode,
  EventReturns,
} from 'flx-editor-base';
import { BaseButton } from 'flx-editor-base';
import { ActivitySource } from '@icon-park/react';
import { Tooltip } from '@arco-design/web-react';
import React from 'react';
import './index.css';
const PluginName = 'resume-basic';

const BasicName = 'resume-basic-name';
const BasicGender = 'resume-basic-gender';
const BasicAddress = 'resume-basic-address';
const BasicPhone = 'resume-basic-phone';
const BasicEmail = 'resume-basic-email';

const unEnterFields = new Set([
  BasicName,
  BasicGender,
  BasicAddress,
  BasicPhone,
  BasicEmail,
]);

const totalBasic = [
  BasicName,
  BasicGender,
  BasicAddress,
  BasicPhone,
  BasicEmail,
];

const BasicButton = () => {
  const editor = useSlate();
  return (
    <BaseButton
      onMouseDown={() => {
        Transforms.insertNodes(editor, {
          type: PluginName,
          children: totalBasic.map((field) => {
            return { type: field, children: [{ text: '', leafType: field }] };
          }),
        });
      }}
      icon={
        <Tooltip content="基本信息">
          <ActivitySource />
        </Tooltip>
      }
    />
  );
};

const leafPlaceholder = (leafType: string) => {
  const map: Record<string, string> = {
    [BasicName]: '姓名',
    [BasicGender]: '性别',
    [BasicAddress]: '地址',
    [BasicPhone]: '电话',
    [BasicEmail]: '邮箱',
  };

  return map[leafType] || 'enter some text...';
};

export const ResumeBasicPluginFactory: PluginFactory = ({ editor }) => {
  return {
    name: PluginName,
    type: PluginType.Element,

    match: (props) => {
      return (
        props.element.type === PluginName ||
        totalBasic.some((name) => props.element.type === name)
      );
    },

    renderElement: (props, context) => {
      context.classNames.push(props.element.type || '');
      return props.children;
    },

    matchLeaf: (props) => {
      const { leaf } = props;
      return totalBasic.some((name) => leaf.leafType === name);
    },

    renderLeaf: (props) => {
      if (props.leaf.text === '') {
        return (
          <>
            <LeafPlaceholder
              placeholder={leafPlaceholder(props.leaf.leafType || '')}
            />
            {props.children}
          </>
        );
      }

      return props.children;
    },

    widget: {
      toolbarWidget: <BasicButton />,
    },
    onKeyDown(e) {
      if (e.key === 'Enter') {
        const nodes = getLeafNodeAncestors(editor);
        const selected = nodes?.some((nodeInfo) => {
          const node = nodeInfo[0] as any;
          return unEnterFields.has(node?.type || node?.leafType);
        });

        if (selected) {
          return EventReturns.Stop;
        }
      }

      return EventReturns.Continue;
    },
  };
};
