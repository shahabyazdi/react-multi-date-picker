import React, { useState } from "react";
import DatePicker, {
  Calendar,
  DateObject,
  getAllDatesInRange,
} from "../../../build/index";
import DatePanel from "../../../plugins/date_panel";

export default function Doc({ language, otherProps, localeImport }) {
  const [values, setValues] = useState([
    new DateObject(otherProps).subtract(4, "days"),
    new DateObject(otherProps).add(4, "days"),
  ]);

  const [values2, setValues2] = useState([new DateObject(otherProps)]);

  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);

  const range = {
    title: "Range Picker",
    description: "range_mode",
    code: `${localeImport}const [values, setValues] = useState([
  new DateObject(${
    language === "fa" ? `{ calendar: persian }` : ""
  }).subtract(4, "days"),
  new DateObject(${
    language === "fa" ? `{ calendar: persian }` : ""
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

  const rangeHover = {
    title: "Range Hover Effect",
    code: `${localeImport}const [values, setValues] = useState([
  new DateObject(${language === "fa" ? `{ calendar: persian }` : ""})
])
.
.
.
<Calendar
  value={values}
  onChange={setValues}
  range
  rangeHover
/>`,
    jsx: (
      <Calendar
        range
        rangeHover
        value={values2}
        onChange={setValues2}
        {...otherProps}
      />
    ),
  };

  const datePanel = {
    title: "DatePanel",
    description: "date_panel_range",
    code: `import DatePanel from "react-multi-date-picker/plugins/date_panel"
${localeImport}${
      language === "en"
        ? `.
.
.
`
        : ""
    }<DatePicker
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
${localeImport}${
      language === "en"
        ? `.
.
.
`
        : ""
    }const [dates, setDates] = useState([])
const [allDates, setAllDates] = useState([])
.
.
.
<div>
  <DatePicker
    range
    calendarPosition="top-left"
    fixMainPosition
    value={dates}
    minDate={new DateObject(${
      language === "fa" ? `{ calendar: persian }` : ""
    }).toFirstOfMonth()}
    maxDate={new DateObject(${
      language === "fa" ? `{ calendar: persian }` : ""
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
      : `  calendar={persian}
    locale={persian_fa}
    calendarPosition="bottom-right"
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
          minDate={new DateObject(otherProps).toFirstOfMonth()}
          maxDate={new DateObject(otherProps).toLastOfMonth()}
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
          calendar={otherProps.calendar}
          locale={otherProps.locale}
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

  let weekPicker = {
    title: "Range Week Picker",
    code: `${localeImport}<DatePicker
  range
  weekPicker
/>`,
    jsx: <DatePicker range weekPicker {...otherProps} />,
  };

  let monthPicker = {
    title: "Range Month Picker",
    code: `${localeImport}<DatePicker
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
    code: `${localeImport}<DatePicker
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

  return [
    range,
    rangeHover,
    datePanel,
    eachDaysInRange,
    weekPicker,
    monthPicker,
    yearPicker,
  ];
}
