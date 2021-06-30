import React, { useState } from "react";
import DatePicker, {
  DateObject,
  getAllDatesInRange,
} from "../../../build/index";
import DatePanel from "../../../plugins/date_panel";

export default function RangeMode(translate, language, otherProps) {
  const [values, setValues] = useState([
    new DateObject({
      calendar: language === "fa" ? "persian" : "gregorian",
    }).subtract(4, "days"),
    new DateObject({
      calendar: language === "fa" ? "persian" : "gregorian",
    }).add(4, "days"),
  ]);

  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);

  const range = {
    title: "Range Picker",
    description: "range_mode",
    code: `const [values, setValues] = useState([
  new DateObject(${
    language === "fa" ? `{ calendar: "persian" }` : ""
  }).subtract(4, "days"),
  new DateObject(${
    language === "fa" ? `{ calendar: "persian" }` : ""
  }).add(4, "days")
])
.
.
.
<DatePicker
  value={values}
  onChange={setValues}
  range
/>`,
    jsx: (
      <DatePicker value={values} onChange={setValues} range {...otherProps} />
    ),
  };

  const datePanel = {
    title: "DatePanel",
    description: "date_panel_range",
    code: `import DatePanel from "react-multi-date-picker/plugins/date_panel"
.
.
.
<DatePicker
  range
  plugins={[
    <DatePanel${language === "fa" ? ` position="left"` : ""} />
  ]}
/>`,
    jsx: (
      <DatePicker
        range
        plugins={[
          <DatePanel position={language === "fa" ? "left" : "right"} />,
        ]}
        {...otherProps}
      />
    ),
  };

  const eachDaysInRange = {
    title: "Displaying Each Days In Range",
    description: "each_days_in_range",
    code: `import DatePicker, { DateObject, getAllDatesInRange } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
.
.
.
const [dates, setDates] = useState([])
const [allDates, setAllDates] = useState([])

<div>
  <DatePicker
    range
    calendarPosition="top-left"
    fixMainPosition
    value={dates}
    minDate={new DateObject(${
      language === "fa" ? `{ calendar: "persian" }` : ""
    }).toFirstOfMonth()}
    maxDate={new DateObject(${
      language === "fa" ? `{ calendar: "persian" }` : ""
    }).toLastOfMonth()}
    onChange={dateObjects => {
      setDates(dateObjects)
      setAllDates(getAllDatesInRange(dateObjects))
    }}
    plugins={[
      <DatePanel eachDaysInRange${
        language === "fa" ? ` position="left"` : ""
      } />
    ]}
  ${
    language === "en"
      ? "/>"
      : `  calendar="persian"
    locale="fa"
    calendarPosition="auto-right"
  />`
  }
  {dates.length > 1 &&
    <div>
      <h5>
        All Dates between {dates[0].format()} and {dates[1].format()}:
      </h5>
      <ul>
        {allDates.map((date, index) => <li key={index}>{date.format()}</li>)}
      </ul>
    </div>
  }
</div>
`,
    jsx: (
      <div>
        <DatePicker
          range
          calendarPosition={language === "en" ? "top-left" : "top-right"}
          fixMainPosition
          value={dates}
          minDate={new DateObject({
            calendar: language === "en" ? "gregorian" : "persian",
          }).toFirstOfMonth()}
          maxDate={new DateObject({
            calendar: language === "en" ? "gregorian" : "persian",
          }).toLastOfMonth()}
          onChange={(dateObjects) => {
            setDates(dateObjects);
            setAllDates(getAllDatesInRange(dateObjects));
          }}
          plugins={[
            <DatePanel
              eachDaysInRange
              position={language === "fa" ? "left" : "right"}
            />,
          ]}
          {...otherProps}
        />
        {dates.length > 1 && (
          <div>
            <h5>
              {language === "en"
                ? `All Dates between ${dates[0].format()} and ${dates[1].format()}`
                : `تمام روز های مابین ${dates[0].format()} و ${dates[1].format()}`}
              :
            </h5>
            <ul>
              {allDates.map((date, index) => (
                <li key={index}>{date.format()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ),
  };

  let monthPicker = {
    title: "Range Month Picker",
    code: `<DatePicker
  onlyMonthPicker
  range
  plugins={[
    <DatePanel />
  ]}
/>`,
    jsx: (
      <DatePicker
        onlyMonthPicker
        range
        plugins={[<DatePanel />]}
        {...otherProps}
      />
    ),
  };

  let yearPicker = {
    title: "Range Year Picker",
    code: `<DatePicker
  onlyYearPicker
  range
  plugins={[
    <DatePanel />
  ]}
/>`,
    jsx: (
      <DatePicker
        onlyYearPicker
        range
        plugins={[<DatePanel />]}
        {...otherProps}
      />
    ),
  };

  return [range, datePanel, eachDaysInRange, monthPicker, yearPicker];
}
