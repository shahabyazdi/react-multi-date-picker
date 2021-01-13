import React, { useState, useEffect, useRef, useMemo, useCallback, forwardRef } from "react"
import Calendar from "../calendar/calendar"
import DateObject from "react-date-object"
import { getAllDatesInRange } from "../../../plugins/all/date_panel/date_panel"
import { IconCalendarEvent } from '@tabler/icons'
import "./date_picker.css"

function DatePicker(
    {
        value,
        calendar = "gregorian",
        locale = "en",
        format,
        timePicker,
        onlyTimePicker,
        onlyMonthPicker,
        onlyYearPicker,
        onChange,
        range = false,
        multiple = false,
        name,
        id,
        title,
        placeholder,
        required,
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
        animation,
        editable = true,
        onlyShowInRangeDates = true,
        arrow = true,
        zIndex = 100,
        onOpen,
        onClose,
        ...otherProps
    },
    outerRef
) {
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
            let shouldCloseCalendar = onClose instanceof Function ? onClose() : true

            if (shouldCloseCalendar === false) return
            if (calendarRef.current) calendarRef.current.classList.remove("active")

            setIsVisible(false)
            setIsCalendarReady(false)
        }, [onClose])

    if (isMobileMode() && !ref.current.mobile) ref.current = { ...ref.current, mobile: true }
    if (!isMobileMode() && ref.current.mobile) ref.current = { ...ref.current, mobile: false }
    if (!Array.isArray(formattingIgnoreList)) formattingIgnoreList = []

    formattingIgnoreList = JSON.stringify(formattingIgnoreList)

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target) &&
                !event.target.classList.contains("b-deselect") &&
                !ref.current.mobile
            ) {
                closeCalendar()
            }
        }

        document.addEventListener("click", handleClickOutside, false)

        return () => document.removeEventListener("click", handleClickOutside, false)
    }, [closeCalendar, outerRef])

    useEffect(() => {
        let date = value,
            getLastDate = () => date[date.length - 1]

        function checkDate(date) {
            if (!date) return
            if (!(date instanceof DateObject)) date = new DateObject({ date, calendar, locale, format })

            if (date.calendar !== calendar) date.setCalendar(calendar)
            if (date.locale !== locale) date.setLocale(locale)
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

            let input = getInput(inputRef)

            if (document.activeElement !== input) {
                setStringDate(date ? date.format(undefined, JSON.parse(formattingIgnoreList)) : "")
            }
        }

        ref.current = { ...ref.current, date, separator }

        setDate(date)
    }, [
        value,
        calendar,
        locale,
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
        const calendar = calendarRef.current,
            datePicker = datePickerRef.current

        if (!isCalendarReady || !calendar) return
        if (ref.current.mobile) return calendar.classList.add("active")

        function checkPosition(e) {
            const resize = e && e.type !== "scroll",
                wrapper = calendar.querySelector(".rmdp-wrapper")

            if (!wrapper || !inputRef.current) return
            if (resize) e = undefined

            if (e) {
                if (hideOnScroll) {
                    const input = getInput(inputRef)

                    if (input) input.blur()

                    return closeCalendar()
                }

                if (!e.target.querySelector(".rmdp-calendar-container") || !scrollSensitive) return
            }

            let { height: calendarHeight, width: calendarWidth } = wrapper.getBoundingClientRect(),
                { top, height: inputHeight, width: inputWidth, right } = inputRef.current.getBoundingClientRect(),
                { clientHeight, clientWidth } = document.documentElement,
                translateY = (wrapper.style.transform.match(/translateY\((.*?)px\)/) || [])[1] || 2,
                translateX = 0,
                distance = inputWidth - calendarWidth,
                halfDistance = distance / 2,
                getTransform = (x, y) => `translateX(${x}px) translateY(${y}px)`,
                left = datePicker.offsetLeft,
                mustAddAnimation = animation && !e && !resize,
                [positionY, positionX] = calendarPosition === "auto" ?
                    [] :
                    calendarPosition.split("-"),
                triangle,
                triangleX,
                triangleY,
                isRTL,
                a = datePicker.childNodes[2],
                b = datePicker.childNodes[3]

            if (a && b) isRTL = a.getBoundingClientRect().left - b.getBoundingClientRect().left !== 0

            if (e) {
                top -= clientHeight - e.target.clientHeight
                clientHeight = e.target.clientHeight
            }

            if (
                (
                    top + calendarHeight + inputHeight > clientHeight &&
                    top - (calendarHeight / 1.5) > 0 &&
                    (calendarPosition === "auto" || positionY === "auto")
                ) ||
                positionY === "top"
            ) {
                translateY = -(calendarHeight + inputHeight + 4)
            } else if (
                top - calendarHeight < 0 ||
                (calendarHeight + inputHeight + 4) < Math.abs(Number(translateY))
            ) {
                translateY = 2
            }

            if (
                (
                    (
                        (left > Math.abs(halfDistance) && right + Math.abs(halfDistance) < clientWidth) ||
                        inputWidth > calendarWidth
                    ) &&
                    (calendarPosition === "auto" || positionX === "auto")
                ) ||
                positionX === "center"
            ) {
                translateX = isRTL ? -halfDistance : halfDistance
            } else if (
                (right + Math.abs(halfDistance) > clientWidth) ||
                positionX === "right"
            ) {
                translateX = isRTL ? 0 : distance
            } else if (positionX === "left") {
                translateX = isRTL ? -distance : 0
            }

            let isInBottom = translateY >= 0

            if (arrow) {
                translateY += isInBottom ? 7.5 : -7.5

                triangleY = isInBottom ? 1 : (-inputHeight - 13)
                triangleX = (((inputWidth - 28) / 2)) * (isRTL ? -1 : 1)

                triangle = calendarRef.current.querySelector(".rmdp-triangle")

                triangle.classList.remove("rmdp-triangle-up")
                triangle.classList.remove("rmdp-triangle-down")
                triangle.classList.add(`rmdp-triangle-${isInBottom ? "up" : "down"}`)

                triangle.style.zIndex = zIndex + 1
            }

            if (mustAddAnimation) {
                translateY += isInBottom ? 12 : -12
                triangleY += isInBottom ? 12 : -12
            }

            wrapper.style.transform = getTransform(translateX, translateY)

            if (arrow) triangle.style.transform = getTransform(triangleX, triangleY)

            if (mustAddAnimation) {
                setTimeout(() => {
                    wrapper.style.transition = "0.4s"
                    wrapper.style.transform = getTransform(translateX, translateY + (isInBottom ? -12 : 12))

                    if (arrow) {
                        triangle.style.transition = "0.4s"
                        triangle.style.transform = getTransform(triangleX, triangleY + (isInBottom ? -12 : 12))
                    }
                }, 8);
            }

            calendar.classList.add("active")

            if (arrow) triangle.classList.add("active")
        }

        checkPosition()

        function handleClick(e) {
            if (calendarRef.current && calendarRef.current.contains(e.target)) {
                setTimeout(() => checkPosition(e), 3)
            }
        }

        document.addEventListener("click", handleClick)
        document.addEventListener("scroll", checkPosition, true)
        window.addEventListener("resize", checkPosition)

        return () => {
            document.removeEventListener("click", handleClick)
            document.removeEventListener("scroll", checkPosition, true)
            window.removeEventListener("resize", checkPosition)
        }
    }, [
        scrollSensitive,
        hideOnScroll,
        isCalendarReady,
        closeCalendar,
        isVisible,
        calendarPosition,
        animation,
        arrow,
        zIndex
    ])

    if (multiple || range || Array.isArray(date) || !editable) inputMode = "none"

    return (
        <div
            ref={element => {
                datePickerRef.current = element

                if (datePickerRef.current) datePickerRef.current.closeCalendar = closeCalendar
                if (outerRef) outerRef.current = element

                if (outerRef?.current) {
                    outerRef.current.openCalendar = () => setTimeout(() => openCalendar(), 10)
                    outerRef.current.closeCalendar = closeCalendar
                    outerRef.current.isOpen = isVisible && isCalendarReady
                }
            }}
            className={`rmdp-container ${containerClassName}`}
            style={containerStyle}
        >
            {renderInput()}
            {isVisible && (
                <div
                    ref={calendarRef}
                    className={`rmdp-calendar-container ${isMobileMode() ? "rmdp-calendar-container-mobile" : ""}`}
                >
                    {arrow && !isMobileMode() && <div className={`rmdp-triangle ${(className.match(/bg-\w+/g) || []).join(" ")}`}></div>}
                    <Calendar
                        value={date}
                        onChange={handleChange}
                        range={range}
                        multiple={multiple}
                        calendar={calendar}
                        locale={locale}
                        format={format}
                        timePicker={timePicker}
                        onlyTimePicker={onlyTimePicker}
                        onlyMonthPicker={onlyMonthPicker}
                        onlyYearPicker={onlyYearPicker}
                        className={className}
                        weekDays={weekDays}
                        months={months}
                        showOtherDays={showOtherDays}
                        minDate={minDate}
                        maxDate={maxDate}
                        formattingIgnoreList={JSON.parse(formattingIgnoreList)}
                        onReady={() => setIsCalendarReady(true)}
                        onlyShowInRangeDates={onlyShowInRangeDates}
                        zIndex={zIndex}
                        datePickerRef={datePickerRef}
                        {...otherProps}
                    >
                        {children}
                        {isMobileMode() &&
                            <div className={`rmdp-action-buttons ${["fa", "ar"].includes(locale) ? "rmdp-rtl" : ""}`} >
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
                                    {toLocale("OK")}
                                </button>
                                <button
                                    type="button"
                                    className="rmdp-button rmdp-action-button"
                                    onClick={() => {
                                        closeCalendar()
                                        delete ref.current.temporaryDate
                                    }}
                                >
                                    {toLocale("CANCEL")}
                                </button>
                            </div>
                        }
                    </Calendar>
                </div>
            )}
            <div style={{ width: "10px", visibility: "hidden" }}></div>
            <div style={{ width: "5px", visibility: "hidden" }}></div>
        </div>
    )

    function isMobileMode() {
        return typeof className === "string" && className.includes("rmdp-mobile")
    }

    function toLocale(string) {
        let actions = {
            [DateObject.locales.EN]: { OK: "OK", CANCEL: "CANCEL" },
            [DateObject.locales.FA]: { OK: "تأیید", CANCEL: "لغو" },
            [DateObject.locales.AR]: { OK: "تأكيد", CANCEL: "الغاء" },
            [DateObject.locales.HI]: { OK: "पुष्टि", CANCEL: "रद्द करें" }
        }

        if (typeof locale === "string" && actions[locale.toUpperCase()]) return actions[locale.toUpperCase()][string]

        return string
    }

    function openCalendar() {
        if (disabled) return

        let shouldOpenCalendar = onOpen instanceof Function ? onOpen() : true

        if (shouldOpenCalendar === false) return

        let isMobile = isMobileMode(),
            isInput = inputRef.current.tagName === "INPUT" || inputRef.current.querySelector("input")

        if (!value && !ref.current.date && !range && !multiple) {
            let date = new DateObject({ calendar, locale, format })

            if (
                (!minDate || (minDate && date > minDate)) &&
                (!maxDate || (maxDate && date < maxDate))
            ) {
                handleChange(date, isMobile)

                ref.current.date = date
            }
        }

        if (isMobile && isInput) inputRef.current.blur()

        if (isInput || (!isInput && !isVisible)) {
            setIsVisible(true)
        } else if (!isInput && isVisible) {
            closeCalendar()
        }
    }

    function setCustomNames(date) {
        if (isValidMonths(months)) date.months = months
        if (isValidWeekDays(weekDays)) date.weekDays = weekDays
    }

    function handleChange(date, force, mustCloseCalendar = true) {
        if (isMobileMode() && !force) return ref.current.temporaryDate = date

        setDate(date)

        ref.current = { ...ref.current, date }

        if (onChange instanceof Function) onChange(date)

        if (date) {
            if (Array.isArray(date)) {
                date.map(setCustomNames)

                setStringDate(getStringDate(date, type, separator, format, formattingIgnoreList))
            } else {
                setCustomNames(date)

                setStringDate(
                    date.format(
                        getFormat(
                            timePicker,
                            onlyTimePicker,
                            onlyMonthPicker,
                            onlyYearPicker,
                            format,
                            range,
                            multiple
                        ),
                        JSON.parse(formattingIgnoreList)
                    )
                )

                if (mustCloseCalendar) closeCalendar()
            }
        }
    }

    function handleValueChange(e) {
        if (Array.isArray(date) || !editable) return

        let value = e.target.value,
            object = { year: 1, calendar, locale, format },
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

        handleChange(newDate, undefined, false)

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
                        id={id}
                        title={title}
                        className={inputClass || "rmdp-button"}
                        style={{
                            minWidth: Array.isArray(date) ? "185px" : "unset",
                            ...multipleStyle,
                            ...style
                        }}
                        disabled={disabled ? true : false}
                        type="button"
                    >
                        {stringDate || placeholder || "click to select"}
                    </button>
                )
            case "icon":
                return (
                    <div
                        ref={inputRef}
                        style={{ display: "inline-block" }}
                        id={id}
                        title={title}
                    >
                        <IconCalendarEvent
                            onClick={openCalendar}
                            name={name || ""}
                            className={`rmdp-icon ${inputClass || ""}`}
                            style={style}
                            size={30}
                            stroke={1.5}
                        />
                    </div>
                )
            case "custom":
                let strDate = stringDate || ""
                let toString = date => date.format(format, JSON.parse(formattingIgnoreList))

                if (
                    multiple ||
                    (range && !otherProps.eachDaysInRange)
                ) {
                    if (!Array.isArray(date)) {
                        strDate = []
                    } else {
                        strDate = date.map(toString)
                    }
                } else if (range && otherProps.eachDaysInRange) {
                    if (!Array.isArray(date)) {
                        strDate = []
                    } else {
                        strDate = getAllDatesInRange(date).map(toString)
                    }
                }

                return (
                    <div ref={inputRef}>
                        {React.isValidElement(render) ?
                            React.cloneElement(render, {
                                [multiple || range ? "stringDates" : "stringDate"]: strDate,
                                openCalendar,
                                handleValueChange
                            }) :
                            render instanceof Function ?
                                render(strDate, openCalendar, handleValueChange) :
                                null
                        }
                    </div>
                )
            default:
                return (
                    <div style={{ position: "relative" }}>
                        <input
                            ref={inputRef}
                            type="text"
                            name={name}
                            id={id}
                            title={title}
                            required={required}
                            onFocus={openCalendar}
                            className={inputClass || "rmdp-input"}
                            placeholder={placeholder}
                            value={stringDate}
                            onChange={handleValueChange}
                            style={style}
                            autoComplete="off"
                            disabled={disabled ? true : false}
                            inputMode={inputMode || (isMobileMode() ? "none" : undefined)}
                        />
                        {type === "input-icon" &&
                            <IconCalendarEvent
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
                                stroke={1.5}
                            />
                        }
                    </div>
                )
        }
    }
}

export default forwardRef(DatePicker)

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

function getInput(inputRef) {
    if (!inputRef.current) return

    return inputRef.current.tagName === "INPUT" ? inputRef.current : inputRef.current.querySelector("input")
}