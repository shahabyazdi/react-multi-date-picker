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
      [
        picker + " is deprecated and will not available in the next versions.",
        "Use TimePicker plugin instead.",
      ].join("\n")
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
      {["hour", "minute", "second"].map((name, index) => (
        <Button
          key={index}
          name={name}
          value={getValue(name)}
          update={update}
          digits={date.digits}
        />
      ))}
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

  function update(key, value) {
    if (selectedDate) selectedDate[key] = value;

    setDate();
  }

  function toggleMeridiem() {
    selectedDate.hour += selectedDate.hour < 12 ? 12 : -12;

    setDate();
  }

  function setDate() {
    onChange(selectedDate, {
      ...state,
      selectedDate,
      date: new DateObject(selectedDate),
    });
  }

  function getValue(key) {
    if (!availbleDate[key]) availbleDate[key] = 0;

    return availbleDate[key];
  }

  function getStyle() {
    return {
      display: mustDisplayMeridiem ? "flex" : "none",
    };
  }
}

function Button({ name, value, update, digits }) {
  return (
    <>
      <div>
        <Arrow direction="rmdp-up" onClick={() => update(name, value + 1)} />
        <Input value={value} onChange={update} digits={digits} name={name} />
        <Arrow direction="rmdp-down" onClick={() => update(name, value - 1)} />
      </div>
      {name !== "second" && <span className="dvdr">:</span>}
    </>
  );
}
