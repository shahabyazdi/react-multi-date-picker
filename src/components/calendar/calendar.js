import React, { useState, useEffect, forwardRef } from "react"
import DayPicker from "../day_picker/day_picker"
import Header from "../header/header"
import MonthPicker from "../month_picker/month_picker"
import YearPicker from "../year_picker/year_picker"
import TimePicker from "../time_picker/time_picker"
import DateObject from "react-date-object"
import "./calendar.css"

function Calendar({
  value,
  calendar = "gregorian",
  locale = "en",
  format,
  timePicker,
  onlyTimePicker,
  onlyMonthPicker,
  onlyYearPicker,
  range = false,
  multiple = false,
  className,
  weekDays,
  months,
  children,
  onChange,
  showOtherDays,
  minDate,
  maxDate,
  mapDays,
  disableMonthPicker,
  disableYearPicker,
  formattingIgnoreList,
  onReady,
  onlyShowInRangeDates = true,
  zIndex = 100,
  plugins = [],
  sort,
  numberOfMonths = 1,
  currentDate,
  onCurrentDateChanged
},
  outerRef
) {
  if (currentDate && (!(currentDate instanceof DateObject))) {
    console.warn("currentDate must be instance of DateObject")

    currentDate = undefined
  }

  if (numberOfMonths < 1) numberOfMonths = 1

  let [state, setState] = useState({ date: currentDate }),
    listeners = {}

  useEffect(() => {
    setState(state => {
      let { date, selectedDate, initialValue, focused, mustSortDates } = state

      function getFormat() {
        if (format) return format
        if (timePicker && !range && !multiple) return "YYYY/MM/DD HH:mm:ss"
        if (onlyTimePicker) return "HH:mm:ss"
        if (onlyMonthPicker) return "MM/YYYY"
        if (onlyYearPicker) return "YYYY"
        if (range || multiple) return "YYYY/MM/DD"
      }

      function checkDate(date) {
        if (date.calendar !== calendar) date.setCalendar(calendar)
        if (date.locale !== locale) date.setLocale(locale)
        if (date._format !== $format) date.setFormat($format)

        return date
      }

      let $timePicker = timePicker,
        $onlyTimePicker = onlyTimePicker,
        $onlyMonthPicker = onlyMonthPicker,
        $onlyYearPicker = onlyYearPicker,
        $multiple = multiple,
        $format = getFormat(),
        $value = value

      if (!$value) {
        if (!date) date = new DateObject({ date, calendar, locale, format: $format })
        if (initialValue) selectedDate = undefined
      }

      if ($value) {
        let values = [].concat($value)
        let isValid = values.every(val => isValidDateObject(val, calendar, locale, $format))

        let isValueSameAsInitialValue = false

        if (!isValid) {
          initialValue = initialValue ? [].concat(initialValue) : []

          isValueSameAsInitialValue = values.every((val, index) => isSame(val, initialValue[index]))
        }

        if (!isValid && !isValueSameAsInitialValue) {
          if (!date) {
            date = new DateObject({
              date: Array.isArray($value) ? $value[$value.length - 1] : $value,
              calendar,
              locale,
              format: $format
            })
          }

          if (!date.isValid) date = new DateObject({ calendar, locale, format: $format })

          selectedDate = getSelectedDate($value, calendar, locale, $format)
        } else {
          selectedDate = isValid ? $value : getSelectedDate($value, calendar, locale, $format)
        }

        if (Array.isArray(selectedDate)) {
          if (!date) {
            let lastSelectedDate = selectedDate[selectedDate.length - 1]

            date = new DateObject(lastSelectedDate)
          }
        } else {
          if (!date) date = new DateObject(selectedDate)
        }
      }

      checkDate(date)

      if (Array.isArray(selectedDate)) {
        selectedDate = selectedDate.map(checkDate)
      } else if (selectedDate) {
        checkDate(selectedDate)
      }
      if ($multiple || range || Array.isArray($value)) {
        if (!selectedDate) selectedDate = []
        if (!Array.isArray(selectedDate)) selectedDate = [selectedDate]
        if (!range && !$multiple) $multiple = true

        if (range && selectedDate.length > 2) {
          let lastItem = selectedDate[selectedDate.length - 1]

          selectedDate = [selectedDate[0], lastItem]
          focused = lastItem
        }

        if ($multiple && sort && !mustSortDates) {
          mustSortDates = true
          selectedDate.sort((a, b) => a - b)
        } else if (range) {
          selectedDate.sort((a, b) => a - b)
        }

        $timePicker = false
        $onlyTimePicker = false
        $onlyMonthPicker = false
        $onlyYearPicker = false
      } else if (Array.isArray(selectedDate)) {
        selectedDate = selectedDate[selectedDate.length - 1]
      }

      return {
        ...state,
        date: date,
        selectedDate,
        multiple: $multiple,
        range,
        timePicker: $timePicker,
        onlyTimePicker: $onlyTimePicker,
        onlyMonthPicker: $onlyMonthPicker,
        onlyYearPicker: $onlyYearPicker,
        initialValue: state.initialValue || $value,
        value: $value,
        focused,
        calendar,
        locale,
        format: $format,
        mustSortDates
      }
    })
  }, [
    value,
    calendar,
    locale,
    format,
    timePicker,
    onlyTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    range,
    multiple,
    sort
  ])

  useEffect(() => {
    if (!minDate && !maxDate) return

    setState(state => {
      let { calendar, locale, format } = state

      let [selectedDate, $minDate, $maxDate] = getDateInRangeOfMinAndMaxDate(
        getSelectedDate(value, calendar, locale, format),
        minDate,
        maxDate
      )

      return {
        ...state,
        inRangeDates: onlyShowInRangeDates ? selectedDate : state.selectedDate,
        minDate: $minDate,
        maxDate: $maxDate
      }
    })
  }, [minDate, maxDate, onlyShowInRangeDates, value])

  useEffect(() => {
    if (state.ready && onReady instanceof Function) onReady()
  }, [state.ready, onReady])

  let topClassName = getBorderClassName(["top", "bottom"]),
    clonedPlugins = { top: [], bottom: [], left: [], right: [] },
    isRTL = ["fa", "ar"].includes(state.date?.locale)

  initPlugins(arguments[0])

  return (state.date ?
    <div
      ref={outerRef}
      className={`rmdp-wrapper ${state.ready ? "active" : ""} ${className || ""}`}
      style={{ zIndex, direction: "ltr" }}
    >
      {clonedPlugins.top}
      <div style={{ display: "flex" }} className={topClassName}>
        {clonedPlugins.left}
        <div
          style={{ height: "max-content", margin: "auto" }}
          className={`rmdp-calendar ${isRTL ? "rmdp-rtl" : ""} ${getBorderClassName(["left", "right"])}`}
        >
          <Header
            state={state}
            setState={setState}
            onChange={handleChange}
            disableYearPicker={disableYearPicker}
            disableMonthPicker={disableMonthPicker}
            customMonths={months}
            numberOfMonths={numberOfMonths}
          />
          <div style={{ position: "relative" }}>
            <DayPicker
              state={state}
              setState={setState}
              onChange={handleChange}
              showOtherDays={showOtherDays}
              mapDays={mapDays}
              listeners={listeners}
              onlyShowInRangeDates={onlyShowInRangeDates}
              customWeekDays={weekDays}
              sort={sort}
              numberOfMonths={numberOfMonths}
              isRTL={isRTL}
            />
            <MonthPicker
              state={state}
              setState={setState}
              onChange={handleChange}
              customMonths={months}
            />
            <YearPicker
              state={state}
              setState={setState}
              onChange={handleChange}
            />
          </div>
          <TimePicker
            state={state}
            setState={setState}
            onChange={handleChange}
            formattingIgnoreList={formattingIgnoreList}
          />
          {children}
        </div>
        {clonedPlugins.right}
      </div>
      {clonedPlugins.bottom}
    </div>
    :
    null
  )

  function initPlugins(calendarProps) {
    if (!state.ready) return

    plugins.forEach((plugin, index) => {
      let nodes = {},
        position = plugin.props.position || "right"

      if (!clonedPlugins[position] || plugin.props.disabled) return

      for (let i = 0; i < plugins.length; i++) {
        if (plugins[i].props.disabled) continue
        if (Object.keys(nodes).length === 4) break

        let pluginPosition = plugins[i].props.position || "right"

        if (["top", "bottom"].includes(position)) {
          if (pluginPosition === position && i > index) nodes.bottom = true
          if (pluginPosition === position && i < index) nodes.top = true
        } else {
          if (topClassName.includes("top")) nodes.top = true
          if (topClassName.includes("bottom")) nodes.bottom = true
          if (pluginPosition === position && i > index) nodes.right = true
          if (pluginPosition === position && i < index) nodes.left = true
        }
      }

      clonedPlugins[position].push(React.cloneElement(plugin, {
        key: index,
        state,
        setState,
        position,
        registerListener,
        calendarProps,
        handleChange,
        nodes
      }))
    })
  }

  function handleChange(selectedDate, $state) {
    //This one must be done before setState
    if ((selectedDate || selectedDate === null) && listeners.change) listeners.change.forEach(callback => callback(selectedDate))

    if ($state) {
      if (
        onCurrentDateChanged instanceof Function &&
        (
          !currentDate ||
          (currentDate && currentDate.valueOf() !== $state.date.valueOf())
        )
      ) {
        onCurrentDateChanged($state.date)
      }

      setState($state)
    }

    if ((selectedDate || selectedDate === null) && onChange instanceof Function) onChange(selectedDate)
  }

  function getBorderClassName(positions) {
    return Array.from(
      new Set(
        plugins.map(plugin => {
          let position = plugin.props.position || "right"

          if (
            positions.includes(position) &&
            !plugin.props.disabled
          ) return "rmdp-border-" + position

          return ""
        })
      )
    ).join(" ")
  }

  function registerListener(event, callback) {
    if (!listeners[event]) listeners[event] = []

    listeners[event].push(callback)
  }
}

export default forwardRef(Calendar)

function isValidDateObject(date, calendar, locale, format) {
  return date instanceof DateObject &&
    date.isValid &&
    date.calendar === calendar &&
    date.locale === locale &&
    date._format === format
}

function isSame(arg1, arg2) {
  if ((arg1 instanceof Date) && !(arg2 instanceof Date)) return false
  if ((arg1 instanceof DateObject) && !(arg2 instanceof DateObject)) return false
  if ((arg1 instanceof Date) || (arg1 instanceof DateObject)) {
    if (arg1 instanceof Date && !isValidDate(arg1) && !isValidDate(arg2)) return true

    return arg1 - arg2 === 0
  }

  return arg1 === arg2
}

function isValidDate(date) {
  return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())
}

function getDateInRangeOfMinAndMaxDate(date, minDate, maxDate) {
  let { calendar } = date

  if (minDate) minDate = toDateObject(minDate, calendar).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  if (maxDate) maxDate = toDateObject(maxDate, calendar).set({ hour: 23, minute: 59, second: 59, millisecond: 999 })

  if (Array.isArray(date)) {
    date = date.filter(dateObject => {
      if (minDate && dateObject < minDate) return false
      if (maxDate && dateObject > maxDate) return false

      return true
    })
  }

  return [date, minDate, maxDate]
}

function toDateObject(date, calendar) {
  if (typeof date === "number" && date > 9999999999) date = new Date(date)

  if (date instanceof DateObject) {
    if (date.calendar !== calendar) date.setCalendar(calendar)
  } else {
    date = new DateObject({ date, calendar })
  }

  return date
}

function getSelectedDate(value, calendar, locale, format) {
  let selectedDate = undefined
  let getObject = date => { return { date, calendar, locale, format } }

  if (Array.isArray(value)) {
    selectedDate = value.map(val => {
      if (val instanceof DateObject) return val

      let date = new DateObject(getObject(val))

      return date.isValid ? date : undefined
    }).filter(i => i !== undefined)
  } else if (value instanceof DateObject) {
    selectedDate = value.isValid ? value : undefined
  } else {
    selectedDate = new DateObject(getObject(value))

    if (!selectedDate.isValid) selectedDate = undefined
  }

  return selectedDate
}