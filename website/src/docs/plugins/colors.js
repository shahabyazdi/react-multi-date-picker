import React, { useState } from "react"
import DatePicker, { DateObject } from "../../../../build/index"
import MultiColors from "../../../../plugins/multi_colors"
import DatePanel from "../../../../plugins/date_panel"

export default function (translate, language, otherProps) {
  const [props2, setProps2] = useState({ multiple: true, ...otherProps })

  const yesterday = new DateObject().subtract(1, "day")
  const today = new DateObject()
  const tomorrow = new DateObject().add(1, "day")

  yesterday.color = "red"
  today.color = "blue"
  tomorrow.color = "red"

  const initialProps3 = { multiple: true, value: [yesterday, today, tomorrow], ...otherProps }
  const [props3, setProps3] = useState(initialProps3)

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
          <td>colors</td>
          <td>Array</td>
          <td>["blue", "red", "green", "yellow"]</td>
        </tr>
        <tr>
          <td>defaultColor</td>
          <td>String</td>
          <td>first item of colors</td>
        </tr>
        <tr>
          <td>setProps</td>
          <td>Function</td>
          <td>undefined</td>
        </tr>
      </tbody>
    </table>
  }
  const defaultColor = {
    title: "Default Color",
    code: `import DatePicker from "react-multi-date-picker"
import MultiColors from "react-multi-date-picker/plugins/multi_colors"
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
    <MultiColors 
      position="bottom" 
      defaultColor="green"
      setProps={setProps} 
    />
  ]}
/>`,
    jsx: <DatePicker
      {...props2}
      plugins={[
        <MultiColors
          position="bottom"
          defaultColor="green"
          setProps={setProps2}
        />
      ]}
    />
  }

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
        
const initialProps = { 
  multiple: true, 
  value: [yesterday, today, tomorrow] 
}

const [props, setProps] = useState(initialProps) 
.
.
.
<DatePicker
  {...props}
  plugins={[
    <MultiColors
      position="bottom"
      colors={["blue", "red"]}
      setProps={setProps}
    />,
    <DatePanel sort="color" />
  ]}
/>`,
    jsx: <DatePicker
      {...props3}
      plugins={[
        <MultiColors
          position="bottom"
          colors={["blue", "red"]}
          setProps={setProps3}
        />,
        <DatePanel sort="color" />
      ]}
    />
  }

  return [
    props,
    defaultColor,
    panel
  ]
}