import React, { useState, useEffect, useRef, useMemo } from "react"
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
  sort
}) {
  const [weeks, setWeeks] = useState([]),
    ref = useRef(false),
    today = useMemo(() => new DateObject({ calendar: state.date.calendar }), [state.date.calendar]),
    mustShowDayPicker = !state.onlyTimePicker && !state.onlyMonthPicker && !state.onlyYearPicker,
    { minDate, maxDate } = state

  useEffect(() => {
    if (!mustShowDayPicker) return

    if (ref.current) {
      let { month, year, locale, calendar } = ref.current

      if (
        state.date.month.number === month.number &&
        state.date.year === year &&
        state.date.locale === locale &&
        state.date.calendar === calendar &&
        ref.current.showOtherDays === showOtherDays
      ) return
    }

    ref.current = state.date.toObject()
    ref.current.showOtherDays = showOtherDays

    setWeeks(getWeeks(state.date, showOtherDays))
    setState(state => { return { ...state, ready: true } })
  }, [
    state.date,
    state.date.month,
    state.date.year,
    setState,
    mustShowDayPicker,
    showOtherDays
  ])

  return (mustShowDayPicker &&
    <div className="rmdp-day-picker">
      <WeekDays state={state} customWeekDays={customWeekDays} />
      {weeks.map((week, index) => <div key={index} className="rmdp-week">
        {week.map((object, i) => {
          //To clear the properties which are added from the previous render
          object = { date: object.date, current: object.current }

          let otherProps = {},
            mustAddClassName = mustDisplayDay(object) && !object.disabled,
            className = `${mustAddClassName ? "sd" : ""}`

          if (mapDays instanceof Function) {
            otherProps = getOtherProps(object)

            if (mustAddClassName) className = `${className} ${otherProps.className || ""}`

            delete otherProps.className
          }

          return (
            <div
              key={i}
              className={getClassName(object)}
              onClick={() => {
                if (!mustDisplayDay(object)) return
                if (object.disabled) return

                selectDay(object.date)
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
      </div>)}
    </div>
  )

  function mustDisplayDay(object) {
    if (object.current) return true

    return showOtherDays
  }

  function selectDay(date) {
    date
      .setHour(state.selectedDate?.hour || state.date.hour)
      .setMinute(state.selectedDate?.minute || state.date.minute)
      .setSecond(state.selectedDate?.second || state.date.second)

    let $state = {
      ...state,
      date: new DateObject(date),
      focused: date
    }

    if (state.multiple) {
      let dates = $state.selectedDate.filter($date => !isSameDate(date, $date))

      if (dates.length === $state.selectedDate.length) dates.push(new DateObject(date))

      $state.selectedDate = dates
      $state.focused = dates[dates.length - 1]

      if (sort) $state.selectedDate.sort((a, b) => a - b)
    } else if (state.range) {
      if ($state.selectedDate.length === 2 || $state.selectedDate.length === 0) {
        $state.selectedDate = [new DateObject(date)]
      } else if ($state.selectedDate.length === 1) {
        $state.selectedDate.push(new DateObject(date))
        $state.selectedDate.sort((a, b) => a - b)
      }
    } else {
      $state.selectedDate = new DateObject(date)
    }

    onChange($state.selectedDate, $state)
  }

  function getClassName(object) {
    let names = ["rmdp-day"]

    if (!mustDisplayDay(object) || object.hidden) {
      names.push("rmdp-day-hidden")
    } else {
      if (
        (
          (minDate && object.date < minDate) ||
          (maxDate && object.date > maxDate)
        ) ||
        object.disabled
      ) {
        names.push("rmdp-disabled")

        if (!object.disabled) object.disabled = true
      }

      if (!object.current) names.push("rmdp-deactive")

      if (
        !object.disabled ||
        (object.disabled && !onlyShowInRangeDates)
      ) {
        if (isSameDate(object.date, today)) names.push("rmdp-today")
        if (isSelected(object.date)) names.push("rmdp-selected")
      }

      if (state.range && !object.disabled) {
        let { selectedDate } = state

        if (selectedDate.length === 1) {
          if (isSameDate(object.date, selectedDate[0])) names.push("rmdp-range")
        } else {
          if (object.date >= selectedDate[0] && object.date <= selectedDate[1]) names.push("rmdp-range")
          if (isSameDate(object.date, selectedDate[0])) names.push("start")
          if (isSameDate(object.date, selectedDate[1])) names.push("end")
        }
      }
    }

    return names.join(" ")
  }

  function isSelected(date) {
    if (!date || !state.selectedDate) return false

    if (state.multiple) {
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

function getWeeks(date, showOtherDays) {
  if (!date) return []

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

    if (weekIndex > 2 && date.month.number !== monthNumber && !showOtherDays) return weeks
  }

  return weeks
}

export function isSameDate(firstDate, secondDate) {
  if (!firstDate || !secondDate) return false

  return firstDate.year === secondDate.year &&
    firstDate.month.number === secondDate.month.number &&
    firstDate.day === secondDate.day
}