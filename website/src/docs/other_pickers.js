import React from "react"
import DatePicker from "../../../build/index"

export default function (translate, language, otherProps) {
  const timePicker = {
    title: "Time Picker",
    code: `<DatePicker 
  timePicker 
/>`,
    jsx: <DatePicker
      timePicker
      {...otherProps}
    />
  }

  const onlyTimePicker = {
    title: "Only Time Picker",
    code: `<DatePicker 
  onlyTimePicker 
/>`,
    jsx: <DatePicker
      onlyTimePicker
      {...otherProps}
    />
  }

  const meridiem = {
    title: "Only Time Picker Meridiem",
    code: `<DatePicker
  format="hh:mm:ss A"
  onlyTimePicker
/>`,
    jsx: <DatePicker
      format="hh:mm:ss A"
      onlyTimePicker
      {...otherProps}
    />
  }

  const onlyMonthPicker = {
    title: "Only Month Picker",
    code: `<DatePicker 
  onlyMonthPicker 
/>`,
    jsx: <DatePicker
      onlyMonthPicker
      {...otherProps}
    />
  }

  const differentFormat = {
    title: "Only Month Picker With Different Format",
    code: `<DatePicker
  onlyMonthPicker
  format="MMMM YYYY"
/>`,
    jsx: <DatePicker
      onlyMonthPicker
      format="MMMM YYYY"
      {...otherProps}
    />
  }

  const onlyYearPicker = {
    title: "Only Year Picker",
    code: `<DatePicker 
  onlyYearPicker 
/>`,
    jsx: <DatePicker
      onlyYearPicker
      {...otherProps}
    />
  }

  return [
    timePicker,
    onlyTimePicker,
    meridiem,
    onlyMonthPicker,
    differentFormat,
    onlyYearPicker
  ]
}