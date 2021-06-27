import React from "react";
import { IconCalendarEvent } from "@tabler/icons";

export default function InputIcon({
  openCalendar,
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
      style={{
        cursor: "pointer",
        ...style,
      }}
      {...otherProps}
    />
  );
}
