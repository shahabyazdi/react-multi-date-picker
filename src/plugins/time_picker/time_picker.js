import React, { useMemo, useEffect } from "react";
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
  calendarProps: { formattingIgnoreList, disableDayPicker },
  nodes,
  Calendar,
  hideSeconds,
  className = "",
  style = {},
  handleFocusedDate,
  format = "YYYY/MM/DD",
  ...props
}) {
  let { date, selectedDate, multiple, range, focused } = state,
    meridiems = date.meridiems;

  useEffect(() => {
    if (position === "bottom" && !nodes.top && !range && !multiple) {
      Calendar?.querySelector?.(".rmdp-top-class").classList?.remove?.(
        "rmdp-border-bottom"
      );
    } else {
      Calendar?.querySelector?.(".rmdp-top-class").classList?.add?.(
        "rmdp-border-bottom"
      );
    }
  }, [position, nodes.top, Calendar, range, multiple]);

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
  let horizontal = ["left", "right"].includes(position);

  if (typeof hour === "undefined") hour = new Date().getHours();

  let am = mustDisplayMeridiem ? hour < 12 : false,
    availbleDate;

  if (multiple || range) {
    availbleDate = focused || date;
  } else {
    availbleDate = selectedDate || date;
  }

  if (disableDayPicker) position = "bottom";

  let padding = { top: "Top", bottom: "Bottom" }[position] || "";

  return (
    <div style={{ display: "grid" }}>
      {horizontal && (
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
          ["padding" + padding]: padding ? "5px" : "0",
          ...style,
        }}
        {...getValidProps(props)}
      >
        {["hour", "minute", "second"].map((name, index) => {
          if (name === "second" && hideSeconds) return null;

          return (
            <Button
              key={index}
              name={name}
              value={getValue(name)}
              update={update}
              digits={date.digits}
              hideDivider={
                name === "second" || (name === "minute" && hideSeconds)
              }
            />
          );
        })}
        <div style={getStyle()}>
          <Arrow direction="rmdp-up" onClick={toggleMeridiem} />
          <div className="rmdp-am">
            {am ? meridiems[0][1].toUpperCase() : meridiems[1][1].toUpperCase()}
          </div>
          <Arrow direction="rmdp-down" onClick={toggleMeridiem} />
        </div>
      </div>
    </div>
  );

  function update(key, value) {
    if (multiple || range) {
      if (focused) focused[key] = value;
    } else {
      if (selectedDate) selectedDate[key] = value;
    }

    setDate();
  }

  function toggleMeridiem() {
    if (selectedDate) selectedDate.hour += selectedDate.hour < 12 ? 12 : -12;

    setDate();
  }

  function setDate() {
    handleChange(selectedDate, {
      ...state,
      selectedDate,
      focused,
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

function Button({ name, value, update, digits, hideDivider }) {
  return (
    <>
      <div>
        <Arrow direction="rmdp-up" onClick={() => update(name, value + 1)} />
        <Input value={value} onChange={update} digits={digits} name={name} />
        <Arrow direction="rmdp-down" onClick={() => update(name, value - 1)} />
      </div>
      {!hideDivider && <span className="dvdr">:</span>}
    </>
  );
}
