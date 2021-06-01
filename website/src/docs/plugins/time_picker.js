import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../../build/index";
import TimePicker from "../../../../plugins/time_picker";
import DatePanel from "../../../../plugins/date_panel";

export default function TimePickerPlugin(translate, language, otherProps) {
  const [values, setValues] = useState(
    [1, 2, 3].map((number) =>
      new DateObject({
        calendar: language === "en" ? "gregorian" : "persian",
        locale: language,
      }).set({
        day: number,
        hour: number,
        minute: number,
        second: number,
      })
    )
  );

  const descriptions = {
    title: "Descriptions",
    description: "time_picker",
  };

  const multiple = {
    title: "Using TimePicker in Multiple Mode",
    description: "multiple_time_picker",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
.
.
.
const [values, setValues] = useState(
  [1, 2, 3].map((number) =>
    new DateObject(${language === "en" ? "" : `{ calendar: "persian", locale: "fa"}`
      }).set({
      day: number,
      hour: number,
      minute: number,
      second: number,
    })
  )
);
.
.
.
<DatePicker
  value={values}
  onChange={setValues}
  format="${language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"}"
  multiple
  plugins={[
    <TimePicker position="bottom" />,
    <DatePanel markFocused />
  ]}
/>`,
    jsx: (
      <DatePicker
        value={values}
        onChange={setValues}
        format={
          language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"
        }
        multiple
        plugins={[<TimePicker position="bottom" />, <DatePanel markFocused />]}
        {...otherProps}
      />
    ),
  };

  const range = {
    title: "Using TimePicker in Range Mode",
    code: `import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
.
.
.
<DatePicker
  format="${language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"}"
  range
  plugins={[
    <TimePicker position="bottom" />,
    <DatePanel markFocused />
  ]}
/>`,
    jsx: (
      <DatePicker
        format={
          language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"
        }
        range
        plugins={[<TimePicker position="bottom" />, <DatePanel markFocused />]}
        {...otherProps}
      />
    ),
  };

  return [descriptions, multiple, range];
}
