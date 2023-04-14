import React, { useEffect } from "react";
import isArray from "../../shared/isArray";

export default function Select({
  selectedDate,
  focused,
  handleFocusedDate,
  state,
  setState,
  format,
}) {
  useEffect(() => {
    if (!isArray(selectedDate) || selectedDate.length === 0) return;

    if (!focused) {
      handleFocuse(
        isArray(selectedDate[0]) ? selectedDate[0][0] : selectedDate[0]
      );
    }
  }, [focused, selectedDate, handleFocuse]);

  return (
    isArray(selectedDate) && (
      <div style={{ display: "flex", padding: "5px 0" }}>
        <select
          className="rmdp-input"
          style={{ height: "26px", width: "90%", margin: "auto" }}
          value={focused?.day || ""}
          onChange={(e) =>
            handleFocuse(
              selectedDate
                .flat()
                .find((date) => date.day.toString() === e.target.value)
            )
          }
        >
          {selectedDate.flat().map((date) => (
            <option key={date.day} value={date.day}>
              {date.format(format)}
            </option>
          ))}
        </select>
      </div>
    )
  );

  function handleFocuse(focused) {
    setState({
      ...state,
      focused,
    });

    handleFocusedDate(focused);
  }
}
