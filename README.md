# 基于 Slate 的插件化富文本编辑器（建设中）

## 简介

这个项目是一个基于 Slate 框架的编辑器，它支持插件化能力，提供了一种方便的方式来扩展编辑器的功能。通过定义一些接口和类型，我们可以创建自定义的插件，这些插件可以提供一些特定的功能，比如处理特定的键盘输入事件，或者渲染特定类型的元素等。

## 插件类型

我们定义了以下几种类型的插件：

- `Element`：用于渲染特定类型的元素。
- `Leaf`：用于渲染特定类型的文本节点。
- `ElementWrap`：用于在元素的外层添加包装。

## 插件接口

`IFlxEditorPlugin` 是插件的核心接口，它继承自 `IBasePlugin` 和 `EditorEvents`，并添加了一些额外的方法和属性：

- `name`：插件的名称。
- `type`：插件的类型。
- `isVoid`：是否是空的元素。
- `priority`：插件的优先级，数值越高，越优先处理。
- `decorate`：用于装饰节点的方法。
- `match`：这是一个函数，接收一个 `RenderElementProps` 对象作为参数，返回一个布尔值。如果返回 `true`，则该插件将用于渲染这个元素。
- `matchLeaf`：这是一个函数，接收一个 `RenderLeafProps` 对象作为参数，返回一个布尔值。如果返回 `true`，则该插件将用于渲染这个叶节点。
- `renderElement`：这是一个函数，接收一个 `RenderElementProps` 对象和一个 `IRenderElementContext` 对象作为参数，返回一个 `JSX.Element` 或 `undefined`。这个函数用于自定义元素的渲染逻辑。
- `renderLeaf`：这是一个函数，接收一个 `RenderLeafProps` 对象和一个 `IRenderLeafContext` 对象作为参数，返回一个 `JSX.Element` 或 `undefined`。这个函数用于自定义叶节点的渲染逻辑。
- `widget`：这是一个对象，包含以下属性：
  - `toolbarWidget`：这是一个 `JSX.Element`，在这里注册的插件将在顶部工具栏展示。
  - `popupWidget`：这是一个 `JSX.Element`，在这里注册的插件将在选择文本后的悬浮菜单中展示。
  - `category`：这是一个对象，包含 `label` 和 `value` 属性，用于分类插件。

下面是一个使用 `IFlxEditorPlugin` 的例子：

```javascript
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

```

这个例子中的 `QuoteFactory` 插件将会渲染类型为 'quote' 的元素，并且在工具栏上显示一个按钮，在点击该按钮后会显示一个设置窗口。

除此之外，插件还定义了一些事件处理方法，比如 `onKeyDown`、`onCopy` 和 `onPaste`。如果事件处理方法返回 `EventReturns.Stop`，则不再继续传递给下一个插件。

## 插件工厂

我们还提供了一个 `PluginFactory` 类型，这是一个函数，接受一个包含 `editor` 的参数，返回一个插件实例。这样，我们可以根据不同的编辑器实例来创建插件。

## 如何使用

然后，你可以上述实现的插件添加到编辑器中，当然，flx编辑器也内置了其他的丰富的富文本插件：

```javascript
import { initFlxEditor, QuoteFactory, Editable, EditorToolbar, FloatMenu } from 'flx-editor-base';

const pluginFactorys: PluginFactory<any>[] = [
  QuoteFactory
];

export default function FlxEditor() {
    const [editor, editorHelper] = useMemo(() => {
        return initFlxEditor(pluginFactorys);
    }, []);

    return (
        <div>
            <Slate editor={editor} initialValue={localData} onChange={handleChange}>
                <div className="editor-toolbar-wrap">
                    <EditorToolbar
                        plugins={editorHelper.getPlugins()}
                        className="toolbar"
                    />
                    <div className={'flx-editor-wrap'}>
                        <FloatMenu editorHelper={editorHelper} />
                        <Editable
                            className="flx-editor"
                            renderElement={editorHelper.renderElement}
                            renderLeaf={editorHelper.renderLeaf}
                            onKeyDown={editorHelper.onKeyDown}
                            placeholder="Enter some rich text…"
                            spellCheck
                            autoFocus
                        />
                    </div>
                </div>
            </Slate>
        </div>
    )
}

```

现在，你的编辑器就拥有了 `QuoteFactory` 插件提供的功能。

## flx编辑器正在建设中

通过这个插件化框架，我们可以轻松地扩展 Slate 编辑器的功能，使其更加强大和灵活。希望你会喜欢这个项目，如果你有任何问题或建议，欢迎向我们提出。
