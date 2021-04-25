import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../../build/index";
import Weekends from "../../../../plugins/weekends";

export default function WeekendsComponent(trasnlate, language, otherProps) {
  const [props, setProps] = useState({
    value: new DateObject().toLastOfWeek(),
  });
  const [props2, setProps2] = useState({
    calendar: "persian",
    locale: "fa",
    calendarPosition: language === "en" ? "bottom-left" : "auto-right",
  });
  const [props3, setProps3] = useState({});

  const allProps = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{trasnlate("Prop")}</th>
            <th>{trasnlate("Type")}</th>
            <th>{trasnlate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>weekends</td>
            <td>Array</td>
            <td>*see default weekends</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const defaultWeekends = {
    title: "Default Weekends",
    description: (
      <table>
        <thead>
          <tr>
            <th>{trasnlate("Calendar")}</th>
            <th>{trasnlate("Default Weekends")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>gregorian</td>
            <td>[0, 6]</td>
          </tr>
          <tr>
            <td>persian</td>
            <td>[6]</td>
          </tr>
          <tr>
            <td>arabic</td>
            <td>[0, 6]</td>
          </tr>
          <tr>
            <td>indian</td>
            <td>[0]</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const gregorian = {
    title: "Weekends: gregorian",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Weekends from "react-multi-date-picker/plugins/weekends"
.
.
.
const [props, setProps] = useState({
  value: new DateObject().toLastOfWeek()
});
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Weekends />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...props}
        onPropsChange={setProps}
        plugins={[<Weekends />]}
        calendarPosition={language === "en" ? "bottom-left" : "auto-right"}
      />
    ),
  };

  const persian = {
    title: "Weekends: persian",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Weekends from "react-multi-date-picker/plugins/weekends"
.
.
.
const [props, setProps] = useState({
  calendar: "persian",
  locale: "fa",
  calendarPosition: "${language === "en" ? "bottom-left" : "auto-right"}"
});
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[<Weekends />]}
/> `,
    jsx: (
      <DatePicker
        {...props2}
        onPropsChange={setProps2}
        plugins={[<Weekends />]}
      />
    ),
  };

  const custom = {
    title: "Weekends: custom",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Weekends from "react-multi-date-picker/plugins/weekends"
.
.
.
const [props, setProps] = useState(${
      language === "en"
        ? "{}"
        : `{
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right"
}`
    });
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Weekends
      weekends={[5, 6]}
    />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...props3}
        onPropsChange={setProps3}
        plugins={[<Weekends weekends={[5, 6]} />]}
        {...otherProps}
      />
    ),
  };
  return [allProps, defaultWeekends, gregorian, persian, custom];
}
