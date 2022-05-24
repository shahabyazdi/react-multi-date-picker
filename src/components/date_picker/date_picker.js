import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  isValidElement,
  cloneElement,
} from "react";
import ElementPopper from "react-element-popper";
import DateObject from "react-date-object";
import Calendar from "../calendar/calendar";
import getFormat from "../../shared/getFormat";
import stringify from "../../shared/stringify";
import isArray from "../../shared/isArray";
import warn from "../../shared/warn";
import check from "../../shared/check";
import getLocaleName from "../../shared/getLocaleName";
import toLocaleDigits from "../../shared/toLocaleDigits";
import isRTL from "../../shared/isRTL";
import "./date_picker.css";

function DatePicker(
  {
    value,
    calendar,
    locale,
    format,
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
    onPropsChange,
    digits,
    readOnly,
    shadow = true,
    onFocusedDateChange,
    type,
    weekPicker,
    mobileLabels,
    onOpenPickNewDate = true,
    ...otherProps
  },
  outerRef
) {
  let [date, setDate] = useState(),
    [temporaryDate, setTemporaryDate] = useState(),
    [stringDate, setStringDate] = useState(""),
    [isVisible, setIsVisible] = useState(false),
    [isCalendarReady, setIsCalendarReady] = useState(false),
    datePickerRef = useRef(),
    inputRef = useRef(),
    calendarRef = useRef(),
    ref = useRef({}),
    separator = range || weekPicker ? " - " : ", ",
    datePickerProps = arguments[0],
    isMobileMode = isMobile(),
    closeCalendar = useCallback(() => {
      if (onClose?.() === false) return;

      let input = getInput(inputRef);

      if (input) input.blur();

      if (ref.current.mobile) {
        let popper = calendarRef.current.parentNode.parentNode;

        popper.classList.remove("rmdp-calendar-container-mobile");
        popper.style.position = "absolute";
        popper.style.visibility = "hidden";
      }

      setIsVisible(false);
      setIsCalendarReady(false);
    }, [onClose]);

  if (isMobileMode && !ref.current.mobile)
    ref.current = { ...ref.current, mobile: true };
  if (!isMobileMode && ref.current.mobile)
    ref.current = { ...ref.current, mobile: false };

  formattingIgnoreList = stringify(formattingIgnoreList);
  format = getFormat(onlyMonthPicker, onlyYearPicker, format);

  [calendar, locale] = check(calendar, locale);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isVisible || ref.current.mobile) return;
      /**
       * Due to the fact that by activating the portal mode,
       * the calendar element is moved out of the date picker container,
       * it is not possible to detect external clicks using the datePickerRef.
       * Therefore, inputRef and calendarRef can be checked separately.
       *
       * If the clicked area is outside of both the input and calendar elements,
       * the calendar should be closed.
       */
      let outsideList = [];

      [inputRef.current, calendarRef.current].forEach((element) => {
        if (
          element &&
          !element.contains(event.target) &&
          !event.target.classList.contains("b-deselect")
        ) {
          outsideList.push(element);
        }
      });

      if (outsideList.length === 2) return closeCalendar();

      if (calendarRef.current && calendarRef.current.contains(event.target)) {
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
      { date: refDate, initialValue } = ref.current,
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

    if (!value && !initialValue && refDate) {
      date = refDate;
    } else if (initialValue && !value) {
      initialValue = undefined;
    }

    if (range || multiple || isArray(date)) {
      if (!isArray(date)) date = [date];

      date = date.map(checkDate).filter((value) => value !== undefined);

      if (range && date.length > 2) date = [date[0], getLastDate()];

      setStringDate(getStringDate(date, separator));
    } else {
      if (isArray(date)) date = getLastDate();

      date = checkDate(date);

      if (document.activeElement !== getInput(inputRef)) {
        setStringDate(date ? date.format() : "");
      }
    }

    ref.current = {
      ...ref.current,
      date,
      separator,
      initialValue: initialValue || value,
    };

    if (ref.current.mobile && datePickerRef.current.isOpen) {
      setTemporaryDate(date);
    } else {
      setDate(date);
      console.log('date in useEffect', date);
    }
  }, [
    value,
    calendar,
    locale,
    format,
    range,
    multiple,
    separator,
    onlyMonthPicker,
    onlyYearPicker,
    weekDays,
    months,
    digits,
    formattingIgnoreList,
  ]);

  useEffect(() => {
    /**
     * If the locale is non-English, after manually changing the input value,
     * the caret position jumps to the end of the input.
     * To solve this issue, we save the previous position of caret in the ref,
     * and in this effect, we recover it.
     */
    let { selection } = ref.current;

    if (!selection) return;
    /**
     * If the caret position is undefined, there is no reason to get the input.
     * So we only get the input if the caret position is available.
     */
    let input = getInput(inputRef);

    if (!input) return;

    input.setSelectionRange(selection, selection);
    ref.current.selection = undefined;
    /**
     * after manually changing the month by typing in the input,
     * if the calendar position is in top of the input
     * and the number of days in the new month is greater than the number of days in the previous month,
     * the calendar will cover the input due to its larger size.
     * To resolve this issue, we refresh the calendar position here.
     */
    datePickerRef.current.refreshPosition();
  }, [stringDate]);

  if (multiple || isArray(date) || !editable) inputMode = "none";

  return (
    <ElementPopper
      ref={setRef}
      element={renderInput()}
      popper={isVisible && renderCalendar()}
      active={!isMobileMode && isCalendarReady}
      position={calendarPosition}
      arrow={!isMobileMode && arrow}
      fixMainPosition={!scrollSensitive || fixMainPosition}
      zIndex={zIndex}
      onChange={!isMobileMode && onPositionChange}
      containerClassName={`rmdp-container ${containerClassName}`}
      arrowClassName={[
        "rmdp-ep-arrow",
        `rmdp-ep-${shadow ? "shadow" : "border"}`,
        className,
        arrowClassName,
      ].join(" ")}
      {...otherProps}
    />
  );

  function setRef(element) {
    if (element) {
      element.openCalendar = () => setTimeout(() => openCalendar(), 10);
      element.closeCalendar = closeCalendar;
      element.isOpen = isVisible && isCalendarReady;
    }

    datePickerRef.current = element;

    if (outerRef instanceof Function) return outerRef(element);
    if (outerRef) outerRef.current = element;
  }

  function renderInput() {
    if (typeof type === "string") {
      warn([
        "the type Prop is deprecated.",
        "https://shahabyazdi.github.io/react-multi-date-picker/types/",
      ]);
    }

    if (render) {
      let strDate =
        isArray(date) || multiple || range
          ? getStringDate(date, separator)
          : stringDate;

      return (
        <div ref={inputRef}>
          {isValidElement(render)
            ? cloneElement(render, {
                [multiple || range ? "stringDates" : "stringDate"]: strDate,
                value: strDate,
                openCalendar,
                handleValueChange,
                locale,
                separator,
              })
            : render instanceof Function
            ? render(
                strDate,
                openCalendar,
                handleValueChange,
                locale,
                separator
              )
            : null}
        </div>
      );
    } else {
      return (
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
          // inputMode={inputMode || (isMobileMode ? "none" : undefined)}
          readOnly={readOnly}
        />
      );
    }
  }

  function renderCalendar() {
    console.log('date in renderCalendar', date);
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
        onlyMonthPicker={onlyMonthPicker}
        onlyYearPicker={onlyYearPicker}
        className={className + (isMobileMode ? " rmdp-mobile" : "")}
        weekDays={weekDays}
        months={months}
        digits={digits}
        minDate={minDate}
        maxDate={maxDate}
        formattingIgnoreList={JSON.parse(formattingIgnoreList)}
        onPropsChange={onPropsChange}
        shadow={shadow}
        onReady={setCalendarReady}
        DatePicker={datePickerRef.current}
        datePickerProps={datePickerProps}
        onFocusedDateChange={handleFocusedDate}
        weekPicker={weekPicker}
        {...otherProps}
      >
        {children}
        {isMobileMode && renderButtons()}
      </Calendar>
    );
  }

  function isMobile() {
    return typeof className === "string" && className.includes("rmdp-mobile");
  }

  function renderButtons() {
    let mustSetTopBorder = [].concat
      .apply([], datePickerProps.plugins || [])
      .some(({ props = {} }) => !props.disabled);

    return (
      <div
        className={`rmdp-action-buttons ${isRTL(locale) ? "rmdp-rtl" : ""} ${
          mustSetTopBorder ? "rmdp-border-top" : ""
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
    );
  }

  function toLocale(string) {
    if (!locale || typeof locale.name !== "string") return string;

    let actions = {
      en: { OK: "OK", CANCEL: "CANCEL" },
      fa: { OK: "تأیید", CANCEL: "لغو" },
      ar: { OK: "تأكيد", CANCEL: "الغاء" },
      hi: { OK: "पुष्टि", CANCEL: "रद्द करें" },
    };

    return (
      mobileLabels?.[string] ||
      actions[getLocaleName(locale)]?.[string] ||
      string
    );
  }

  function openCalendar() {
    if (disabled || readOnly || onOpen?.() === false) return;

    if (mustPickNewDate()) {
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
        handleChange(date);
        onPropsChange?.({ ...datePickerProps, value: date });

        ref.current.date = date;
      }
    }

    let input = getInput(inputRef);

    if (isMobileMode && input) input.blur();

    if (input || !isVisible) {
      setIsVisible(true);
    } else {
      closeCalendar();
    }
  }

  function mustPickNewDate() {
    return (
      onOpenPickNewDate &&
      !value &&
      !ref.current.date &&
      !range &&
      !multiple &&
      !isMobileMode
    );
  }

  function handleChange(date, force) {
    if (isMobileMode && !force) return setTemporaryDate(date);

    setDate(date);
    console.log('date in handleChange', date);

    ref.current = { ...ref.current, date };

    onChange?.(date);

    if (date) setStringDate(getStringDate(date, separator));
  }

  function handleValueChange(e) {
    console.log('handleValueChange', e.target);
    if (!editable) return;

    let value = e.target.value;

    ref.current.selection = e.target.selectionStart;

    let object = {
        calendar,
        locale,
        format,
        ignoreList: JSON.parse(formattingIgnoreList),
      };

    if (range) {
      setStringDate(value);
      const inputtedDates = value.split(' - ');

      if (isDate(inputtedDates[0])) {
        const dateRangeStart = new DateObject({
          ...object,
          date: inputtedDates[0]
        });
        handleChange(dateRangeStart.isValid ? dateRangeStart : null);
      }
      if (isDate(inputtedDates[1]) && new Date(inputtedDates[1]) > new Date(inputtedDates[0])) {
        const dateRangeEnd = new DateObject({
          ...object,
          date: inputtedDates[1]
        });
        handleChange(dateRangeEnd.isValid ? dateRangeEnd : null);
      }
      return;
    }

    digits = isArray(digits) ? digits : locale.digits;

    if (!value) {
      setStringDate("");

      return handleChange(null);
    }

    if (!digits) return;
    //converting value to english digits
    for (let digit of digits) {
      value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit));
    }

    let newDate;
    /**
     * Given that the only valid date is the date that has all three values ​​of the day, month, and year.
     * To generate a new date, we must check whether the day, month, and year
     * are defined in the format or not.
     */
    if (/(?=.*Y)(?=.*M)(?=.*D)/.test(format)) {
      /**
       * If the above condition is true,
       * we generate a new date from the input value.
       */
      newDate = new DateObject({
        ...object,
        date: value,
      });
    } else {
      /**
       * Otherwise, we generate today's date and replace the input value ​​with today's values.
       * For example, if we are only using the TimePicker and the input value follows the format "HH:mm",
       * if we generate a new date from the format "HH:mm", given that the values ​​of the day, month, and year
       * do not exist in the input value, an invalid date will be generated.
       * Therefore, it is better to generate today's date and replace only the hour and minute with today's values.
       */
      newDate = new DateObject(object).parse(value);
    }

    handleChange(newDate.isValid ? newDate : null);
    setStringDate(toLocaleDigits(value, digits));
  }

  function setCalendarReady() {
    setIsCalendarReady(true);

    if (!isMobileMode) return;

    let popper = calendarRef.current.parentNode.parentNode;

    popper.className = "rmdp-calendar-container-mobile";
    popper.style.position = "fixed";
    popper.style.transform = "";

    setTimeout(() => {
      popper.style.visibility = "visible";
    }, 50);
  }

  function handleFocusedDate(focusedDate, clickedDate) {
    if (!isArray(ref.current.date) && clickedDate && !isMobileMode) {
      closeCalendar();
    }

    onFocusedDateChange?.(focusedDate, clickedDate);
  }
}

export default forwardRef(DatePicker);

function getStringDate(date, separator) {
  let dates = [].concat(date).map(toString);

  dates.toString = function () {
    return this.filter(Boolean).join(separator);
  };

  return dates;

  function toString(date) {
    return date?.isValid ? date.format() : "";
  }
}

function getInput(inputRef) {
  if (!inputRef.current) return;

  return inputRef.current.tagName === "INPUT"
    ? inputRef.current
    : inputRef.current.querySelector("input");
}

function isDate(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}