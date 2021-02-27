import React from "react"
import DateObject from "react-date-object"
import getAllDatesInRange from "./getAllDatesInRange"
import "./date_panel.css"

export default function DatePanel({
    state,
    setState,
    position,
    nodes,
    handleChange,
    calendarProps,
    eachDaysInRange,
    sort,
    style = {},
    className = "",
    onDateClicked,
    removeButton = true,
    ...props
}) {
    let header = { en: "Dates", fa: "تاریخ ها", ar: "تواریخ", hi: "खजूर" },
        dates = [],
        { multiple, range, inRangeDates, selectedDate, date: { locale } } = state,
        { formattingIgnoreList } = calendarProps,
        classNames = ["rmpd-panel", position]

    if (
        multiple ||
        (range && !eachDaysInRange)
    ) {
        dates = (inRangeDates || selectedDate).map((date, index) => {
            return {
                date,
                format: date.format(undefined, formattingIgnoreList),
                index
            }
        })
    } else if (range && eachDaysInRange) {
        let allDates = getAllDatesInRange(inRangeDates || selectedDate)

        dates = allDates.map((date, index) => {
            return {
                //in range mode
                //To find out which date is between the start and end date
                //We change its value to undefined
                date: (index === 0 || index === (allDates.length - 1)) ? date : undefined,
                format: date.format(undefined, formattingIgnoreList),
                index
            }
        })
    } else if (selectedDate && !Array.isArray(selectedDate)) {
        dates = [{
            date: selectedDate,
            format: selectedDate.format(undefined, formattingIgnoreList),
            index: 0
        }]
    }

    if (multiple && sort === "date") dates.sort((a, b) => a.date - b.date)

    if (multiple && sort === "color" && dates.every(object => object.date.color)) {
        dates.sort((a, b) => {
            if (a.date.color < b.date.color) return -1
            if (a.date.color > b.date.color) return 1

            return 0
        })
    }

    if (["left", "right"].includes(position)) {
        if (nodes.left) classNames.push("rmdp-border-left")
        if (nodes.right) classNames.push("rmdp-border-right")
    } else {
        if (nodes.top) classNames.push("rmdp-border-top")
        if (nodes.bottom) classNames.push("rmdp-border-bottom")
    }

    if (["fa", "ar"].includes(state.locale)) {
        classNames.push("rmdp-rtl")
    }

    delete props.registerListener

    return (
        <div
            className={`${classNames.join(" ")} ${className}`}
            style={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                ...style
            }}
            {...props}
        >
            <div className="rmdp-panel-header">{header[locale]}</div>
            <div style={{ position: "relative", overflow: "auto", height: ["top", "bottom"].includes(position) ? "100px" : "" }}>
                <ul className="rmdp-panel-body">
                    {Array.isArray(dates) && dates.map((object, index) => {
                        return (
                            <li
                                key={index}
                                className={object.date?.color ? `bg-${object.date.color}` : ""}
                                onClick={() => !removeButton && selectDate(object.date, object.index)}
                            >
                                <span
                                    onClick={() => removeButton && selectDate(object.date, object.index)}
                                    style={{ cursor: object.date ? "pointer" : "default" }}
                                >
                                    {object.format}
                                </span>
                                {object.date && removeButton &&
                                    <button
                                        type="button"
                                        className="b-deselect"
                                        onClick={() => deSelect(object.index)}
                                    >
                                        +
                                    </button>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

    function selectDate(date, index) {
        if (onDateClicked instanceof Function) onDateClicked(date ? state.selectedDate[index] : undefined)
        if (!date) return

        setState({
            ...state,
            date: new DateObject(date),
            focused: range || multiple ? state.selectedDate[index] : undefined
        })
    }

    function deSelect(index) {
        let dates = range || multiple ? selectedDate.filter((d, i) => i !== index) : null

        handleChange(
            dates,
            {
                ...state,
                selectedDate: dates,
                focused: range || multiple ? dates[dates.length - 1] : undefined
            }
        )
    }
}