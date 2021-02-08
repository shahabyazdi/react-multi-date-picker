import React, { useState, useEffect, useRef, useMemo, useCallback, forwardRef } from "react"
import ElementPopper from "react-element-popper"
import DateObject from "react-date-object"
import Calendar from "../calendar/calendar"
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
    children,
    inputMode,
    scrollSensitive = true,
    hideOnScroll,
    minDate,
    maxDate,
    formattingIgnoreList,
    containerClassName = "",
    calendarPosition,
    editable = true,
    onlyShowInRangeDates = true,
    onOpen,
    onClose,
    arrowClassName = "",
    zIndex = 100,
    arrow = true,
    fixMainPosition,
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
      if (onClose instanceof Function && onClose() === false) return

      let input = getInput(inputRef)

      if (input) input.blur()

      if (ref.current.mobile) {
        let popper = calendarRef.current.parentNode.parentNode

        popper.classList.remove("rmdp-calendar-container-mobile")
        popper.style.position = "absolute"
      }

      setIsVisible(false)
      setIsCalendarReady(false)
    }, [onClose])

  if (isMobileMode() && !ref.current.mobile) ref.current = { ...ref.current, mobile: true }
  if (!isMobileMode() && ref.current.mobile) ref.current = { ...ref.current, mobile: false }
  if (!Array.isArray(formattingIgnoreList)) formattingIgnoreList = []

  formattingIgnoreList = JSON.stringify(formattingIgnoreList)

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isVisible) return

      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        !event.target.classList.contains("b-deselect") &&
        !ref.current.mobile
      ) {
        closeCalendar()
      } else if (
        inputRef.current && calendarRef.current &&
        calendarRef.current.contains(event.target) &&
        !Array.isArray(ref.current.date) &&
        event.target.classList.contains("sd") &&
        !ref.current.mobile
      ) {
        closeCalendar()
      } else if (
        calendarRef.current &&
        calendarRef.current.contains(event.target) &&
        !ref.current.mobile
      ) {
        datePickerRef.current.removeTransition()
        datePickerRef.current.refreshPosition()
      }
    }

    function handleScroll() {
      if (hideOnScroll && isVisible) closeCalendar()
    }

    document.addEventListener("click", handleClickOutside, false)
    document.addEventListener("scroll", handleScroll, true)

    return () => {
      document.removeEventListener("click", handleClickOutside, false)
      document.removeEventListener("scroll", handleScroll, true)
    }
  }, [closeCalendar, outerRef, isVisible, hideOnScroll])

  useEffect(() => {
    let date = value,
      getLastDate = () => date[date.length - 1]

    function checkDate(date) {
      if (!date) return
      if (!(date instanceof DateObject)) date = new DateObject({ date, calendar, locale, format })

      if (date.calendar !== calendar) date.setCalendar(calendar)
      if (date.locale !== locale) date.setLocale(locale)

      date.months = months
      date.weekDays = weekDays

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

  if (multiple || range || Array.isArray(date) || !editable) inputMode = "none"

  return (
    <ElementPopper
      ref={element => {
        if (element) {
          element.openCalendar = () => setTimeout(() => openCalendar(), 10)
          element.closeCalendar = closeCalendar
          element.isOpen = isVisible && isCalendarReady
        }

        datePickerRef.current = element

        if (outerRef instanceof Function) return outerRef(element)
        if (outerRef) outerRef.current = element
      }}
      element={renderInput()}
      popper={isVisible && rendetCalendar()}
      active={!isMobileMode() && isCalendarReady}
      position={calendarPosition}
      arrow={!isMobileMode() && arrow}
      containerClassName={`rmdp-container ${containerClassName}`}
      arrowClassName={`${className} ${arrowClassName}`}
      fixMainPosition={!scrollSensitive || fixMainPosition}
      zIndex={zIndex}
      {...otherProps}
    />
  )

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

  function rendetCalendar() {
    return (
      <Calendar
        ref={calendarRef}
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
        className={className + (isMobileMode() ? " rmdp-mobile" : "")}
        weekDays={weekDays}
        months={months}
        minDate={minDate}
        maxDate={maxDate}
        formattingIgnoreList={JSON.parse(formattingIgnoreList)}
        onReady={() => {
          setIsCalendarReady(true)

          if (!isMobileMode()) return

          let popper = calendarRef.current.parentNode.parentNode

          popper.className = "rmdp-calendar-container-mobile"
          popper.style.position = "fixed"
          popper.style.visibility = "visible"
          popper.style.transform = ""
        }}
        onlyShowInRangeDates={onlyShowInRangeDates}
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
    )
  }

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
      input = getInput(inputRef)

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

    if (isMobile && input) input.blur()

    if (input || (!input && !isVisible)) {
      setIsVisible(true)
    } else if (!input && isVisible) {
      closeCalendar()
    }
  }

  function handleChange(date, force) {
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
      }
    }
  }

  function setCustomNames(date) {
    date.months = months
    date.weekDays = weekDays
  }

  function handleValueChange(e) {
    if (Array.isArray(date) || !editable) return

    let value = e.target.value,
      object = { year: 1, calendar, locale, format },
      digits = date && date.isValid ? date.digits : new DateObject(object).digits

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