import React, { useEffect, useState } from "react"
import DateObject from "react-date-object"

export default function YearPicker({ state, setState }) {
    const [years, setyears] = useState([])

    useEffect(() => {
        let years = []
        let date = new DateObject({ year: state.year, month: 1, day: 1, calendar: state.calendar, local: state.local })
        let index = -1

        for (var i = 0; i < 4; i++) {
            let array = []
            for (var j = 0; j < 3; j++) {
                array.push(new DateObject(date).setYear(date.year + index))
                index++
            }
            years.push(array)
        }

        setyears(years)
    }, [state.year, state.calendar, state.local])

    return (
        <div className={`year-picker ${state.mustShowYearPicker ? "active" : ""}`}>
            {years.map((array, i) => {
                return <div key={i} className="days">
                    {array.map((year, j) => {
                        return <div
                            key={j}
                            className={`day ${isCurrentYear(year) ? "selected" : ""}`}
                            style={{ height: "59.5px" }}
                            onClick={() => selectYear(year.year)}
                        >
                            <span>{year.format("YYYY")}</span>
                        </div>
                    })}
                </div>
            })}
        </div>
    )

    function isCurrentYear(year) {
        return state.date.year === year.year
    }

    function selectYear(year) {
        let { date } = state
        let $date = new DateObject(date).setYear(year)

        setState({
            ...state,
            date: $date,
            month: $date.month.index,
            mustShowYearPicker: false
        })
    }
}
