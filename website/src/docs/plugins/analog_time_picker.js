import React, { useState } from "react";
import DatePicker, { Calendar } from "../../../../src/index";
import TimePicker from "../../../../plugins/all/analog_time_picker/analog_time_picker";
import "../../../../styles/colors/analog_time_picker_red.css";

export default function AnalogTime(translate, language, otherProps) {
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());

  const timePicker = {
    title: "Default Analog Time Picker",
    description: "default_analog_time_picker",
    code: `import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
.
.
.
const [value, setValue] = useState(new Date());
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

  const darkRed = {
    title: "Color & Background",
    description: "red_clock",
    code: `import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";

import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import "react-multi-date-picker/styles/colors/analog_time_picker_red.css";
.
.
.
const [value, setValue] = useState(new Date());
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

  const bottom = {
    title: "Position Bottom",
    code: `import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
.
.
.
const [value, setValue] = useState(new Date());
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
.
.
.
<DatePicker 
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

  return [timePicker, darkRed, bottom, onlyTimePicker];
}
