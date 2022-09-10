import React from "react";
import { useState } from "react";
import DatePicker from "../../../build/index";

export default function Doc({ otherProps, localeImport }) {
  const [value, setValue] = useState();

  const prime = {
    title: "Prime",
    code: `${localeImport}import "react-multi-date-picker/styles/layouts/prime.css"
.
.
.
<DatePicker
  className="rmdp-prime"
  showOtherDays
/>`,
    jsx: <DatePicker className="rmdp-prime" showOtherDays {...otherProps} />,
  };

  const mobile = {
    title: "Mobile",
    code: `${localeImport}import "react-multi-date-picker/styles/layouts/mobile.css"
.
.
.
<DatePicker
  className="rmdp-mobile"
/>`,
    jsx: <DatePicker className="rmdp-mobile" {...otherProps} />,
  };

  const mobileButtons = {
    title: "Changing The Text Of The Action Buttons In Mobile Mode",
    code: `${localeImport}import "react-multi-date-picker/styles/layouts/mobile.css"
.
.
.
<DatePicker
  className="rmdp-mobile"
  mobileLabels={{
    OK: "Accept",
    CANCEL: "Close",
  }}
/>`,
    jsx: (
      <DatePicker
        className="rmdp-mobile"
        mobileLabels={{
          OK: "Accept",
          CANCEL: "Close",
        }}
        {...otherProps}
      />
    ),
  };

  const customMobileButtons = {
    title: "Custom Mobile Buttons",
    code: `${localeImport}import "react-multi-date-picker/styles/layouts/mobile.css"
.
.
.

const [value, setValue] = useState();

return (
  <DatePicker
    className="rmdp-mobile"
    value={value}
    onChange={setValue}
    mobileButtons={[
      {
        label: "RESET",
        type: "button",
        className: "rmdp-button rmdp-action-button",
        onClick: () => setValue({}),
      },
    ]}
  />
)`,
    jsx: (
      <DatePicker
        className="rmdp-mobile"
        value={value}
        onChange={setValue}
        mobileButtons={[
          {
            label: "RESET",
            type: "button",
            className: "rmdp-button rmdp-action-button",
            onClick: () => setValue({}),
          },
        ]}
        {...otherProps}
      />
    ),
  };

  return [prime, mobile, mobileButtons, customMobileButtons];
}
