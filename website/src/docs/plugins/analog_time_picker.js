import React, { useState } from "react";
import DatePicker, { Calendar } from "../../../../build/index";
import TimePicker from "../../../../plugins/analog_time_picker";
import "../../../../styles/colors/analog_time_picker_red.css";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());

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
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>hideSeconds</td>
            <td>Boolean</td>
            <td>false</td>
            <td></td>
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

  const timePicker = {
    title: "Default Analog Time Picker",
    description: "default_analog_time_picker",
    code: `import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
${$import}const [value, setValue] = useState(new Date());
.
.
.
<DatePicker
  value={value} 
  onChange={setValue}
  format="MM/DD/YYYY HH:mm:ss"
  plugins={[<TimePicker ${language === "en" ? "" : `position="left"`}/>]} 
/>`,
    jsx: (
      <DatePicker
        format="MM/DD/YYYY HH:mm:ss"
        value={value}
        onChange={setValue}
        plugins={[
          <TimePicker position={language === "en" ? "right" : "left"} />,
        ]}
        {...otherProps}
      />
    ),
  };

  const step = {
    title: "Utilizing Step for Arrow Icons",
    description: "step_time_picker",
    code: `import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
${$import}<DatePicker
  format="${language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"}"
  plugins={[
    <TimePicker hStep={2} mStep={3} sStep={4}/>,
  ]}
/>`,
    jsx: (
      <DatePicker
        format={
          language === "en" ? "MM/DD/YYYY HH:mm:ss" : "YYYY/MM/DD HH:mm:ss"
        }
        plugins={[<TimePicker hStep={2} mStep={3} sStep={4} />]}
        {...otherProps}
      />
    ),
  };

  const darkRed = {
    title: "Color & Background",
    description: "red_clock",
    code: `import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";

import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import "react-multi-date-picker/styles/colors/analog_time_picker_red.css";
${$import}const [value, setValue] = useState(new Date());
.
.
.
<Calendar 
  value={value} 
  onChange={setValue}
  className="bg-dark red"
  plugins={[<TimePicker ${language === "en" ? "" : `position="left"`}/>]} 
/>`,
    jsx: (
      <Calendar
        value={value1}
        onChange={setValue1}
        plugins={[
          <TimePicker position={language === "en" ? "right" : "left"} />,
        ]}
        className="bg-dark red"
        {...otherProps}
      />
    ),
  };

  const hideSeconds = {
    title: "Hiding Seconds",
    code: `import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
${$import}<DatePicker
  format="MM/DD/YYYY HH:mm"
  plugins={[
    <TimePicker hideSeconds ${language === "en" ? "" : `position="left"`}/>
  ]} 
/>`,
    jsx: (
      <DatePicker
        format="MM/DD/YYYY HH:mm"
        plugins={[
          <TimePicker
            hideSeconds
            position={language === "en" ? "right" : "left"}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  const bottom = {
    title: "Position Bottom",
    code: `import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
${$import}const [value, setValue] = useState(new Date());
.
.
.
<Calendar 
  value={value} 
  onChange={setValue}
  plugins={[<TimePicker position="bottom"/>]} 
/>`,
    jsx: (
      <Calendar
        value={value2}
        onChange={setValue2}
        plugins={[<TimePicker position="bottom" />]}
        {...otherProps}
      />
    ),
  };

  const onlyTimePicker = {
    title: "Only Analog Time Picker",
    code: `import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
${$import}<DatePicker 
  disableDayPicker 
  format="HH:mm:ss"
  plugins={[<TimePicker />]} 
/>`,
    jsx: (
      <DatePicker
        disableDayPicker
        format="HH:mm:ss"
        plugins={[<TimePicker />]}
        {...otherProps}
      />
    ),
  };

  return [
    props,
    timePicker,
    step,
    darkRed,
    hideSeconds,
    bottom,
    onlyTimePicker,
  ];
}
