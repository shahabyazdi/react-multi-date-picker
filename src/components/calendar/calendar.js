import React, { useState, useEffect, useRef } from "react"
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
    mustShowDates = true
}) {
    let [state, setState] = useState({ value, calendar, mustShowYearPicker: false, mustShowMonthPicker: false })
    let validationRef = useRef(null)

    useEffect(() => {
        if (validationRef.current) validationRef.current.selectedDate = state.selectedDate
    }, [state.selectedDate])

    useEffect(() => {
        var date,
            selectedDate,
            multiple = false,
            $timePicker = timePicker ? true : false,
            $onlyTimePicker = onlyTimePicker ? true : false,
            $range = range ? true : false,
            $mustShowDates = mustShowDates ? true : false

        if (!Array.isArray(value)) {
            if (validationRef.current &&
                calendar === state.calendar &&
                local === state.local &&
                format === state.format &&
                $timePicker === state.timePicker &&
                $onlyTimePicker === state.onlyTimePicker
            ) {
                if (validationRef.current.value === value) return
                if (validationRef.current.selectedDate === value) return
            }

            date = validate(value, format, calendar, local, onlyTimePicker)

            selectedDate = new DateObject(date)
            $mustShowDates = false
            $range = false

        } else {
            if (validationRef.current &&
                Array.isArray(validationRef.current.value) &&
                calendar === state.calendar &&
                local === state.local &&
                format === state.format &&
                range === state.range &&
                mustShowDates === state.mustShowDates) {

                let $value = validationRef.current.value,
                    $selectedDate = validationRef.current.selectedDate

                for (let i = 0; i < $value.length; i++) {
                    if ($value[i] !== value[i]) return
                }

                for (let i = 0; i < $selectedDate.length; i++) {
                    if ($selectedDate[i] !== value[i]) return
                }
            }

            if (!range) multiple = true
            if (range && value.length > 2) value.length = 2

            $onlyTimePicker = false
            $timePicker = false

            selectedDate = value.map(val => validate(val, format, calendar, local, onlyTimePicker))

            selectedDate.sort((a, b) => a - b)

            if (selectedDate[0]) {
                date = new DateObject(selectedDate[0])
            } else {
                date = state.date ? new DateObject({ date: state.date, calendar, local, format }) : new DateObject({ calendar, local, format })
            }
        }

        validationRef.current = { value, selectedDate }

        setState({
            ...state,
            date,
            selectedDate,
            calendar,
            local,
            format,
            multiple,
            timePicker: $timePicker,
            onlyTimePicker: $onlyTimePicker,
            range: $range,
            mustShowDates: $mustShowDates
        })
    }, [
        state,
        value,
        format,
        calendar,
        local,
        timePicker,
        onlyTimePicker,
        range,
        mustShowDates
    ])

    return (state.date ?
        <div className={`rmdp-wrapper ${state.local !== "en" ? "rmdp-rtl" : ""}`}>
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

export function validate(date, format, calendar, local, onlyTimePicker) {
    let parsedDate = new DateObject({ date, format, calendar, local })

    if (!parsedDate.isValid) parsedDate = new DateObject({ calendar, local })

    if (date && typeof date === "string" && onlyTimePicker) {
        if (format) {
            parsedDate.setFormat(format).parse(date)
        } else {
            format = "hh:mm:ss a"
            parsedDate.setFormat(format)
        }
    }

    if (!date && !format && onlyTimePicker) {
        format = "hh:mm:ss a"
        parsedDate.setFormat(format)
    }

    return parsedDate
}
