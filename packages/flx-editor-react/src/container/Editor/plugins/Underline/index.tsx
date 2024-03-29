import React from "react";

import { IFlxEditorPlugin } from "../../editorHelper";

import { MarkButton } from "../../components/ToolbarBtn";

const PluginName = "underline";

export const UnderlinePlugin: IFlxEditorPlugin = {
  name: PluginName,
  isElement: false,
  isLeaf: true,
  renderLeaf: (props) => {
    const { leaf } = props;
    if ((leaf as any)[PluginName]) {
      return <u {...props.attributes}>{props.children}</u>;
    }
  },
  widget: {
    toolBarWidget: (
      <MarkButton key={PluginName} format={PluginName} icon="underline" />
    ),
  },
};
