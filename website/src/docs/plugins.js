import React, { useState } from "react";
import { Calendar, DateObject } from "../../../build/index";
import Settings from "../../../plugins/settings";
import DatePickerHeader from "../../../plugins/date_picker_header";
import multiColors from "../../../plugins/colors";
import DatePanel from "../../../plugins/date_panel";
import Toolbar from "../../../plugins/toolbar";

export default function Doc({ language, otherProps }) {
  const dateObject = new DateObject(otherProps);

  const toDateObject = (day) => new DateObject(dateObject).setDay(day);

  const colors = {
    green: [2, 10, 17].map(toDateObject),
    blue: [5, 6, 14].map(toDateObject),
    red: [13, 19, 25].map(toDateObject),
    yellow: [15, 22, 28].map(toDateObject),
  };

  Object.keys(colors).forEach((color) => {
    colors[color].forEach((date, index) => {
      colors[color][index].color = color;
    });
  });

  const [props, setProps] = useState({
    value: [...colors.green, ...colors.blue, ...colors.red, ...colors.yellow],
    multiple: true,
    ...otherProps,
  });

  const isRTL = ["fa", "ar"].includes(props.locale?.name?.split?.("_")?.[1]);

  const all = {
    jsx: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Calendar
          {...props}
          onPropsChange={setProps}
          plugins={[
            <DatePickerHeader position="top" size="medium" />,
            <DatePanel
              position={isRTL ? "left" : "right"}
              sort="date"
              eachDaysInRange={!props.onlyMonthPicker && !props.onlyYearPicker}
            />,
            multiColors({ position: isRTL ? "right" : "left" }),
            <Settings position="bottom" defaultActive="locale" />,
            <Toolbar position="bottom" />,
          ]}
        />
      </div>
    ),
  };

  const plugins = {
    title: "Plugins",
    description: "plugins",
    code: `import React, { useState } from "react"
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import multiColors from "react-multi-date-picker/plugins/colors"
import Settings from "react-multi-date-picker/plugins/settings"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian:
import persian_fa from "react-date-object/locales/persian_fa"
`
}
const dateObject = new DateObject(${
      language === "en" ? "" : `{ calendar: persian, locale: persian_fa }`
    })

const toDateObject = day => new DateObject(dateObject).setDay(day)

const colors = {
  green: [2, 10, 17].map(toDateObject),
  blue: [5, 6, 14].map(toDateObject),
  red: [13, 19, 25].map(toDateObject),
  yellow: [15, 22, 28].map(toDateObject)
}

Object.keys(colors).forEach(color => {
  colors[color].forEach((date, index) => {
      colors[color][index].color = color
  })
})

const initialProps {
  value: [
    ...colors.green,
    ...colors.blue,
    ...colors.red,
    ...colors.yellow
  ], 
  multiple: true${
    language === "en"
      ? ""
      : `,
  calendar: persian,
  locale: persian_fa`
  }
})

export default function DatePickerPlugins() {
  const [props, setProps] = useState(initialProps)
  const isRTL = ["fa", "ar"].includes(props.locale?.name?.split?.("_")?.[1])

  return (
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "center" 
      }}
    >
      <Calendar
        {...props}
        plugins={[
          <DatePickerHeader 
            position="top" 
            size="medium" 
          />,
          <DatePanel
            position={isRTL ? "left" : "right"}
            sort="date"
            eachDaysInRange={!props.onlyMonthPicker && !props.onlyYearPicker}
          />
          multiColors({ position: isRTL ? "right" : "left" }),
          <Settings 
            position="bottom" 
            defaultActive="locale" 
          />,
          <Toolbar 
            position="bottom" 
          />
        ]}
      />
    </div>
  )
}`,
  };

  return [all, plugins];
}
