import React, { isValidElement, cloneElement } from "react";
import Arrow from "../arrow/arrow";

export default function Header({
  state,
  setState,
  disableYearPicker,
  disableMonthPicker,
  customMonths,
  numberOfMonths,
  buttons,
  renderButton,
  handleMonthChange,
  disabled,
  hideMonth,
  hideYear,
  isRTL,
}) {
  let monthNames = [],
    years = [],
    {
      date,
      onlyMonthPicker,
      onlyYearPicker,
      onlyTimePicker,
      mustShowYearPicker,
      minDate,
      maxDate,
      year,
      maxYear,
    } = state,
    digits = date.digits,
    isPreviousDisable =
      minDate &&
      date.year <= minDate.year &&
      minDate.month.number > date.month.number - 1,
    isNextDisable =
      maxDate &&
      date.year >= maxDate.year &&
      maxDate.month.number < date.month.number + 1;

  if (onlyMonthPicker) {
    if (minDate && minDate.year >= date.year) isPreviousDisable = true;
    if (maxDate && maxDate.year <= date.year) isNextDisable = true;
  }

  if (mustShowYearPicker || onlyYearPicker) {
    let minYear = maxYear - 11;

    isPreviousDisable = minDate && minDate.year > minYear;
    isNextDisable = maxDate && maxDate.year < maxYear;
  }

  if (disabled) {
    isPreviousDisable = true;
    isNextDisable = true;
  }

  for (let monthIndex = 0; monthIndex < numberOfMonths; monthIndex++) {
    let monthName,
      year = date.year,
      index = date.month.index + monthIndex;

    if (index > 11) {
      index -= 12;
      year++;
    }

    if (Array.isArray(customMonths) && customMonths.length >= 12) {
      let month = customMonths[index];

      monthName = Array.isArray(month) ? month[0] : month;
    } else {
      monthName = date.months[index].name;
    }

    year = year.toString().replace(/[0-9]/g, (w) => digits[w]);

    monthNames.push(monthName);
    years.push(year);
  }

  return (
    <div
      className="rmdp-header"
      style={{ display: onlyTimePicker ? "none" : "block" }}
    >
      <div style={{ position: "relative", display: "flex" }}>
        {buttons && getButton("left")}
        {monthNames.map((monthName, index) => (
          <div key={index} className="rmdp-header-values">
            {!onlyYearPicker && !hideMonth && (
              <span
                style={{
                  cursor:
                    disabled || disableMonthPicker || onlyMonthPicker
                      ? "default"
                      : "pointer",
                }}
                onClick={() =>
                  !disableMonthPicker && toggle("mustShowMonthPicker")
                }
              >
                {monthName}
                {!hideYear && (isRTL ? "،" : ",")}
              </span>
            )}
            {!hideYear && (
              <span
                style={{
                  cursor:
                    disabled || disableYearPicker || onlyYearPicker
                      ? "default"
                      : "pointer",
                }}
                onClick={() =>
                  !disableYearPicker && toggle("mustShowYearPicker")
                }
              >
                {years[index]}
              </span>
            )}
          </div>
        ))}
        {buttons && getButton("right")}
      </div>
    </div>
  );

  function getButton(direction) {
    let handleClick = () => increaseValue(direction === "right" ? 1 : -1),
      disabled =
        (direction === "left" && isPreviousDisable) ||
        (direction === "right" && isNextDisable);

    return renderButton instanceof Function ? (
      renderButton(direction, handleClick, disabled)
    ) : isValidElement(renderButton) ? (
      cloneElement(renderButton, { direction, handleClick, disabled })
    ) : (
      <Arrow
        direction={`rmdp-${direction}`}
        onClick={handleClick}
        disabled={disabled}
      />
    );
  }

  function increaseValue(value) {
    if (
      disabled ||
      (value < 0 && isPreviousDisable) ||
      (value > 0 && isNextDisable)
    )
      return;

    if (!mustShowYearPicker && !onlyYearPicker) {
      date.toFirstOfMonth();

      if (onlyMonthPicker) {
        date.year += value;
      } else {
        date.month += value;

        handleMonthChange(date);
      }
    } else {
      year = year + value * 12;

      if (value < 0 && minDate && year < minDate.year) year = minDate.year;
      if (value > 0 && maxDate && year > maxDate.year) year = maxDate.year;
    }

    setState({
      ...state,
      date,
      year,
    });
  }

  function toggle(picker) {
    if (disabled) return;

    let object = {
      mustShowMonthPicker: false,
      mustShowYearPicker: false,
    };

    object[picker] = !state[picker];

    setState({
      ...state,
      ...object,
    });
  }
}
