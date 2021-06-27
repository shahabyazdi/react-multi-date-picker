import React from "react";

export default function Button({
  stringDate,
  stringDates,
  placeholder,
  separator,
  openCalendar,
  className = "rmdp-button",
  type = "button",
  children,
  ...otherProps
}) {
  const child =
    children || stringDate || stringDates?.join?.(separator) || placeholder;

  return (
    <button onClick={openCalendar} className={className} {...otherProps}>
      {child}
    </button>
  );
}
