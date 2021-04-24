import React, { useMemo, useEffect } from "react";
import DateObject from "react-date-object";
import Arrow from "../../../src/components/arrow/arrow";
import Input from "../../../src/components/input/input";

export default function TimePicker({
  state,
  handleChange,
  position,
  calendarProps: { formattingIgnoreList },
  nodes,
  calendar,
}) {
  let { date, selectedDate, multiple, range, focused } = state,
    meridiems = date.meridiems;

  useEffect(() => {
    if (position === "bottom" && !nodes.top && !range && !multiple) {
      calendar
        ?.querySelector?.(".rmdp-top-class")
        .classList?.remove?.("rmdp-border-bottom");
    } else {
      calendar
        ?.querySelector?.(".rmdp-top-class")
        .classList?.add?.("rmdp-border-bottom");
    }
  }, [position, nodes.top, calendar, range, multiple]);

  const mustDisplayMeridiem = useMemo(() => {
    let format = date._format;

    if (typeof format !== "string") return false;

    if (Array.isArray(formattingIgnoreList)) {
      formattingIgnoreList.forEach((item) => {
        if (typeof item === "string") {
          format = format.replace(new RegExp(item, "g"), "");
        }
      });
    }

    return format.toLowerCase().includes("a") || format.includes("hh");
  }, [date._format, formattingIgnoreList]);

  let hour = selectedDate?.hour;

  if (typeof hour === "undefined") hour = new Date().getHours();

  let am = mustDisplayMeridiem ? hour < 12 : false,
    availbleDate;

  if (multiple || range) {
    availbleDate = focused || date;
  } else {
    availbleDate = selectedDate || date;
  }

  return (
    <div
      className={`rmdp-time-picker ${position}`}
      style={{ direction: "ltr", minWidth: "220px" }}
    >
      <div>
        <Arrow direction="rmdp-up" onClick={() => changeValue("hour", 1)} />
        <Input
          value={getHours()}
          onChange={update}
          digits={date.digits}
          name="hour"
        />
        <Arrow direction="rmdp-down" onClick={() => changeValue("hour", -1)} />
      </div>
      <span className="dvdr">:</span>
      <div>
        <Arrow direction="rmdp-up" onClick={() => changeValue("minute", 1)} />
        <Input
          value={getMinutes()}
          onChange={update}
          digits={date.digits}
          name="minute"
        />
        <Arrow
          direction="rmdp-down"
          onClick={() => changeValue("minute", -1)}
        />
      </div>
      <span className="dvdr">:</span>
      <div>
        <Arrow direction="rmdp-up" onClick={() => changeValue("second", 1)} />
        <Input
          value={getSeconds()}
          onChange={update}
          digits={date.digits}
          name="second"
        />
        <Arrow
          direction="rmdp-down"
          onClick={() => changeValue("second", -1)}
        />
      </div>
      <div style={getStyle()}>
        <Arrow direction="rmdp-up" onClick={toggleMeridiem} />
        <div className="rmdp-am">
          {am
            ? meridiems[0].shortName.toUpperCase()
            : meridiems[1].shortName.toUpperCase()}
        </div>
        <Arrow direction="rmdp-down" onClick={toggleMeridiem} />
      </div>
    </div>
  );

  function update(key, value) {
    if (multiple || range) {
      if (focused) focused[key] = value;
    } else {
      selectedDate[key] = value;
    }

    setDate();
  }

  function changeValue(key, value) {
    value = Number(value);

    if (multiple || range) {
      if (focused) focused[key] += value;
    } else {
      if (!selectedDate) selectedDate = new DateObject(date);

      selectedDate[key] += value;
    }

    setDate();
  }

  function setDate() {
    handleChange(selectedDate, {
      ...state,
      selectedDate,
      focused,
    });
  }

  function toggleMeridiem() {
    selectedDate.hour += selectedDate.hour < 12 ? 12 : -12;

    setDate(selectedDate);
  }

  function getHours() {
    if (!availbleDate.hour) availbleDate.hour = 0;

    return availbleDate.format(mustDisplayMeridiem ? "hh" : "HH");
  }

  function getMinutes() {
    if (!availbleDate.minute) availbleDate.minute = 0;

    return availbleDate.format("mm");
  }

  function getSeconds() {
    if (!availbleDate.second) availbleDate.second = 0;

    return availbleDate.format("ss");
  }

  function getStyle() {
    return {
      display: mustDisplayMeridiem ? "flex" : "none",
    };
  }
}
