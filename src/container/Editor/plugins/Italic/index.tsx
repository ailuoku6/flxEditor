import React from "react";

import { IFlxEditorPlugin } from "../../editorHelper";

import { MarkButton } from "../../components/ToolbarBtn";

const PluginName = "italic";

export const ItalicPlugin: IFlxEditorPlugin = {
  name: PluginName,
  isElement: false,
  isLeaf: true,
  renderLeaf: (props) => {
    const { leaf } = props;
    if ((leaf as any)[PluginName]) {
      return <em {...props.attributes}>{props.children}</em>;
    }
  },
  widget: {
    toolBarWidget: (
      <MarkButton key={PluginName} format={PluginName} icon="italic" />
    ),
  },
};
