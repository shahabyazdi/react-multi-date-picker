import React from "react"
import DateObject from "react-date-object"
import "./date_picker_header.css"

export default function DatePickerHeader({
    state,
    position,
    size = "big",
    nodes,
    calendar = state.calendar,
    locale = state.locale,
    className = "",
    ...props
}) {
    let selectedDate

    if (state.selectedDate && !state.multiple && !state.range && !Array.isArray(state.selectedDate)) {
        //single mode
        selectedDate = state.selectedDate
    } else if (Array.isArray(state.selectedDate)) {
        selectedDate = state.focused || getLastItem(state.selectedDate)
    } else if (!selectedDate) {
        selectedDate = new DateObject()
    }

    selectedDate = new DateObject(selectedDate).set({ calendar, locale })

    let classNames = ["rmdp-header-plugin", position, size]

    if (nodes[position]) {
        classNames.push("no-border-radius")
    } else if (["left", "right"].includes(position)) {
        if (nodes.top) classNames.push(`no-border-top-${position}-radius`)
        if (nodes.bottom) classNames.push(`no-border-bottom-${position}-radius`)
    }

    delete props.setState
    delete props.registerListener
    delete props.calendarProps
    delete props.handleChange

    return (
        <div
            className={`${classNames.join(" ")} ${className}`}
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