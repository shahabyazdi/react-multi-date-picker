import React, { isValidElement, cloneElement } from "react";
import Arrow from "../arrow/arrow";
import DateObject from "react-date-object";
import { Fragment } from "react";
import { findFocusable } from "../../shared/handleFocus";
import { findCalendar } from "../../shared/findNode";

export default function Header({
  state,
  setState,
  disableYearPicker,
  disableMonthPicker,
  buttons,
  renderButton,
  handleMonthChange,
  disabled,
  hideMonth,
  hideYear,
  isRTL,
  fullYear,
  monthAndYears: [months, years],
  monthYearSeparator,
  formatMonth,
  formatYear,
  headerOrder,
  onYearChange,
}) {
  let style = {},
    {
      date,
      onlyMonthPicker,
      onlyYearPicker,
      mustShowYearPicker,
      minDate,
      maxDate,
      year,
      today,
    } = state,
    isPreviousDisable =
      minDate &&
      date.year <= minDate.year &&
      minDate.monthIndex > date.monthIndex - 1,
    isNextDisable =
      maxDate &&
      date.year >= maxDate.year &&
      maxDate.monthIndex < date.monthIndex + 1;

  let maxYear = today.year + 7;

  maxYear = maxYear - 12 * Math.floor((maxYear - year) / 12);

  if ((hideMonth || fullYear) && hideYear && !buttons) return null;

  if (onlyMonthPicker || fullYear) {
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

  return (
    <div className="rmdp-header">
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {Array.from(new Set(headerOrder)).map((item, index) => (
          <Fragment key={index}>{getHeaderItem(item)}</Fragment>
        ))}
      </div>
    </div>
  );

  function getHeaderItem(item) {
    switch (item) {
      case "LEFT_BUTTON":
        return buttons && getButton("left");
      case "RIGHT_BUTTON":
        return buttons && getButton("right");
      case "MONTH_YEAR":
      case "YEAR_MONTH":
        if (fullYear) {
          return (
            <div className="rmdp-header-values" style={style}>
              {!hideYear && date.format("YYYY")}
            </div>
          );
        } else {
          let items = item
            .split("_")
            .filter(
              (item) =>
                (item === "MONTH" && !hideMonth) ||
                (item === "YEAR" && !hideYear)
            );

          if (items.length > 1) items = [items[0], getSeparator(), items[1]];

          return months.map((month, index) => (
            <div key={index} className="rmdp-header-values" style={style}>
              {items.map((item, i) => (
                <Fragment key={i}>
                  {getMonthOrYear(item, month, index)}
                </Fragment>
              ))}
            </div>
          ));
        }
      default:
        return;
    }
  }

  function getMonthOrYear(item, month, index) {
    switch (item) {
      case "MONTH":
        return (
          <span
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{
              cursor:
                disabled || disableMonthPicker || onlyMonthPicker
                  ? "default"
                  : "pointer",
            }}
            onClick={(e) =>
              !disableMonthPicker && toggle("mustShowMonthPicker", e)
            }
          >
            {getMonth(month, years[index])}
          </span>
        );
      case "YEAR":
        return (
          <span
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{
              cursor:
                disabled || disableYearPicker || onlyYearPicker
                  ? "default"
                  : "pointer",
            }}
            onClick={(e) =>
              !disableYearPicker && toggle("mustShowYearPicker", e)
            }
          >
            {getYear(years[index], month)}
          </span>
        );
      default:
        return item;
    }
  }

  function handleKeyDown(e) {
    const { currentTarget, key, code } = e;

    if (code === "Space" || key === " ") {
      e.preventDefault();
      currentTarget.click();
    } else if (code === "ArrowDown") {
      e.preventDefault();

      findFocusable(findCalendar(e.target));
    }
  }

  function getSeparator() {
    return !monthYearSeparator ? (
      isRTL ? (
        "،"
      ) : (
        ","
      )
    ) : (
      <span>{monthYearSeparator}</span>
    );
  }

  function getButton(direction) {
    let handleClick = (e) => {
        e.preventDefault();

        increaseValue(direction === "right" ? 1 : -1, e);
      },
      disabled =
        (direction === "left" && isPreviousDisable) ||
        (direction === "right" && isNextDisable);

    return renderButton instanceof Function ? (
      renderButton(direction, handleClick, disabled, handleKeyDown)
    ) : isValidElement(renderButton) ? (
      cloneElement(renderButton, {
        direction,
        handleClick,
        disabled,
        onKeyDown: handleKeyDown,
      })
    ) : (
      <Arrow
        direction={`rmdp-${direction}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    );
  }

  function increaseValue(value, e) {
    if (
      disabled ||
      (value < 0 && isPreviousDisable) ||
      (value > 0 && isNextDisable)
    )
      return;

    if (fullYear) {
      date.year += value;

      onYearChange?.(new DateObject(date));
    } else if (!mustShowYearPicker && !onlyYearPicker) {
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

    setState({ ...state, date, year });
    findFocusable(findCalendar(e.target), undefined, false);
  }

  function toggle(picker, e) {
    if (disabled) return;

    let object = {
      mustShowMonthPicker: false,
      mustShowYearPicker: false,
    };

    object[picker] = !state[picker];

    setState({ ...state, ...object });
    findFocusable(findCalendar(e.target), undefined, false);
  }

  function getMonth(month, year) {
    return typeof formatMonth === "function" ? formatMonth(month, year) : month;
  }

  function getYear(year, month) {
    return typeof formatYear === "function" ? formatYear(year, month) : year;
  }
}
