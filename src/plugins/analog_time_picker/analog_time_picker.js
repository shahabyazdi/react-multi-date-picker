/**
 * The original analog clock is taken from here :
 * https://codepen.io/vaskopetrov/pen/yVEXjz
 */

import React, { useMemo } from "react";
import Arrow from "../../../src/components/arrow/arrow";
import Input from "../time_picker/input";
import Select from "../time_picker/select";
import "./analog_time_picker.css";
import "../time_picker/time_picker.css";

const getTransform = (number) => `rotate(${number}deg)`;
const array = [
  ["hour", "HH"],
  ["minute", "mm"],
  ["second", "ss"],
];

export default function AnalogTimePicker({
  state,
  setState,
  handleChange,
  handleFocusedDate,
  format = "YYYY/MM/DD",
  position,
  calendarProps: { disableDayPicker },
  hideSeconds,
}) {
  let { date, selectedDate, multiple, range, focused } = state,
    availbleDate = (multiple || range ? focused : selectedDate) || date,
    { hour, minute, second } = availbleDate,
    degree = {
      hour: hour * 30 + minute * (360 / 720),
      minute: minute * 6 + second * (360 / 3600),
      second: second * 6,
    },
    lines = useMemo(
      () =>
        Array.from(Array(60).keys()).map((index) => (
          <div
            key={index}
            className="dial-lines"
            style={{ transform: getTransform(6 * (index + 1)) }}
          />
        )),
      []
    ),
    numbers = ["3", "6", "9", "12"].map((number, index) => (
      <span key={index} className={"rmdp-h" + number}>
        {number.replace(/[0-9]/g, (w) => date.digits[w])}
      </span>
    ));

  return (
    <div
      className={position}
      style={{
        display: "grid",
        minWidth: disableDayPicker ? "180px" : "",
      }}
    >
      <div className="rmdp-analog-clock">
        <div className="dot" />
        <div>
          {array.map(([name], index) => {
            if (name === "second" && hideSeconds) return null;

            return (
              <div
                key={index}
                style={{ transform: getTransform(degree[name]) }}
                className={`rmdp-${name}`}
              />
            );
          })}
        </div>
        <div>{numbers}</div>
        <div>{lines}</div>
      </div>
      {Array.isArray(selectedDate) && (
        <Select
          selectedDate={selectedDate}
          focused={focused}
          handleFocusedDate={handleFocusedDate}
          state={state}
          setState={setState}
          format={format}
        />
      )}
      <div style={{ margin: "auto 0" }}>
        <div className="rmdp-time-picker">
          {array.map(([name, token], index) => {
            if (name === "second" && hideSeconds) return null;

            return (
              <Button
                key={index}
                name={name}
                values={getValues(name, token)}
                update={update}
                digits={date.digits}
                hideDivider={
                  name === "second" || (name === "minute" && hideSeconds)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  function getValues(key, token) {
    if (!availbleDate[key]) availbleDate[key] = 0;

    return [availbleDate[key], availbleDate.format(token)];
  }

  function update(key, value) {
    availbleDate[key] = value;

    handleChange(selectedDate, {
      ...state,
      selectedDate,
      focused,
    });
  }
}

function Button({
  name,
  values: [number, localeValue],
  update,
  digits,
  hideDivider,
}) {
  return (
    <>
      <div>
        <Arrow direction="rmdp-up" onClick={() => update(name, number + 1)} />
        <Input
          value={localeValue}
          onChange={update}
          digits={digits}
          name={name}
        />
        <Arrow direction="rmdp-down" onClick={() => update(name, number - 1)} />
      </div>
      {!hideDivider && <span className="dvdr">:</span>}
    </>
  );
}
