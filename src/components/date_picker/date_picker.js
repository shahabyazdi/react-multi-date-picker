import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  forwardRef,
} from "react";
import ElementPopper from "react-element-popper";
import DateObject from "react-date-object";
import Calendar, { getFormat, getIgnoreList } from "../calendar/calendar";
import getAllDatesInRange from "../../../plugins/all/date_panel/getAllDatesInRange";
import { IconCalendarEvent } from "@tabler/icons";
import "./date_picker.css";

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
    calendarPosition = "bottom-left",
    editable = true,
    onOpen,
    onClose,
    arrowClassName = "",
    zIndex = 100,
    arrow = true,
    fixMainPosition,
    onPositionChange,
    digits,
    readOnly,
    ...otherProps
  },
  outerRef
) {
  let [date, setDate] = useState(),
    [temporaryDate, setTemporaryDate] = useState(undefined),
    [stringDate, setStringDate] = useState(""),
    [isVisible, setIsVisible] = useState(false),
    [isCalendarReady, setIsCalendarReady] = useState(false),
    datePickerRef = useRef(null),
    inputRef = useRef(null),
    calendarRef = useRef(null),
    ref = useRef({}),
    separator = useMemo(() => (range ? " ~ " : ", "), [range]),
    datePickerProps = arguments[0],
    closeCalendar = useCallback(() => {
      if (onClose instanceof Function && onClose() === false) return;

      let input = getInput(inputRef);

      if (input) input.blur();

      if (ref.current.mobile) {
        let popper = calendarRef.current.parentNode.parentNode;

        popper.classList.remove("rmdp-calendar-container-mobile");
        popper.style.position = "absolute";
      }

      setIsVisible(false);
      setIsCalendarReady(false);
    }, [onClose]);

  let isMobileMode = isMobile();

  if (isMobileMode && !ref.current.mobile)
    ref.current = { ...ref.current, mobile: true };
  if (!isMobileMode && ref.current.mobile)
    ref.current = { ...ref.current, mobile: false };

  formattingIgnoreList = getIgnoreList(formattingIgnoreList);

  format = getFormat(
    timePicker,
    onlyTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    format
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isVisible) return;

      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        !event.target.classList.contains("b-deselect") &&
        !ref.current.mobile
      ) {
        closeCalendar();
      } else if (
        inputRef.current &&
        calendarRef.current &&
        calendarRef.current.contains(event.target) &&
        !Array.isArray(ref.current.date) &&
        event.target.classList.contains("sd") &&
        !ref.current.mobile
      ) {
        closeCalendar();
      } else if (
        calendarRef.current &&
        calendarRef.current.contains(event.target) &&
        !ref.current.mobile
      ) {
        datePickerRef.current.removeTransition();
        datePickerRef.current.refreshPosition();
      }
    }

    function handleScroll() {
      if (hideOnScroll && isVisible) closeCalendar();
    }

    document.addEventListener("click", handleClickOutside, false);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [closeCalendar, outerRef, isVisible, hideOnScroll]);

  useEffect(() => {
    let date = value,
      getLastDate = () => date[date.length - 1];

    function checkDate(date) {
      if (!date) return;
      if (!(date instanceof DateObject))
        date = new DateObject({ date, calendar, locale, format });

      if (date.calendar !== calendar) date.setCalendar(calendar);

      date.set({
        weekDays,
        months,
        digits,
        locale,
        format,
        ignoreList: JSON.parse(formattingIgnoreList),
      });

      return date;
    }

    if (range || multiple || Array.isArray(date)) {
      if (!Array.isArray(date)) date = [date];

      date = date.map(checkDate).filter((value) => value !== undefined);

      if (range && date.length > 2) date = [date[0], getLastDate()];

      setStringDate(getStringDate(date, type, separator));
    } else {
      if (Array.isArray(date)) date = getLastDate();

      date = checkDate(date);

      let input = getInput(inputRef);

      if (document.activeElement !== input) {
        setStringDate(date ? date.format() : "");
      }
    }

    ref.current = { ...ref.current, date, separator };

    setDate(date);

    if (type === "input-icon") {
      let input = inputRef.current,
        icon = input?.parentNode?.querySelector?.(".rmdp-input-icon"),
        height = input?.clientHeight - 5 + "px";

      if (icon) {
        icon.style.height = height;
        icon.style.width = height;
      }
    }
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
    digits,
    formattingIgnoreList,
  ]);

  if (multiple || range || Array.isArray(date) || !editable) inputMode = "none";

  return (
    <ElementPopper
      ref={(element) => {
        if (element) {
          element.openCalendar = () => setTimeout(() => openCalendar(), 10);
          element.closeCalendar = closeCalendar;
          element.isOpen = isVisible && isCalendarReady;
        }

        datePickerRef.current = element;

        if (outerRef instanceof Function) return outerRef(element);
        if (outerRef) outerRef.current = element;
      }}
      element={renderInput()}
      popper={isVisible && renderCalendar()}
      active={!isMobileMode && isCalendarReady}
      position={calendarPosition}
      arrow={!isMobileMode && arrow}
      containerClassName={`rmdp-container ${containerClassName}`}
      arrowClassName={`${className} ${arrowClassName}`}
      fixMainPosition={!scrollSensitive || fixMainPosition}
      zIndex={zIndex}
      onChange={!isMobileMode && onPositionChange}
      {...otherProps}
    />
  );

  function renderInput() {
    let isMultiple = (!range && Array.isArray(date)) || multiple;

    let multipleStyle = isMultiple
      ? {
          whiteSpace: "nowrap",
          overflow: "hidden",
        }
      : {};

    let alternativePlaceholder = {
      en: "click to select",
      fa: "انتخاب کنید",
    };

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
              ...style,
            }}
            disabled={disabled ? true : false}
            type="button"
          >
            {stringDate ||
              placeholder ||
              (locale === "fa"
                ? alternativePlaceholder.fa
                : alternativePlaceholder.en)}
          </button>
        );
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
        );
      case "custom":
        let strDate = stringDate || "";
        let toString = (date) => date.format();

        if (multiple || (range && !otherProps.eachDaysInRange)) {
          if (!Array.isArray(date)) {
            strDate = [];
          } else {
            strDate = date.map(toString);
          }
        } else if (range && otherProps.eachDaysInRange) {
          if (!Array.isArray(date)) {
            strDate = [];
          } else {
            strDate = getAllDatesInRange(date).map(toString);
          }
        }

        return (
          <div ref={inputRef}>
            {React.isValidElement(render)
              ? React.cloneElement(render, {
                  [multiple || range ? "stringDates" : "stringDate"]: strDate,
                  openCalendar,
                  handleValueChange,
                })
              : render instanceof Function
              ? render(strDate, openCalendar, handleValueChange)
              : null}
          </div>
        );
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
              inputMode={inputMode || (isMobileMode ? "none" : undefined)}
              readOnly={readOnly}
            />
            {type === "input-icon" && (
              <IconCalendarEvent
                className="rmdp-input-icon"
                height={20}
                width={20}
                style={{
                  [["fa", "ar"].includes(locale) ? "left" : "right"]: "2.5px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "inherit",
                }}
                onClick={() => {
                  if (isVisible) {
                    closeCalendar();
                  } else {
                    inputRef.current.focus();
                  }
                }}
                stroke={1.5}
              />
            )}
          </div>
        );
    }
  }

  function renderCalendar() {
    return (
      <Calendar
        ref={calendarRef}
        value={temporaryDate || date}
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
        className={className + (isMobileMode ? " rmdp-mobile" : "")}
        weekDays={weekDays}
        months={months}
        digits={digits}
        minDate={minDate}
        maxDate={maxDate}
        formattingIgnoreList={JSON.parse(formattingIgnoreList)}
        onReady={() => {
          setIsCalendarReady(true);

          if (!isMobileMode) return;

          let popper = calendarRef.current.parentNode.parentNode;

          popper.className = "rmdp-calendar-container-mobile";
          popper.style.position = "fixed";
          popper.style.visibility = "visible";
          popper.style.transform = "";
        }}
        DatePicker={datePickerRef.current}
        datePickerProps={datePickerProps}
        {...otherProps}
      >
        {children}
        {isMobileMode && (
          <div
            className={`rmdp-action-buttons ${
              ["fa", "ar"].includes(locale) ? "rmdp-rtl" : ""
            }`}
          >
            <button
              type="button"
              className="rmdp-button rmdp-action-button"
              onClick={() => {
                if (temporaryDate) {
                  handleChange(temporaryDate, true);
                  setTemporaryDate(undefined);
                }

                closeCalendar();
              }}
            >
              {toLocale("OK")}
            </button>
            <button
              type="button"
              className="rmdp-button rmdp-action-button"
              onClick={() => {
                setTemporaryDate(undefined);
                closeCalendar();
              }}
            >
              {toLocale("CANCEL")}
            </button>
          </div>
        )}
      </Calendar>
    );
  }

  function isMobile() {
    return typeof className === "string" && className.includes("rmdp-mobile");
  }

  function toLocale(string) {
    let actions = {
      EN: { OK: "OK", CANCEL: "CANCEL" },
      FA: { OK: "تأیید", CANCEL: "لغو" },
      AR: { OK: "تأكيد", CANCEL: "الغاء" },
      HI: { OK: "पुष्टि", CANCEL: "रद्द करें" },
    };

    if (typeof locale === "string" && actions[locale.toUpperCase()])
      return actions[locale.toUpperCase()][string];

    return string;
  }

  function openCalendar() {
    if (
      disabled ||
      readOnly ||
      (onOpen instanceof Function && onOpen() === false)
    )
      return;

    let input = getInput(inputRef);

    if (!value && !ref.current.date && !range && !multiple) {
      let date = new DateObject({
        calendar,
        locale,
        format,
        months,
        weekDays,
        digits,
        ignoreList: JSON.parse(formattingIgnoreList),
      });

      if ((!minDate || date > minDate) && (!maxDate || date < maxDate)) {
        handleChange(date, isMobileMode);

        ref.current.date = date;
      }
    }

    if (isMobileMode && input) input.blur();

    if (input || !isVisible) {
      setIsVisible(true);
    } else {
      closeCalendar();
    }
  }

  function handleChange(date, force) {
    if (isMobileMode && !force) return setTemporaryDate(date);

    setDate(date);

    ref.current = { ...ref.current, date };

    if (onChange instanceof Function) onChange(date);

    if (date) setStringDate(getStringDate(date, type, separator));
  }

  function handleValueChange(e) {
    if (Array.isArray(date) || !editable) return;

    let value = e.target.value,
      object = { year: 1, calendar, locale, format },
      digits =
        date && date.isValid ? date.digits : new DateObject(object).digits;

    if (!value) {
      setStringDate("");

      return handleChange(new DateObject({}));
    }

    if (!digits) return;

    for (let digit of digits) {
      value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit));
    }

    let newDate = new DateObject(date?.isValid ? date : object).parse(value);

    handleChange(newDate);

    setStringDate(value.replace(/[0-9]/g, (w) => digits[w]));
  }
}

export default forwardRef(DatePicker);

function getStringDate(date, type, separator) {
  if (!date) return "";

  let toString = (date) => date.format();

  return !Array.isArray(date)
    ? toString(date)
    : type === "button" && date.length > 1
    ? [date[0], date[1]].map(toString).join(separator)
    : date.map(toString).join(separator);
}

function getInput(inputRef) {
  if (!inputRef.current) return;

  return inputRef.current.tagName === "INPUT"
    ? inputRef.current
    : inputRef.current.querySelector("input");
}
