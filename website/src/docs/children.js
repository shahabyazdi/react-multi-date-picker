import React, { useState } from "react";
import DatePicker, { Calendar } from "../../../build/index";

export default function Doc({ translate, language, otherProps }) {
  const [value, setValue] = useState(new Date());

  const calendar = {
    title: "Calendar With Children",
    code: `import { useState } from "react"
import { Calendar } from "react-multi-date-picker"
${
  language === "en"
    ? ``
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  const [value, setValue] = useState(new Date())

  return (
    <Calendar
      value={value}
      onChange={setValue}
    ${
      language === "en"
        ? ">"
        : `  calendar={persian}
      locale={fa}
    >`
    }
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
    </Calendar>
  )
}`,
    jsx: (
      <Calendar value={value} onChange={setValue} {...otherProps}>
        <button style={{ margin: "5px" }} onClick={() => setValue(undefined)}>
          {translate("DESELECT")}
        </button>
        <button style={{ margin: "5px" }} onClick={() => setValue(new Date())}>
          {translate("TODAY")}
        </button>
      </Calendar>
    ),
  };

  const datePicker = {
    title: "DatePicker With Children",
    code: `import DatePicker from "react-multi-date-picker"
${
  language === "en"
    ? ``
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  return (
    <DatePicker${
      language === "en"
        ? ">"
        : `
      calendar={persian}
      locale={fa}
      calendarPosition="bottom-right"
    >`
    }
      <button
        style={{ margin: "5px 0" }}
        onClick={() => alert("${translate("clicked")}")}
      >
        ${translate("click me")}
      </button>
    </DatePicker>
  )
}`,
    jsx: (
      <DatePicker {...otherProps}>
        <button
          style={{ margin: "5px 0" }}
          onClick={() => alert(translate("clicked"))}
        >
          {translate("click me")}
        </button>
      </DatePicker>
    ),
  };

  return [calendar, datePicker];
}
