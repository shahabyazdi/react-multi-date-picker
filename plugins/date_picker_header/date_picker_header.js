import React from "react"
import DateObject from "react-date-object"
import "./date_picker_header.css"

export default function DatePickerHeader({
    state,
    setState,
    position,
    size = "big",
    nodes,
    calendar = state.calendar,
    local = state.local,
    ...props
}) {
    let selectedDate, isSingle

    if (state.selectedDate && !state.multiple && !state.range && !Array.isArray(state.selectedDate)) {
        //single mode
        selectedDate = state.selectedDate
        isSingle = true
    } else if (Array.isArray(state.selectedDate)) {
        selectedDate = state.focused || getLastItem(state.selectedDate)
        isSingle = false
    } else if (!selectedDate) {
        selectedDate = new DateObject()
        isSingle = false
    }

    selectedDate = new DateObject(selectedDate).set({ calendar, local })

    let classNames = ["rmdp-header-plugin", position, size]

    if (nodes[position]) classNames.push("no-border-radius")

    if (["left", "right"].includes(position)) {
        if (nodes.top) classNames.push(`no-border-top-${position}-radius`)
        if (nodes.bottom) classNames.push(`no-border-bottom-${position}-radius`)
    }

    delete props.registerListener
    delete props.calendarProps
    delete props.handleChange

    return (
        <div
            className={classNames.join(" ")}
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