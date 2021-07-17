import React, { useEffect } from "react";
import isArray from "../../shared/isArray";
import getBorderClass from "../../shared/getBorderClass";
import getValidProps from "../../shared/getValidProps";
import "./colors.css";

export default function colors({
  colors = ["blue", "red", "green", "yellow"],
  defaultColor = colors[0],
  position = "bottom",
  ...rest
} = {}) {
  return [
    {
      type: "mapDays",
      fn: getMapDays,
    },
    <MultiColors
      colors={colors}
      defaultColor={defaultColor}
      position={position}
      {...rest}
    />,
  ];
}

function MultiColors({
  state,
  position,
  colors = ["blue", "red", "green", "yellow"],
  defaultColor = colors[0],
  nodes,
  calendarProps: { activeColor },
  registerListener,
  className = "",
  handlePropsChange,
  ...props
}) {
  let classNames = ["rmdp-colors", position, getBorderClass(position, nodes)];

  registerListener("change", handleChange);

  useEffect(() => {
    if (activeColor) return;

    handlePropsChange({ activeColor: defaultColor });
  }, [activeColor, defaultColor, handlePropsChange]);

  return (
    <div
      className={`${classNames.join(" ")} ${className}`}
      {...getValidProps(props)}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className={`rmdp-color rmdp-${color} ${
            activeColor === color ? "active" : ""
          }`}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );

  function handleChange(selectedDate) {
    if (!isArray(selectedDate)) {
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
    let { selectedDate } = state;

    if (selectedDate && !isArray(selectedDate)) selectedDate.color = color;

    handlePropsChange({
      activeColor: color,
      value: selectedDate,
    });
  }
}

function getMapDays({
  state: { selectedDate, range },
  calendarProps: { activeColor },
}) {
  let colors = {};

  if (isArray(selectedDate)) {
    for (let i = 0; i < selectedDate.length; i++) {
      let date = selectedDate[i];
      let color = date.color || activeColor;

      selectedDate[i].color = color;

      colors[`${date.year}${date.month}${date.day}`] = color;
    }
  }

  return function mapDays({ date }) {
    let color, className;

    if (range) return;

    if (
      selectedDate &&
      !isArray(selectedDate) &&
      date.format() === selectedDate.format()
    ) {
      //single mode
      color = activeColor;
    }

    if (isArray(selectedDate)) {
      //not single mode
      color = colors[`${date.year}${date.month}${date.day}`];
    }

    if (color) {
      className = `highlight highlight-${color}`;
    } else {
      className = `hover-${activeColor}`;
    }

    return { className };
  };
}
