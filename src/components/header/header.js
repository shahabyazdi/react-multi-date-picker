import React from "react"
import Arrow from "../arrow/arrow"
import DateObject from "react-date-object"

export default function Header({ state, setState, onChange, disableYearPicker, disableMonthPicker }) {
    let monthName = undefined

    if (Array.isArray(state.months) && state.months.length === 12) {
        let month = state.months[state.date.month.index]

        monthName = Array.isArray(month) ? month[0] : month
    } else {
        monthName = state.date.month.name
    }

    return (
        <div className="rmdp-header" style={{ display: state.onlyTimePicker ? "none" : "block" }}>
            <div style={{ position: "relative" }}>
                <Arrow direction="rmdp-left" onClick={() => increaseValue(-1)} />
                <div className="rmdp-header-values">
                    {!state.onlyYearPicker &&
                        <span
                            style={{ cursor: disableMonthPicker || state.onlyMonthPicker ? "default" : "pointer" }}
                            onClick={() => !disableMonthPicker && toggle("mustShowMonthPicker")}
                        >
                            {monthName},
                        </span>
                    }
                    <span
                        style={{ cursor: disableYearPicker || state.onlyYearPicker ? "default" : "pointer" }}
                        onClick={() => !disableYearPicker && toggle("mustShowYearPicker")}
                    >
                        {state.date.format("YYYY")}
                    </span>
                </div>
                <Arrow direction="rmdp-right" onClick={() => increaseValue(1)} />
            </div>
        </div>
    )

    function increaseValue(value) {
        let { date, selectedDate, mustShowYearPicker, onlyYearPicker, onlyMonthPicker, minDate, maxDate } = state

        if (!mustShowYearPicker && !onlyYearPicker) {
            if (minDate && date.year <= minDate.year && minDate.month.number > date.month.number + value) return
            if (maxDate && date.year >= maxDate.year && maxDate.month.number < date.month.number + value) return

            date.month += value

            if (onlyMonthPicker) {
                selectedDate = new DateObject(date)

                if (onChange instanceof Function) onChange(selectedDate)
            }
        } else {
            if (minDate && minDate.year > date.year + value) return
            if (maxDate && maxDate.year < date.year + value) return

            let year = date.year + (value * 12)

            if (value < 0 && minDate && year < minDate.year) year = minDate.year
            if (value > 0 && maxDate && year > maxDate.year) year = maxDate.year

            date.year = year
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