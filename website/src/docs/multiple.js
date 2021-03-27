import React, { useState } from "react"
import DatePicker, { DateObject } from "../../../build/index"
import DatePanel from "../../../plugins/date_panel"

export default function (translate, language, otherProps) {
  const [values, setValues] = useState([
    new DateObject({ calendar: language === "fa" ? "persian" : "gregorian" }),
    new DateObject({ calendar: language === "fa" ? "persian" : "gregorian" }).add(1, "day")
  ])

  const [dates, setDates] = useState(language === "en" ? [
    new Date(),
    new DateObject({ year: 2020, month: 9, day: 8 }),
    "December 09 2020",
    1597994736000
  ] :
    [
      new DateObject({ calendar: "persian", date: new Date() }),
      new DateObject({ calendar: "persian", year: 1399, month: 9, day: 8 }),
      new DateObject({ calendar: "persian", date: "13 Shahrivar 1399", format: "DD MMMM YYYY" }),
      new DateObject({ calendar: "persian", date: 1597994736000 })
    ]
  )

  const multiple = {
    title: "Multiple Mode",
    description: "multiple_mode",
    code: `${language === "en" ? `const today = new Date()
const tomorrow = new Date()

tomorrow.setDate(tomorrow.getDate() + 1)

const [values, setValues] = useState([today, tomorrow])`: `const [values, setValues] = useState([
  new DateObject({ calendar: "persian" }) //امروز,
  new DateObject({ calendar: "persian" }).add(1, "day") //فردا
])`}
.
.
.
<DatePicker 
  multiple
  value={values} 
  onChange={setValues}
/>`,
    jsx: <DatePicker
      value={values}
      onChange={setValues}
      {...otherProps}
    />
  }


  const datePanel = {
    title: "DatePanel",
    description: "date_panel_description",
    code: `import DatePanel from "react-multi-date-picker/plugins/date_panel"
.
.
.
<DatePicker
  multiple
  plugins={[
   <DatePanel${language === "fa" ? ` position="left"` : ""} />
  ]}
/>`,
    jsx: <DatePicker
      multiple
      plugins={[
        <DatePanel position={language === "fa" ? "left" : "right"} />
      ]}
      {...otherProps}
    />
  }

  const sort = {
    title: "Sorting Dates",
    description: "multiple_sort_example",
    code: `import DatePanel from "react-multi-date-picker/plugins/date_panel"

const [dates, setDates] = useState([
  ${language === "en" ? `new Date(),
  new DateObject({ year: 2020, month: 9, day: 8 }),
  "December 09 2020",
  1597994736000 //${translate("multiple_sort_comment")}` : `new DateObject({ calendar: "persian", date: new Date() }),
  new DateObject({ calendar: "persian", year: 1399, month: 9, day: 8 }),
  new DateObject({ calendar: "persian", date: "13 Shahrivar 1399", format: "DD MMMM YYYY" }),
  new DateObject({ calendar: "persian", date: 1597994736000 }) //${translate("multiple_sort_comment")}`}
])
.
.
.
<DatePicker
  value={dates}
  onChange={setDates}
  format="MMMM DD YYYY"
  sort
  plugins={[
    <DatePanel${language === "fa" ? ` position="left"` : ""} />
  ]}
/>`,
    jsx: <DatePicker
      value={dates}
      onChange={setDates}
      format={language === "en" ? "MMMM DD YYYY" : "DD MMMM YYYY"}
      sort
      plugins={[
        <DatePanel position={language === "fa" ? "left" : "right"} />
      ]}
      {...otherProps}
    />
  }

  return [
    multiple,
    datePanel,
    sort
  ]
}