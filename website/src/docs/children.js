import React, { useState } from "react"
import DatePicker, { Calendar } from "../../../build/index"

export default function (translate, language, otherProps) {
  const [value, setValue] = useState(new Date())

  const calendar = {
    title: "Calendar With Children",
    code: `const [value, setValue] = useState(new Date())
.
.
.
<Calendar
  value={value}
  onChange={setValue}
${language === "en" ? ">" : `  calendar="persian"
  locale="fa"
>`}
  <button
    style={{ margin: "5px" }}
    onClick={() => setValue(undefined)}
  >
    ${translate("DESELECT")}
  </button>
  <button
    style={{ margin: "5px" }}
    onClick={() => setValue(new Date())}
  >
    ${translate("TODAY")}
  </button>
</Calendar>`,
    jsx: <Calendar
      value={value}
      onChange={setValue}
      {...otherProps}
    >
      <button
        style={{ margin: "5px" }}
        onClick={() => setValue(undefined)}
      >
        {translate("DESELECT")}
      </button>
      <button
        style={{ margin: "5px" }}
        onClick={() => setValue(new Date())}
      >
        {translate("TODAY")}
      </button>
    </Calendar>
  }

  const datePicker = {
    title: "DatePicker With Children",
    code: `<DatePicker${language === "en" ? ">" : `
  calendar="persian"
  locale="fa"
  calendarPosition="auto-right"
>`}
  <button
    style={{ margin: "5px 0" }}
    onClick={() => alert("${translate("clicked")}")}
  >
    ${translate("click me")}
  </button>
</DatePicker>`,
    jsx: <DatePicker {...otherProps}>
      <button
        style={{ margin: "5px 0" }}
        onClick={() => alert(translate("clicked"))}
      >
        {translate("click me")}
      </button>
    </DatePicker>
  }

  return [
    calendar,
    datePicker
  ]
}