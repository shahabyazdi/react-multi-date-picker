import React, { useState } from "react";
import DatePicker from "../../../../build/index";
import Toolbar from "../../../../plugins/toolbar";

export default function ToolbarComponent(trasnlate, language, otherProps) {
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  const props = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{trasnlate("Prop")}</th>
            <th>{trasnlate("Type")}</th>
            <th>{trasnlate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>className</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>sort</td>
            <td>Array</td>
            <td>["today", "deselect", "close"]</td>
          </tr>
          <tr>
            <td>names</td>
            <td>Object</td>
            <td>
              fa: {`{ today: "امروز", deselect: "لغو", close: "بستن" }`}
              <br />
              en: {`{ today: "TODAY", deselect: "DESELECT", close: "CLOSE" }`}
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const toolbar = {
    title: "Default Toolbar",
    code: `import React, { useState } from "react"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
.
.
.
const [value, setValue] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <Toolbar position="bottom" />
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value}
        onChange={setValue}
        plugins={[<Toolbar position="bottom" />]}
        {...otherProps}
      />
    ),
  };

  const sort = {
    title: "Sorting Buttons",
    code: `import React, { useState } from "react"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
.
.
.
const [value, setValue] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <Toolbar 
      position="bottom" 
      sort={["deselect", "close", "today"]} 
    />,
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value1}
        onChange={setValue1}
        plugins={[
          <Toolbar position="bottom" sort={["deselect", "close", "today"]} />,
        ]}
        {...otherProps}
      />
    ),
  };

  const lable = {
    title: "Custom Names",
    code: `import React, { useState } from "react"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
.
.
.
const [value, setValue] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <Toolbar
      position="bottom"
      names={{
        today: "${language === "en" ? "select today" : "گرفتن امروز"}"
        deselect: "${language === "en" ? "select none" : "حذف"}"
        close: "${language === "en" ? "close" : "بسته شدن"}"
      }}
    />,
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value2}
        onChange={setValue2}
        plugins={[
          <Toolbar
            position="bottom"
            names={{
              today: language === "en" ? "select today" : "گرفتن امروز",
              deselect: language === "en" ? "select none" : "حذف",
              close: language === "en" ? "close" : "بسته شدن",
            }}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  return [props, toolbar, sort, lable];
}
