import React, { useEffect, useRef } from "react";
import getLocaleName from "../../shared/getLocaleName";
import { IconCalendarEvent } from "@tabler/icons";

export default function InputIcon({
  value = "",
  className = "rmdp-input",
  separator,
  openCalendar,
  locale,
  iconStyle = {},
  ...otherProps
}) {
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
        className={className}
        value={value}
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
