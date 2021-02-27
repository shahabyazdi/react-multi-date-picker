import React, { useMemo } from "react"
import DateObject from "react-date-object"

export default function YearPicker({ state, onChange }) {
    const { date, minDate, maxDate, onlyYearPicker } = state,
        digits = date.digits,
        mustShowYearPicker = (state.mustShowYearPicker || onlyYearPicker) && !state.onlyTimePicker

    const years = useMemo(() => {
        let yearArray = [],
            year = date.year - 4

        for (var i = 0; i < 4; i++) {
            let array = []

            for (var j = 0; j < 3; j++) {
                array.push(year)
                year++
            }

            yearArray.push(array)
        }

        return yearArray
    }, [date.year])

    return (
        <div
            className={`${onlyYearPicker ? "only " : ""}rmdp-year-picker`}
            style={{ display: mustShowYearPicker ? "block" : "none" }}
        >
            {years.map((array, i) => <div
                key={i}
                className="rmdp-ym"
            >
                {array.map((year, j) => <div
                    key={j}
                    className={getClassName(year)}
                    onClick={() => selectYear(year)}
                >
                    <span className={onlyYearPicker ? "sd" : ""}>
                        {year.toString().replace(/[0-9]/g, w => digits[w])}
                    </span>
                </div>
                )}
            </div>
            )}
        </div>
    )

    function selectYear(year) {
        if (minDate && year < minDate.year) return
        if (maxDate && year > maxDate.year) return

        let date = state.date.setYear(year),
            selectedDate = onlyYearPicker ? new DateObject(date) : state.selectedDate

        if (minDate && date.month.number < minDate.month.number) {
            date = date.setMonth(minDate.month.number)
        } else if (maxDate && date.month.number > maxDate.month.number) {
            date = date.setMonth(maxDate.month.number)
        }

        onChange(
            onlyYearPicker ? selectedDate : undefined,
            {
                ...state,
                date,
                selectedDate,
                mustShowYearPicker: false
            }
        )
    }

    function getClassName(year) {
        let names = ["rmdp-day"],
            { date, selectedDate } = state

        if (year === (selectedDate && !Array.isArray(selectedDate) ? selectedDate.year : date.year)) names.push("rmdp-selected")
        if (minDate && year < minDate.year) names.push("rmdp-disabled")
        if (maxDate && year > maxDate.year) names.push("rmdp-disabled")

        return names.join(" ")
    }
}