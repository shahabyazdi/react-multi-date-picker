import React, { useMemo, useRef, useState } from "react";
import DateObject from "react-date-object";
import WeekDays from "../week_days/week_days";
import selectDate from "../../shared/selectDate";
import isSameDate from "../../shared/isSameDate";
import getRangeClass from "../../shared/getRangeClass";
import getRangeHoverClass from "../../shared/getRangeHoverClass";
import handleFocus from "../../shared/handleFocus";

const ariaLabelFormat = "dddd MMMM DD of YYYY";

export default function DayPicker({
  state,
  onChange,
  showOtherDays = false,
  mapDays,
  onlyShowInRangeDates,
  customWeekDays,
  sort,
  numberOfMonths,
  isRTL,
  weekStartDayIndex,
  handleFocusedDate,
  hideWeekDays,
  fullYear,
  monthAndYears: [monthNames],
  displayWeekNumbers,
  weekNumber = "",
  rangeHover,
  highlightToday,
}) {
  const ref = useRef({}),
    divRef = useRef(),
    {
      today,
      minDate,
      maxDate,
      range,
      multiple,
      date,
      selectedDate,
      onlyMonthPicker,
      onlyYearPicker,
      mustShowMonthPicker,
      mustShowYearPicker,
    } = state,
    mustShowDayPicker = !onlyMonthPicker && !onlyYearPicker,
    [dateHovered, setDateHovered] = useState();

  ref.current.date = date;

  const months = useMemo(() => {
    if (!mustShowDayPicker) return [];

    return getMonths(
      ref.current.date,
      showOtherDays,
      numberOfMonths,
      weekStartDayIndex
    );
    // eslint-disable-next-line
  }, [
    date.monthIndex,
    date.year,
    date.calendar,
    date.locale,
    mustShowDayPicker,
    showOtherDays,
    numberOfMonths,
    weekStartDayIndex,
  ]);

  return (
    mustShowDayPicker && (
      <div
        ref={divRef}
        className={`rmdp-day-picker ${fullYear ? "rmdp-full-year" : ""}`}
        style={{ display: fullYear ? "grid" : "flex" }}
        onMouseLeave={() => rangeHover && setDateHovered()}
        data-active={
          mustShowDayPicker && !mustShowMonthPicker && !mustShowYearPicker
        }
      >
        {months.map((weeks, monthIndex) => (
          <div
            key={monthIndex}
            style={{
              [isRTL ? "marginLeft" : "marginRight"]:
                monthIndex + (fullYear ? 0 : 1) < numberOfMonths ? "10px" : "",
            }}
          >
            {fullYear && (
              <div className="rmdp-month-name">{monthNames[monthIndex]}</div>
            )}
            {!hideWeekDays && (
              <WeekDays
                state={state}
                customWeekDays={customWeekDays}
                weekStartDayIndex={weekStartDayIndex}
                displayWeekNumbers={displayWeekNumbers}
                weekNumber={weekNumber}
              />
            )}
            {weeks.map((week, index) => (
              <div key={index} className="rmdp-week">
                {displayWeekNumbers && (
                  <div className="rmdp-day rmdp-disabled">
                    <span>{week[0].date.format("WW")}</span>
                  </div>
                )}
                {week.map((object, i) => {
                  //To clear the properties which are added from the previous render
                  object = {
                    date: object.date,
                    day: object.day,
                    current: object.current,
                  };

                  let allProps = getAllProps(object),
                    mustAddClassName =
                      mustDisplayDay(object) && !object.disabled,
                    className = `${mustAddClassName ? "sd" : ""}`,
                    children = allProps.children;

                  if (mustAddClassName)
                    className = `${className} ${allProps.className || ""}`;

                  delete allProps.className;
                  delete allProps.children;

                  let parentClassName = getClassName(object, numberOfMonths);

                  if (object.hidden || object.disabled) {
                    className = className.replace("sd", "");
                  }

                  return (
                    <div
                      key={i}
                      tabIndex={-1}
                      aria-label={`Choose ${object.date.format(
                        ariaLabelFormat
                      )}`}
                      className={parentClassName}
                      onMouseEnter={() =>
                        rangeHover && setDateHovered(object.date)
                      }
                      onKeyDown={(e) =>
                        handleFocus(e, object, { format: ariaLabelFormat })
                      }
                      onClick={() => {
                        if (!mustDisplayDay(object) || object.disabled) {
                          return;
                        }

                        selectDay(object, monthIndex, numberOfMonths);
                      }}
                    >
                      <span className={className} {...allProps}>
                        {mustDisplayDay(object) && !object.hidden
                          ? children ?? object.day
                          : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  );

  function mustDisplayDay(object) {
    if (object.current) return true;

    return showOtherDays;
  }

  function selectDay(
    { date: dateObject, current },
    monthIndex,
    numberOfMonths
  ) {
    let { selectedDate, focused, date } = state,
      { hour, minute, second } = date;

    dateObject.set({
      hour: selectedDate?.hour || hour,
      minute: selectedDate?.minute || minute,
      second: selectedDate?.second || second,
    });

    if (numberOfMonths === 1 && !current) {
      date = new DateObject(date).toFirstOfMonth();
    } else if (numberOfMonths > 1 && !current) {
      if (monthIndex === 0 && dateObject < date) {
        date = new DateObject(date).toFirstOfMonth();
      }

      if (
        monthIndex > 0 &&
        dateObject.monthIndex > date.monthIndex + monthIndex &&
        monthIndex + 1 === numberOfMonths
      ) {
        date = new DateObject(date).toFirstOfMonth().add(1, "month");
      }
    }

    [selectedDate, focused] = selectDate(dateObject, sort, state);

    onChange(selectedDate, {
      ...state,
      date,
      focused,
      selectedDate,
    });

    handleFocusedDate(focused, dateObject);
  }

  function getClassName(object, numberOfMonths) {
    let names = ["rmdp-day"],
      { date, hidden, current } = object;

    if (!mustDisplayDay(object) || hidden) {
      names.push("rmdp-day-hidden");
    } else {
      if (
        (minDate && date < minDate) ||
        (maxDate && date > maxDate) ||
        object.disabled
      ) {
        names.push("rmdp-disabled");

        if (!object.disabled) object.disabled = true;
      }

      if (!current) names.push("rmdp-deactive");

      let mustDisplaySelectedDate =
        (numberOfMonths > 1 && current) || numberOfMonths === 1;

      if (!object.disabled || !onlyShowInRangeDates) {
        if (isSameDate(date, today) && highlightToday) names.push("rmdp-today");
        if (isSelected(date) && mustDisplaySelectedDate && !range) {
          names.push("rmdp-selected");
        }
      }

      if (range && !object.disabled && mustDisplaySelectedDate) {
        names.push(getRangeClass(date, selectedDate, undefined, multiple));

        names = names.concat(
          getRangeHoverClass(
            date,
            selectedDate,
            dateHovered,
            rangeHover,
            undefined,
            multiple
          )
        );
      }
    }

    return names.join(" ");
  }

  function isSelected(dateObject) {
    return [].concat(selectedDate).some((date) => isSameDate(date, dateObject));
  }

  function getAllProps(object) {
    if (!object.current && !showOtherDays) return {};

    let allProps = {};

    mapDays.forEach((fn) => {
      let props = fn({
        date: object.date,
        today,
        currentMonth: state.date.month,
        selectedDate: state.selectedDate,
        isSameDate,
      });

      if (props?.constructor !== Object) props = {};
      if (props.disabled || props.hidden) object.disabled = true;
      if (props.hidden) object.hidden = true;

      allProps = {
        ...allProps,
        ...props,
      };
    });

    delete allProps.disabled;
    delete allProps.hidden;

    return allProps;
  }
}

function getMonths(date, showOtherDays, numberOfMonths, weekStartDayIndex) {
  if (!date) return [];

  let months = [];

  for (let monthIndex = 0; monthIndex < numberOfMonths; monthIndex++) {
    date = new DateObject(date).toFirstOfMonth();

    let monthIndex = date.monthIndex,
      weeks = [];

    date.toFirstOfWeek().add(weekStartDayIndex, "day");

    if (date.monthIndex === monthIndex && date.day > 1)
      date.subtract(7, "days");

    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      let week = [];

      for (let weekDay = 0; weekDay < 7; weekDay++) {
        week.push({
          date: new DateObject(date),
          day: date.format("D"),
          current: date.monthIndex === monthIndex,
        });

        date.day += 1;
      }

      weeks.push(week);

      if (weekIndex > 2 && date.monthIndex !== monthIndex) break;
    }

    months.push(weeks);
  }

  return months;
}
