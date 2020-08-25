import React from "react"
import DaysOfWeek from "../days_of_week/days_of_week.js"
import DateObject from "react-date-object"

export default function DayPicker({ state, setState }) {
    const month = getMonth(state.date)
    const today = new DateObject({ calendar: state.calendar, local: state.local })

    return (
        <div className="day-picker" style={{ display: state.onlyTimePicker ? "none" : "block" }}>
            <DaysOfWeek state={state} />
            {month.map((week, i) => {
                return <div key={i} className="days">
                    {week.map((object, j) => {
                        return <div
                            key={j}
                            className={`day ${object.current ? "" : "deactive"} ${isToday(object.date) ? "today" : ""} ${isSelected(object.date) ? "selected" : ""}`}
                            onClick={() => selectDate(object.date)}
                        >
                            <span>{object.date.format("D")}</span>
                        </div>
                    })}
                </div>
            })}
        </div>
    )

    function getMonth(date) {
        date = new DateObject(date).toFirstOfMonth()

        let monthNumber = date.month.number
        let month = []

        date.day -= date.weekDay.index

        for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
            let week = []

            for (let weekDay = 0; weekDay < 7; weekDay++) {
                week.push({
                    date: new DateObject(date),
                    current: date.month.number === monthNumber
                })

                date.day += 1
            }

            month.push(week)
        }

        return month
    }

    function isToday(date) {
        return today.year === date.year &&
            today.month.number === date.month.number &&
            today.day === date.day
    }

    function isSelected(date) {
        if (!date || !state.selectedDate) return false

        return state.selectedDate.year === date.year &&
            state.selectedDate.month.number === date.month.number &&
            state.selectedDate.day === date.day
    }

    function selectDate(date) {
        setState({
            ...state,
            date,
            selectedDate: new DateObject(date),
            year: date.year,
            month: date.month.index,
            stringDate: date.format(),
            isVisible: false
        })
    }
}