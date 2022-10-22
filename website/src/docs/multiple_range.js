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

  const monthPicker = {
    title: "Multiple Range in onlyMonthPicker",
    code: `${localeImport}<DatePicker
  onlyMonthPicker
  multiple
  range
/>`,
    jsx: <DatePicker onlyMonthPicker multiple range {...otherProps} />,
  };

  const yearPicker = {
    title: "Multiple Range in onlyYearPicker",
    code: `${localeImport}<DatePicker
  onlyYearPicker
  multiple
  range
/>`,
    jsx: <DatePicker onlyYearPicker multiple range {...otherProps} />,
  };

  return [range, monthPicker, yearPicker];
}
