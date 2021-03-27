import React, { useState } from "react"
import DatePicker, { DateObject } from "../../../../build/index"
import DatePanel from "../../../../plugins/date_panel"

export default function (translate, language, otherProps) {
  const [value, setValue] = useState([
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }),
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }).add(2, "days"),
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }).add(10, "days")
  ])

  const [value1, setValue1] = useState([new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }), new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }).add(1, "day")])
  const [value2, setValue2] = useState([new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }), new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }).add(1, "day")])
  const [value3, setValue3] = useState([5, 10, 15, 20, 25, 30].map(day => new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }).setDay(day)))

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
          <td>sort</td>
          <td>String</td>
          <td>""</td>
        </tr>
        <tr>
          <td>eachDaysInRange</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>onDateClicked</td>
          <td>Function</td>
          <td>undefined</td>
        </tr>
        <tr>
          <td>removeButton</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
      </tbody>
    </table>
  }

  const sort = {
    title: "Sort",
    jsx: <ul>
      <li>date</li>
      <li>color</li>
    </ul>
  }

  const sortByDate = {
    title: "Sort By Date",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
.
.
.
const [value, setValue] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}),
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}).add(2, "days"),
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}).add(10, "days")
])
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  multiple
  plugins={[
    <DatePanel sort="date" ${language === "en" ? "" : `position="left" `}/>
  ]}
/>`,
    jsx: <DatePicker
      value={value}
      onChange={setValue}
      multiple
      plugins={[
        <DatePanel sort="date" position={language === "en" ? "right" : "left"} />
      ]}
      {...otherProps}
    />

  }

  const bottom = {
    title: "Position " + (language === "en" ? "Left" : "Right"),
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
.
.
.
const [value, setValue] = useState(
  [
    5, 
    10,
    15,
    20,
    25,
    30
  ].map(day => new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}).setDay(day))
)
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  multiple
  plugins={[
    <DatePanel position="${language === "en" ? "left" : "right"}" />
  ]}
/>`,
    jsx: <DatePicker
      value={value3}
      onChange={setValue3}
      multiple
      plugins={[
        <DatePanel position={language === "en" ? "left" : "right"} />
      ]}
      {...otherProps}
    />
  }

  const withoutButton = {
    title: "Without Remove Button",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
.
.
.
const [value, setValue] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}), 
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}).add(1, "day")
])
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <DatePanel
      removeButton={false}
    ${language === "en" ? "/>" : `  position="left" 
    />`}
  ]}
/>`,
    jsx: <DatePicker
      value={value1}
      onChange={setValue1}
      plugins={[
        <DatePanel
          removeButton={false}
          position={language === "en" ? "right" : "left"}
        />
      ]}
      {...otherProps}
    />

  }

  const clickListener = {
    title: "Date Click Listener",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
.
.
.
const [value, setValue] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}), 
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}).add(1, "day")
])
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <DatePanel
      removeButton={false}
      onDateClicked={dateObject => {
        let mustDelete = window.confirm("${translate("are you sure you want to delete this date ?")}")
      
        if (mustDelete) setValue(
          value.filter(date => date !== dateObject)
        )
      }}
    ${language === "en" ? "/>" : `  position="left" 
    />`}
  ]}
/>`,
    jsx: <DatePicker
      value={value2}
      onChange={setValue2}
      plugins={[
        <DatePanel
          removeButton={false}
          onDateClicked={dateObject => {
            let mustDelete = window.confirm(translate("are you sure you want to delete this date ?"))

            if (mustDelete) {
              setValue2(value2.filter(date => date !== dateObject))
            }
          }}
          position={language === "en" ? "right" : "left"}
        />
      ]}
      {...otherProps}
    />

  }

  return [
    props,
    sort,
    sortByDate,
    bottom,
    withoutButton,
    clickListener
  ]
}