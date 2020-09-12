import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import Calendar, { validate } from "../calendar/calendar"
import { isSameDate } from "../day_picker/day_picker"
import DateObject from "react-date-object"
import "./date_picker.css"

export default function DatePicker({
    value,
    calendar = "gregorian",
    local = "en",
    format,
    timePicker,
    onlyTimePicker,
    onChange,
    range = false,
    mustShowDates = true,
    name,
    placeholder,
    style = {},
    className,
    inputClass,
    readOnly
}) {
    let [isVisible, setIsVisible] = useState(false)
    let [date, setDate] = useState(null)
    let datePickerRef = useRef(null)
    let inputRef = useRef(null)
    let calendarRef = useRef(null)
    let [stringDate, setStringDate] = useState("")

    useEffect(() => {
        const handleClickOutside = event => {
            if (inputRef.current && calendarRef.current &&
                !inputRef.current.contains(event.target) &&
                !calendarRef.current.contains(event.target) &&
                !event.target.classList.contains("b-deselect")) {

                setIsVisible(false)
            } else if (inputRef.current && calendarRef.current &&
                calendarRef.current.contains(event.target) &&
                event.target.classList.contains("sd")) {

                setIsVisible(false)
            }
        }

        document.addEventListener("click", handleClickOutside, false)

        if (value) {
            handleChange(
                Array.isArray(value) ?
                    value.map(date => validate(date, format, calendar, local))
                    :
                    validate(value, format, calendar, local)
            )
        }

        return () => document.removeEventListener("click", handleClickOutside, false)
        // eslint-disable-next-line
    }, [])

    let changeStringDate = useCallback((date) => {
        if (!date) return ""
        let str = ""

        let dates = [].concat(date).map(d => new DateObject({ date: d, calendar, local, format }))

        if (!Array.isArray(date)) {
            str = dates.join("")
        } else {
            str = dates.join(range ? " ~ " : ", ")
        }

        setStringDate(str)
    }, [range, calendar, local, format])

    useMemo(() => {
        if (!date) return ""

        let dates = [].concat(date).map(d => new DateObject({ date: d, calendar, local, format }))

        changeStringDate(dates, range)
    }, [range, calendar, local, format, date, changeStringDate])

    return (
        <div ref={datePickerRef} className="rmdp-container">
            <input
                ref={inputRef}
                type="text"
                name={name || ""}
                onClick={handleClick}
                className={`rmdp-input ${inputClass || ""}`}
                placeholder={placeholder || ""}
                value={stringDate}
                onChange={handleValueChange}
                style={style}
                autoComplete="off"
                readOnly={readOnly ? true : false}
            />
            {isVisible && <div
                ref={calendarRef}
                className="rmdp-calendar-container"
            >
                <Calendar
                    value={date}
                    onChange={handleChange}
                    range={range}
                    calendar={calendar}
                    local={local}
                    format={format}
                    timePicker={timePicker}
                    onlyTimePicker={onlyTimePicker}
                    mustShowDates={mustShowDates}
                    className={className}
                />
            </div>}
        </div>
    )

    function handleClick() {
        if (!date && !value) {
            handleChange(validate(date, format, calendar, local, onlyTimePicker))
        }

        setIsVisible(true)
    }

    function handleChange($date) {
        if (!$date) return

        setDate($date)
        changeStringDate($date)

        if (onChange instanceof Function) onChange($date)
    }

    function handleValueChange(e) {
        let value = e.target.value
        let digits = date.digits

        if (!value || !digits) return

        for (let digit of digits) {
            value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit))
        }

        let newDate = new DateObject(date).parse(value)

        if (newDate.isValid) setDate(newDate)
    }
}