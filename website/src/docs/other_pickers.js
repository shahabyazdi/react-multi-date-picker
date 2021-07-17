import React from "react";
import DatePicker from "../../../build/index";
import TimePicker from "../../../plugins/time_picker";

export default function Doc({ otherProps, localeImport, language }) {
  const timePicker = {
    title: "Time Picker",
    code: `import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
${localeImport}${
      language === "fa"
        ? ""
        : `.
.
.
`
    }<DatePicker 
  format="MM/DD/YYYY HH:mm:ss"
  plugins={[
    <TimePicker position="bottom" />
  ]} 
/>`,
    jsx: (
      <DatePicker
        format="MM/DD/YYYY HH:mm:ss"
        plugins={[<TimePicker position="bottom" />]}
        {...otherProps}
      />
    ),
  };

  const onlyTimePicker = {
    title: "Only Time Picker",
    code: `import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
${localeImport}${
      language === "fa"
        ? ""
        : `.
.
.
`
    }<DatePicker 
  disableDayPicker
  format="HH:mm:ss"
  plugins={[
    <TimePicker />
  ]} 
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

  const meridiem = {
    title: "Only Time Picker Meridiem",
    code: `import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
${localeImport}${
      language === "fa"
        ? ""
        : `.
.
.
`
    }<DatePicker
  disableDayPicker
  format="hh:mm:ss A"
  plugins={[
    <TimePicker />
  ]} 
/>`,
    jsx: (
      <DatePicker
        disableDayPicker
        format="hh:mm:ss A"
        plugins={[<TimePicker />]}
        {...otherProps}
      />
    ),
  };

  const hideSeconds = {
    title: "Hiding Seconds",
    code: `import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
${localeImport}${
      language === "fa"
        ? ""
        : `.
.
.
`
    }<DatePicker
  disableDayPicker
  format="HH:mm"
  plugins={[
    <TimePicker hideSeconds />
  ]} 
/>`,
    jsx: (
      <DatePicker
        disableDayPicker
        format="HH:mm"
        plugins={[<TimePicker hideSeconds />]}
        {...otherProps}
      />
    ),
  };

  const onlyMonthPicker = {
    title: "Only Month Picker",
    code: `${localeImport}<DatePicker 
  onlyMonthPicker 
/>`,
    jsx: <DatePicker onlyMonthPicker {...otherProps} />,
  };

  const differentFormat = {
    title: "Only Month Picker With Different Format",
    code: `${localeImport}<DatePicker
  onlyMonthPicker
  format="MMMM YYYY"
/>`,
    jsx: <DatePicker onlyMonthPicker format="MMMM YYYY" {...otherProps} />,
  };

  const onlyYearPicker = {
    title: "Only Year Picker",
    code: `${localeImport}<DatePicker 
  onlyYearPicker 
/>`,
    jsx: <DatePicker onlyYearPicker {...otherProps} />,
  };

  return [
    timePicker,
    onlyTimePicker,
    meridiem,
    hideSeconds,
    onlyMonthPicker,
    differentFormat,
    onlyYearPicker,
  ];
}
