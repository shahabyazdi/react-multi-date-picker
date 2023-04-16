import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build";

export default function Doc({ language, otherProps, localeImport }) {
  const [values, setValues] = useState([
    [
      new DateObject(otherProps).set({ day: 1 }),
      new DateObject(otherProps).set({ day: 3 }),
    ],
    [
      new DateObject(otherProps).set({ day: 6 }),
      new DateObject(otherProps).set({ day: 12 }),
    ],
    [
      new DateObject(otherProps).set({ day: 23 }),
      new DateObject(otherProps).set({ day: 27 }),
    ],
  ]);

  const range = {
    title: "Multiple Range Picker",
    description: "multiple_range_picker",
    code: `${localeImport}const [values, setValues] = useState([
  [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  [new DateObject().set({ day: 6 }), new DateObject().set({ day: 12 })],
  [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })],
])
.
.
.
<Calendar
  value={values}
  onChange={setValues}
  multiple
  range
/>`,
    jsx: (
      <Calendar
        value={values}
        onChange={setValues}
        multiple
        range
        {...otherProps}
      />
    ),
  };

  const separator = {
    title: "Custom Separator",
    description: "multiple_range_date_separator",
    code: `<DatePicker
  multiple
  range
  dateSeparator=${language === "fa" ? '" تا "' : '" to "'}
  multipleRangeSeparator="&"
/>`,
    jsx: (
      <DatePicker
        multiple
        range
        dateSeparator={language === "fa" ? " تا " : " to "}
        multipleRangeSeparator="&"
        {...otherProps}
      />
    ),
  };

  const monthPicker = {
    title: "Multiple Range in onlyMonthPicker",
    description: "multiple_range_month_picker",
    code: `${localeImport}<DatePicker
  onlyMonthPicker
  multiple
  range
/>`,
    jsx: <DatePicker onlyMonthPicker multiple range {...otherProps} />,
  };

  const yearPicker = {
    title: "Multiple Range in onlyYearPicker",
    description: "multiple_range_year_picker",
    code: `${localeImport}<DatePicker
  onlyYearPicker
  multiple
  range
/>`,
    jsx: <DatePicker onlyYearPicker multiple range {...otherProps} />,
  };

  return [range, separator, monthPicker, yearPicker];
}
