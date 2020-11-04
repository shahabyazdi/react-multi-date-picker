import React, { useEffect, useState } from "react"
import DateObject from "react-date-object"

export default function MonthPicker({ state, setState, onChange }) {
    const [months, setMonths] = useState([]),
        mustShowMonthPicker = (state.mustShowMonthPicker || state.onlyMonthPicker) && !state.onlyTimePicker && !state.onlyYearPicker

    useEffect(() => {
        let months = state.months

        if (Array.isArray(months)) {
            if (months.length > 12) months.length = 12

            months = months.map(month => Array.isArray(month) ? month[0] : month)
        } else {
            months = new DateObject({
                year: undefined,
                calendar: state.calendar,
                local: state.local
            }).months.map(month => month.name)
        }

        let monthsArray = []
        let index = 0

        for (var i = 0; i < 4; i++) {
            let array = []

            for (var j = 0; j < 3; j++) {
                array.push(months[index])
                index++
            }

            monthsArray.push(array)
        }

        setMonths(monthsArray)

        if (state.onlyMonthPicker) setState(state => { return { ...state, ready: true } })
    }, [state.calendar, state.local, state.months, state.onlyMonthPicker, setState])

    return (
        <div
            className={`${state.onlyMonthPicker ? "only " : ""}rmdp-month-picker`}
            style={{ display: mustShowMonthPicker ? "block" : "none" }}
        >
            {months.map((array, i) => <div key={i} className="rmdp-week">
                {array.map((name, j) => <div
                    key={j}
                    className={`rmdp-day ym ${state.date.month.index === (i * 3 + j) ? "rmdp-selected" : ""}`}
                    onClick={() => selectMonth(i * 3 + j + 1)}
                >
                    <span className={state.onlyMonthPicker ? "sd" : ""}>{name}</span>
                </div>
                )}
            </div>
            )}
        </div>
    )

    function selectMonth(month) {
        let date = state.date.setMonth(month),
            selectedDate = state.onlyMonthPicker ? new DateObject(date) : state.selectedDate

        setState({
            ...state,
            date,
            selectedDate,
            mustShowMonthPicker: false,
        })

        if (onChange instanceof Function && state.onlyMonthPicker) onChange(selectedDate)
    }
}