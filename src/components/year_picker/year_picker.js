import React, { useMemo } from "react"
import DateObject from "react-date-object"

export default function YearPicker({ state, onChange }) {
  const { date, minDate, maxDate, onlyYearPicker, multiple, range, onlyShowInRangeDates } = state,
    today = useMemo(() => new DateObject({ calendar: state.date.calendar }), [state.date.calendar]),
    digits = date.digits,
    mustShowYearPicker = (state.mustShowYearPicker || onlyYearPicker) && !state.onlyTimePicker

  const years = useMemo(() => {
    let yearArray = [],
      year = today.year - 4,
      minYear = year,
      maxYear = year + 11

    while (state.year < minYear || state.year > maxYear) {
      year += state.year < minYear ? -12 : 12
      minYear = year
      maxYear = year + 11
    }

    for (var i = 0; i < 4; i++) {
      let array = []

      for (var j = 0; j < 3; j++) {
        array.push(year)
        year++
      }

      yearArray.push(array)
    }

    return yearArray
  }, [state.year, today.year])

  return (
    <div
      className={`${onlyYearPicker ? "only " : ""}rmdp-year-picker`}
      style={{ display: mustShowYearPicker ? "block" : "none" }}
    >
      {years.map((array, i) => <div
        key={i}
        className="rmdp-ym"
      >
        {array.map((year, j) => <div
          key={j}
          className={getClassName(year)}
          onClick={() => selectYear(year)}
        >
          <span className={onlyYearPicker ? "sd" : ""}>
            {year.toString().replace(/[0-9]/g, w => digits[w])}
          </span>
        </div>
        )}
      </div>
      )}
    </div>
  )

  function selectYear(year) {
    if (minDate && year < minDate.year) return
    if (maxDate && year > maxDate.year) return

    let date = new DateObject(state.date).setYear(year)

    let { selectedDate, focused, sort } = state

    if (onlyYearPicker) {
      if (multiple) {
        let dates = selectedDate.filter($date => $date.year !== year)

        if (dates.length === selectedDate.length) dates.push(new DateObject(date))

        selectedDate = dates
        focused = dates[dates.length - 1]

        if (sort) selectedDate.sort((a, b) => a - b)
      } else if (range) {
        if (selectedDate.length === 2 || selectedDate.length === 0) {
          selectedDate = [new DateObject(date)]
        } else if (selectedDate.length === 1) {
          selectedDate.push(new DateObject(date))
          selectedDate.sort((a, b) => a - b)
        }
      } else {
        selectedDate = new DateObject(date)

        if (minDate && date.month.number < minDate.month.number) {
          date = date.setMonth(minDate.month.number)
        } else if (maxDate && date.month.number > maxDate.month.number) {
          date = date.setMonth(maxDate.month.number)
        }
      }
    }

    onChange(
      onlyYearPicker ? selectedDate : undefined,
      {
        ...state,
        date,
        selectedDate,
        mustShowYearPicker: false,
        year: state.year
      }
    )
  }

  function getClassName(year) {
    let names = ["rmdp-day"],
      { date, selectedDate } = state

    if (minDate && year < minDate.year) names.push("rmdp-disabled")
    if (maxDate && year > maxDate.year) names.push("rmdp-disabled")

    if (names.includes("rmdp-disabled") && onlyShowInRangeDates) return
    if (today.year === year) names.push("rmdp-today")

    if (!onlyYearPicker) {
      if (year === date.year) names.push("rmdp-selected")
    } else {
      if (!range) {
        if ([].concat(selectedDate).some(date => date.year === year)) names.push("rmdp-selected")
      } else {
        if (selectedDate.length === 1) {
          if (year === selectedDate[0].year) names.push("rmdp-range")
        } else if (selectedDate.length === 2) {
          let first = selectedDate[0],
            second = selectedDate[1]
          /**
           * date >= selectedDate[0] && date <= selectedDate[1] 
           * doesn't work if user enter currentDate
           */
          if (year >= first.year && year <= second.year) names.push("rmdp-range")

          if (year === selectedDate[0].year) names.push("start")
          if (year === selectedDate[1].year) names.push("end")
        }
      }
    }

    return names.join(" ")
  }
}