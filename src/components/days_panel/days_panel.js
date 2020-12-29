import React from "react"
import DateObject from "react-date-object"
import { isSameDate } from "../day_picker/day_picker"

export default function DaysPanel({ state, setState, onChange, formattingIgnoreList, eachDaysInRange }) {
    let header = { en: "Dates", fa: "تاریخ ها", ar: "تواریخ", hi: "खजूर" },
        dates = [],
        { multiple, range, inRangeDates, selectedDate, mustShowDates, local } = state

    if (
        multiple ||
        (range && !eachDaysInRange)
    ) {
        dates = (inRangeDates || selectedDate).map(date => {
            return {
                date,
                format: date.format(undefined, formattingIgnoreList)
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
                format: date.format(undefined, formattingIgnoreList)
            }
        })
    }

    return (mustShowDates &&
        <div
            className="rmpd-panel"
            style={{
                display: mustShowDates ? "grid" : "none",
                gridTemplateRows: "auto 1fr"
            }}
        >
            <div className="rmdp-panel-header">{header[local]}</div>
            <div style={{ position: "relative", overflow: "auto" }}>
                <ul className="rmdp-panel-body">
                    {Array.isArray(selectedDate) ?
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
                        <li>{selectedDate.format(undefined, formattingIgnoreList)}</li>
                    }
                </ul>
            </div>
        </div>
    )

    function selectDate(date) {
        if (!date) return

        setState({
            ...state,
            date: new DateObject(date),
            focused: date
        })
    }

    function deSelect(date) {
        let index = 0,
            dates = selectedDate.filter(($date, i) => {
                let result = !isSameDate($date, date)

                if (!result) index = i

                return result
            })

        setState({
            ...state,
            selectedDate: dates,
            focused: dates[index] || dates[index - 1]
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