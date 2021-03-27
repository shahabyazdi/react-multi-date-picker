import React, { useState } from "react"
import { Calendar, DateObject } from "../../../build/index"
import Settings from "../../../plugins/settings"
import DatePickerHeader from "../../../plugins/date_picker_header"
import MultiColors from "../../../plugins/multi_colors"
import DatePanel from "../../../plugins/date_panel"
import Toolbar from "../../../plugins/toolbar"

export default function (translate, language, otherProps) {
  const dateObject = new DateObject({ calendar: language === "en" ? "gregorian" : "persian" })

  const toDateObject = day => new DateObject(dateObject).setDay(day)

  const colors = {
    green: [2, 10, 17].map(toDateObject),
    blue: [5, 6, 14].map(toDateObject),
    red: [13, 19, 25].map(toDateObject),
    yellow: [15, 22, 28].map(toDateObject)
  }

  Object.keys(colors).forEach(color => {
    colors[color].forEach((date, index) => {
      colors[color][index].color = color
    })
  })

  const [props, setProps] = useState({
    value: [
      ...colors.green,
      ...colors.blue,
      ...colors.red,
      ...colors.yellow
    ], multiple: true,
    ...otherProps
  })

  const isRTL = ["fa", "ar"].includes(props.locale)

  const all = {
    jsx: <div style={{ display: "flex", justifyContent: "center" }}>
      <Calendar
        {...props}
        plugins={[
          <DatePickerHeader position="top" size="medium" />,
          <DatePanel
            position={isRTL ? "left" : "right"}
            sort="date"
            eachDaysInRange
          />,
          <MultiColors
            position={isRTL ? "right" : "left"}
            setProps={setProps}
          />,
          <Settings position="bottom" setProps={setProps} defaultActive="locale" />,
          <Toolbar position="bottom" />
        ]}
      />
    </div>
  }

  const plugins = {
    title: "Plugins",
    description: "plugins",
    code: `import React, { useState } from "react"
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import MultiColors from "react-multi-date-picker/plugins/multi_colors"
import Settings from "react-multi-date-picker/plugins/settings"
import Toolbar from "react-multi-date-picker/plugins/toolbar"

const dateObject = new DateObject()

const toDateObject = day => new DateObject(dateObject).setDay(day)

const colors = {
  green: [2, 10, 17].map(toDateObject),
  blue: [5, 6, 14].map(toDateObject),
  red: [13, 19, 25].map(toDateObject),
  yellow: [15, 22, 28].map(toDateObject)
}

Object.keys(colors).forEach(color => {
  colors[color].forEach((date, index) => {
      colors[color][index].color = color
  })
})

const initialProps {
  value: [
    ...colors.green,
    ...colors.blue,
    ...colors.red,
    ...colors.yellow
  ], 
  multiple: true
})

export default function DatePickerPlugins() {
  const [props, setProps] = useState(initialProps)
  const isRTL = ["fa", "ar"].includes(props.locale)

  return (
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "center" 
      }}
    >
      <Calendar
        {...props}
        plugins={[
          <DatePickerHeader 
            position="top" 
            size="medium" 
          />,
          <DatePanel
            position={isRTL ? "left" : "right"}
            sort="date"
            eachDaysInRange
          />
          <MultiColors
            position={isRTL ? "right" : "left"}
            setProps={setProps}
          />,
          <Settings 
            position="bottom" 
            setProps={setProps} 
            defaultActive="locale" 
          />,
          <Toolbar 
            position="bottom" 
          />
        ]}
      />
    </div>
  )
}`
  }

  return [
    all,
    plugins
  ]
}