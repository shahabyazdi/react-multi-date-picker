/**
 * The original analog clock is taken from here :
 * https://codepen.io/vaskopetrov/pen/yVEXjz
 */

import React, { useMemo } from "react";
import Arrow from "../../../src/components/arrow/arrow";
import Input from "../time_picker/input/input";
import "./analog_time_picker.css";
import "../time_picker/time_picker.css";

const getTransform = (number) => `rotate(${number}deg)`;
const array = ["hour", "minute", "second"];

export default function AnalogTimePicker({
  state,
  handleChange,
  position,
  calendarProps: { disableDayPicker },
  hideSeconds,
}) {
  let { date, selectedDate, multiple, range, focused } = state,
    availbleDate;

  if (multiple || range) {
    availbleDate = focused || date;
  } else {
    availbleDate = selectedDate || date;
  }

  let hour = availbleDate.hour,
    minute = availbleDate.minute,
    second = availbleDate.second,
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
        gridTemplateRows: "1fr auto",
        minWidth: disableDayPicker ? "180px" : "",
      }}
    >
      <div className="rmdp-analog-clock">
        <div className="dot" />
        <div>
          {array.map((name, index) => {
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
      <div className="rmdp-time-picker" style={{ marginBottom: "10px" }}>
        {array.map((name, index) => {
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
      </div>
    </div>
  );

  function getValue(key) {
    if (!availbleDate[key]) availbleDate[key] = 0;

    return availbleDate[key];
  }

  function update(key, value) {
    if (multiple || range) {
      if (focused) focused[key] = value;
    } else {
      if (selectedDate) selectedDate[key] = value;
    }

    handleChange(selectedDate, {
      ...state,
      selectedDate,
      focused,
    });
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
