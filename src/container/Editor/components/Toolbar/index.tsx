import React from "react";
import "./index.scss";

const Toolbar: React.FC<any> = ({ children }) => {
  return <div className="flx-toolbar">{children}</div>;
};

export default Toolbar;
