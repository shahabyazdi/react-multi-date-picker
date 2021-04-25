import React, { useState } from "react";
import DatePicker from "../../../../build/index";
import Settings from "../../../../plugins/settings";
import DatePanel from "../../../../plugins/date_panel";

export default function Setting(translate, language, otherProps) {
  const [settings1, setSettings1] = useState({ ...otherProps });
  const [settings2, setSettings2] = useState({ multiple: true, ...otherProps });
  const [settings3, setSettings3] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    ...otherProps,
  });

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
            <td>calendars</td>
            <td>Array</td>
            <td>["gregorian", "persian", "arabic", "indian"]</td>
          </tr>
          <tr>
            <td>locales</td>
            <td>Array</td>
            <td>["en", "fa", "ar", "hi"]</td>
          </tr>
          <tr>
            <td>modes</td>
            <td>Array</td>
            <td>["single", "multiple", "range"]</td>
          </tr>
          <tr>
            <td>others</td>
            <td>Array</td>
            <td>["only month picker", "only year picker"]</td>
          </tr>
          <tr>
            <td>defaultActive</td>
            <td>string</td>
            <td>""</td>
          </tr>
          <tr>
            <td>disabledList</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>defaultFormat</td>
            <td>Object</td>
            <td>{"{}"}</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const bottom = {
    title: "Settings Bottom",
    description: <div></div>,
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
.
.
.
const [props, setProps] = useState({})
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Settings
      position="bottom"
      defaultActive="mode"
    />,
    <DatePanel 
      disabled={!props.multiple && !props.range} 
      position={["fa", "ar"].includes(props.locale) ? "left" : "right"}
    />
  ]}
/>`,
    jsx: (
      <DatePicker
        {...settings1}
        onPropsChange={setSettings1}
        plugins={[
          <Settings position="bottom" defaultActive="mode" />,
          <DatePanel
            disabled={!settings1.multiple && !settings1.range}
            position={
              ["fa", "ar"].includes(settings1.locale) ? "left" : "right"
            }
          />,
        ]}
      />
    ),
  };

  const custom = {
    title: "Custom Settings",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
.
.
.
const [props, setProps] = useState({ multiple: true })
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Settings
      position="left"
      calendars={["gregorian", "persian"]}
      locales={["en", "fa"]}
      modes={["multiple", "range"]}
      disabledList={["other"]}
    />
  ]}
/>`,
    jsx: (
      <DatePicker
        {...settings2}
        onPropsChange={setSettings2}
        plugins={[
          <Settings
            position="left"
            calendars={["gregorian", "persian"]}
            locales={["en", "fa"]}
            modes={["multiple", "range"]}
            disabledList={["other"]}
          />,
        ]}
      />
    ),
  };

  const otherPickers = {
    title: "Other Pickers",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
.
.
.RefObject
const initialProps = { 
  value: new Date(), 
  format: "MM-DD-YYYY", 
}

const [props, setProps] = useState(initialProps)
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Settings
      position="bottom"
      disabledList={["calendar", "locale", "mode"]}
      defaultActive="others"
      defaultFormat={{
        single: "MMM-DD-YYYY",
        onlyMonthPicker: "MMMM YYYY",
        onlyYearPicker: "YYYY",
      }}
    />
  ]}
/>`,
    jsx: (
      <DatePicker
        {...settings3}
        onPropsChange={setSettings3}
        plugins={[
          <Settings
            position="bottom"
            disabledList={["calendar", "locale", "mode"]}
            defaultActive="others"
            defaultFormat={{
              single: "MMM-DD-YYYY",
              onlyMonthPicker: "MMMM YYYY",
              onlyYearPicker: "YYYY",
            }}
          />,
        ]}
      />
    ),
  };

  return [props, bottom, custom, otherPickers];
}
