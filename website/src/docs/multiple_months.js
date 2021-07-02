import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";
import { Link } from "gatsby";

export default function Doc({ translate, language, otherProps }) {
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
      <>
        <Calendar
          value={values}
          onChange={setValues}
          range
          numberOfMonths={3}
          showOtherDays
          {...otherProps}
        />
        {<h4>{translate("See Also")}:</h4>}
        <Link
          to={
            language === "en"
              ? "../plugins/range-picker-footer/#default-range-picker-footer"
              : "../plugins/range-picker-footer/#%D9%81%D9%88%D8%AA%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8%DA%AF%D8%B1-%D8%AF%D8%A7%D9%85%D9%86%D9%87"
          }
        >
          {translate("Plugins")} #{translate("Range Picker Footer")}
        </Link>
      </>
    ),
  };

  return [calendar, datePicker, range];
}
