import React from "react";
import DateObject from "react-date-object";
import getAllDatesInRange from "../../shared/getAllDatesInRange";
import isArray from "../../shared/isArray";
import getBorderClass from "../../shared/getBorderClass";
import getValidProps from "../../shared/getValidProps";
import getLocaleName from "../../shared/getLocaleName";
import "./date_panel.css";

export default function DatePanel({
  state,
  setState,
  position,
  nodes,
  handleChange,
  eachDaysInRange,
  sort,
  style = {},
  className = "",
  onClickDate,
  removeButton = true,
  header,
  markFocused,
  focusedClassName = "",
  handleFocusedDate,
  formatFunction,
  ...props
}) {
  let headers = { en: "Dates", fa: "تاریخ ها", ar: "تواریخ", hi: "खजूर" },
    dates = [],
    {
      multiple,
      range,
      inRangeDates,
      selectedDate,
      date: { locale },
    } = state,
    classNames = ["rmdp-panel", position, getBorderClass(position, nodes)];

  locale = locale.name.split("_")[1];

  if (multiple || (range && !eachDaysInRange)) {
    dates = (inRangeDates || selectedDate).map((date, index) => {
      return isArray(date)
        ? date.map((date) => ({ date, format: date.format(), index }))
        : {
            date,
            format: date.format(),
            index,
          };
    });
  } else if (range && eachDaysInRange) {
    let allDates = getAllDatesInRange(inRangeDates || selectedDate);

    dates = allDates.map((date, index) => {
      return {
        //in range mode
        //To find out which date is between the start and end date
        //We change its value to undefined
        date: index === 0 || index === allDates.length - 1 ? date : undefined,
        format: date.format(),
        index,
      };
    });
  } else if (selectedDate && !isArray(selectedDate)) {
    dates = [
      {
        date: selectedDate,
        format: selectedDate.format(),
        index: 0,
      },
    ];
  }

  if (multiple && sort === "date") dates.sort((a, b) => a.date - b.date);

  if (
    multiple &&
    sort === "color" &&
    dates.every((object) => object.date.color)
  ) {
    dates.sort((a, b) => {
      if (a.date.color < b.date.color) return -1;
      if (a.date.color > b.date.color) return 1;

      return 0;
    });
  }

  if (["fa", "ar"].includes(getLocaleName(locale))) {
    classNames.push("rmdp-rtl");
  }

  return (
    <div
      className={`${classNames.join(" ")} ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        ...style,
      }}
      {...getValidProps(props)}
    >
      <div className="rmdp-panel-header">{header || headers[locale]}</div>
      <div
        style={{
          position: "relative",
          overflow: "auto",
          height: ["top", "bottom"].includes(position) ? "100px" : "",
        }}
      >
        <ul className="rmdp-panel-body">
          {isArray(dates) &&
            dates.map((object, index) => {
              const date = isArray(object) ? object[0] : object;

              return (
                <li
                  key={index}
                  style={{
                    display: isArray(object) ? "grid" : "flex",
                  }}
                  className={`${
                    object.date?.color ? `bg-${object.date.color}` : ""
                  } ${
                    markFocused &&
                    object.date?.valueOf?.() === state.focused?.valueOf?.()
                      ? focusedClassName || "rmdp-focused"
                      : ""
                  }`}
                >
                  {[object].flat().map((object, index) => (
                    <button
                      onKeyDown={handleKeyDown}
                      key={index}
                      type="button"
                      className="b-date"
                      onClick={() => selectDate(object.date, object.index)}
                      style={{ cursor: object.date ? "pointer" : "default" }}
                    >
                      {formatFunction ? formatFunction(object) : object.format}
                    </button>
                  ))}
                  {date && removeButton && (
                    <button
                      onKeyDown={handleKeyDown}
                      type="button"
                      ariaDescription={`The date ${object.format} has been selected. Click to deselect it.`}
                      className="b-deselect"
                      onClick={() => deSelect(date.index)}
                    >
                      <span>+</span>
                    </button>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );

  function selectDate(date, index) {
    handleClick(date ? selectedDate[index] : undefined);

    if (!date) return;

    setState({
      ...state,
      date: new DateObject(date),
      focused: multiple && range ? date : selectedDate[index],
    });

    handleFocusedDate(selectedDate[index]);
  }

  function deSelect(index) {
    let dates, focused;

    if (multiple && range) {
      focused = selectedDate[index].some((item) => item === state.focused)
        ? undefined
        : state.focused;

      dates = selectedDate.filter((d, i) => i !== index);
    } else if (range || multiple) {
      dates = selectedDate.filter((d, i) => i !== index);
      focused = dates.find((d) => d.valueOf() === state.focused?.valueOf?.());
    } else {
      dates = null;
      focused = undefined;
    }

    handleChange(dates, {
      ...state,
      selectedDate: dates,
      focused,
    });

    handleClick();
    handleFocusedDate(focused);
  }

  function handleClick(date) {
    if (onClickDate instanceof Function) onClickDate(date);
  }

  function handleKeyDown(e) {
    const { key, currentTarget } = e;
    const li = currentTarget.parentNode;
    const list = Array.from(li.parentNode.childNodes);
    const index = list.indexOf(li);

    if (["ArrowRight", "ArrowLeft"].includes(key)) {
      const { nextSibling, previousSibling } = currentTarget;

      focus(key === "ArrowRight" ? nextSibling : previousSibling);
    } else if (["ArrowUp", "ArrowDown"].includes(key)) {
      const number = key === "ArrowUp" ? -1 : 1;
      const buttons = Array.from(li.childNodes);
      const buttonIndex = buttons.indexOf(currentTarget);
      const nextLi = list[index + number];

      focus(nextLi && nextLi.childNodes[buttonIndex]);
    }

    function focus(node) {
      if (node) {
        e.preventDefault();
        node.focus();
      }
    }
  }
}
