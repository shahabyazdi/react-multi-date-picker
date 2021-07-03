import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../../build/index";
import Weekends from "../../../../plugins/weekends";

export default function Doc({ translate, language, otherProps }) {
  const [props, setProps] = useState({
    value: new DateObject().toLastOfWeek(),
    plugins: [<Weekends />],
    calendarPosition: language === "en" ? "bottom-left" : "auto-right",
  });

  const [props2, setProps2] = useState({
    calendar: "persian",
    locale: "fa",
    calendarPosition: language === "en" ? "bottom-left" : "auto-right",
    plugins: [<Weekends />],
  });

  const [props3, setProps3] = useState({
    plugins: [<Weekends weekends={[5, 6]} />],
  });

  const allProps = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>"right"</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
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
            <th>{translate("Calendar")}</th>
            <th>{translate("Default Weekends")}</th>
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
  value: new DateObject().toLastOfWeek(),
  plugins: [
    <Weekends />
  ]
});
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
/> `,
    jsx: <DatePicker {...props} onPropsChange={setProps} />,
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
  calendarPosition: "${language === "en" ? "bottom-left" : "auto-right"}",
  plugins: [
    <Weekends />
  ]
});
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
/> `,
    jsx: <DatePicker {...props2} onPropsChange={setProps2} />,
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
        ? `{
  plugins:[
    <Weekends
      weekends:[5, 6]
    />
  ]
}`
        : `{
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right",
  plugins={[
    <Weekends
      weekends:[5, 6]
    />
  ]}
}`
    });
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
/> `,
    jsx: <DatePicker {...props3} onPropsChange={setProps3} {...otherProps} />,
  };
  return [allProps, defaultWeekends, gregorian, persian, custom];
}
