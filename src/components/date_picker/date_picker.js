import React, { useState, useEffect, useRef } from "react"
import Calendar, { validate } from "../calendar/calendar"
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
    let [date, setDate] = useState(null)
    let [stringDate, setStringDate] = useState("")
    let [isVisible, setIsVisible] = useState(false)
    let datePickerRef = useRef(null)
    let inputRef = useRef(null)
    let calendarRef = useRef(null)
    let ref = useRef({})

    useEffect(() => {
        const handleClickOutside = event => {
            if (inputRef.current && calendarRef.current &&
                !inputRef.current.contains(event.target) &&
                !calendarRef.current.contains(event.target) &&
                !event.target.classList.contains("b-deselect")) {

                setIsVisible(false)
            } else if (inputRef.current && calendarRef.current &&
                calendarRef.current.contains(event.target) &&
                !Array.isArray(ref.current.date) &&
                event.target.classList.contains("sd")) {

                setIsVisible(false)
            }
        }

        document.addEventListener("click", handleClickOutside, false)

        return () => document.removeEventListener("click", handleClickOutside, false)
    }, [])

    useEffect(() => {
        if (range && Array.isArray(value) && value.length > 2) {
            value.length = 2
        }

        if (value !== ref.current.date ||
            range !== ref.current.range ||
            calendar !== ref.current.calendar ||
            format !== ref.current.format ||
            local !== ref.current.local ||
            onlyTimePicker !== ref.current.onlyTimePicker) {

            let date = Array.isArray(value) ?
                value.map(val => validate(val, format, calendar, local, onlyTimePicker))
                :
                validate(value, format, calendar, local, onlyTimePicker)

            if (value instanceof Date && !isValidDate(value)) {
                date = getInvalidDate(calendar, local, format)
            }

            setDate(date)

            ref.current = {
                ...ref.current,
                date,
                calendar,
                format,
                local,
                range,
                onlyTimePicker
            }

            if (value) setStringDate(Array.isArray(date) ?
                date.join(range ? " ~ " : ", ")
                :
                date.format()
            )
        }
    }, [value, range, calendar, format, local, onlyTimePicker])

    useEffect(() => {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = ref.current.start
    }, [stringDate])

    return (
        <div ref={datePickerRef} className="rmdp-container">
            <input
                ref={inputRef}
                type="text"
                name={name || ""}
                onFocus={openCalendar}
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

    function openCalendar() {
        if (!value && !ref.current.value) {
            handleChange(date)

            ref.current.value = date
        }

        setIsVisible(true)
    }

    function handleChange(date) {
        setDate(date)
        ref.current.date = date

        if (onChange instanceof Function) onChange(date)

        if (date) {
            if (Array.isArray(date)) {
                setStringDate(date.join(range ? " ~ " : ", "))
            } else if (date.isValid) {
                setStringDate(date.format(getFormat(onlyTimePicker, format)))
            }
        }
    }

    function handleValueChange(e) {
        if (Array.isArray(date)) return

        let value = e.target.value
        let digits = date.digits
        let start = e.target.selectionStart

        ref.current.start = start

        if (!value) {
            setStringDate("")

            let invalidDate = getInvalidDate(calendar, local, format)

            return handleChange(invalidDate)
        }

        if (!digits) return

        for (let digit of digits) {
            value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit))
        }

        let newDate = new DateObject(date).parse(value)

        handleChange(newDate)
        setStringDate(value.replace(/[0-9]/g, w => digits[w]))
    }
}

function isValidDate(date) {
    return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())
}

function getInvalidDate(calendar, local, format) {
    return new DateObject({
        date: " ",
        calendar,
        local,
        format
    })
}

function getFormat(onlyTimePicker, format) {
    if (format) return format
    if (onlyTimePicker && !format) return "hh:mm:ss a"
}