import React from "react"
import DateObject from "react-date-object"
import Arrow from "../arrow/arrow"

export default function Header({ state, setState }) {
    const { date } = state

    return (
        <div className="rm-dp-header" style={{ display: state.onlyTimePicker ? "none" : "flex" }}>
            <Arrow direction="left" onClick={() => handleDate(-1)} />
            <div>
                <span onClick={toggleMonthPicker}>{date.month.name}</span>,&nbsp;
                <span onClick={toggleYearPicker}>{date.format("YYYY")}</span>
            </div>
            <Arrow direction="right" onClick={() => handleDate(1)} />
        </div>
    )

    function handleDate(number) {
        let $state = { ...state }
        let $date = undefined

        if (state.mustShowMonthPicker) {
            $date = new DateObject(date).setYear(date.year + number)
            $state.date = $date
            $state.year = $date.year
        } else if (state.mustShowYearPicker) {
            $state.year = new DateObject(date).setYear(state.year + (10 * number)).year
        } else {
            $date = new DateObject(date).setMonth(date.month + +number)
            $state.date = $date
            $state.year = $date.year
            $state.month = $date.month.index
        }

        setState($state)
    }

    function toggleMonthPicker() {
        setState({
            ...state,
            mustShowMonthPicker: !state.mustShowMonthPicker,
            mustShowYearPicker: false
        })
    }

    function toggleYearPicker() {
        setState({
            ...state,
            mustShowYearPicker: !state.mustShowYearPicker,
            mustShowMonthPicker: false
        })
    }
}