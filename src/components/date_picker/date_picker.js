import React, { useState, useEffect, useRef } from "react"
import Header from "../header/header"
import DayPicker from "../day_picker/day_picker.js"
import MonthPicker from "../month_picker/month_picker.js"
import YearPicker from "../year_picker/year_picker.js"
import TimePicker from "../time_picker/time_picker"
import DateObject from "react-date-object"
import "./style.css"

export default function DatePicker({ date, time, format, onChange, timePicker, calendar = "georgian", local = "en", className, onlyTimePicker, liveChange }) {
    let parsedDate = new DateObject({ date, format, calendar, local })

    if (!parsedDate.isValid) parsedDate = new DateObject({ calendar, local })

    let stringDate = ""

    if (typeof date === "string") stringDate = date
    if (!date || typeof date === "number" || date instanceof Date || date instanceof DateObject) {
        if (date) stringDate = parsedDate.format()
    }

    if (time && typeof time === "string") {
        if (format) parsedDate.parse(time)
        if (!format && onlyTimePicker) {
            format = "hh:mm:ss a"
            parsedDate.setFormat(format)
        }

        stringDate = time
    }

    if (!time && !format && onlyTimePicker) {
        format = "hh:mm:ss a"
        parsedDate.setFormat(format)
        stringDate = ""
    }

    const ref = useRef(null)

    const [state, setState] = useState({
        date: parsedDate,
        selectedDate: parsedDate,
        stringDate,
        mustShowYearPicker: false,
        mustShowMonthPicker: false,
        mustShowTimePicker: timePicker || onlyTimePicker ? true : false,
        onlyTimePicker: onlyTimePicker ? true : false,
        year: parsedDate.year,
        month: parsedDate.month.index,
        isVisible: false,
        format,
        local,
        calendar,
        liveChange
    })

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setState({ ...state, isVisible: false })
            }
        }
    }, [state])

    useEffect(() => {
        if (state.stringDate && onChange instanceof Function) {
            let dateObject = new DateObject({
                date: state.stringDate,
                local: state.local,
                calendar: state.calendar,
                format: state.format
            })

            onChange(state.stringDate, dateObject)
        }
    }, [state.stringDate, state.selectedDate, state.local, state.format, state.calendar, onChange])

    return (
        <div ref={ref} className={`date-picker ${state.local === "en" ? "" : "d-rtl"}`}>
            <input type="text" value={state.stringDate} onChange={handleChange} onClick={handleClick} className={className || ""} />
            <div className={`date-picker-container ${state.isVisible ? "active" : ""}`}>
                <Header state={state} setState={setState} />
                <DayPicker state={state} setState={setState} />
                <MonthPicker state={state} setState={setState} />
                <YearPicker state={state} setState={setState} />
                <TimePicker state={state} setState={setState} />
            </div>
        </div>
    )

    function handleChange(e) {
        let value = e.target.value
        let $state = { ...state, stringDate: value }

        if (state.liveChange) {
            let date = new DateObject($state.selectedDate).parse(value)

            if (date.isValid) $state.selectedDate = date

            $state.date = $state.selectedDate
        }

        setState($state)
    }

    function handleClick(e) {
        let value = e.target.value

        if (!value) value = state.date.format()

        let $state = {
            ...state,
            stringDate: value,
            isVisible: true
        }

        setState($state)
    }
}
