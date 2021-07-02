import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../build/index";

export default function Doc({ language, otherProps }) {
  const [value, setValue] = useState(
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
    }).set("day", 10)
  );
  const [date, setDate] = useState(
    language === "en" ? "2020/12/04" : "1399/10/12"
  );

  const [values, setValues] = useState([
    new DateObject({ calendar: language === "en" ? "gregorian" : "persian" }),
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
    }).add(1, "day"),
  ]);

  const minMax = {
    title: "Min & Max Date",
    description: "min_max",
    code: `const [date, setDate] = useState(${
      language === "en"
        ? "new Date().setDate(10)"
        : `new DateObject({ calendar: "persian" }).set("date", 10)`
    })
.
.
.
<DatePicker
  value={date}
  onChange={setDate}
  minDate={${
    language === "en"
      ? "new Date().setDate(5)"
      : `new DateObject({ calendar: "persian" }).set("date", 5)`
  }}
  maxDate={${
    language === "en"
      ? "new Date().setDate(15)"
      : `new DateObject({ calendar: "persian" }).set("date", 15)`
  }}
/>`,
    jsx: (
      <DatePicker
        value={value}
        onChange={setValue}
        minDate={new DateObject({
          calendar: language === "en" ? "gregorian" : "persian",
        }).set("day", 5)}
        maxDate={new DateObject({
          calendar: language === "en" ? "gregorian" : "persian",
        }).set("day", 15)}
        {...otherProps}
      />
    ),
  };

  const string = {
    title: "String",
    code: `const [date, setDate] = useState(${
      language === "en" ? '"2020/12/04"' : '"1399/10/12"'
    })
.
.
.
<DatePicker
  value={date}
  onChange={setDate}
  minDate={${language === "en" ? '"2020/11/20"' : '"1399/9/18"'}}
  maxDate={${language === "en" ? '"2021/01/20"' : '"1399/11/14"'}}
/>`,
    jsx: (
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={language === "en" ? "2020/11/20" : "1399/9/18"}
        maxDate={language === "en" ? "2021/01/20" : "1399/11/14"}
        {...otherProps}
      />
    ),
  };

  const range = {
    title: "Range Mode",
    code: `const [values, setValues] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: "persian" }`}),
  new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).add(1, "day")
])
.
.
.
<DatePicker
  value={values}
  onChange={setValues}
  range
  minDate={new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).subtract(2, "days")}
  maxDate={new DateObject(${
    language === "en" ? "" : `{ calendar: "persian" }`
  }).add(3, "days")}
/>`,
    jsx: (
      <DatePicker
        value={values}
        onChange={setValues}
        range
        minDate={new DateObject({
          calendar: language === "en" ? "gregorian" : "persian",
        }).subtract(2, "days")}
        maxDate={new DateObject({
          calendar: language === "en" ? "gregorian" : "persian",
        }).add(3, "days")}
        {...otherProps}
      />
    ),
  };

  const minDate = {
    title: "Only MinDate",
    code: `<DatePicker
  minDate={${
    language === "en"
      ? "new Date().setDate(5)"
      : 'new DateObject({ calendar: "persian" }).set("day", 5)'
  }}
/>`,
    jsx: (
      <DatePicker
        minDate={
          language === "en"
            ? new Date().setDate(5)
            : new DateObject({ calendar: "persian" }).set("day", 5)
        }
        {...otherProps}
      />
    ),
  };

  const maxDate = {
    title: "Only MaxDate",
    code: `<DatePicker
  maxDate={${
    language === "en"
      ? "new Date().setDate(15)"
      : 'new DateObject({ calendar: "persian" }).set("day", 15)'
  }}
/>`,
    jsx: (
      <DatePicker
        maxDate={
          language === "en"
            ? new Date().setDate(15)
            : new DateObject({ calendar: "persian" }).setDay(15)
        }
        {...otherProps}
      />
    ),
  };

  return [minMax, string, range, minDate, maxDate];
}
