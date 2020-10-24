import React, { useState, useEffect } from "react"
import DayPicker from "../day_picker/day_picker"
import Header from "../header/header"
import MonthPicker from "../month_picker/month_picker"
import YearPicker from "../year_picker/year_picker"
import DaysPanel from "../days_panel/days_panel"
import TimePicker from "../time_picker/time_picker"
import DateObject from "react-date-object"
import "./calendar.css"

export default function Calendar({
    value,
    calendar = "gregorian",
    local = "en",
    format,
    timePicker,
    onlyTimePicker,
    onChange,
    range = false,
    multiple = false,
    mustShowDates = true,
    className,
    weekDays,
    months
}) {
    let [state, setState] = useState({})

    useEffect(() => {
        setState(state => {
            let { date, selectedDate, initialValue } = state

            let $mustShowDates = multiple || range || Array.isArray(value) ? mustShowDates : false,
                $timePicker = timePicker,
                $onlyTimePicker = onlyTimePicker,
                $multiple = multiple,
                $format = onlyTimePicker && !format ? "HH:mm:ss" : format,
                $value = value

            function getSelectedDate(value) {
                let selectedDate = undefined
                let getObject = date => { return { date, calendar, local, format: $format } }

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

            function checkDate(date) {
                if (date.calendar !== calendar) date.setCalendar(calendar)
                if (date.local !== local) date.setLocal(local)
                if (date._format !== $format) date.setFormat($format)

                return date
            }

            if (!$value) {
                if (!date) date = new DateObject({ date, calendar, local, format: $format })
                if (initialValue) selectedDate = undefined
            }

            if ($value) {
                let values = [].concat($value)
                let isValid = values.every(val => isValidDateObject(val, calendar, local, $format))

                let isValueSameAsInitialValue = false

                if (!isValid) {
                    initialValue = initialValue ? [].concat(initialValue) : []

                    isValueSameAsInitialValue = values.every((val, index) => isSame(val, initialValue[index]))
                }

                if (!isValid && !isValueSameAsInitialValue) {
                    date = new DateObject({
                        date: Array.isArray($value) ? $value[$value.length - 1] : $value,
                        calendar,
                        local,
                        format: $format
                    })

                    if (!date.isValid) date = new DateObject({ calendar, local, format: $format })

                    selectedDate = getSelectedDate($value)
                } else {
                    selectedDate = isValid ? $value : getSelectedDate($value)
                }

                if (Array.isArray(selectedDate)) {
                    if (!date) {
                        let lastSelectedDate = selectedDate[selectedDate.length - 1]

                        date = new DateObject(lastSelectedDate)
                    }
                } else {
                    date = new DateObject(selectedDate)
                }
            }

            checkDate(date)

            if (Array.isArray(selectedDate)) {
                selectedDate = selectedDate.map($date => checkDate($date))
            } else if (selectedDate) {
                checkDate(selectedDate)
            }

            if ($multiple || range || Array.isArray($value)) {
                if (!selectedDate) selectedDate = []
                if (!Array.isArray(selectedDate)) selectedDate = [selectedDate]
                if (range && selectedDate.length > 2) selectedDate = [selectedDate[0], selectedDate[selectedDate.length - 1]]
                if (!range && !$multiple) $multiple = true

                $timePicker = false
                $onlyTimePicker = false
            } else {
                if (Array.isArray(selectedDate)) selectedDate = selectedDate[selectedDate.length - 1]

                $mustShowDates = false
            }

            return {
                ...state,
                date,
                selectedDate,
                local,
                calendar,
                multiple: $multiple,
                range,
                mustShowDates: $mustShowDates,
                timePicker: $timePicker,
                onlyTimePicker: $onlyTimePicker,
                initialValue: state.initialValue || $value,
                format: $format,
                weekDays,
                months
            }
        })
    }, [value, calendar, local, format, timePicker, onlyTimePicker, range, multiple, mustShowDates, weekDays, months])

    return (state.date ?
        <div className={`rmdp-wrapper ${state.local !== "en" ? "rmdp-rtl" : ""} ${className || ""}`}>
            <div>
                <div className="rmdp-calendar">
                    <Header state={state} setState={setState} />
                    <DayPicker state={state} setState={setState} onChange={onChange} />
                    <MonthPicker state={state} setState={setState} />
                    <YearPicker state={state} setState={setState} />
                </div>
                <TimePicker state={state} setState={setState} onChange={onChange} />
            </div>
            <DaysPanel state={state} setState={setState} onChange={onChange} />
        </div>
        :
        null
    )
}

function isValidDateObject(date, calendar, local, format) {
    return date instanceof DateObject &&
        date.isValid &&
        date.calendar === calendar &&
        date.local === local &&
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