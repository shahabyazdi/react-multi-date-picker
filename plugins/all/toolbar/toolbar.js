import React from "react"
import DateObject from "react-date-object"
import "./toolbar.css"

export default function Toolbar({ state, handleChange, position, calendarProps, nodes, className, ...props }) {
  let name = { fa: { TODAY: "امروز", DESELECT: "لغو", CLOSE: "بستن" } },
    localeName = name[state.locale] || { TODAY: "TODAY", DESELECT: "DESELECT", CLOSE: "CLOSE" },
    classNames = ["rmdp-toolbar", position]

  if (["left", "right"].includes(position)) {
    if (nodes.left) classNames.push("rmdp-border-left")
    if (nodes.right) classNames.push("rmdp-border-right")
  } else {
    if (nodes.top) classNames.push("rmdp-border-top")
    if (nodes.bottom) classNames.push("rmdp-border-bottom")
  }

  delete props.setState
  delete props.registerListener

  return (
    <div className={`${classNames.join(" ")} ${className}`} {...props}>
      <div onClick={selectToday}>{localeName["TODAY"]}</div>
      <div onClick={deselect}>{localeName["DESELECT"]}</div>
      {calendarProps.datePickerRef && <div onClick={close}>{localeName["CLOSE"]}</div>}
    </div>
  )

  function selectToday() {
    let { calendar, locale, formar, range, multiple, selectedDate, date } = state,
      { hour, minute, second, millisecond } = date,
      today = new DateObject({ calendar, locale, formar })

    today.set({ hour, minute, second, millisecond })

    if (range) {
      if (!selectedDate) selectedDate = []

      if (selectedDate.length === 0) {
        selectedDate.push(today)
      } else if (selectedDate.length === 2) {
        selectedDate = [today]
      } else if (selectedDate.length === 1) {
        selectedDate.push(today)
        selectedDate.sort((a, b) => a - b)
      }
    } else if (multiple) {
      selectedDate = [today]
    } else {
      selectedDate = today
    }

    handleChange(selectedDate, { ...state, selectedDate })
  }

  function deselect() {
    let { range, multiple } = state,
      selectedDate = range || multiple ? [] : null

    handleChange(selectedDate, { ...state, selectedDate })
  }

  function close() {
    calendarProps.datePickerRef.current.closeCalendar()
  }
}