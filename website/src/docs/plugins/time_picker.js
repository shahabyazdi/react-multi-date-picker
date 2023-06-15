import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../../build/index";
import TimePicker from "../../../../plugins/time_picker";
import DatePanel from "../../../../plugins/date_panel";

export default function Doc({ language, otherProps, translate, localeImport }) {
  const [values, setValues] = useState(
    [1, 2, 3].map((number) =>
      new DateObject(otherProps).set({
        day: number,
        hour: number,
        minute: number,
        second: number,
      })
    )
  );

  const [dates, setDates] = useState([
    new DateObject(otherProps),
    new DateObject(otherProps).add(1, "day"),
  ]);

  const descriptions = {
    title: "Descriptions",
    description: "time_picker",
  };

  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const props = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Default")}</th>
            <th>{translate("Descriptions")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>"right"</td>
            <td></td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td></td>
          </tr>
          <tr>
            <td>hideSeconds</td>
            <td>Boolean</td>
            <td>false</td>
            <td></td>
          </tr>
          <tr>
            <td>header</td>
            <td>Boolean</td>
            <td>true</td>
            <td>
              positions top/bottom: always false, positions right/left: default
              true{" "}
            </td>
          </tr>
          <tr>
            <td>format</td>
            <td>String</td>
            <td>"YYYY/MM/DD"</td>
            <td>
              {translate("time_picker_format_prop").map((string, index) => (
                <p key={index}>{string}</p>
              ))}
            </td>
          </tr>
          <tr>
            <td>hStep</td>
            <td>Number</td>
            <td>1</td>
            <td></td>
          </tr>
          <tr>
            <td>mStep</td>
            <td>Number</td>
            <td>1</td>
            <td></td>
          </tr>
          <tr>
            <td>sStep</td>
            <td>Number</td>
            <td>1</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const step = {
    title: "Utilizing Step for Arrow Icons",
    description: "step_time_picker",
    code: `import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
${$import}<DatePicker
  format="${language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"}"
  plugins={[
    <TimePicker position="bottom" hStep={2} mStep={3} sStep={4}/>,
  ]}
/>`,
    jsx: (
      <DatePicker
        format={
          language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"
        }
        plugins={[
          <TimePicker position="bottom" hStep={2} mStep={3} sStep={4} />,
        ]}
        {...otherProps}
      />
    ),
  };

  const multiple = {
    title: "Using TimePicker in Multiple Mode",
    description: "multiple_time_picker",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
${$import}const [values, setValues] = useState(
  [1, 2, 3].map((number) =>
    new DateObject(${
      language === "en" ? "" : `{ calendar: "persian", locale: "fa"}`
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

  const rightPosition = {
    title: "Position Right",
    description: "time_picker_position_right",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
${$import}const [values, setValues] = useState([
  new DateObject(${
    language === "en" ? "" : `{ calendar: persian, locale: persian_fa }`
  }),
  new DateObject(${
    language === "en" ? "" : `{ calendar: persian, locale: persian_fa }`
  }).add(1,"day")
]);
.
.
.
<Calendar
  value={values}
  onChange={setValues}
  multiple
  plugins={[<TimePicker />]}
/> `,
    jsx: (
      <Calendar
        value={dates}
        onChange={setDates}
        multiple
        plugins={[<TimePicker />]}
      />
    ),
  };

  const range = {
    title: "Using TimePicker in Range Mode",
    code: `import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
${$import}<DatePicker
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

  const style = {
    title: "Styling TimePicker",
    description: "time_picker_style",
    code: `${$import}<DatePicker
  format="MM/DD/YYYY HH:mm"
  plugins={[
    <TimePicker
      hideSeconds
      style={{ minWidth: "100px" }}
    />
  ]}
/>`,
    jsx: (
      <DatePicker
        format="MM/DD/YYYY HH:mm"
        plugins={[<TimePicker hideSeconds style={{ minWidth: "100px" }} />]}
        {...otherProps}
      />
    ),
  };

  return [descriptions, props, step, multiple, rightPosition, range, style];
}
