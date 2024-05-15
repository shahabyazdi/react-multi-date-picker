import React, { useMemo, useState } from "react";
import selectDate from "../../shared/selectDate";
import isSameDate from "../../shared/isSameDate";
import getRangeClass from "../../shared/getRangeClass";
import isArray from "../../shared/isArray";
import stringify from "../../shared/stringify";
import getRangeHoverClass from "../../shared/getRangeHoverClass";
import handleFocus, { findFocusable } from "../../shared/handleFocus";
import DateObject from "react-date-object";
import { findCalendar } from "../../shared/findNode";

const ariaLabelFormat = "MMMM of YYYY";

export default function MonthPicker({
  state,
  onChange,
  customMonths,
  sort,
  handleMonthChange,
  handleFocusedDate,
  rangeHover,
  highlightToday,
  numberOfMonths,
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
    } = state,
    mustShowMonthPicker =
      (state.mustShowMonthPicker || onlyMonthPicker) && !onlyYearPicker,
    [dateHovered, setDateHovered] = useState();

  customMonths = customMonths && stringify(customMonths);

  const years = useMemo(() => {
    let years = [],
      length = onlyMonthPicker ? numberOfMonths : 1,
      months = customMonths && JSON.parse(customMonths),
      date = new DateObject({
        calendar,
        locale,
        format: state.date._format,
        year: state.date.year,
        month: 1,
        day: 1,
      });

    if (isArray(months) && months.length >= 12) {
      months.length = 12;

      months = months.map((month) => (isArray(month) ? month[0] : month));
    } else {
      months = date.locale.months.map(([month]) => month);
    }

    for (let yearIndex = 0; yearIndex < length; yearIndex++) {
      let monthsArray = [],
        index = 0;

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

      years.push(monthsArray);
    }

    return years;
  }, [
    calendar,
    locale,
    customMonths,
    state.date.year,
    state.date._format,
    numberOfMonths,
    onlyMonthPicker,
  ]);

  return (
    <div
      className={`${onlyMonthPicker ? "only " : ""}rmdp-month-picker`}
      style={{ display: mustShowMonthPicker ? "flex" : "none" }}
      data-active={mustShowMonthPicker}
      onMouseLeave={() => rangeHover && setDateHovered()}
    >
      {years.map((months, yearIndex) => (
        <div key={yearIndex} style={{ margin: "0 5px", flex: 1 }}>
          {months.map((array, i) => (
            <div key={i} className="rmdp-ym">
              {array.map(({ date, name }, j) => (
                <div
                  key={j}
                  aria-label={`Select ${date.format(ariaLabelFormat)}`}
                  tabIndex={-1}
                  onKeyDown={(e) =>
                    handleFocus(
                      e,
                      { date },
                      { format: ariaLabelFormat, type: "month" }
                    )
                  }
                  className={getClassName(date)}
                  onClick={(e) => selectMonth(date, e)}
                  onMouseEnter={() => rangeHover && setDateHovered(date)}
                >
                  <span className={onlyMonthPicker ? "sd" : ""}>{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  function selectMonth(dateObject, e) {
    let { selectedDate, focused } = state,
      { year, monthIndex } = dateObject;

    if (
      (minDate && year <= minDate.year && monthIndex < minDate.monthIndex) ||
      (maxDate && year >= maxDate.year && monthIndex > maxDate.monthIndex)
    )
      return;

    date.setMonth(monthIndex + 1);

    if (onlyMonthPicker) {
      [selectedDate, focused] = selectDate(dateObject, sort, state);
    } else {
      handleMonthChange(date);
      findFocusable(findCalendar(e.target));
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
      { year, monthIndex } = dateObject,
      { selectedDate, multiple } = state;

    if (
      (minDate &&
        (year < minDate.year ||
          (year === minDate.year && monthIndex < minDate.monthIndex))) ||
      (maxDate &&
        (year > maxDate.year ||
          (year === maxDate.year && monthIndex > maxDate.monthIndex)))
    )
      names.push("rmdp-disabled");

    if (names.includes("rmdp-disabled") && onlyShowInRangeDates) return;

    if (isSameDate(today, dateObject, true) && highlightToday) {
      names.push("rmdp-today");
    }

    if (!onlyMonthPicker) {
      if (date.monthIndex === monthIndex) names.push("rmdp-selected");
    } else {
      if (!range) {
        if (
          []
            .concat(selectedDate)
            .some((date) => isSameDate(date, dateObject, true))
        )
          names.push("rmdp-selected");
      } else {
        names.push(getRangeClass(dateObject, selectedDate, true, multiple));

        names = names.concat(
          getRangeHoverClass(
            dateObject,
            selectedDate,
            dateHovered,
            rangeHover,
            "month",
            multiple
          )
        );
      }
    }

    return names.join(" ");
  }
}
