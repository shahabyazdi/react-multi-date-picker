import React, { useState } from "react";
import DatePicker, { Calendar } from "../../../../src/index";
import TimePicker from "../../../../plugins/all/analog_time_picker/analog_time_picker";
import "../../../../styles/colors/analog_time_picker_red.css";

export default function AnalogTime(translate, language, otherProps) {
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());

  const timePicker = {
    title: "Default Time Picker",
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
  format="MM/DD/YYYY HH:mm:ss"
  value={value} 
  onChange={setValue}
  plugins={[<TimePicker />]} 
/>`,
    jsx: (
      <DatePicker
        format="MM/DD/YYYY HH:mm:ss"
        value={value}
        onChange={setValue}
        plugins={[<TimePicker />]}
      />
    ),
  };

  const darkRed = {
    title: "Color & Background",
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
  plugins={[<TimePicker />]} 
/>`,
    jsx: (
      <Calendar
        value={value1}
        onChange={setValue1}
        plugins={[<TimePicker />]}
        className="bg-dark red"
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
      />
    ),
  };

  return [timePicker, darkRed, bottom];
}
