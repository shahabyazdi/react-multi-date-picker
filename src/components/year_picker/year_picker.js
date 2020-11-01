import React, { useState, useEffect, useRef } from "react"
import DateObject from "react-date-object"

export default function YearPicker({ state, setState, onChange }) {
    const [years, setyears] = useState([]),
        yearRef = useRef(null),
        digits = state.date.digits,
        mustShowYearPicker = (state.mustShowYearPicker || state.onlyYearPicker) && !state.onlyTimePicker,
        style = state.onlyYearPicker ? { position: "static", width: "250px" } : {}

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
    }, [state.date.year, years])

    return (
        <div className={`rmdp-year-picker`} style={{ display: mustShowYearPicker ? "block" : "none", ...style }}>
            {years.map((array, i) => <div
                key={i}
                className="rmdp-week"
            >
                {array.map((year, j) => <div
                    key={j}
                    className={`rmdp-day ym ${year === (state.selectedDate ? state.selectedDate.year : state.date.year) ? "rmdp-selected" : ""}`}
                    onClick={() => selectYear(year)}
                >
                    <span>
                        {year.toString().replace(/[0-9]/g, w => digits[w])}
                    </span>
                </div>
                )}
            </div>
            )}
        </div>
    )

    function selectYear(year) {
        let date = state.date.setYear(year),
            selectedDate = state.onlyYearPicker ? new DateObject(date) : state.selectedDate

        setState({
            ...state,
            date,
            selectedDate,
            mustShowYearPicker: false
        })

        if (onChange instanceof Function && state.onlyYearPicker) onChange(selectedDate)
    }
}