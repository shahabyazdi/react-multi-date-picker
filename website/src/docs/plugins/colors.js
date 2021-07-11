import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../../build/index";
import multiColors from "../../../../plugins/multi_colors";
import DatePanel from "../../../../plugins/date_panel";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const [props, setProps] = useState({
    multiple: true,
    plugins: [multiColors({ defaultColor: "green" })],
    ...otherProps,
  });

  const yesterday = new DateObject(otherProps).subtract(1, "day");
  const today = new DateObject(otherProps);
  const tomorrow = new DateObject(otherProps).add(1, "day");

  yesterday.color = "red";
  today.color = "blue";
  tomorrow.color = "red";

  const [props2, setProps2] = useState({
    multiple: true,
    value: [yesterday, today, tomorrow],
    plugins: [
      multiColors({ colors: ["blue", "red"] }),
      <DatePanel sort="color" />,
    ],
    ...otherProps,
  });

  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const allProps = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>"bottom"</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>colors</td>
            <td>Array</td>
            <td>["blue", "red", "green", "yellow"]</td>
          </tr>
          <tr>
            <td>defaultColor</td>
            <td>String</td>
            <td>first item of colors</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const defaultColor = {
    title: "Default Color",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import multiColors from "react-multi-date-picker/plugins/multi_colors"
${$import}const [props, setProps] = useState({
  multiple: true,
  plugins: [multiColors({ defaultColor: "green" })],
${
  language === "en"
    ? "});"
    : `  calendar: persian,
  locale: persian_fa,
  calendarPosition: "bottom-right"
});`
}
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
/> `,
    jsx: <DatePicker {...props} onPropsChange={setProps} />,
  };

  const panel = {
    title: "With DatePanel",
    code: `import React, { useState } from "react"
import DatePicker, { DateObject } from "react-multi-date-picker"
import multiColors from "react-multi-date-picker/plugins/multi_colors"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
${$import}const yesterday = new DateObject(${
      language === "en" ? "" : `{ calendar: persian }`
    }).subtract(1, "day");
const today = new DateObject(${
      language === "en" ? "" : `{ calendar: persian }`
    });
const tomorrow = new DateObject(${
      language === "en" ? "" : `{ calendar: persian }`
    }).add(1, "day");

yesterday.color = "red";
today.color = "blue";
tomorrow.color = "red";

const [props, setProps] = useState({
  multiple: true,
  value: [yesterday, today, tomorrow],
  plugins: [
    multiColors({ colors: ["blue", "red"] }),
    <DatePanel sort="color" />,
  ],
${
  language === "en"
    ? "});"
    : `  calendar: persian,
  locale: persian_fa,
  calendarPosition: "bottom-right"
});`
}
.
.
.
<DatePicker 
  {...props} 
  onPropsChange={setProps} 
/> `,
    jsx: <DatePicker {...props2} onPropsChange={setProps2} />,
  };

  return [allProps, defaultColor, panel];
}
