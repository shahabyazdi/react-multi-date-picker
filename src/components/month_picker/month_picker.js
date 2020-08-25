import React from "react"
import DateObject from "react-date-object"

export default function MonthPicker({ state, setState }) {
    let months = state.date.months
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

    return (
        <div className={`month-picker ${state.mustShowMonthPicker ? "active" : ""}`}>
            {monthsArray.map((array, i) => {
                return <div key={i} className="days">
                    {array.map((name, j) => {
                        return <div
                            key={j}
                            className={`day ${isCurrentMonth(name) ? "selected" : ""}`}
                            style={{ height: "59.5px" }}
                            onClick={() => {
                                selectMonth(months.findIndex(obj => obj.name === name))
                            }}
                        >
                            <span>{name}</span>
                        </div>
                    })}
                </div>
            })}
        </div>
    )

    function isCurrentMonth(name) {
        if (!months[state.month]) return false

        return months[state.month].name === name
    }

    function selectMonth(index) {
        let { date } = state
        let $date = new DateObject(date).setMonth(index + 1)

        setState({
            ...state,
            date: $date,
            month: $date.month.index,
            mustShowMonthPicker: false
        })
    }
}