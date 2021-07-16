import React, { useEffect, useRef, useState } from "react";
import DateObject from "react-date-object";
import getBorderClass from "../../shared/getBorderClass";
import getValidProps from "../../shared/getValidProps";
import "./multi_colors.css";

export default function MultiColors({
  state,
  position,
  colors = ["blue", "red", "green", "yellow"],
  defaultColor = colors[0],
  nodes,
  calendarProps,
  registerListener,
  className = "",
  handlePropsChange,
  ...props
}) {
  let [activeColor, setActiveColor] = useState(
      calendarProps.activeColor || defaultColor
    ),
    classNames = ["rmdp-colors", position, getBorderClass(position, nodes)];

  let ref = useRef({});

  ref.current.handlePropsChange = handlePropsChange;

  useEffect(() => {
    if (Array.isArray(state.selectedDate)) {
      let values = [];
      let colors = {};

      for (let i = 0; i < state.selectedDate.length; i++) {
        let date = state.selectedDate[i],
          value = new DateObject(date).setLocale(undefined).format("YYYYMMDD"),
          color = date.color || activeColor;

        if (!date.color) state.selectedDate[i].color = color;

        colors[value] = color;
        values.push(value);
      }

      let stringValues = JSON.stringify(values);

      if (stringValues === ref.current.stringValues) return;

      ref.current.stringValues = stringValues;
      ref.current.colors = colors;
    }

    ref.current.handlePropsChange({
      mapDays: getMapDays(state.selectedDate, state.range, ref, activeColor),
      value: state.selectedDate,
      activeColor,
    });
  }, [state.selectedDate, state.range, activeColor]);

  registerListener("change", handleChange);

  return (
    <div
      className={`${classNames.join(" ")} ${className}`}
      {...getValidProps(props)}
    >
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className={`rmdp-color rmdp-${color} ${
              activeColor === color ? "active" : ""
            }`}
            onClick={() => handleClick(color)}
          ></div>
        );
      })}
    </div>
  );

  function handleChange(selectedDate) {
    if (!Array.isArray(selectedDate)) {
      if (selectedDate) selectedDate.color = activeColor;
    } else {
      for (let i = 0; i < selectedDate.length; i++) {
        if (!selectedDate[i].color) {
          selectedDate[i].color = activeColor;
        }
      }
    }
  }

  function handleClick(color) {
    setActiveColor(color);

    let { selectedDate, range } = state;

    if (selectedDate && !Array.isArray(selectedDate))
      selectedDate.color = color;

    let $state = {
      activeColor: color,
      value: selectedDate,
      mapDays: getMapDays(selectedDate, range, ref, color),
    };

    handlePropsChange($state);
  }
}

function getMapDays(selectedDate, range, ref, activeColor) {
  return function mapDays({ date }) {
    let color, className;

    if (range) return;

    if (
      selectedDate &&
      !Array.isArray(selectedDate) &&
      date.format() === selectedDate.format()
    ) {
      //single mode
      color = activeColor;
    }

    if (Array.isArray(selectedDate)) {
      //not single mode
      let value = new DateObject(date).setLocale(undefined).format("YYYYMMDD");

      if (ref.current.stringValues.includes(value))
        color = ref.current.colors[value];
    }

    if (color) {
      className = `highlight highlight-${color}`;
    } else {
      className = `hover-${activeColor}`;
    }

    return { className };
  };
}
