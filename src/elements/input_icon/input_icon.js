import React, { useEffect, useRef } from "react";
import getLocaleName from "../../shared/getLocaleName";
import { IconCalendarEvent } from "@tabler/icons";

export default function InputIcon({
  value,
  openCalendar,
  className = "rmdp-input",
  stringDate,
  stringDates,
  separator,
  handleValueChange,
  locale,
  iconStyle = {},
  ...otherProps
}) {
  value = value || stringDate || stringDates?.join?.(separator) || "";
  const ref = useRef();

  useEffect(() => {
    let input = ref.current,
      icon = input?.parentNode?.querySelector?.(".rmdp-input-icon"),
      height = input?.clientHeight - 5 + "px";

    if (icon) {
      icon.style.height = height;
      icon.style.width = height;
    }
  });

  return (
    <div style={{ position: "relative" }}>
      <input
        ref={ref}
        type="text"
        onFocus={openCalendar}
        className={className}
        value={value}
        onChange={handleValueChange}
        autoComplete="off"
        {...otherProps}
      />
      <IconCalendarEvent
        height={20}
        width={20}
        stroke={1.5}
        style={{
          position: "absolute",
          [["fa", "ar"].includes(getLocaleName(locale)) ? "left" : "right"]:
            "2.5px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "inherit",
          cursor: "pointer",
          ...iconStyle,
        }}
        onClick={openCalendar}
      />
    </div>
  );
}
