import React from "react";
import DatePicker from "../../../build/index";
import TimePicker from "../../../plugins/time_picker";

export default function OtherPickers(translate, language, otherProps) {
  const timePicker = {
    title: "Time Picker",
    code: `<DatePicker 
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
    code: `<DatePicker 
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
    code: `<DatePicker
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

  const onlyMonthPicker = {
    title: "Only Month Picker",
    code: `<DatePicker 
  onlyMonthPicker 
/>`,
    jsx: <DatePicker onlyMonthPicker {...otherProps} />,
  };

  const differentFormat = {
    title: "Only Month Picker With Different Format",
    code: `<DatePicker
  onlyMonthPicker
  format="MMMM YYYY"
/>`,
    jsx: <DatePicker onlyMonthPicker format="MMMM YYYY" {...otherProps} />,
  };

  const onlyYearPicker = {
    title: "Only Year Picker",
    code: `<DatePicker 
  onlyYearPicker 
/>`,
    jsx: <DatePicker onlyYearPicker {...otherProps} />,
  };

  return [
    timePicker,
    onlyTimePicker,
    meridiem,
    onlyMonthPicker,
    differentFormat,
    onlyYearPicker,
  ];
}
