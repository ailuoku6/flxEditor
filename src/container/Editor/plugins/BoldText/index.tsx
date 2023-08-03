import React from "react";

import { IFlxEditorPlugin } from "../../editorHelper";

import { MarkButton } from "../../components/ToolbarBtn";

const PluginName = "bold";

export const BoldTextPlugin: IFlxEditorPlugin = {
  name: PluginName,
  isElement: false,
  isLeaf: true,
  renderLeaf: (props) => {
    const { leaf } = props;
    if ((leaf as any)[PluginName]) {
      return <strong {...props.attributes}>{props.children}</strong>;
    }
  },
  widget: {
    toolBarWidget: (
      <MarkButton key={PluginName} format={PluginName} icon="bold" />
    ),
  },
};
