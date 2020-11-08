import React, { useState, useEffect, useRef, useMemo } from "react"
import DateObject from "react-date-object"
import WeekDays from "../week_days/week_days"

export default function DayPicker({ state, setState, onChange, showOtherDays = true }) {
    const [weeks, setWeeks] = useState([]),
        ref = useRef(false),
        today = useMemo(() => new DateObject({ calendar: state.calendar }), [state.calendar]),
        mustShowDayPicker = !state.onlyTimePicker && !state.onlyMonthPicker && !state.onlyYearPicker,
        { minDate, maxDate } = state

    useEffect(() => {
        if (!mustShowDayPicker) return

        if (ref.current) {
            let { month, year, local, calendar } = ref.current

            if (
                state.date.month.number === month.number &&
                state.date.year === year &&
                state.local === local &&
                state.calendar === calendar
            ) return
        }

        setWeeks(getWeeks(state.date))
        ref.current = state.date.toObject()
        setState(state => { return { ...state, ready: true } })
    }, [state.date, state.date.month, state.date.year, state.local, state.calendar, setState, mustShowDayPicker])

    return (mustShowDayPicker &&
        <div className="rmdp-day-picker">
            <WeekDays state={state} />
            {weeks.map((week, index) => <div key={index} className="rmdp-week">
                {week.map((object, i) => <div
                    key={i}
                    className={getClassName(object)}
                    onClick={() => {
                        if (!mustDisplayDay(object)) return
                        if (object.disabled) return

                        selectDay(object.date)
                    }}
                >
                    <span
                        className={`${mustDisplayDay(object) && !object.disabled && "sd"}`}
                    >
                        {mustDisplayDay(object) && object.date.format("D")}
                    </span>
                </div>
                )}
            </div>)}
        </div>
    )

    function mustDisplayDay(object) {
        if (object.current) return true

        return showOtherDays
    }

    function selectDay(date) {
        date
            .setHour(state.selectedDate?.hour || state.date.hour)
            .setMinute(state.selectedDate?.minute || state.date.minute)
            .setSecond(state.selectedDate?.second || state.date.second)

        let $state = {
            ...state,
            date: new DateObject(date)
        }

        if (state.multiple) {
            let dates = $state.selectedDate.filter($date => !isSameDate(date, $date))

            if (dates.length === $state.selectedDate.length) dates.push(date)

            dates.sort((a, b) => a - b)
            $state.selectedDate = dates
        } else if (state.range) {
            if ($state.selectedDate.length === 2 || $state.selectedDate.length === 0) {
                $state.selectedDate = [date]
            } else if ($state.selectedDate.length === 1) {
                $state.selectedDate.push(date)
                $state.selectedDate.sort((a, b) => a - b)
            }
        } else {
            $state.selectedDate = new DateObject(date)
        }

        setState($state)

        if (onChange instanceof Function) onChange($state.selectedDate)
    }

    function getClassName(object) {
        let names = ["rmdp-day"]

        if (!mustDisplayDay(object)) {
            names.push("rmdp-day-hidden")
        } else {
            if (
                (minDate && object.date < minDate) ||
                (maxDate && object.date > maxDate)
            ) {
                names.push("rmdp-disabled")
                object.disabled = true
            }

            if (!object.current) names.push("rmdp-deactive")

            if (!object.disabled) {
                if (isSameDate(object.date, today)) names.push("rmdp-today")
                if (isSelected(object.date)) names.push("rmdp-selected")
            }
        }

        if (state.range) {
            let { selectedDate } = state

            if (selectedDate.length === 1) {
                if (isSameDate(object.date, selectedDate[0])) names.push("rmdp-range")
            } else {
                if (object.date >= selectedDate[0] && object.date <= selectedDate[1]) names.push("rmdp-range")
                if (isSameDate(object.date, selectedDate[0])) names.push("start")
                if (isSameDate(object.date, selectedDate[1])) names.push("end")
            }
        }

        return names.join(" ")
    }

    function isSelected(date) {
        if (!date || !state.selectedDate) return false

        if (state.multiple) {
            for (let selectedDate of state.selectedDate) {
                if (isSameDate(selectedDate, date)) return true
            }
        } else {
            return isSameDate(state.selectedDate, date)
        }
    }
}

function getWeeks(date) {
    if (!date) return []
    date = new DateObject(date).toFirstOfMonth()

    let monthNumber = date.month.number
    let weeks = []

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

        weeks.push(week)
    }

    return weeks
}

export function isSameDate(firstDate, secondDate) {
    if (!firstDate || !secondDate) return false

    return firstDate.year === secondDate.year &&
        firstDate.month.number === secondDate.month.number &&
        firstDate.day === secondDate.day
}