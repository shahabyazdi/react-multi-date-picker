import React, { useState } from "react"
import DatePicker from "../../../../build/index"
import Settings from "../../../../plugins/settings"
import DatePanel from "../../../../plugins/date_panel"

export default function (translate, language, otherProps) {
  const [settings1, setSettings1] = useState({ ...otherProps })
  const [settings2, setSettings2] = useState({ multiple: true, ...otherProps })
  const [settings3, setSettings3] = useState({ value: new Date(), format: "MM-DD-YYYY HH:mm:ss", timePicker: true, ...otherProps })

  const props = {
    title: "Props",
    description: <table>
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
          <td>["time picker", "only time picker", "only month picker", "only year picker"]</td>
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
        <tr>
          <td>setProps</td>
          <td>Function</td>
          <td>undefined</td>
        </tr>
      </tbody>
    </table>
  }

  const bottom = {
    title: "Settings Bottom",
    description: <div>
    </div>,
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
  plugins={[
    <Settings
      position="bottom"
      defaultActive="mode"
      setProps={setProps}
    />,
    <DatePanel 
      disabled={!props.multiple && !props.range} 
      position={["fa", "ar"].includes(props.locale) ? "left" : "right"}
    />
  ]}
/>`,
    jsx: <DatePicker
      {...settings1}
      plugins={[
        <Settings
          position="bottom"
          defaultActive="mode"
          setProps={setSettings1}
        />,
        <DatePanel
          disabled={!settings1.multiple && !settings1.range}
          position={["fa", "ar"].includes(settings1.locale) ? "left" : "right"}
        />
      ]}
    />
  }

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
  plugins={[
    <Settings
      position="left"
      calendars={["gregorian", "persian"]}
      locales={["en", "fa"]}
      modes={["multiple", "range"]}
      disabledList={["other"]}
      setProps={setProps}
    />
  ]}
/>`,
    jsx: <DatePicker
      {...settings2}
      plugins={[
        <Settings
          position="left"
          calendars={["gregorian", "persian"]}
          locales={["en", "fa"]}
          modes={["multiple", "range"]}
          disabledList={["others"]}
          setProps={setSettings2}
        />
      ]}
    />
  }

  const timePicker = {
    title: "Time Picker",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
.
.
.
const initialProps = { 
  value: new Date(), 
  format: "MM-DD-YYYY HH:mm:ss", 
  timePicker: true 
}

const [props, setProps] = useState(initialProps)
.
.
.
<DatePicker
  {...props}
  plugins={[
    <Settings
      position="bottom"
      disabledList={["calendar", "locale", "mode"]}
      others={["time picker", "only time picker"]}
      defaultActive="others"
      defaultFormat={{
        single: "MMM DD YYYY",
        timePicker: "MM-DD-YYYY HH:mm:ss",
        onlyTimePicker: "hh, mm, ss, a"
      }}
      setProps={setProps}
    />
  ]}
/>`,
    jsx: <DatePicker
      {...settings3}
      plugins={[
        <Settings
          position="bottom"
          disabledList={["calendar", "locale", "mode"]}
          others={["time picker", "only time picker"]}
          defaultActive="others"
          defaultFormat={{
            single: "MMM DD YYYY",
            timePicker: "MM-DD-YYYY HH:mm:ss",
            onlyTimePicker: "hh, mm, ss, a"
          }}
          setProps={setSettings3}
        />
      ]}
    />
  }

  return [
    props,
    bottom,
    custom,
    timePicker
  ]
}