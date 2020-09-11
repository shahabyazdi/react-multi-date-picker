import React, { useEffect, useState } from "react"
import DateObject from "react-date-object"

export default function MonthPicker({ state, setState }) {
    let [months, setMonths] = useState([])

    useEffect(() => {
        let months = new DateObject({
            year: undefined,
            calendar: state.calendar,
            local: state.local
        }).months

        let monthsArray = []
        let index = 0

        for (var i = 0; i < 4; i++) {
            let array = []
            for (var j = 0; j < 3; j++) {
                array.push(months[index].name)
                index++
            }
            monthsArray.push(array)
        }

        setMonths(monthsArray)
    }, [state.calendar, state.local])


    return (
        <div className={`rmdp-month-picker`} style={{ display: state.mustShowMonthPicker && !state.onlyTimePicker ? "block" : "none" }}>
            {months.map((array, i) => <div key={i} className="rmdp-week">
                {array.map((name, j) => <div
                    key={j}
                    className={`rmdp-day ym ${state.date.month.name === name ? "rmdp-selected" : ""}`}
                    onClick={() => selectMonth(i * 3 + j + 1)}
                >
                    <span>{name}</span>
                </div>
                )}
            </div>
            )}
        </div>
    )

    function selectMonth(month) {
        setState({
            ...state,
            date: state.date.setMonth(month),
            mustShowMonthPicker: false,
        })
    }
}