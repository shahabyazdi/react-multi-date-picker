import React, { useMemo } from "react";
import Arrow from "../../../src/components/arrow/arrow";
import Input from "./input";
import getValidProps from "../../shared/getValidProps";
import "./time_picker.css";
import Select from "./select";

export default function TimePicker({
  state,
  setState,
  handleChange,
  position,
  calendarProps: { formattingIgnoreList },
  nodes,
  Calendar,
  hideSeconds,
  className = "",
  style = {},
  handleFocusedDate,
  format = "YYYY/MM/DD",
  header = true,
  intervalMinutesType,
  ...props
}) {
  let { date, selectedDate, multiple, range, focused } = state,
    meridiems = date.meridiems,
    availbleDate = (multiple || range ? focused : selectedDate) || date,
    horizontal = ["left", "right"].includes(position);

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

  let isAm = mustDisplayMeridiem && availbleDate.hour < 12;

  return (
    <div style={{ display: "grid" }}>
      {horizontal && header && (
        <>
          <div style={{ margin: "auto" }}>
            <div style={{ margin: "5px 0", fontSize: "14px" }}>
              {availbleDate.month.name}
            </div>
            <div style={{ margin: "10px 0", fontSize: "25px" }}>
              {availbleDate.format("D")}
            </div>
          </div>
          <Select
            selectedDate={selectedDate}
            focused={focused}
            handleFocusedDate={handleFocusedDate}
            state={state}
            setState={setState}
            format={format}
          />
        </>
      )}
      <div
        className={`rmdp-time-picker ${position} ${className || ""}`}
        style={{
          direction: "ltr",
          minWidth: horizontal ? "120px" : "220px",
          ...style,
        }}
        {...getValidProps(props)}
      >
        {[
          [
            "hour",
            mustDisplayMeridiem ? "hh" : "HH",
            mustDisplayMeridiem ? 12 : 24,
          ],
          ["minute", "mm", 60],
          ["second", "ss", 60],
        ].map(([name, token, max], index) => {
          if (name === "second" && hideSeconds) return null;

          return (
            <Button
              max={max}
              key={index}
              name={name}
              values={getValues(name, token)}
              update={update}
              digits={date.digits}
              hideDivider={
                name === "second" || (name === "minute" && hideSeconds)
              }
              getIntervalMinutes={getIntervalMinutes}
            />
          );
        })}
        <div
          style={{
            display: mustDisplayMeridiem ? "flex" : "none",
          }}
        >
          <Arrow direction="rmdp-up" onClick={toggleMeridiem} />
          <div className="rmdp-am">
            {(isAm ? meridiems[0][1] : meridiems[1][1]).toUpperCase()}
          </div>
          <Arrow direction="rmdp-down" onClick={toggleMeridiem} />
        </div>
      </div>
    </div>
  );

  function update(key, value) {
    if (key === "minute") value = exceededIfMinutesZeroToConverting(value)

    availbleDate[key] = value;

    setDate();
  }

  function exceededIfMinutesZeroToConverting(minutes) {
    if (availbleDate.minute % getIntervalMinutes() !== 0 && minutes > 60) return 60;
    if (availbleDate.minute % getIntervalMinutes() !== 0 && minutes < 0) return 0;
    return minutes;
  }

  function getIntervalMinutes() {
    if (intervalMinutesType === "quarter") return 15;
    if (intervalMinutesType === "half") return 30;
    return 1;
  }

  function toggleMeridiem() {
    availbleDate.hour += availbleDate.hour < 12 ? 12 : -12;

    setDate();
  }

  function setDate() {
    handleChange(selectedDate, {
      ...state,
      selectedDate,
      focused,
    });
  }

  function getValues(key, token) {
    if (!availbleDate[key]) availbleDate[key] = 0;

    return [availbleDate[key], availbleDate.format(token)];
  }
}

function Button({
  max,
  name,
  values: [number, localeValue],
  update,
  digits,
  hideDivider,
  getIntervalMinutes
}) {
  const intervalValue = name === "minute" ? getIntervalMinutes() : 1
  return (
    <>
      <div>
        <Arrow direction="rmdp-up" onClick={() => update(name, number + intervalValue)} />
        <Input
          max={max}
          value={localeValue}
          onChange={update}
          digits={digits}
          name={name}
        />
        <Arrow direction="rmdp-down" onClick={() => update(name, number - intervalValue)} />
      </div>
      {!hideDivider && <span className="dvdr">:</span>}
    </>
  );
}
