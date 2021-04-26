import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";

export default function MultipleMonths(translate, language, otherProps) {
  const [dates, setDates] = useState([
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
    }).setDay(5),
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
    }).setDay(12),
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" })
      .setDay(14)
      .add(1, "month"),
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" })
      .setDay(23)
      .add(1, "month"),
  ]);

  const [values, setValues] = useState([
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" })
      .setDay(4)
      .subtract(1, "month"),
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" })
      .setDay(4)
      .add(1, "month"),
  ]);

  const calendar = {
    title: "Single Mode",
    description: "multiple_months",
    code: `<Calendar
  numberOfMonths={2}
  disableMonthPicker
  disableYearPicker
${
  language === "en"
    ? "/> "
    : `  calendar="persian"
  locale="fa"
/> `
}`,
    jsx: (
      <Calendar
        numberOfMonths={2}
        disableMonthPicker
        disableYearPicker
        {...otherProps}
      />
    ),
  };

  const datePicker = {
    title: "Multiple Mode",
    description: "multiple_mode_description",
    code: `const [dates, setDates] = useState([
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).setDay(5),
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).setDay(12),
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).setDay(14).add(1, "month"),
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).setDay(23).add(1, "month"),
])
.
.
.
<DatePicker
  value={dates}
  onChange={setDates}
  multiple
  numberOfMonths={2}
/>`,
    jsx: (
      <DatePicker
        value={dates}
        onChange={setDates}
        multiple
        numberOfMonths={2}
        {...otherProps}
      />
    ),
  };

  const range = {
    title: "Range Mode",
    code: `const [values, setValues] = useState([
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).setDay(4).subtract(1, "month"),
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).setDay(4).add(1, "month")
])
.
.
.
<Calendar
  value={values}
  onChange={setValues}
  range
  numberOfMonths={3}
  showOtherDays
${
  language === "en"
    ? "/> "
    : `  calendar="persian"
  locale="fa"
/> `
}`,
    jsx: (
      <Calendar
        value={values}
        onChange={setValues}
        range
        numberOfMonths={3}
        showOtherDays
        {...otherProps}
      />
    ),
  };

  return [calendar, datePicker, range];
}
