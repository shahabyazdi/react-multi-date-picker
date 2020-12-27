import React from "react"
import DateObject from "react-date-object"
import "./date_picker_header.css"

export default function DatePickerHeader({ state, setState, position, size = "big", isChildInTop, isChildInBottom, ...props }) {
    let selectedDate, isSingle

    if (state.selectedDate && !state.multiple && !state.range && !Array.isArray(state.selectedDate)) {
        //single mode
        selectedDate = state.selectedDate
        isSingle = true
    } else if (Array.isArray(state.selectedDate)) {
        selectedDate = getLastItem(state.selectedDate)
        isSingle = false
    } else if (!selectedDate) {
        selectedDate = new DateObject()
        isSingle = false
    }

    return (
        <div
            className={`rmdp-header-plugin ${position} ${size} ${isSingle ? "" : "not-single"} ${isChildInTop ? "no-border-radius-top" : isChildInBottom ? "no-border-radius-bottom" : ""}`}
            {...props}
        >
            <div className="rmdp-hp-dddd">{selectedDate.format("dddd")}</div>
            <div className="rmdp-hp-dd">{selectedDate.format("DD")}</div>
            <div className="rmdp-hp-my">{selectedDate.format("MMM YYYY")}</div>
        </div>
    )

    function getLastItem(array) {
        return array[array.length - 1]
    }
}