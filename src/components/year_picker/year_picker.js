import React, { useState, useEffect, useRef } from "react"

export default function YearPicker({ state, setState }) {
    const [years, setyears] = useState([])
    const yearRef = useRef(null)
    const digits = state.date.digits

    useEffect(() => {
        let yearArray = []
        let year = state.date.year - 4
        let end = year + 11

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
        <div className={`rmdp-year-picker`} style={{ display: state.mustShowYearPicker ? "block" : "none", bottom: state.timePicker ? "75px" : "0" }}>
            {years.map((array, i) => <div
                key={i}
                className="rmdp-week"
            >
                {array.map((year, j) => <div
                    key={j}
                    className={`rmdp-day ym ${year === state.date.year ? "rmdp-selected" : ""}`}
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
        setState({
            ...state,
            date: state.date.setYear(year),
            mustShowYearPicker: false
        })
    }
}