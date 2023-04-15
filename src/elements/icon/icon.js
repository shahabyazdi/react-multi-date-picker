import React from "react";
import { IconCalendarEvent } from "@tabler/icons";

export default function InputIcon({
  openCalendar,
  handleValueChange,
  value,
  stringDate,
  stringDates,
  style = {},
  size = 30,
  stroke = 1.5,
  ...otherProps
}) {
  return (
    <IconCalendarEvent
      onClick={openCalendar}
      size={size}
      stroke={stroke}
      style={{ cursor: "pointer", ...style }}
      {...otherProps}
    />
  );
}
