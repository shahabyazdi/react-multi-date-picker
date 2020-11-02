import React from "react"
import Arrow from "../arrow/arrow"
import DateObject from "react-date-object"

export default function Header({ state, setState, onChange }) {
    let monthName = undefined

    if (Array.isArray(state.months) && state.months.length === 12) {
        let month = state.months[state.date.month.index]

        monthName = Array.isArray(month) ? month[0] : month
    } else {
        monthName = state.date.month.name
    }

    return (
        <div className="rmdp-header" style={{ display: state.onlyTimePicker ? "none" : "block" }}>
            <div style={{ display: "flex" }}>
                <Arrow direction="rmdp-left" onClick={() => increaseValue(-1)} />
                <div className="rmdp-header-values">
                    {!state.onlyYearPicker &&
                        <span
                            className={`${state.mustShowMonthPicker ? "active" : ""}`}
                            onClick={() => toggle("mustShowMonthPicker")}
                        >
                            {monthName},
                        </span>
                    }
                    <span
                        className={`${state.mustShowYearPicker ? "active" : ""}`}
                        onClick={() => toggle("mustShowYearPicker")}
                    >
                        {state.date.format("YYYY")}
                    </span>
                </div>
                <Arrow direction="rmdp-right" onClick={() => increaseValue(1)} />
            </div>
        </div>
    )

    function increaseValue(value) {
        let { date, selectedDate, mustShowYearPicker, onlyYearPicker, onlyMonthPicker } = state

        if (!mustShowYearPicker && !onlyYearPicker) {
            date.month += value

            if (onlyMonthPicker) {
                selectedDate = new DateObject(date)

                if (onChange instanceof Function) onChange(selectedDate)
            }
        } else {
            date.year += value * 12
        }

        setState({
            ...state,
            date,
            selectedDate
        })
    }

    function toggle(picker) {
        let object = {
            mustShowMonthPicker: false,
            mustShowYearPicker: false
        }

        object[picker] = !state[picker]

        setState({
            ...state,
            ...object
        })
    }
}