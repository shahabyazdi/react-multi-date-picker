import React, { useMemo } from "react"
import { selectDate } from "../day_picker/day_picker"
import DateObject from "react-date-object"

export default function MonthPicker({ state, onChange, customMonths }) {
  const { date, today, minDate, maxDate, calendar, locale, onlyMonthPicker, onlyYearPicker, multiple, range, sort, onlyShowInRangeDates } = state,
    mustShowMonthPicker = (state.mustShowMonthPicker || onlyMonthPicker) && !state.onlyTimePicker && !onlyYearPicker

  const months = useMemo(() => {
    let months = customMonths,
      monthsArray = [],
      index = 0,
      date = new DateObject({
        calendar,
        locale,
        year: state.date.year,
        month: 1,
        day: 1
      })

    if (Array.isArray(months) && months.length >= 12) {
      months.length = 12

      months = months.map(month => Array.isArray(month) ? month[0] : month)
    } else {
      months = date.months.map(month => month.name)
    }

    for (var i = 0; i < 4; i++) {
      let array = []

      for (var j = 0; j < 3; j++) {
        array.push({
          date: new DateObject(date),
          name: months[index]
        })

        index++
        date.add(1, "month")
      }

      monthsArray.push(array)
    }

    return monthsArray
  }, [calendar, locale, customMonths, state.date.year])

  return (
    <div
      className={`${onlyMonthPicker ? "only " : ""}rmdp-month-picker`}
      style={{ display: mustShowMonthPicker ? "block" : "none" }}
    >
      {months.map((array, i) => (
        <div key={i} className="rmdp-ym">
          {array.map(({ date, name }, j) => (
            <div
              key={j}
              className={getClassName(date)}
              onClick={() => selectMonth(date)}
            >
              <span className={onlyMonthPicker ? "sd" : ""}>{name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  function selectMonth(dateObject) {
    let { selectedDate, focused } = state,
      { year, month: { index } } = dateObject

    if (minDate && year <= minDate.year && index < minDate.month.index) return
    if (maxDate && year >= maxDate.year && index > maxDate.month.index) return

    date.setMonth(index + 1)

    if (onlyMonthPicker) [selectedDate, focused] = selectDate(date, state)

    onChange(
      onlyMonthPicker ? selectedDate : undefined,
      {
        ...state,
        date,
        focused,
        selectedDate,
        mustShowMonthPicker: false
      }
    )
  }

  function getClassName(dateObject) {
    let names = ["rmdp-day"],
      { year, month: { number, index } } = dateObject,
      { selectedDate } = state

    if (minDate && year <= minDate.year && index < minDate.month.index) names.push("rmdp-disabled")
    if (maxDate && year >= maxDate.year && index > maxDate.month.index) names.push("rmdp-disabled")

    if (names.includes("rmdp-disabled") && onlyShowInRangeDates) return
    if (isSameMonth(today, dateObject)) names.push("rmdp-today")

    if (!onlyMonthPicker) {
      if (date.month.index === index) names.push("rmdp-selected")
    } else {
      if (!range) {
        if ([].concat(selectedDate).some(date => isSameMonth(date, dateObject))) names.push("rmdp-selected")
      } else {
        let first = selectedDate[0],
          second = selectedDate[1]

        if (selectedDate.length === 1) {
          if (isSameMonth(dateObject, first)) names.push("rmdp-range")
        } else if (selectedDate.length === 2) {
          /**
           * dateObject >= first && dateObject <= second
           * doesn't work if user enter currentDate
           */
          if (
            (
              year > first.year ||
              (year === first.year && number >= first.month.number)
            ) &&
            (
              year < second.year ||
              (year === second.year && number <= second.month.number)
            )
          ) {
            names.push("rmdp-range")
          }

          if (isSameMonth(dateObject, first)) names.push("start")
          if (isSameMonth(dateObject, second)) names.push("end")
        }
      }
    }

    return names.join(" ")
  }

  function isSameMonth(firstDate, secondDate) {
    if (!firstDate || !secondDate) return false

    return firstDate.year === secondDate.year &&
      firstDate.month.number === secondDate.month.number
  }
}