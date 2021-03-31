import React from "react"
import DatePicker from "../../../build/index"

export default function (translate, language, otherProps) {
  const animation = {
    title: "Animation",
    code: `<DatePicker 
  animation 
/>`,
    jsx: <DatePicker animation {...otherProps} />
  }

  const otherDays = {
    title: "Other Days",
    code: `<DatePicker 
  showOtherDays 
/>`,
    jsx: <DatePicker showOtherDays {...otherProps} />
  }

  const scroll = {
    title: "Disabling Scroll Sensitivity",
    description: "disable_scroll",
    code: `<DatePicker 
  scrollSensitive={false} 
/>`,
    jsx: <DatePicker scrollSensitive={false} {...otherProps} />
  }

  const hide = {
    title: "Hide On Scroll",
    code: `<DatePicker 
  hideOnScroll 
/>`,
    jsx: <DatePicker hideOnScroll {...otherProps} />
  }

  const format = {
    title: "Ignore Formatting",
    code: `<DatePicker
  timePicker
  format="Date:YYYY/MM/DD, Time:HH:mm:ss"
  formattingIgnoreList={["Date", "Time"]}
/>`,
    jsx: <DatePicker
      timePicker
      format="Date:YYYY/MM/DD, Time:HH:mm:ss"
      formattingIgnoreList={["Date", "Time"]}
      {...otherProps}
    />
  }

  const virtualKeyboard = {
    title: "Disable Virtual Keyboard",
    code: `<DatePicker
  inputMode="none"
/>`,
    jsx: <DatePicker inputMode="none" {...otherProps} />
  }

  const editing = {
    title: "Disable Editing",
    description: "disable_edit",
    code: `<DatePicker
  editable={false}
/>`,
    jsx: <DatePicker editable={false} {...otherProps} />
  }

  const placeholder = {
    title: "Placeholder",
    code: `<DatePicker
  placeholder="click to open"
/>`,
    jsx: <DatePicker placeholder="click to open" {...otherProps} />
  }

  const yearPicker = {
    title: "Disable Year Picker",
    code: `<DatePicker 
  disableYearPicker 
/>`,
    jsx: <DatePicker disableYearPicker {...otherProps} />
  }

  const monthPicker = {
    title: "Disable Month Picker",
    code: `<DatePicker 
  disableMonthPicker 
/>`,
    jsx: <DatePicker disableMonthPicker mind {...otherProps} />
  }

  const disabledInput = {
    title: "Disabled Input",
    code: `<DatePicker 
  disabled 
/>`,
    jsx: <DatePicker disabled {...otherProps} />
  }

  const disabledButton = {
    title: "Disabled Button",
    code: `<DatePicker
  type="button"
  placeholder="this button is disabled"
  disabled
/>`,
    jsx: <DatePicker
      type="button"
      placeholder="this button is disabled"
      disabled
      {...otherProps}
    />
  }

  return [
    animation,
    otherDays,
    scroll,
    hide,
    format,
    virtualKeyboard,
    editing,
    placeholder,
    yearPicker,
    monthPicker,
    disabledInput,
    disabledButton
  ]
}