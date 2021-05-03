import React, { useEffect, useMemo } from "react";
import { selectDate } from "../day_picker/day_picker";
import DateObject from "react-date-object";

export default function YearPicker({
  state,
  setState,
  onChange,
  sort,
  handleFocusedDate,
}) {
  const {
      date,
      today,
      minDate,
      maxDate,
      onlyYearPicker,
      range,
      onlyShowInRangeDates,
    } = state,
    mustShowYearPicker =
      (state.mustShowYearPicker || onlyYearPicker) && !state.onlyTimePicker,
    digits = date.digits;

  const [years, maxYear] = useMemo(() => {
    let yearArray = [],
      year = today.year - 4,
      maxYear = year + 11;

    while (state.year < year || state.year > maxYear) {
      year += state.year < year ? -12 : 12;
      maxYear = year + 11;
    }

    for (var i = 0; i < 4; i++) {
      let array = [];

      for (var j = 0; j < 3; j++) {
        array.push(year);
        year++;
      }

      yearArray.push(array);
    }

    return [yearArray, maxYear];
  }, [state.year, today.year]);

  useEffect(() => {
    if (!mustShowYearPicker) return;

    setState((state) => ({ ...state, maxYear }));
  }, [maxYear, mustShowYearPicker, setState]);

  return (
    <div
      className={`${onlyYearPicker ? "only " : ""}rmdp-year-picker`}
      style={{ display: mustShowYearPicker ? "block" : "none" }}
    >
      {years.map((array, i) => (
        <div key={i} className="rmdp-ym">
          {array.map((year, j) => (
            <div
              key={j}
              className={getClassName(year)}
              onClick={() => selectYear(year)}
            >
              <span className={onlyYearPicker ? "sd" : ""}>
                {year.toString().replace(/[0-9]/g, (w) => digits[w])}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  function selectYear(year) {
    if (minDate && year < minDate.year) return;
    if (maxDate && year > maxDate.year) return;

    let date = new DateObject(state.date).setYear(year),
      { selectedDate, focused } = state;

    if (onlyYearPicker) {
      [selectedDate, focused] = selectDate(date, sort, state);
    } else {
      if (minDate && date.month.number < minDate.month.number) {
        date = date.setMonth(minDate.month.number);
      } else if (maxDate && date.month.number > maxDate.month.number) {
        date = date.setMonth(maxDate.month.number);
      }
    }

    onChange(onlyYearPicker ? selectedDate : undefined, {
      ...state,
      date,
      focused,
      selectedDate,
      mustShowYearPicker: false,
      year: state.year,
    });

    if (onlyYearPicker) handleFocusedDate(focused, date);
  }

  function getClassName(year) {
    let names = ["rmdp-day"],
      { date, selectedDate } = state;

    if (minDate && year < minDate.year) names.push("rmdp-disabled");
    if (maxDate && year > maxDate.year) names.push("rmdp-disabled");

    if (names.includes("rmdp-disabled") && onlyShowInRangeDates) return;
    if (today.year === year) names.push("rmdp-today");

    if (!onlyYearPicker) {
      if (year === date.year) names.push("rmdp-selected");
    } else {
      if (!range) {
        if ([].concat(selectedDate).some((date) => date.year === year))
          names.push("rmdp-selected");
      } else {
        let first = selectedDate[0],
          second = selectedDate[1];

        if (selectedDate.length === 1) {
          if (year === first.year) names.push("rmdp-range");
        } else if (selectedDate.length === 2) {
          if (year >= first.year && year <= second.year)
            names.push("rmdp-range");
          if (year === first.year) names.push("start");
          if (year === second.year) names.push("end");
        }
      }
    }

    return names.join(" ");
  }
}
