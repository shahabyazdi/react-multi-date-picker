import React, { useMemo } from "react"
import DateObject from "react-date-object"

export default function MonthPicker({ state, onChange, customMonths }) {
    const { minDate, maxDate, calendar, locale, onlyMonthPicker } = state,
        mustShowMonthPicker = (state.mustShowMonthPicker || onlyMonthPicker) && !state.onlyTimePicker && !state.onlyYearPicker

    const months = useMemo(() => {
        let months = customMonths

        if (Array.isArray(months) && months.length >= 12) {
            months.length = 12

            months = months.map(month => Array.isArray(month) ? month[0] : month)
        } else {
            months = new DateObject({
                year: undefined,
                calendar,
                locale,

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

        return monthsArray
    }, [calendar, locale, customMonths])

    return (
        <div
            className={`${onlyMonthPicker ? "only " : ""}rmdp-month-picker`}
            style={{ display: mustShowMonthPicker ? "block" : "none" }}
        >
            {months.map((array, i) => <div key={i} className="rmdp-ym">
                {array.map((name, j) => <div
                    key={j}
                    className={getClassName(i * 3 + j)}
                    onClick={() => selectMonth(i * 3 + j)}
                >
                    <span className={onlyMonthPicker ? "sd" : ""}>{name}</span>
                </div>
                )}
            </div>
            )}
        </div>
    )

    function selectMonth(monthIndex) {
        let { date } = state

        if (minDate && date.year <= minDate.year && monthIndex < minDate.month.index) return
        if (maxDate && date.year >= maxDate.year && monthIndex > maxDate.month.index) return

        date = date.setMonth(monthIndex + 1)

        let selectedDate = onlyMonthPicker ? new DateObject(date) : state.selectedDate

        onChange(
            onlyMonthPicker ? selectedDate : undefined,
            {
                ...state,
                date,
                selectedDate,
                mustShowMonthPicker: false,
            }
        )
    }

    function getClassName(monthIndex) {
        let names = ["rmdp-day"],
            { date } = state

        if (date.month.index === monthIndex) names.push("rmdp-selected")
        if (minDate && date.year <= minDate.year && monthIndex < minDate.month.index) names.push("rmdp-disabled")
        if (maxDate && date.year >= maxDate.year && monthIndex > maxDate.month.index) names.push("rmdp-disabled")

        return names.join(" ")
    }
}