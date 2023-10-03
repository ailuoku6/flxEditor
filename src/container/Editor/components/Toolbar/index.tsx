import React from "react";

import { Dropdown } from "antd";

import "./index.scss";

const Toolbar: React.FC<{
  blockWidgets?: { widget: JSX.Element }[];
  children: React.ReactNode;
}> = ({ children, blockWidgets }) => {
  const items = blockWidgets?.map((item, index) => ({
    label: item.widget,
    key: index,
  }));

  return (
    <div className="flx-toolbar">
      <Dropdown menu={{ items }}></Dropdown>
      {children}
    </div>
  );
};

export default Toolbar;
