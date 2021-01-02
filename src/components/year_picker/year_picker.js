import React, { useState, useEffect, useRef } from "react"
import DateObject from "react-date-object"

export default function YearPicker({ state, setState, onChange }) {
    const [years, setyears] = useState([]),
        yearRef = useRef(null),
        digits = state.date.digits,
        mustShowYearPicker = (state.mustShowYearPicker || state.onlyYearPicker) && !state.onlyTimePicker,
        { minDate, maxDate } = state

    useEffect(() => {
        let yearArray = [],
            year = state.date.year - 4,
            end = year + 11

        if (!yearRef.current) yearRef.current = { start: year, end }
        if (years.length > 0 && state.date.year >= yearRef.current.start && state.date.year <= yearRef.current.end) return

        yearRef.current = { start: year, end }

        for (var i = 0; i < 4; i++) {
            let array = []

            for (var j = 0; j < 3; j++) {
                array.push(year)
                year++
            }

            yearArray.push(array)
        }

        setyears(yearArray)

        if (state.onlyYearPicker) setState(state => { return { ...state, ready: true } })
    }, [state.date.year, years, state.onlyYearPicker, setState])

    return (
        <div
            className={`${state.onlyYearPicker ? "only " : ""}rmdp-year-picker`}
            style={{ display: mustShowYearPicker ? "block" : "none" }}
        >
            {years.map((array, i) => <div
                key={i}
                className="rmdp-ym"
            >
                {array.map((year, j) => <div
                    key={j}
                    className={getClassName(year)}
                    onClick={() => selectYear(year)}
                >
                    <span className={state.onlyYearPicker ? "sd" : ""}>
                        {year.toString().replace(/[0-9]/g, w => digits[w])}
                    </span>
                </div>
                )}
            </div>
            )}
        </div>
    )

    function selectYear(year) {
        if (minDate && year < minDate.year) return
        if (maxDate && year > maxDate.year) return

        let date = state.date.setYear(year),
            selectedDate = state.onlyYearPicker ? new DateObject(date) : state.selectedDate

        if (minDate && date.month.number < minDate.month.number) {
            date = date.setMonth(minDate.month.number)
        } else if (maxDate && date.month.number > maxDate.month.number) {
            date = date.setMonth(maxDate.month.number)
        }

        onChange(
            state.onlyYearPicker ? selectedDate : undefined,
            {
                ...state,
                date,
                selectedDate,
                mustShowYearPicker: false
            }
        )
    }

    function getClassName(year) {
        let names = ["rmdp-day"],
            { date, selectedDate } = state

        if (year === (selectedDate && !Array.isArray(selectedDate) ? selectedDate.year : date.year)) names.push("rmdp-selected")
        if (minDate && year < minDate.year) names.push("rmdp-disabled")
        if (maxDate && year > maxDate.year) names.push("rmdp-disabled")

        return names.join(" ")
    }
}