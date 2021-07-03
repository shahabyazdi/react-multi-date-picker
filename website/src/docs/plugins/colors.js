import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../../build/index";
import MultiColors from "../../../../plugins/multi_colors";
import DatePanel from "../../../../plugins/date_panel";

export default function Doc({ translate, language, otherProps }) {
  const [props2, setProps2] = useState({ multiple: true, ...otherProps });

  const yesterday = new DateObject().subtract(1, "day");
  const today = new DateObject();
  const tomorrow = new DateObject().add(1, "day");

  yesterday.color = "red";
  today.color = "blue";
  tomorrow.color = "red";

  const initialProps3 = {
    multiple: true,
    value: [yesterday, today, tomorrow],
    ...otherProps,
  };
  const [props3, setProps3] = useState(initialProps3);

  const props = {
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
            <td>"right"</td>
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
    code: `import DatePicker from "react-multi-date-picker"
import MultiColors from "react-multi-date-picker/plugins/multi_colors"
.
.
. 
const [props, setProps] = useState(${
      language === "en"
        ? "{ multiple: true }"
        : `{
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right"
}`
    })
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <MultiColors 
      position="bottom" 
      defaultColor="green"
    />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...props2}
        onPropsChange={setProps2}
        plugins={[<MultiColors position="bottom" defaultColor="green" />]}
      />
    ),
  };

  const panel = {
    title: "With DatePanel",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import MultiColors from "react-multi-date-picker/plugins/multi_colors"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
.
.
.
const yesterday = new DateObject().subtract(1, "day")
const today = new DateObject()
const tomorrow = new DateObject().add(1, "day")
        
yesterday.color = "red"
today.color = "blue"
tomorrow.color = "red"
        
const initialProps = ${
      language === "en"
        ? `{ 
  multiple: true, 
  value: [yesterday, today, tomorrow] 
}`
        : `{ 
  multiple: true, 
  value: [yesterday, today, tomorrow],
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right" 
}`
    }

const [props, setProps] = useState(initialProps) 
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <MultiColors
      position="bottom"
      colors={["blue", "red"]}
    />,
    <DatePanel sort="color" />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...props3}
        onPropsChange={setProps3}
        plugins={[
          <MultiColors position="bottom" colors={["blue", "red"]} />,
          <DatePanel sort="color" />,
        ]}
      />
    ),
  };

  return [props, defaultColor, panel];
}
