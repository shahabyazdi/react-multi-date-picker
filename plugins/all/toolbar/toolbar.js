import React from "react";
import DateObject from "react-date-object";
import "./toolbar.css";

export default function Toolbar({
  state,
  handleChange,
  position,
  calendarProps,
  nodes,
  className,
  names,
  ...props
}) {
  let name = {
      fa: { today: "امروز", deselect: "لغو", close: "بستن" },
      en: { today: "TODAY", deselect: "DESELECT", close: "CLOSE" },
    },
    localeName = names || name[state.locale] || name.en,
    classNames = ["rmdp-toolbar", position];

  if (["left", "right"].includes(position)) {
    if (nodes.left) classNames.push("rmdp-border-left");
    if (nodes.right) classNames.push("rmdp-border-right");
  } else {
    if (nodes.top) classNames.push("rmdp-border-top");
    if (nodes.bottom) classNames.push("rmdp-border-bottom");
  }

  delete props.setState;
  delete props.registerListener;

  return (
    <div className={`${classNames.join(" ")} ${className}`} {...props}>
      <div onClick={selectToday}>{localeName.today}</div>
      <div onClick={deselect}>{localeName.deselect}</div>
      {calendarProps.datePickerRef && (
        <div onClick={close}>{localeName.close}</div>
      )}
    </div>
  );

  function selectToday() {
    let {
        calendar,
        locale,
        format,
        range,
        multiple,
        selectedDate,
        date,
      } = state,
      { hour, minute, second, millisecond } = date,
      today = new DateObject({ calendar, locale, format });

    today.set({ hour, minute, second, millisecond });

    if (range) {
      if (!selectedDate) selectedDate = [];

      if (selectedDate.length === 0) {
        selectedDate.push(today);
      } else if (selectedDate.length === 2) {
        selectedDate = [today];
      } else if (selectedDate.length === 1) {
        selectedDate.push(today);
        selectedDate.sort((a, b) => a - b);
      }
    } else if (multiple) {
      selectedDate = [today];
    } else {
      selectedDate = today;
    }

    handleChange(selectedDate, { ...state, selectedDate });
  }

  function deselect() {
    let { range, multiple } = state,
      selectedDate = range || multiple ? [] : null;

    handleChange(selectedDate, { ...state, selectedDate });
  }

  function close() {
    calendarProps.datePickerRef.current.closeCalendar();
  }
}
