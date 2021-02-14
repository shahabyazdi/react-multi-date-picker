import React, { useState, useEffect, useMemo } from "react"
import DateObject from "react-date-object"
import WeekDays from "../week_days/week_days"

export default function DayPicker({
  state,
  setState,
  onChange,
  showOtherDays = false,
  mapDays,
  onlyShowInRangeDates,
  customWeekDays,
  sort,
  numberOfMonths
}) {
  const [months, setMonths] = useState([]),
    today = useMemo(() => new DateObject({ calendar: state.date.calendar }), [state.date.calendar]),
    mustShowDayPicker = !state.onlyTimePicker && !state.onlyMonthPicker && !state.onlyYearPicker,
    { minDate, maxDate, multiple, range, date } = state

  useEffect(() => {
    if (!mustShowDayPicker) return

    setMonths(getMonths(
      date.year,
      date.month.number,
      date.calendar,
      date.locale,
      showOtherDays,
      numberOfMonths
    ))
    setState(state => { return { ...state, ready: true } })
  }, [
    date.month.number,
    date.year,
    date.calendar,
    date.locale,
    setState,
    mustShowDayPicker,
    showOtherDays,
    numberOfMonths
  ])

  return (mustShowDayPicker &&
    <div className="rmdp-day-picker" style={{ display: "flex" }}>
      {
        months.map((weeks, monthIndex) => {
          return (
            <div key={monthIndex} style={{ margin: "0 5px" }}>
              <WeekDays state={state} customWeekDays={customWeekDays} />
              {
                weeks.map((week, index) => {
                  return (
                    <div key={index} className="rmdp-week">
                      {week.map((object, i) => {
                        //To clear the properties which are added from the previous render
                        object = { date: object.date, current: object.current }

                        let otherProps = {},
                          mustAddClassName = mustDisplayDay(object) && !object.disabled,
                          className = `${mustAddClassName ? "sd" : ""}`

                        if (mapDays instanceof Function) {
                          otherProps = getOtherProps(object)

                          if (mustAddClassName) className = `${className} ${otherProps.className || ""}`
                          if (object.hidden) className = className.replace("sd", "")

                          delete otherProps.className
                        }

                        return (
                          <div
                            key={i}
                            className={getClassName(object, numberOfMonths)}
                            onClick={() => {
                              if (!mustDisplayDay(object)) return
                              if (object.disabled) return

                              selectDay(object, monthIndex, numberOfMonths)
                            }}
                          >
                            <span
                              className={className}
                              {...otherProps}
                            >
                              {mustDisplayDay(object) && !object.hidden ? object.date.format("D") : ""}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )

  function mustDisplayDay(object) {
    if (object.current) return true

    return showOtherDays
  }

  function selectDay({ date, current }, monthIndex, numberOfMonths) {
    date
      .setHour(state.selectedDate?.hour || state.date.hour)
      .setMinute(state.selectedDate?.minute || state.date.minute)
      .setSecond(state.selectedDate?.second || state.date.second)

    let { focused, selectedDate } = state

    if (numberOfMonths === 1 && !current) {
      state.date = new DateObject(date).toFirstOfMonth()
    } else if (numberOfMonths > 1 && !current) {
      if (monthIndex === 0 && date < state.date) {
        state.date = new DateObject(date).toFirstOfMonth()
      }

      if (monthIndex > 0 && date.month.index > state.date.month.index + monthIndex && monthIndex + 1 === numberOfMonths) {
        state.date = new DateObject(state.date).toFirstOfMonth().add(1, "month")
      }
    }

    if (multiple) {
      let dates = selectedDate.filter($date => !isSameDate(date, $date))

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
    }

    onChange(selectedDate, {
      ...state,
      focused,
      selectedDate
    })
  }

  function getClassName(object, numberOfMonths) {
    let names = ["rmdp-day"],
      { date, hidden, current, disabled } = object

    if (!mustDisplayDay(object) || hidden) {
      names.push("rmdp-day-hidden")
    } else {
      if (
        (
          (minDate && date < minDate) ||
          (maxDate && date > maxDate)
        ) ||
        disabled
      ) {
        names.push("rmdp-disabled")

        if (!disabled) object.disabled = true
      }

      if (!current) names.push("rmdp-deactive")

      let mustDisplaySelectedDate = ((numberOfMonths > 1 && current) || numberOfMonths === 1)

      if (
        !disabled ||
        (disabled && !onlyShowInRangeDates)
      ) {
        if (isSameDate(date, today)) names.push("rmdp-today")
        if (isSelected(date) && mustDisplaySelectedDate) {
          names.push("rmdp-selected")
        }
      }

      if (range && !disabled && mustDisplaySelectedDate) {
        let { selectedDate } = state

        if (selectedDate.length === 1) {
          if (isSameDate(date, selectedDate[0])) names.push("rmdp-range")
        } else {
          if (date >= selectedDate[0] && date <= selectedDate[1]) names.push("rmdp-range")
          if (isSameDate(date, selectedDate[0])) names.push("start")
          if (isSameDate(date, selectedDate[1])) names.push("end")
        }
      }
    }

    return names.join(" ")
  }

  function isSelected(date) {
    if (!date || !state.selectedDate) return false

    if (multiple) {
      for (let selectedDate of state.selectedDate) {
        if (isSameDate(selectedDate, date)) return true
      }
    } else {
      return isSameDate(state.selectedDate, date)
    }
  }

  function getOtherProps(object) {
    let otherProps = mapDays({
      date: object.date,
      today,
      currentMonth: state.date.month,
      selectedDate: state.selectedDate,
      isSameDate
    })

    if (!otherProps || (otherProps && otherProps.constructor !== Object)) otherProps = {}

    if (otherProps.disabled || otherProps.hidden) object.disabled = true
    if (otherProps.hidden) object.hidden = true

    delete otherProps.disabled
    delete otherProps.hidden

    return otherProps
  }
}

function getMonths(year, month, calendar, locale, showOtherDays, numberOfMonths) {
  if (!year || !month || !calendar || !locale) return []

  let date = new DateObject({
    calendar,
    locale,
    year,
    month,
    day: 1
  })

  let months = []

  for (let monthIndex = 0; monthIndex < numberOfMonths; monthIndex++) {
    date = new DateObject(date).toFirstOfMonth()

    let monthNumber = date.month.number
    let weeks = []

    date.day -= date.weekDay.index

    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      let week = []

      for (let weekDay = 0; weekDay < 7; weekDay++) {
        week.push({
          date: new DateObject(date),
          current: date.month.number === monthNumber
        })

        date.day += 1
      }

      weeks.push(week)

      if (weekIndex > 2 && date.month.number !== monthNumber && !showOtherDays) break
    }

    months.push(weeks)
  }

  return months
}

export function isSameDate(firstDate, secondDate) {
  if (!firstDate || !secondDate) return false

  return firstDate.year === secondDate.year &&
    firstDate.month.number === secondDate.month.number &&
    firstDate.day === secondDate.day
}