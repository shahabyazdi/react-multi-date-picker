import React from "react";
import DatePicker from "../../../build/index";

export default function Doc({ otherProps, localeImport }) {
  const description = {
    title: "Descriptions",
    description: "arrow_description",
  };

  const disable = {
    title: "Disable Arrow",
    description: "disable_arrow",
    code: `${localeImport}<DatePicker
  arrow={false}
/>`,
    jsx: <DatePicker arrow={false} {...otherProps} />,
  };

  const custom = {
    title: "Custom Arrow",
    description: "custom_arrow",
    code: `${localeImport}<DatePicker
  arrow={<div style={{ backgroundColor: "white" }}>arrow</div>}
/>`,
    jsx: (
      <DatePicker
        arrow={
          <div style={{ backgroundColor: "white", padding: "3px" }}>arrow</div>
        }
        {...otherProps}
      />
    ),
  };

  return [description, disable, custom];
}
