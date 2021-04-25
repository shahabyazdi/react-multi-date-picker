import React, { useMemo } from "react";
import DateObject from "react-date-object";
import Arrow from "../arrow/arrow";
import Input from "../input/input";

export default function TimePicker({ state, onChange, formattingIgnoreList }) {
  let {
      date,
      timePicker,
      onlyTimePicker,
      selectedDate,
      multiple,
      range,
    } = state,
    meridiems = date.meridiems,
    mustShowTimePicker = (timePicker || onlyTimePicker) && !multiple && !range;

  if ("_self" in React.createElement("div") && (timePicker || onlyTimePicker)) {
    let picker = onlyTimePicker ? "onlyTimePicker" : "timePicker";

    console.warn(
      picker + " is deprecated and no longer available in the next versions."
    );
  }

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
    availbleDate = selectedDate || date;

  return mustShowTimePicker ? (
    <div
      className={`rmdp-time-picker ${
        onlyTimePicker ? "rmdp-only-time-picker" : ""
      }`}
      style={{ direction: "ltr" }}
    >
      <div>
        <Arrow direction="rmdp-up" onClick={() => changeValue("hour", 1)} />
        <Input
          value={getHours()}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
  ) : null;

  function handleChange(key, value) {
    selectedDate[key] = value;

    setDate(selectedDate);
  }

  function changeValue(key, value) {
    if (!selectedDate) selectedDate = new DateObject(date);

    selectedDate[key] += Number(value);

    setDate(selectedDate);
  }

  function setDate(selectedDate) {
    onChange(selectedDate, {
      ...state,
      selectedDate,
      date: new DateObject(selectedDate),
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
