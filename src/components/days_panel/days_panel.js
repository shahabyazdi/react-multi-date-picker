import React from "react"
import DateObject from "react-date-object"
import { isSameDate } from "../day_picker/day_picker"

export default function DaysPanel({ state, setState, onChange }) {
    return (
        <div className="rmpd-panel" style={{ display: state.mustShowDates ? "block" : "none" }}>
            <div className="rmdp-panel-header">Dates</div>
            <ul className="rmdp-panel-body">
                {Array.isArray(state.selectedDate) ?
                    state.selectedDate.map(($date, index) => <li
                        key={index}>
                        <span onClick={() => selectDate($date)}>{$date.format()}</span>
                        <button className="b-deselect" onClick={() => deSelect($date)}>+</button>
                    </li>)
                    :
                    <li>{state.stringDate}</li>
                }
            </ul>
        </div>
    )

    function selectDate(date) {
        setState({
            ...state,
            date: new DateObject(date)
        })
    }

    function deSelect(date) {
        let dates = state.selectedDate.filter($date => !isSameDate($date, date))

        setState({
            ...state,
            selectedDate: dates
        })

        if (onChange instanceof Function) onChange(dates)
    }
}