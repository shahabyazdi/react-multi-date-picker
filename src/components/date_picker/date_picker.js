import React, { useState, useEffect, useRef, useMemo } from "react"
import Calendar from "../calendar/calendar"
import DateObject from "react-date-object"
import { ReactComponent as Icon } from "./calendar.svg"
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
    multiple = false,
    mustShowDates = true,
    name,
    placeholder,
    style = {},
    className,
    inputClass,
    disabled,
    type = "input"
}) {
    let [date, setDate] = useState(value)
    let [stringDate, setStringDate] = useState("")
    let [isVisible, setIsVisible] = useState(false)
    let datePickerRef = useRef(null)
    let inputRef = useRef(null)
    let calendarRef = useRef(null)
    let ref = useRef({ _calendar: calendar, _local: local, _format: format })

    let separator = useMemo(() => range ? " ~ " : ", ", [range])

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
        ref.current.date = value

        setDate(value)
    }, [value])

    useEffect(() => {
        setDate(date => {
            if (!date) return

            let { _calendar, _format, _local } = ref.current

            function checkDate(date) {
                if (!(date instanceof DateObject)) date = new DateObject({ date, calendar: _calendar, local: _local, format: _format })

                if (date.calendar !== calendar) date.setCalendar(calendar)
                if (date.local !== local) date.setLocal(local)
                if (date.format !== format) date.setFormat(format)
                if (onlyTimePicker && !format) date.setFormat("HH:mm:ss")

                return date
            }

            if (range || multiple || Array.isArray(date)) {
                if (!Array.isArray(date)) date = [date]

                date = date.map(val => checkDate(val))

                if (range && date.length > 2) date = [date[0], date[date.length - 1]]

                setStringDate(type === "button" && date.length > 1 ?
                    [date[0], date[1]].join(separator)
                    :
                    date.join(separator)
                )
            } else {
                if (Array.isArray(date)) date = date[date.length - 1]

                date = checkDate(date)

                setStringDate(date.format())
            }

            ref.current = { ...ref.current, date, _calendar: calendar, _local: local, _format: format, separator }

            return date
        })
    }, [calendar, local, format, range, multiple, separator, type, onlyTimePicker])

    useEffect(() => {
        if (type !== "input") return

        inputRef.current.selectionStart = inputRef.current.selectionEnd = ref.current.start
    }, [stringDate, type])

    return (
        <div ref={datePickerRef} className="rmdp-container">
            {renderInput()}
            {isVisible && (
                <div
                    ref={calendarRef}
                    className={`rmdp-calendar-container ${type === "icon" ? "rmdp-calendar-container-icon" : ""}`}
                >
                    <Calendar
                        value={date}
                        onChange={handleChange}
                        range={range}
                        multiple={multiple}
                        calendar={calendar}
                        local={local}
                        format={format}
                        timePicker={timePicker}
                        onlyTimePicker={onlyTimePicker}
                        mustShowDates={mustShowDates}
                        className={className}
                    />
                </div>
            )}
        </div>
    )

    function openCalendar() {
        if (!value && !ref.current.date) {
            let date = new DateObject({ calendar, local, format })

            handleChange(date)

            ref.current.value = date
        }

        setIsVisible(["input", "input-icon"].includes(type) ? true : !isVisible)
    }

    function handleChange(date) {
        setDate(date)

        ref.current = { ...ref.current, date, _calendar: calendar, _local: local, _format: format }

        if (onChange instanceof Function) {
            if (!Array.isArray(date)) {
                onChange(new DateObject(date))
            } else {
                onChange(date.map(d => new DateObject(d)))
            }
        }

        if (date) {
            if (Array.isArray(date)) {
                setStringDate(
                    type === "button" && date.length > 1 ?
                        [date[0], date[1]].join(separator)
                        :
                        date.join(separator)
                )
            } else {
                setStringDate(date.format(getFormat(onlyTimePicker, format)))
            }
        }
    }

    function handleValueChange(e) {
        if (Array.isArray(date)) return

        let value = e.target.value
        let object = { year: 1, calendar, local, format }
        let digits = date && date.isValid ? date.digits : new DateObject(object).digits

        if (type === "input") {
            let start = e.target.selectionStart

            ref.current.start = start
        }

        if (!value) {
            setStringDate("")

            return handleChange(new DateObject({}))
        }

        if (!digits) return

        for (let digit of digits) {
            value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit))
        }

        let newDate = new DateObject(date?.isValid ? date : object).parse(value)

        handleChange(newDate)
        setStringDate(value.replace(/[0-9]/g, w => digits[w]))
    }

    function renderInput() {
        let isMultiple = !range && Array.isArray(date)

        let multipleStyle = isMultiple ? {
            whiteSpace: "nowrap",
            overflow: "hidden"
        } : {}

        switch (type) {
            case "button":
                return (
                    <button
                        ref={inputRef}
                        onClick={openCalendar}
                        name={name || ""}
                        className={`rmdp-button ${inputClass || ""}`}
                        style={{
                            minWidth: Array.isArray(date) ? "185px" : "unset",
                            ...multipleStyle,
                            ...style
                        }}
                        disabled={disabled ? true : false}
                    >
                        {stringDate || placeholder || "click to select"}
                    </button>
                )
            case "icon":
                return (
                    <div ref={inputRef} style={{ display: "inline" }}>
                        <Icon
                            onClick={openCalendar}
                            name={name || ""}
                            className={`rmdp-icon ${inputClass || ""}`}
                            style={{ ...style }}
                        />
                    </div>
                )
            default:
                return (
                    <div style={{ display: "inline", position: "relative" }}>
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
                            disabled={disabled ? true : false}
                        />
                        {type === "input-icon" && <Icon className="rmdp-input-icon" />}
                    </div>
                )
        }
    }
}

function getFormat(onlyTimePicker, format) {
    if (format) return format
    if (onlyTimePicker && !format) return "HH:mm:ss"
}