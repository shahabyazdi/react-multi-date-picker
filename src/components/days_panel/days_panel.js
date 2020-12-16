import React from "react"
import DateObject from "react-date-object"
import { isSameDate } from "../day_picker/day_picker"

export default function DaysPanel({ state, setState, onChange, formattingIgnoreList, eachDaysInRange }) {
    let header = { en: "Dates", fa: "تاریخ ها", ar: "تواریخ", hi: "खजूर" }
    let dates = []

    if (
        state.multiple ||
        (state.range && !eachDaysInRange)
    ) {
        dates = (state.inRangeDates || state.selectedDate).map(date => {
            return {
                date,
                format: date.format(undefined, formattingIgnoreList)
            }
        })
    } else if (state.range && eachDaysInRange) {
        let allDates = getAllDatesInRange(state.inRangeDates || state.selectedDate)

        dates = allDates.map((date, index) => {
            return {
                date: (index === 0 || index === (allDates.length - 1)) ? date : undefined,
                format: date.format(undefined, formattingIgnoreList)
            }
        })
    }

    return (state.mustShowDates &&
        <div
            className="rmpd-panel"
            style={{
                display: state.mustShowDates ? "grid" : "none",
                gridTemplateRows: "auto 1fr"
            }}
        >
            <div className="rmdp-panel-header">{header[state.local]}</div>
            <div style={{ position: "relative", overflow: "auto" }}>
                <ul className="rmdp-panel-body">
                    {Array.isArray(state.selectedDate) ?
                        dates.map((object, index) => {
                            return (
                                <li
                                    key={index}>
                                    <span
                                        onClick={() => selectDate(object.date)}
                                        style={{ cursor: object.date ? "pointer" : "default" }}
                                    >
                                        {object.format}
                                    </span>
                                    {object.date &&
                                        <button
                                            type="button"
                                            className="b-deselect"
                                            onClick={() => deSelect(object.date)}
                                        >
                                            +
                                        </button>
                                    }
                                </li>
                            )
                        })
                        :
                        <li>{state.selectedDate.format(undefined, formattingIgnoreList)}</li>
                    }
                </ul>
            </div>
        </div>
    )

    function selectDate(date) {
        if (!date) return

        setState({
            ...state,
            date: new DateObject(date)
        })
    }

    function deSelect(date) {
        let dates = state.selectedDate.filter($date => !isSameDate($date, date))

        setState({
            ...state,
            selectedDate: dates
        })

        if (onChange instanceof Function) onChange(dates)
    }
}

export function getAllDatesInRange(range = [], toDate) {
    if (!Array.isArray(range)) return []

    let startDate = range[0],
        endDate = range[range.length - 1],
        dates = []

    if (
        !(startDate instanceof DateObject) ||
        !(endDate instanceof DateObject) ||
        !startDate.isValid ||
        !endDate.isValid ||
        startDate > endDate
    ) return []

    startDate = new DateObject(startDate)
    endDate = new DateObject(endDate)

    for (startDate; startDate <= endDate; startDate.day++) {
        dates.push(toDate ?
            startDate.toDate() :
            new DateObject(startDate)
        )
    }

    return dates
}