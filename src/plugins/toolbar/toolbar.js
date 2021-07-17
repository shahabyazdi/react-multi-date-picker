import React from "react";
import DateObject from "react-date-object";
import getBorderClass from "../../shared/getBorderClass";
import getValidProps from "../../shared/getValidProps";
import getLocaleName from "../../shared/getLocaleName";
import "./toolbar.css";

export default function Toolbar({
  state,
  handleChange,
  position,
  calendarProps,
  nodes,
  className,
  names,
  sort = ["today", "deselect", "close"],
  handleFocusedDate,
  DatePicker,
  ...props
}) {
  let {
      range,
      multiple,
      date: { locale },
    } = state,
    name = {
      fa: { today: "امروز", deselect: "لغو", close: "بستن" },
      en: { today: "Today", deselect: "Deselect", close: "Close" },
    },
    localeName = names || name[getLocaleName(locale)] || name.en,
    classNames = ["rmdp-toolbar", position, getBorderClass(position, nodes)],
    getButton = (name, index) =>
      ({
        today: (
          <div key={index} onClick={selectToday}>
            {localeName.today}
          </div>
        ),
        deselect: (
          <div key={index} onClick={deselect}>
            {localeName.deselect}
          </div>
        ),
        close: DatePicker && (
          <div key={index} onClick={() => DatePicker.closeCalendar()}>
            {localeName.close}
          </div>
        ),
      }[name]);

  return (
    <div
      className={`${classNames.join(" ")} ${className}`}
      {...getValidProps(props)}
    >
      {sort.map(getButton)}
    </div>
  );

  function selectToday() {
    let { calendar, format, selectedDate } = state,
      today = new DateObject({ calendar, locale, format });

    if (range) {
      if (!selectedDate) selectedDate = [];

      if (selectedDate.length === 0) {
        selectedDate.push(today);
      } else if (selectedDate.length === 2) {
        selectedDate = [today];
      } else if (selectedDate.length === 1) {
        selectedDate.push(today);
        selectedDate.sort((a, b) => a - b);
      }
    } else if (multiple) {
      selectedDate = [today];
    } else {
      selectedDate = today;
    }

    handleChange(selectedDate, { ...state, selectedDate });
    handleFocusedDate(today);
  }

  function deselect() {
    let selectedDate = range || multiple ? [] : null;

    handleChange(selectedDate, { ...state, selectedDate });
    handleFocusedDate();
  }
}
