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
import check from "../../shared/check";
import getLocaleName from "../../shared/getLocaleName";
import toLocaleDigits from "../../shared/toLocaleDigits";
import isRTL from "../../shared/isRTL";
import toDateObject from "../../shared/toDateObject";
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
    mobileButtons = [],
    dateSeparator,
    multipleRangeSeparator = ",",
    typingTimeout = 700,
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
    ref = useRef({ isTyping: false }),
    separator = dateSeparator || (range || weekPicker ? " ~ " : ", "),
    datePickerProps = arguments[0],
    isMobileMode = isMobile(),
    closeCalendar = useCallback(() => {
      if (onClose?.() === false) return;

      let inputs = getInputs(inputRef);

      if (inputs) inputs.forEach((input) => input.blur());

      if (ref.current.mobile) {
        let popper = calendarRef.current.parentNode.parentNode;

        popper.classList.remove("rmdp-calendar-container-mobile");
        popper.style.position = "absolute";
        popper.style.visibility = "hidden";
      }

      if (ref.current.validInputValue !== undefined) {
        setStringDate(ref.current.validInputValue);

        ref.current.validInputValue = undefined;
      }

      setIsVisible(false);
      setIsCalendarReady(false);
    }, [onClose]),
    buttons = [
      {
        type: "button",
        className: "rmdp-button rmdp-action-button",
        onClick: () => {
          setTemporaryDate(undefined);
          closeCalendar();
        },

        label: toLocale("CANCEL"),
      },
      {
        type: "button",
        className: "rmdp-button rmdp-action-button",
        onClick: () => {
          if (temporaryDate) {
            handleChange(temporaryDate, true);
            setTemporaryDate(undefined);
          }

          closeCalendar();
        },

        label: toLocale("OK"),
      },
    ];

  if (isMobileMode && !ref.current.mobile) {
    ref.current = { ...ref.current, mobile: true };
  }

  if (!isMobileMode && ref.current.mobile) {
    ref.current = { ...ref.current, mobile: false };
  }

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
          !event.target.classList.contains("b-deselect") &&
          !event.target.parentNode?.classList?.contains?.("b-deselect")
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

    let strDate = "";

    if (range || multiple || isArray(date)) {
      if (!isArray(date)) {
        date = range && multiple ? (date ? [[date]] : []) : [date];
      }

      if (multiple && range) {
        date = date.map((range, i) => {
          const [dates, strDates] = getDatesAndStrDates(
            isArray(range) ? range : [range]
          );

          strDate +=
            strDates +
            (i < date.length - 1 ? ` ${multipleRangeSeparator} ` : "");

          return dates;
        });
      } else {
        [date, strDate] = getDatesAndStrDates(date);
      }

      strDate = strDate.toString().replace(/\s,\s$/, "");

      function getDatesAndStrDates(date) {
        date = date.map(checkDate).filter((value) => value !== undefined);

        if (range && date.length > 2) date = [date[0], getLastDate()];

        return [date, getStringDate(date, separator)];
      }
    } else {
      if (isArray(date)) date = getLastDate();

      date = checkDate(date);

      if (date) strDate = date.format();
    }

    if (!ref.current.isTyping) setStringDate(strDate);

    ref.current = {
      ...ref.current,
      date,
      separator,
      initialValue: initialValue || value,
    };

    if (ref.current.mobile && datePickerRef.current.isOpen) {
      setTemporaryDate(date);
    } else {
      ref.current.validInputValue = undefined;

      setDate(date);
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
    let inputs = getInputs(inputRef);

    if (inputs.length === 0) return;

    inputs.forEach((input) => {
      if (document.activeElement !== input) return;

      input.setSelectionRange(selection, selection);

      ref.current.selection = undefined;
    });
    /**
     * after manually changing the month by typing in the input,
     * if the calendar position is in top of the input
     * and the number of days in the new month is greater than the number of days in the previous month,
     * the calendar will cover the input due to its larger size.
     * To resolve this issue, we refresh the calendar position here.
     */
    datePickerRef.current.refreshPosition();
  }, [stringDate]);

  if (multiple || range || isArray(date) || !editable) inputMode = "none";

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
    if (render) {
      return (
        <div ref={inputRef}>
          {isValidElement(render)
            ? cloneElement(render, {
                value: stringDate,
                openCalendar,
                onFocus: openCalendar,
                handleValueChange,
                onChange: handleValueChange,
                locale,
                separator,
              })
            : render instanceof Function
            ? render(
                stringDate,
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
          type={type || "text"}
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
      isArray(mobileButtons) && (
        <div
          className={`rmdp-action-buttons ${isRTL(locale) ? "rmdp-rtl" : ""} ${
            mustSetTopBorder ? "rmdp-border-top" : ""
          }`}
        >
          {mobileButtons.concat(buttons).map(({ label, ...props }, index) => (
            <button key={index} {...props}>
              {label}
            </button>
          ))}
        </div>
      )
    );
  }

  function toLocale(string) {
    const currentLocale = locale || new DateObject().locale;

    if (typeof currentLocale.name !== "string") return string;

    const actions = {
      en: { OK: "OK", CANCEL: "CANCEL" },
      fa: { OK: "تأیید", CANCEL: "لغو" },
      ar: { OK: "تأكيد", CANCEL: "الغاء" },
      hi: { OK: "पुष्टि", CANCEL: "रद्द करें" },
    };

    return (
      mobileLabels?.[string] ||
      actions[getLocaleName(currentLocale)]?.[string] ||
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

      if (
        (!minDate || date > toDateObject(minDate, calendar, format)) &&
        (!maxDate || date < toDateObject(maxDate, calendar, format))
      ) {
        handleChange(date);
        onPropsChange?.({ ...datePickerProps, value: date });

        ref.current.date = date;
      }
    }

    let inputs = getInputs(inputRef);

    if (isMobileMode && inputs.length > 0) {
      inputs.forEach((input) => input.blur());
    }

    if (inputs.length > 0 || !isVisible) {
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

  function getInputValue(date) {
    let strDate = "";

    if (date) {
      if (multiple && range && isArray(date)) {
        strDate = date
          .map((range) => getStringDate(range, separator))
          .join(` ${multipleRangeSeparator} `);
      } else {
        strDate = getStringDate(date, separator);
      }
    }

    return strDate;
  }

  function handleChange(date, force, inputValue) {
    if (isMobileMode && !force) return setTemporaryDate(date);

    const strDate = getInputValue(date);
    const newValue = inputValue || strDate.toString().replace(/\s,\s$/, "");

    if (
      date &&
      []
        .concat(date)
        .flat()
        .some(
          (date) =>
            (minDate && date < toDateObject(minDate, calendar, format)) ||
            (maxDate && date > toDateObject(maxDate, calendar, format))
        )
    ) {
      ref.current.validInputValue = getInputValue(value || ref.current.date);

      return setStringDate(newValue);
    }

    ref.current.validInputValue = strDate;

    const mustUpdateState = onChange?.(date, {
      validatedValue: strDate,
      input: inputRef.current,
      isTyping: !!inputValue,
    });

    if (mustUpdateState === false) {
      setStringDate(stringDate);

      return false;
    }

    setDate(date);
    setStringDate(newValue);

    ref.current = { ...ref.current, date };
  }

  function handleValueChange(e) {
    if (!editable) return;

    ref.current.isTyping = true;

    setTimeout(() => {
      ref.current.isTyping = false;
    }, typingTimeout);

    ref.current.selection = e.target.selectionStart;

    let value = e.target.value,
      object = {
        calendar,
        locale,
        format,
        ignoreList: JSON.parse(formattingIgnoreList),
      };

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

    if (!isArray(date)) {
      newDate = getSingleDate(value);
    } else if (!multiple || !range) {
      newDate = getMultipleDates(value);
    } else {
      newDate = (value || "")
        .split(multipleRangeSeparator)
        .filter(Boolean)
        .map(getMultipleDates);
    }

    handleChange(
      !isArray(date) ? (newDate.isValid ? newDate : null) : newDate,
      undefined,
      toLocaleDigits(value, digits)
    );

    function getSingleDate(value) {
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
        return new DateObject({
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
        return new DateObject(object).parse(value);
      }
    }

    function getMultipleDates(value) {
      return (value || "")
        .split(separator)
        .filter(Boolean)
        .map((value) => getSingleDate(value.trim()));
    }
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

function getInputs(inputRef) {
  if (!inputRef.current) return [];

  return inputRef.current.tagName === "INPUT"
    ? [inputRef.current]
    : Array.from(inputRef.current.querySelectorAll("input"));
}
