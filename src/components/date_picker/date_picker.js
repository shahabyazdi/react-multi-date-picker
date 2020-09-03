import React, { useState, useEffect, useRef } from "react"
import Header from "../header/header"
import DayPicker, { isSameDate } from "../day_picker/day_picker.js"
import MonthPicker from "../month_picker/month_picker.js"
import YearPicker from "../year_picker/year_picker.js"
import TimePicker from "../time_picker/time_picker"
import DateObject from "react-date-object"
import "./style.css"

export default function DatePicker({
    name,
    date,
    style,
    format,
    onChange,
    timePicker,
    calendar = "gregorian",
    local = "en",
    className,
    onlyTimePicker,
    liveChange,
    readOnly,
    multiple,
    range,
    mustShowDates = true,
    inputType = "input"
}) {
    let parsedDate, stringDate = ""

    if (multiple && !Array.isArray(date)) {
        if (date) {
            date = [date]
        } else {
            date = []
        }
    }

    if (range && !Array.isArray(date)) date = []
    if (!multiple && !range && Array.isArray(date)) multiple = true
    if (multiple && range) range = false

    if (multiple || range) {
        timePicker = false
        onlyTimePicker = false
    }

    if (Array.isArray(date)) {
        parsedDate = []
        stringDate = []

        for (let $date of date) {
            let [$parsedDate] = validate($date, format, calendar, local)

            parsedDate.push($parsedDate)
            stringDate.push($parsedDate.format())
        }

        if (multiple) stringDate = stringDate.join(" , ")
        if (range) stringDate = stringDate.join(" ~ ")

    } else {
        [parsedDate, stringDate] = validate(date, format, calendar, local, onlyTimePicker)
    }

    const ref = useRef(null)

    const [state, setState] = useState({
        date: getDate(parsedDate),
        selectedDate: parsedDate,
        stringDate,
        mustShowYearPicker: false,
        mustShowMonthPicker: false,
        mustShowTimePicker: timePicker || onlyTimePicker ? true : false,
        onlyTimePicker: onlyTimePicker ? true : false,
        year: getYear(parsedDate),
        month: getMonth(parsedDate),
        isVisible: false,
        format,
        local,
        calendar,
        liveChange,
        multiple,
        range,
        mustShowDates,
        inputType
    })

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && !event.target.classList.contains("rm-dp-c-p-b-deselect")) {
                setState({ ...state, isVisible: false })
            }
        }
    }, [state])

    useEffect(() => {
        if (onChange instanceof Function) {
            let dateObject = undefined

            if (state.onlyTimePicker && state.stringDate) {
                dateObject = new DateObject(state.selectedDate).setFormat(state.format).parse(state.stringDate)
            } else if (state.multiple || state.range) {
                dateObject = state.selectedDate
            } else if (state.stringDate) {
                dateObject = new DateObject({
                    date: state.stringDate,
                    local: state.local,
                    calendar: state.calendar,
                    format: state.format
                })
            }

            onChange(state.stringDate, dateObject)
        }
    }, [
        state.stringDate,
        state.selectedDate,
        state.local,
        state.format,
        state.calendar,
        onChange,
        state.onlyTimePicker,
        state.multiple,
        state.range
    ])

    return (
        <div ref={ref} className={`rm-date-picker ${state.local === "en" ? "" : "rm-dp-rtl"}`}>
            {getInput(name, className, readOnly, style)}
            <div className={`rm-dp-container ${state.isVisible ? "active" : ""}`}>
                <div className="rm-dp-c-wrapper">
                    <Header state={state} setState={setState} />
                    <DayPicker state={state} setState={setState} />
                    <MonthPicker state={state} setState={setState} />
                    <YearPicker state={state} setState={setState} />
                    <TimePicker state={state} setState={setState} />
                </div>
                {state.mustShowDates && state.multiple ?
                    <div className="rm-dp-c-panel">
                        <div className="rm-dp-c-p-header">Dates</div>
                        <ul className="rm-dp-c-p-body">
                            {Array.isArray(state.selectedDate) ?
                                state.selectedDate.map(($date, index) => {
                                    return (
                                        <li key={index}>{$date.format()} <button className="rm-dp-c-p-b-deselect" onClick={() => deSelect($date)}>+</button></li>
                                    )
                                })
                                :
                                <li>{state.stringDate}</li>
                            }
                        </ul>
                    </div> :
                    null
                }
            </div>
        </div>
    )

    function handleChange(e) {
        if (state.multiple || state.range) return

        let value = e.target.value
        let $state = { ...state, stringDate: value }

        if (state.liveChange) {
            let date = new DateObject($state.selectedDate).parse(value)

            if (date.isValid) $state.selectedDate = date

            $state.date = date
        }

        setState($state)
    }

    function handleClick(e) {
        let value = e.target.value

        if (!value && !state.multiple && !state.range) value = state.date.format()

        let $state = {
            ...state,
            stringDate: value,
            isVisible: true
        }

        setState($state)
    }

    function validate(date, format, calendar, local, onlyTimePicker) {
        let parsedDate = new DateObject({ date, format, calendar, local })

        if (!parsedDate.isValid) parsedDate = new DateObject({ calendar, local })

        let stringDate = ""

        if (typeof date === "string") stringDate = date
        if (typeof date === "number" || date instanceof Date || date instanceof DateObject) {
            if (date) stringDate = parsedDate.format()
        }

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
            stringDate = ""
        }

        return [parsedDate, stringDate]
    }

    function deSelect(date) {
        let dates = []
        let formats = []

        for (let $date of state.selectedDate) {
            if (!isSameDate($date, date)) {
                dates.push($date)
                formats.push($date.format())
            }
        }

        setState({
            ...state,
            selectedDate: dates,
            stringDate: formats.join(" , ")
        })
    }

    function getDate(parsedDate) {
        let date = undefined

        if (Array.isArray(parsedDate) && parsedDate[0]) {
            date = parsedDate[0]
        } else if (!Array.isArray(parsedDate) && parsedDate) {
            date = parsedDate
        } else {
            date = new DateObject()
        }

        return date
    }

    function getYear(parsedDate) {
        let year = undefined

        if (Array.isArray(parsedDate) && parsedDate[0]) {
            year = parsedDate[0].year
        } else if (!Array.isArray(parsedDate) && parsedDate) {
            year = parsedDate.year
        } else {
            year = new DateObject().year
        }

        return year
    }

    function getMonth(parsedDate) {
        let month = undefined

        if (Array.isArray(parsedDate) && parsedDate[0]) {
            month = parsedDate[0].month.index
        } else if (!Array.isArray(parsedDate) && parsedDate) {
            month = parsedDate.month.index
        } else {
            month = new DateObject().month.index
        }

        return month
    }

    function getInput(name, className, readOnly, style) {
        let input = undefined

        switch (state.inputType) {
            case "button":
                input = <button
                    type="button"
                    name={name || ""}
                    onClick={handleClick}
                    className={className || ""}
                    disabled={readOnly ? true : false}
                    style={style}
                >
                    {getText()}
                </button>

                function getText() {
                    if (!state.range && !state.multiple && state.stringDate) return state.stringDate
                    return "click to select"
                }

                break
            default:
                input = <input
                    name={name || ""}
                    type="text"
                    value={state.stringDate}
                    onChange={handleChange}
                    onClick={handleClick}
                    className={className || ""}
                    readOnly={readOnly ? true : false}
                    style={style}
                    autoComplete="off"
                />
        }

        return input
    }
}
