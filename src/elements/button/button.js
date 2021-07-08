import React from "react";

export default function Button({
  value,
  stringDate,
  stringDates,
  placeholder,
  handleValueChange,
  separator,
  openCalendar,
  className = "rmdp-button",
  type = "button",
  children,
  ...otherProps
}) {
  const child = children || value || placeholder || "click to select";

  return (
    <button onClick={openCalendar} className={className} {...otherProps}>
      {child}
    </button>
  );
}
