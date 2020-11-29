import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import Calendar, { getDateInRangeOfMinAndMaxDate } from "../calendar/calendar"
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
    onlyMonthPicker,
    onlyYearPicker,
    onChange,
    range = false,
    multiple = false,
    mustShowDates = true,
    name,
    placeholder,
    style = {},
    className = "",
    inputClass,
    disabled,
    type = "input",
    render,
    weekDays,
    months,
    showOtherDays,
    children,
    inputMode,
    scrollSensitive = true,
    hideOnScroll,
    minDate,
    maxDate,
    formattingIgnoreList,
    containerStyle,
    containerClassName,
    calendarPosition = "auto",
    ...otherProps
}) {
    let [date, setDate] = useState(),
        [stringDate, setStringDate] = useState(""),
        [isVisible, setIsVisible] = useState(false),
        [isCalendarReady, setIsCalendarReady] = useState(false),
        datePickerRef = useRef(null),
        inputRef = useRef(null),
        calendarRef = useRef(null),
        ref = useRef({}),
        separator = useMemo(() => range ? " ~ " : ", ", [range]),
        closeCalendar = useCallback(() => {
            setIsVisible(false)
            setIsCalendarReady(false)
        }, [])

    if (isMobileMode() && !ref.current.mobile) ref.current = { ...ref.current, mobile: true }
    if (!isMobileMode() && ref.current.mobile) ref.current = { ...ref.current, mobile: false }
    if (!Array.isArray(formattingIgnoreList)) formattingIgnoreList = []

    formattingIgnoreList = JSON.stringify(formattingIgnoreList)

    useEffect(() => {
        const handleClickOutside = event => {
            if (inputRef.current && calendarRef.current &&
                !inputRef.current.contains(event.target) &&
                !calendarRef.current.contains(event.target) &&
                !event.target.classList.contains("b-deselect")) {

                if (!ref.current.mobile) setIsVisible(false)
            } else if (inputRef.current && calendarRef.current &&
                calendarRef.current.contains(event.target) &&
                !Array.isArray(ref.current.date) &&
                event.target.classList.contains("sd")) {

                if (!ref.current.mobile) setIsVisible(false)
            }
        }

        document.addEventListener("click", handleClickOutside, false)

        return () => document.removeEventListener("click", handleClickOutside, false)
    }, [closeCalendar])

    useEffect(() => {
        let date = value,
            getLastDate = () => date[date.length - 1]

        function checkDate(date) {
            if (!date) return
            if (!(date instanceof DateObject)) date = new DateObject({ date, calendar, local, format })

            if (date.calendar !== calendar) date.setCalendar(calendar)
            if (date.local !== local) date.setLocal(local)
            if (date.format !== format) date.setFormat(format)
            if (isValidMonths(months)) date.months = months
            if (isValidWeekDays(weekDays)) date.weekDays = weekDays

            date.setFormat(getFormat(timePicker, onlyTimePicker, onlyMonthPicker, onlyYearPicker, format, range, multiple))

            return date
        }

        if (range || multiple || Array.isArray(date)) {
            if (!Array.isArray(date)) date = [date]

            date = date.map(checkDate).filter(value => value !== undefined)

            if (range && date.length > 2) date = [date[0], getLastDate()]

            setStringDate(getStringDate(date, type, separator, format, formattingIgnoreList))
        } else {
            if (Array.isArray(date)) date = getLastDate()

            date = checkDate(date)

            let input = inputRef.current

            if (document.activeElement !== input) {
                setStringDate(date ? date.format(undefined, JSON.parse(formattingIgnoreList)) : "")
            }
        }

        ref.current = { ...ref.current, date, separator }

        setDate(date)
    }, [
        value,
        calendar,
        local,
        format,
        range,
        multiple,
        separator,
        type,
        timePicker,
        onlyTimePicker,
        onlyMonthPicker,
        onlyYearPicker,
        weekDays,
        months,
        formattingIgnoreList
    ])

    useEffect(() => {
        if (type !== "input") return

        inputRef.current.selectionStart = inputRef.current.selectionEnd = ref.current.start
    }, [stringDate, type])

    useEffect(() => {
        if (!minDate && !maxDate) return

        setDate(date => {
            let [$date] = getDateInRangeOfMinAndMaxDate(date, minDate, maxDate, calendar)

            if (Array.isArray($date)) {
                setStringDate(getStringDate($date, type, separator, format, formattingIgnoreList))
            } else {
                setStringDate($date ? $date.format(undefined, JSON.parse(formattingIgnoreList)) : "")
            }

            return $date
        })
    }, [minDate, maxDate, calendar, type, separator, format, formattingIgnoreList])

    useEffect(() => {
        const calendar = calendarRef.current

        if (
            !isCalendarReady ||
            !calendar ||
            !scrollSensitive ||
            ref.current.mobile
        ) return

        function checkPosition(e) {
            if (e) {
                if (hideOnScroll) {
                    let input = inputRef.current

                    if (input) input.blur()

                    return closeCalendar()
                }

                if (!e.target.querySelector(".rmdp-calendar-container")) return
            }

            let wrapper = calendar.querySelector(".rmdp-wrapper")

            if (!wrapper) return

            let { height } = wrapper.getBoundingClientRect(),
                { top } = inputRef.current.getBoundingClientRect(),
                inputHeight = (inputRef.current?.offsetHeight | 0),
                clientHeight,
                [positionY, positionX] = calendarPosition === "auto" ?
                    [] :
                    calendarPosition.split("-")

            if (!e) {
                clientHeight = document.documentElement.clientHeight
            } else {
                top -= document.documentElement.clientHeight - e.target.clientHeight
                clientHeight = e.target.clientHeight
            }

            let translateY = ""

            if (
                (top + height > clientHeight && top - height - inputHeight - 5 > 0 && calendarPosition === "auto") ||
                positionY === "top"
            ) {
                translateY = `translateY(-${height + inputHeight + 4}px)`
                wrapper.style.transform = translateY
            } else if (top < 0) {
                translateY = "translateY(0)"
                wrapper.style.transform = translateY
            }

            let left = datePickerRef.current.offsetLeft

            if (
                (wrapper.clientWidth > 10 && left > wrapper.clientWidth / 4 && calendarPosition === "auto") ||
                positionX === "center"
            ) {
                let translateX = (inputRef.current.clientWidth - wrapper.clientWidth) / 2

                wrapper.style.transform = `translateX(${translateX}px) ${translateY}`
            } else if (positionX === "right") {
                let translateX = inputRef.current.clientWidth - wrapper.clientWidth

                wrapper.style.transform = `translateX(${translateX}px) ${translateY}`
            } else {
                wrapper.style.left = "unset"
                wrapper.style.transform = `translateX(0) ${translateY}`
            }
        }

        setTimeout(() => checkPosition(), 10);

        document.addEventListener("scroll", checkPosition, true)
        window.addEventListener("resize", () => checkPosition())

        return () => {
            document.removeEventListener("scroll", checkPosition, true)
            window.removeEventListener("resize", () => checkPosition())
        }
    }, [scrollSensitive, hideOnScroll, isCalendarReady, closeCalendar, isVisible, calendarPosition])

    return (
        <div
            ref={datePickerRef}
            className={`rmdp-container ${containerClassName}`}
            style={{ ...containerStyle }}
        >
            {renderInput()}
            {isVisible && (
                <div
                    ref={calendarRef}
                    className={`rmdp-calendar-container ${isMobileMode() ? "rmdp-calendar-container-mobile" : ""}`}
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
                        onlyMonthPicker={onlyMonthPicker}
                        onlyYearPicker={onlyYearPicker}
                        mustShowDates={mustShowDates}
                        className={className}
                        weekDays={weekDays}
                        months={months}
                        showOtherDays={showOtherDays}
                        minDate={minDate}
                        maxDate={maxDate}
                        formattingIgnoreList={JSON.parse(formattingIgnoreList)}
                        onReady={() => setIsCalendarReady(true)}
                        {...otherProps}
                    >
                        {children}
                        {isMobileMode() &&
                            <div className={`rmdp-action-buttons ${["fa", "ar"].includes(local) ? "rmdp-rtl" : ""}`} >
                                <button
                                    type="button"
                                    className="rmdp-button rmdp-action-button"
                                    onClick={() => {
                                        if (ref.current.temporaryDate) {
                                            handleChange(ref.current.temporaryDate, true)
                                            delete ref.current.temporaryDate
                                        }

                                        closeCalendar()
                                    }}
                                >
                                    {toLocal("OK")}
                                </button>
                                <button
                                    type="button"
                                    className="rmdp-button rmdp-action-button"
                                    onClick={() => {
                                        closeCalendar()
                                        delete ref.current.temporaryDate
                                    }}
                                >
                                    {toLocal("CANCEL")}
                                </button>
                            </div>
                        }
                    </Calendar>
                </div>
            )}
        </div>
    )

    function isMobileMode() {
        return typeof className === "string" && className.includes("rmdp-mobile")
    }

    function toLocal(string) {
        let actions = {
            [DateObject.locals.EN]: { OK: "OK", CANCEL: "CANCEL" },
            [DateObject.locals.FA]: { OK: "تأیید", CANCEL: "لغو" },
            [DateObject.locals.AR]: { OK: "تأكيد", CANCEL: "الغاء" },
            [DateObject.locals.HI]: { OK: "पुष्टि", CANCEL: "रद्द करें" }
        }

        if (typeof local === "string" && actions[local.toUpperCase()]) return actions[local.toUpperCase()][string]

        return string
    }

    function openCalendar() {
        if (disabled) return

        let isMobile = isMobileMode()
        let isInput = inputRef.current.tagName === "INPUT" || inputRef.current.querySelector("input")

        if (!value && !ref.current.date && !range && !multiple) {
            let date = new DateObject({ calendar, local, format })

            handleChange(date, isMobile)

            ref.current.date = date
        }

        if (isMobile && isInput) inputRef.current.blur()

        setIsVisible(isInput ? true : !isVisible)
    }

    function setCustomNames(date) {
        if (isValidMonths(months)) date.months = months
        if (isValidWeekDays(weekDays)) date.weekDays = weekDays
    }

    function handleChange(date, force) {
        if (isMobileMode() && !force) return ref.current.temporaryDate = date

        setDate(date)

        ref.current = { ...ref.current, date }

        if (onChange instanceof Function) {
            if (!Array.isArray(date)) {
                onChange(new DateObject(date))
            } else {
                onChange(date.map(d => new DateObject(d)))
            }
        }

        if (date) {
            if (Array.isArray(date)) {
                date.map(setCustomNames)

                setStringDate(getStringDate(date, type, separator, format, formattingIgnoreList))
            } else {
                setCustomNames(date)

                setStringDate(date.format(getFormat(timePicker, onlyTimePicker, onlyMonthPicker, onlyYearPicker, format, range, multiple), JSON.parse(formattingIgnoreList)))
            }
        }
    }

    function handleValueChange(e) {
        if (Array.isArray(date)) return

        let value = e.target.value,
            object = { year: 1, calendar, local, format },
            digits = date && date.isValid ? date.digits : new DateObject(object).digits

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
        let isMultiple = (!range && Array.isArray(date)) || multiple

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
                    <div
                        ref={inputRef}
                        style={{ display: "inline-block" }}
                    >
                        <Icon
                            onClick={openCalendar}
                            name={name || ""}
                            className={`rmdp-icon ${inputClass || ""}`}
                            style={{ ...style }}
                        />
                    </div>
                )
            case "custom":
                return (
                    <div
                        ref={inputRef}
                        style={{ display: "inline-block" }}
                    >
                        {React.isValidElement(render) ?
                            React.cloneElement(render, { stringDate, openCalendar }) :
                            render instanceof Function ?
                                render(stringDate, openCalendar) :
                                null
                        }
                    </div>
                )
            default:
                return (
                    <>
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
                            inputMode={inputMode || (isMobileMode() ? "none" : undefined)}
                        />
                        {type === "input-icon" &&
                            <Icon
                                className="rmdp-input-icon"
                                style={{
                                    marginTop: `${((((inputRef.current?.clientHeight - 21) / 2) | 0) + 2) || 2}px`
                                }}
                                onClick={() => {
                                    if (isVisible) {
                                        closeCalendar()
                                    } else {
                                        inputRef.current.focus()
                                    }
                                }}
                            />
                        }
                    </>
                )
        }
    }
}

function getFormat(timePicker, onlyTimePicker, onlyMonthPicker, onlyYearPicker, format, range, multiple) {
    if (format) return format
    if (timePicker && !range && !multiple) return "YYYY/MM/DD HH:mm:ss"
    if (onlyTimePicker) return "HH:mm:ss"
    if (onlyMonthPicker) return "MM/YYYY"
    if (onlyYearPicker) return "YYYY"
    if (range || multiple) return "YYYY/MM/DD"
}

function isValidMonths(value) {
    return Array.isArray(value) && value.length === 12 && value.every(array => {
        return Array.isArray(array) && array.length === 2 && array.every(string => typeof string === "string")
    })
}

function isValidWeekDays(value) {
    return Array.isArray(value) && value.length === 7 && value.every(array => {
        return Array.isArray(array) && array.length === 2 && array.every(string => typeof string === "string")
    })
}

function getStringDate(date, type, separator, format, formattingIgnoreList) {
    if (!date) return ""

    let toString = date => date.format(format, JSON.parse(formattingIgnoreList))

    return type === "button" && date.length > 1 ?
        [date[0], date[1]].map(toString).join(separator)
        :
        date.map(toString).join(separator)
}