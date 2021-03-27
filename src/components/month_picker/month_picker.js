import React, { useMemo } from "react"
import DateObject from "react-date-object"

export default function MonthPicker({ state, onChange, customMonths }) {
  const { minDate, maxDate, calendar, locale, onlyMonthPicker, multiple, range, sort, onlyShowInRangeDates } = state,
    today = useMemo(() => new DateObject({ calendar: state.date.calendar }), [state.date.calendar]),
    mustShowMonthPicker = (state.mustShowMonthPicker || onlyMonthPicker) && !state.onlyTimePicker && !state.onlyYearPicker

  const months = useMemo(() => {
    let months = customMonths

    if (Array.isArray(months) && months.length >= 12) {
      months.length = 12

      months = months.map(month => Array.isArray(month) ? month[0] : month)
    } else {
      months = new DateObject({
        year: undefined,
        calendar,
        locale,

      }).months.map(month => month.name)
    }

    let date = new DateObject({
      calendar,
      locale,
      year: state.date.year,
      month: 1,
      day: 1
    })

    let monthsArray = []
    let index = 0

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
      {months.map((array, i) => <div key={i} className="rmdp-ym">
        {array.map(({ date, name }, j) => <div
          key={j}
          className={getClassName(i * 3 + j, date)}
          onClick={() => selectMonth(i * 3 + j, date)}
        >
          <span className={onlyMonthPicker ? "sd" : ""}>{name}</span>
        </div>
        )}
      </div>
      )}
    </div>
  )

  function selectMonth(monthIndex, dateObject) {
    let { date, selectedDate, focused } = state

    if (minDate && date.year <= minDate.year && monthIndex < minDate.month.index) return
    if (maxDate && date.year >= maxDate.year && monthIndex > maxDate.month.index) return

    date = date.setMonth(monthIndex + 1)

    if (multiple) {
      let dates = selectedDate.filter($date => !isSameMonth(date, $date))

      if (dates.length === selectedDate.length) dates.push(new DateObject(date))

      selectedDate = dates
      focused = dates[dates.length - 1]

      if (sort) selectedDate.sort((a, b) => a - b)
    } else if (range) {
      if (selectedDate.length === 2 || selectedDate.length === 0) {
        console.log("0");
        selectedDate = [new DateObject(dateObject)]
      } else if (selectedDate.length === 1) {
        console.log("1");
        selectedDate.push(new DateObject(dateObject))
        selectedDate.sort((a, b) => a - b)
      }
    }

    onChange(
      onlyMonthPicker ? selectedDate : undefined,
      {
        ...state,
        date,
        selectedDate,
        mustShowMonthPicker: false
      }
    )
  }

  function getClassName(monthIndex, dateObject) {
    let names = ["rmdp-day"],
      { date, selectedDate } = state

    if (minDate && dateObject.year <= minDate.year && monthIndex < minDate.month.index) names.push("rmdp-disabled")
    if (maxDate && dateObject.year >= maxDate.year && monthIndex > maxDate.month.index) names.push("rmdp-disabled")

    if (names.includes("rmdp-disabled") && onlyShowInRangeDates) return

    if (!onlyMonthPicker) {
      if (date.month.index === monthIndex) names.push("rmdp-selected")
    } else {
      if (isSameMonth(today, dateObject)) names.push("rmdp-today")

      if (!range) {
        if ([].concat(selectedDate).some(date => isSameMonth(date, dateObject))) names.push("rmdp-selected")
      } else {
        if (selectedDate.length === 1) {
          if (isSameMonth(dateObject, selectedDate[0])) names.push("rmdp-range")
        } else if (selectedDate.length === 2) {
          let { year, month } = dateObject,
            first = selectedDate[0],
            second = selectedDate[1]
          /**
           * date >= selectedDate[0] && date <= selectedDate[1] 
           * doesn't work if user enter currentDate
           */
          if (
            (
              year > first.year ||
              (year === first.year && month.number >= first.month.number)
            ) &&
            (
              year < second.year ||
              (year === second.year && month.number <= second.month.number)
            )
          ) {
            names.push("rmdp-range")
          }

          if (isSameMonth(dateObject, selectedDate[0])) names.push("start")
          if (isSameMonth(dateObject, selectedDate[1])) names.push("end")
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