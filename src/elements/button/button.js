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
  return (
    <button
      onClick={openCalendar}
      className={className}
      type={type}
      {...otherProps}
    >
      {children || value || placeholder || "Click to select"}
    </button>
  );
}
