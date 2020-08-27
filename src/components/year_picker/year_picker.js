import React, { useEffect, useState } from "react"
import DateObject from "react-date-object"

export default function YearPicker({ state, setState }) {
    const [years, setyears] = useState([])

    useEffect(() => {
        let years = []
        let year = state.year - 1
        let digits = state.date.digits

        for (var i = 0; i < 4; i++) {
            let array = []
            for (var j = 0; j < 3; j++) {
                array.push({ year, str: year.toString().replace(/[0-9]/g, w => digits[w]) })
                year++
            }
            years.push(array)
        }

        setyears(years)
    }, [state.year, state.calendar, state.local])

    return (
        <div className={`year-picker ${state.mustShowYearPicker ? "active" : ""}`}>
            {years.map((array, i) => {
                return <div key={i} className="days">
                    {array.map((object, j) => {
                        return <div
                            key={j}
                            className={`day ${isCurrentYear(object.year) ? "selected" : ""}`}
                            style={{ height: "50.5px" }}
                            onClick={() => selectYear(object.year)}
                        >
                            <span>{object.str}</span>
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
