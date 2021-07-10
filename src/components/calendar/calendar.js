import React, { useState, useEffect, forwardRef, useRef } from "react";
import DayPicker from "../day_picker/day_picker";
import Header from "../header/header";
import MonthPicker from "../month_picker/month_picker";
import YearPicker from "../year_picker/year_picker";
import TimePicker from "../time_picker/time_picker";
import DateObject from "react-date-object";
import "./calendar.css";

function Calendar(
  {
    value,
    calendar = "gregorian",
    locale = "en",
    format,
    timePicker,
    onlyTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    range = false,
    multiple = false,
    className,
    weekDays,
    months,
    children,
    onChange,
    showOtherDays,
    minDate,
    maxDate,
    mapDays,
    disableMonthPicker,
    disableYearPicker,
    formattingIgnoreList,
    onReady,
    onlyShowInRangeDates = true,
    zIndex = 100,
    plugins = [],
    sort,
    numberOfMonths = 1,
    currentDate,
    digits,
    buttons = true,
    renderButton,
    weekStartDayIndex = 0,
    disableDayPicker,
    onPropsChange,
    onMonthChange,
    onYearChange,
    onFocusedDateChange,
    readOnly,
    disabled,
    hideMonth,
    hideYear,
    hideWeekDays,
    shadow = true,
  },
  outerRef
) {
  if (currentDate && !(currentDate instanceof DateObject)) {
    console.warn("currentDate must be instance of DateObject");

    currentDate = undefined;
  }

  if (
    typeof weekStartDayIndex !== "number" ||
    weekStartDayIndex < 0 ||
    weekStartDayIndex > 6
  )
    weekStartDayIndex = 0;

  if (
    typeof numberOfMonths !== "number" ||
    numberOfMonths < 1 ||
    onlyMonthPicker ||
    onlyYearPicker
  )
    numberOfMonths = 1;

  if (multiple || range || Array.isArray(value)) {
    if (!range && !multiple) multiple = true;

    timePicker = false;
    onlyTimePicker = false;
  }

  if (onlyYearPicker && !hideMonth) hideMonth = true;

  format = getFormat(
    timePicker,
    onlyTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    format
  );

  let [state, setState] = useState({}),
    listeners = {},
    ref = useRef({ mustCallOnReady: true, currentDate });

  formattingIgnoreList = getIgnoreList(formattingIgnoreList);

  useEffect(() => {
    setState((state) => {
      let { currentDate } = ref.current;
      let { date, selectedDate, initialValue, focused, mustSortDates } = state;

      function checkDate(date) {
        if (!date) return;
        if (date.calendar !== calendar) date.setCalendar(calendar);
        if (date.locale !== locale) date.setLocale(locale);
        if (date._format !== format) date.setFormat(format);

        date.digits = digits;
        date.ignoreList = JSON.parse(formattingIgnoreList);

        return date;
      }

      function getDate(value) {
        return new DateObject(currentDate || value);
      }

      if (!value) {
        if (!date) date = getDate({ calendar, locale, format });
        if (initialValue) selectedDate = undefined;
      } else {
        selectedDate = getSelectedDate(value, calendar, locale, format);

        if (Array.isArray(selectedDate)) {
          if (!date) date = getDate(selectedDate[0]);
        } else {
          if (!date || numberOfMonths === 1) {
            date = getDate(selectedDate);
          } else {
            let min = new DateObject(date).toFirstOfMonth();
            let max = new DateObject(date)
              .add(numberOfMonths - 1, "months")
              .toLastOfMonth();

            if (selectedDate < min || selectedDate > max) {
              date = new DateObject(selectedDate);
            }
          }
        }
      }

      [].concat(selectedDate).forEach(checkDate);

      checkDate(date);

      if (multiple || range || Array.isArray(value)) {
        if (!selectedDate) selectedDate = [];
        if (!Array.isArray(selectedDate)) selectedDate = [selectedDate];

        if (range && selectedDate.length > 2) {
          let lastItem = selectedDate[selectedDate.length - 1];

          selectedDate = [selectedDate[0], lastItem];
          focused = lastItem;
        }

        if (multiple && sort && !mustSortDates) {
          mustSortDates = true;
          selectedDate.sort((a, b) => a - b);
        } else if (range) {
          selectedDate.sort((a, b) => a - b);
        }
      } else if (Array.isArray(selectedDate)) {
        selectedDate = selectedDate[selectedDate.length - 1];
      }

      delete ref.current.currentDate;

      return {
        ...state,
        date,
        selectedDate,
        multiple,
        range,
        timePicker,
        onlyTimePicker,
        onlyMonthPicker,
        onlyYearPicker,
        initialValue: state.initialValue || value,
        value,
        focused,
        calendar,
        locale,
        format,
        mustSortDates,
        year: date.year,
        today: state.today || new DateObject({ calendar }),
      };
    });
  }, [
    value,
    calendar,
    locale,
    format,
    timePicker,
    onlyTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    range,
    multiple,
    sort,
    numberOfMonths,
    digits,
    formattingIgnoreList,
  ]);

  useEffect(() => {
    if (!minDate && !maxDate) return;

    setState((state) => {
      let { calendar, locale, format } = state;

      let [selectedDate, $minDate, $maxDate] = getDateInRangeOfMinAndMaxDate(
        getSelectedDate(value, calendar, locale, format),
        minDate,
        maxDate,
        calendar
      );

      return {
        ...state,
        inRangeDates: onlyShowInRangeDates ? selectedDate : state.selectedDate,
        minDate: $minDate,
        maxDate: $maxDate,
      };
    });
  }, [minDate, maxDate, onlyShowInRangeDates, value]);

  if (state.today && !ref.current.isReady) ref.current.isReady = true;

  useEffect(() => {
    if (
      ref.current.isReady &&
      ref.current.mustCallOnReady &&
      onReady instanceof Function
    ) {
      ref.current.mustCallOnReady = false;

      onReady();
    }
  }, [ref.current.isReady, onReady]);

  let topClassName = "rmdp-top-class " + getBorderClassName(["top", "bottom"]),
    clonedPlugins = { top: [], bottom: [], left: [], right: [] },
    isRTL = ["fa", "ar"].includes(state.date?.locale),
    globalProps = {
      state,
      setState,
      onChange: handleChange,
      sort,
      handleFocusedDate,
      isRTL,
    },
    { datePickerProps, DatePicker, ...calendarProps } = arguments[0];

  initPlugins();

  return state.today ? (
    <div
      ref={setRef}
      className={`rmdp-wrapper rmdp-${shadow ? "shadow" : "border"} ${
        className || ""
      }`}
      style={{ zIndex, direction: "ltr" }}
    >
      {clonedPlugins.top}
      <div style={{ display: "flex" }} className={topClassName}>
        {clonedPlugins.left}
        <div
          style={{ height: "max-content", margin: "auto" }}
          className={`rmdp-calendar ${
            isRTL ? "rmdp-rtl" : ""
          } ${getBorderClassName(["left", "right"])}`}
        >
          {!disableDayPicker && (
            <>
              <Header
                {...globalProps}
                disableYearPicker={disableYearPicker}
                disableMonthPicker={disableMonthPicker}
                customMonths={months}
                numberOfMonths={numberOfMonths}
                buttons={buttons}
                renderButton={renderButton}
                handleMonthChange={handleMonthChange}
                disabled={disabled}
                hideMonth={hideMonth}
                hideYear={hideYear}
              />
              <div style={{ position: "relative" }}>
                <DayPicker
                  {...globalProps}
                  showOtherDays={showOtherDays}
                  mapDays={mapDays}
                  listeners={listeners}
                  onlyShowInRangeDates={onlyShowInRangeDates}
                  customWeekDays={weekDays}
                  numberOfMonths={numberOfMonths}
                  weekStartDayIndex={weekStartDayIndex}
                  hideWeekDays={hideWeekDays}
                />
                <MonthPicker
                  {...globalProps}
                  customMonths={months}
                  handleMonthChange={handleMonthChange}
                />
                <YearPicker {...globalProps} onYearChange={onYearChange} />
              </div>
            </>
          )}
          <TimePicker
            {...globalProps}
            formattingIgnoreList={JSON.parse(formattingIgnoreList)}
          />
          {children}
        </div>
        {clonedPlugins.right}
      </div>
      {clonedPlugins.bottom}
    </div>
  ) : null;

  function initPlugins() {
    if (!ref.current.isReady) return;

    let getPosition = (plugin) =>
      disableDayPicker ? "bottom" : plugin.props.position || "right";

    plugins.forEach((plugin, index) => {
      let nodes = {},
        position = getPosition(plugin);

      if (!clonedPlugins[position] || plugin.props.disabled) return;

      for (let i = 0; i < plugins.length; i++) {
        if (plugins[i].props.disabled) continue;
        if (Object.keys(nodes).length === 4) break;

        let pluginPosition = getPosition(plugins[i]);

        if (["top", "bottom"].includes(position)) {
          if (pluginPosition === position && i > index) nodes.bottom = true;
          if (pluginPosition === position && i < index) nodes.top = true;
        } else {
          if (topClassName.includes("border-top")) nodes.top = true;
          if (topClassName.includes("border-bottom")) nodes.bottom = true;
          if (pluginPosition === position && i > index) nodes.right = true;
          if (pluginPosition === position && i < index) nodes.left = true;
        }
      }

      clonedPlugins[position].push(
        React.cloneElement(plugin, {
          key: index,
          state,
          setState,
          position,
          registerListener,
          calendarProps,
          datePickerProps,
          handleChange,
          nodes,
          Calendar: ref.current.Calendar,
          DatePicker,
          handlePropsChange,
          //removing other arguments if exist.
          handleFocusedDate: (date) => handleFocusedDate(date),
        })
      );
    });
  }

  function handleChange(selectedDate, state) {
    if (disabled) return;
    //This one must be done before setState
    if (selectedDate || selectedDate === null) {
      if (readOnly) return;
      if (listeners.change)
        listeners.change.forEach((callback) => callback(selectedDate));
    }

    if (state) setState(state);
    if (selectedDate || selectedDate === null) onChange?.(selectedDate);

    handlePropsChange({ value: selectedDate });
  }

  function handlePropsChange(props = {}) {
    if (readOnly || disabled) return;

    let allProps = {
      ...calendarProps,
      ...datePickerProps,
      ...props,
      value: props.value ?? state.selectedDate,
    };

    delete allProps.onPropsChange;

    onPropsChange?.(allProps);
  }

  function handleFocusedDate(focused, clicked) {
    if (readOnly || disabled) return;

    onFocusedDateChange?.(focused, clicked);
  }

  function handleMonthChange(date) {
    onMonthChange?.(date);
  }

  function getBorderClassName(positions) {
    if (disableDayPicker) return "";

    return Array.from(
      new Set(
        plugins.map((plugin) => {
          let position = plugin.props.position || "right";

          if (positions.includes(position) && !plugin.props.disabled)
            return "rmdp-border-" + position;

          return "";
        })
      )
    ).join(" ");
  }

  function registerListener(event, callback) {
    if (!listeners[event]) listeners[event] = [];

    listeners[event].push(callback);
  }

  function setRef(element) {
    if (element) {
      element.date = state.date;

      element.set = function (key, value) {
        if (disabled) return;

        setState({
          ...state,
          date: new DateObject(state.date.set(key, value)),
        });
      };
    }

    ref.current.Calendar = element;

    if (outerRef instanceof Function) return outerRef(element);
    if (outerRef) outerRef.current = element;
  }
}

export default forwardRef(Calendar);

function getDateInRangeOfMinAndMaxDate(date, minDate, maxDate, calendar) {
  if (minDate)
    minDate = toDateObject(minDate, calendar).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
  if (maxDate)
    maxDate = toDateObject(maxDate, calendar).set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    });

  if (Array.isArray(date)) {
    date = date.filter((dateObject) => {
      if (minDate && dateObject < minDate) return false;
      if (maxDate && dateObject > maxDate) return false;

      return true;
    });
  }

  return [date, minDate, maxDate];
}

export function toDateObject(date, calendar) {
  if (date instanceof DateObject) {
    date.setCalendar(calendar);
  } else {
    date = new DateObject({ date, calendar });
  }

  return date;
}

function getSelectedDate(value, calendar, locale, format) {
  let selectedDate = []
    .concat(value)
    .map((date) => {
      if (!date) return {};
      if (date instanceof DateObject) return date;

      return new DateObject({ date, calendar, locale, format });
    })
    .filter((date) => date.isValid);

  return Array.isArray(value) ? selectedDate : selectedDate[0];
}

export function getFormat(
  timePicker,
  onlyTimePicker,
  onlyMonthPicker,
  onlyYearPicker,
  format
) {
  if (format) return format;
  if (timePicker) return "YYYY/MM/DD HH:mm:ss";
  if (onlyTimePicker) return "HH:mm:ss";
  if (onlyMonthPicker) return "MM/YYYY";
  if (onlyYearPicker) return "YYYY";

  return "YYYY/MM/DD";
}

export function getIgnoreList(formattingIgnoreList) {
  if (!Array.isArray(formattingIgnoreList)) formattingIgnoreList = [];

  return JSON.stringify(formattingIgnoreList);
}
