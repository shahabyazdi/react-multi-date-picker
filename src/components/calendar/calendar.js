import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  cloneElement,
} from "react";
import DayPicker from "../day_picker/day_picker";
import Header from "../header/header";
import MonthPicker from "../month_picker/month_picker";
import YearPicker from "../year_picker/year_picker";
import DateObject from "react-date-object";
import getFormat from "../../shared/getFormat";
import stringify from "../../shared/stringify";
import toDateObject from "../../shared/toDateObject";
import isArray from "../../shared/isArray";
import check from "../../shared/check";
import toLocaleDigits from "../../shared/toLocaleDigits";
import isRTL from "../../shared/isRTL";
import { findFocusable } from "../../shared/handleFocus";
import "./calendar.css";

function Calendar(
  {
    value,
    calendar,
    locale,
    format,
    onlyMonthPicker,
    onlyYearPicker,
    range = false,
    multiple = false,
    className,
    role,
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
    fullYear,
    displayWeekNumbers,
    weekNumber,
    weekPicker,
    rangeHover,
    monthYearSeparator,
    formatMonth,
    formatYear,
    highlightToday = true,
    headerOrder = ["LEFT_BUTTON", "MONTH_YEAR", "RIGHT_BUTTON"],
    style = {},
    autoFocus = false,
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
    onlyYearPicker
  ) {
    numberOfMonths = 1;
  }

  if ((multiple || range || isArray(value)) && !range && !multiple) {
    multiple = true;
  }

  if (weekPicker) {
    range = true;
    multiple = false;
  }

  if (fullYear) {
    numberOfMonths = 12;
    onlyMonthPicker = false;
    onlyYearPicker = false;
  }

  if (onlyYearPicker && !hideMonth) hideMonth = true;

  [calendar, locale] = check(calendar, locale);

  format = getFormat(onlyMonthPicker, onlyYearPicker, format);
  formattingIgnoreList = stringify(formattingIgnoreList);
  mapDays = [].concat(mapDays).filter(Boolean);
  /**
   * Each plugin can return several different plugins.
   * So in the first place, plugins might look like this:
   * [plugin1, [plugin2, plugin3], plugin4]
   * For this reason, we remove the extra arrays inside the plugins.
   */
  plugins = [].concat.apply([], plugins);

  let [state, setState] = useState({}),
    listeners = {},
    ref = useRef({ mustCallOnReady: true, currentDate });

  useEffect(() => {
    setState((state) => {
      let { currentDate } = ref.current;
      let { date, selectedDate, initialValue, focused, mustSortDates } = state;

      function checkDate(date) {
        if (!date) return;
        if (date.calendar.name !== calendar.name) date.setCalendar(calendar);
        if (date.locale.name !== locale.name) date.setLocale(locale);
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

        if (isArray(selectedDate)) {
          if (!date) date = getDate(selectedDate.flat()[0]);
        } else {
          if (!date || numberOfMonths === 1) {
            date = getDate(selectedDate);
          } else {
            let min = new DateObject(date).toFirstOfMonth();
            let max = new DateObject(date)
              .add(numberOfMonths - 1, onlyMonthPicker ? "years" : "months")
              .toLastOfMonth();

            if (selectedDate < min || selectedDate > max) {
              date = new DateObject(selectedDate);
            }
          }
        }
      }

      [].concat(selectedDate).flat().forEach(checkDate);

      checkDate(date);

      if (multiple || range || isArray(value)) {
        if (!selectedDate) selectedDate = [];

        if (!isArray(selectedDate)) {
          selectedDate = multiple && range ? [[selectedDate]] : [selectedDate];
        }

        if (range && !multiple && selectedDate.length > 2) {
          let lastItem = selectedDate[selectedDate.length - 1];

          selectedDate = [selectedDate[0], lastItem];
          focused = lastItem;
        }

        if (multiple && !range && sort && !mustSortDates) {
          mustSortDates = true;
          selectedDate.sort((a, b) => a - b);
        } else if (range && !multiple) {
          selectedDate.sort((a, b) => a - b);
        }
      } else if (isArray(selectedDate)) {
        selectedDate = selectedDate.flat()[selectedDate.length - 1];
      }

      if (fullYear) date.toFirstOfYear();

      delete ref.current.currentDate;

      return {
        ...state,
        date,
        selectedDate,
        multiple,
        range,
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
        today: checkDate(state.today) || new DateObject({ calendar }),
        weekPicker,
      };
    });
  }, [
    value,
    calendar,
    locale,
    format,
    onlyMonthPicker,
    onlyYearPicker,
    range,
    multiple,
    sort,
    numberOfMonths,
    digits,
    formattingIgnoreList,
    fullYear,
    weekPicker,
  ]);

  useEffect(() => {
    if (!minDate && !maxDate) return;

    setState((state) => {
      let { calendar, locale, format } = state;

      let [selectedDate, $minDate, $maxDate] = getDateInRangeOfMinAndMaxDate(
        getSelectedDate(value, calendar, locale, format),
        minDate,
        maxDate,
        calendar,
        format
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
    isRightToLeft = isRTL(state.date?.locale),
    globalProps = {
      state,
      setState,
      onChange: handleChange,
      sort,
      handleFocusedDate,
      isRTL: isRightToLeft,
      fullYear,
      monthAndYears: getMonthsAndYears(),
      rangeHover,
      highlightToday,
      numberOfMonths,
    },
    { datePickerProps, DatePicker, ...calendarProps } = arguments[0];

  useEffect(() => {
    const { Calendar } = ref.current;

    if (!Calendar) return;

    findFocusable(Calendar, undefined, autoFocus && !DatePicker);
  }, [autoFocus, state.today, DatePicker]);

  initPlugins();

  return state.today ? (
    <div
      ref={setRef}
      role={role || "dialog"}
      className={`rmdp-wrapper rmdp-${shadow ? "shadow" : "border"} ${
        className || ""
      }`}
      style={{ zIndex, ...style }}
    >
      {clonedPlugins.top}
      <div style={{ display: "flex" }} className={topClassName}>
        {clonedPlugins.left}
        {!disableDayPicker && (
          <div
            className={`rmdp-calendar ${
              isRightToLeft ? "rmdp-rtl" : ""
            } ${getBorderClassName(["left", "right"])}`}
          >
            <Header
              {...{
                ...globalProps,
                disableYearPicker,
                disableMonthPicker,
                buttons,
                renderButton,
                handleMonthChange,
                disabled,
                hideMonth,
                hideYear,
                monthYearSeparator,
                formatMonth,
                formatYear,
                headerOrder,
                onYearChange,
              }}
            />
            <div style={{ position: "relative" }}>
              <DayPicker
                {...{
                  ...globalProps,
                  showOtherDays,
                  mapDays,
                  onlyShowInRangeDates,
                  customWeekDays: weekDays,
                  weekStartDayIndex,
                  hideWeekDays,
                  displayWeekNumbers,
                  weekNumber,
                }}
              />
              {!fullYear && (
                <>
                  {!disableMonthPicker && (
                    <MonthPicker
                      {...globalProps}
                      customMonths={months}
                      handleMonthChange={handleMonthChange}
                    />
                  )}
                  {!disableYearPicker && (
                    <YearPicker {...globalProps} onYearChange={onYearChange} />
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {clonedPlugins.right}
      </div>
      {clonedPlugins.bottom}
      {children}
    </div>
  ) : null;

  function initPlugins() {
    if (!ref.current.isReady || !isArray(plugins)) return;

    let pluginProps = {
        state,
        setState,
        registerListener,
        calendarProps,
        datePickerProps,
        handleChange,
        Calendar: ref.current.Calendar,
        DatePicker,
        handlePropsChange,
        //removing other arguments if exist.
        handleFocusedDate: (date) => handleFocusedDate(date),
        minDate,
        maxDate,
      },
      getPosition = (plugin) =>
        disableDayPicker ? "bottom" : plugin.props.position || "right";

    plugins.forEach((plugin, index) => {
      if (typeof plugin.type === "string") {
        if (plugin.type === "mapDays") mapDays.push(plugin.fn(pluginProps));
        return;
      }

      let nodes = {},
        position = getPosition(plugin);

      if (!clonedPlugins[position] || plugin.props.disabled) return;

      for (let i = 0; i < plugins.length; i++) {
        if (typeof plugins[i].type === "string" || plugins[i].props.disabled)
          continue;
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
        cloneElement(plugin, {
          key: index,
          position,
          nodes,
          ...pluginProps,
        })
      );
    });
  }

  function handleChange(selectedDate, state) {
    if (selectedDate instanceof DateObject) {
      selectedDate = new DateObject(selectedDate);
    }

    if (disabled) return;
    //This one must be done before setState
    if (selectedDate || selectedDate === null) {
      if (readOnly) return;
      if (listeners.change)
        listeners.change.forEach((callback) => callback(selectedDate));
    }

    if (selectedDate || selectedDate === null) {
      const mustUpdateState = onChange?.(selectedDate);

      if (state && mustUpdateState !== false) setState(state);
    } else if (state) {
      setState(state);
    }

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
    if (disableDayPicker || !isArray(plugins)) return "";

    return Array.from(
      new Set(
        plugins.map((plugin) => {
          if (!plugin.props) return "";

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

  function getMonthsAndYears() {
    let date = state.date;

    if (!date) return [];

    let monthNames = [],
      years = [],
      digits = date.digits;

    for (let monthIndex = 0; monthIndex < numberOfMonths; monthIndex++) {
      let monthName,
        year = date.year,
        index = date.monthIndex + monthIndex;

      if (onlyMonthPicker) year += monthIndex;

      if (index > 11) {
        index -= 12;

        if (!onlyMonthPicker) year++;
      }

      if (isArray(months) && months.length >= 12) {
        let month = months[index];

        monthName = isArray(month) ? month[0] : month;
      } else {
        monthName = date.months[index].name;
      }

      year = toLocaleDigits(year.toString(), digits);

      monthNames.push(monthName);
      years.push(year);
    }

    return [monthNames, years];
  }
}

export default forwardRef(Calendar);

function getDateInRangeOfMinAndMaxDate(
  date,
  minDate,
  maxDate,
  calendar,
  format
) {
  if (minDate)
    minDate = toDateObject(minDate, calendar, format).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
  if (maxDate)
    maxDate = toDateObject(maxDate, calendar, format).set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    });

  if (isArray(date)) {
    date = date.filter((dateObject) => {
      if (minDate && dateObject < minDate) return false;
      if (maxDate && dateObject > maxDate) return false;

      return true;
    });
  }

  return [date, minDate, maxDate];
}

function getSelectedDate(value, calendar, locale, format) {
  const selectedDate = []
    .concat(value)
    .map((date) =>
      isArray(date)
        ? date.map(toDateObject).filter(isValid)
        : toDateObject(date)
    )
    .filter(isValid);

  return isArray(value) ? selectedDate : selectedDate.flat()[0];

  function toDateObject(date) {
    if (!date) return {};
    if (date instanceof DateObject) return date;

    return new DateObject({ date, calendar, locale, format });
  }

  function isValid(date) {
    return isArray(date) || date.isValid;
  }
}
