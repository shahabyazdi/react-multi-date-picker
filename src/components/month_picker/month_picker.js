import React, { useMemo } from "react";
import {
  selectDate,
  isSameDate,
  getRangeClass,
} from "../day_picker/day_picker";
import DateObject from "react-date-object";

export default function MonthPicker({
  state,
  onChange,
  customMonths,
  sort,
  handleMonthChange,
  handleFocusedDate,
}) {
  const {
      date,
      today,
      minDate,
      maxDate,
      calendar,
      locale,
      onlyMonthPicker,
      onlyYearPicker,
      range,
      onlyShowInRangeDates,
      onlyTimePicker,
    } = state,
    mustShowMonthPicker =
      (state.mustShowMonthPicker || onlyMonthPicker) &&
      !onlyTimePicker &&
      !onlyYearPicker;

  const months = useMemo(() => {
    let months = customMonths,
      monthsArray = [],
      index = 0,
      date = new DateObject({
        calendar,
        locale,
        format: state.date._format,
        year: state.date.year,
        month: 1,
        day: 1,
      });

    if (Array.isArray(months) && months.length >= 12) {
      months.length = 12;

      months = months.map((month) => (Array.isArray(month) ? month[0] : month));
    } else {
      months = date.months.map((month) => month.name);
    }

    for (var i = 0; i < 4; i++) {
      let array = [];

      for (var j = 0; j < 3; j++) {
        array.push({
          date: new DateObject(date),
          name: months[index],
        });

        index++;
        date.add(1, "month");
      }

      monthsArray.push(array);
    }

    return monthsArray;
  }, [calendar, locale, customMonths, state.date.year, state.date._format]);

  return (
    <div
      className={`${onlyMonthPicker ? "only " : ""}rmdp-month-picker`}
      style={{ display: mustShowMonthPicker ? "block" : "none" }}
    >
      {months.map((array, i) => (
        <div key={i} className="rmdp-ym">
          {array.map(({ date, name }, j) => (
            <div
              key={j}
              className={getClassName(date)}
              onClick={() => selectMonth(date)}
            >
              <span className={onlyMonthPicker ? "sd" : ""}>{name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  function selectMonth(dateObject) {
    let { selectedDate, focused } = state,
      {
        year,
        month: { index },
      } = dateObject;

    if (minDate && year <= minDate.year && index < minDate.month.index) return;
    if (maxDate && year >= maxDate.year && index > maxDate.month.index) return;

    date.setMonth(index + 1);

    if (onlyMonthPicker) {
      [selectedDate, focused] = selectDate(dateObject, sort, state);
    } else {
      handleMonthChange(date);
    }

    onChange(onlyMonthPicker ? selectedDate : undefined, {
      ...state,
      date,
      focused,
      selectedDate,
      mustShowMonthPicker: false,
    });

    if (onlyMonthPicker) handleFocusedDate(focused, dateObject);
  }

  function getClassName(dateObject) {
    let names = ["rmdp-day"],
      {
        year,
        month: { index },
      } = dateObject,
      { selectedDate } = state;

    if (
      (minDate &&
        (year < minDate.year ||
          (year === minDate.year && index < minDate.month.index))) ||
      (maxDate &&
        (year > maxDate.year ||
          (year === maxDate.year && index > maxDate.month.index)))
    )
      names.push("rmdp-disabled");

    if (names.includes("rmdp-disabled") && onlyShowInRangeDates) return;
    if (isSameDate(today, dateObject, true)) names.push("rmdp-today");

    if (!onlyMonthPicker) {
      if (date.month.index === index) names.push("rmdp-selected");
    } else {
      if (!range) {
        if (
          []
            .concat(selectedDate)
            .some((date) => isSameDate(date, dateObject, true))
        )
          names.push("rmdp-selected");
      } else {
        names.push(getRangeClass(dateObject, selectedDate, true));
      }
    }

    return names.join(" ");
  }
}
