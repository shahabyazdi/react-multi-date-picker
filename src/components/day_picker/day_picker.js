import React, { useState, useEffect, useRef, useMemo } from "react"
import DateObject from "react-date-object"
import WeekDays from "../week_days/week_days"

export default function DayPicker({ state, setState, onChange }) {
    let [weeks, setWeeks] = useState([])
    let ref = useRef(false)
    let today = useMemo(() => new DateObject({ calendar: state.calendar }), [state.calendar])

    useEffect(() => {
        if (!ref.current) {
            setWeeks(getWeeks(state.date))
        } else {
            let { month, year, local, calendar } = ref.current

            if (
                state.date.month.number === month.number &&
                state.date.year === year &&
                state.local === local &&
                state.calendar === calendar
            ) return

            setWeeks(getWeeks(state.date))
        }

        ref.current = state.date.toObject()
    }, [state.date, state.date.month, state.date.year, state.local, state.calendar])

    return (
        <div className="rmdp-day-picker" style={{ display: state.onlyTimePicker ? "none" : "block" }}>
            <WeekDays state={state} />
            {weeks.map((week, index) => <div key={index} className="rmdp-week">
                {week.map(object => <div key={object.date.day}
                    onClick={() => { selectDay(object.date) }}
                    className={getClassName(object)}
                >
                    <span className="sd">{object.date.format("D")}</span>
                </div>)}
            </div>
            )}
        </div>
    )

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
        if (!object.current) names.push("rmdp-deactive")
        if (isSameDate(object.date, today)) names.push("rmdp-today")
        if (isSelected(object.date)) names.push("rmdp-selected")

        if (state.range) {
            if (state.selectedDate.length === 1) {
                if (isSameDate(object.date, state.selectedDate[0])) names.push("rmdp-range")
            } else {

                if (object.date >= state.selectedDate[0] && object.date <= state.selectedDate[1]) names.push("rmdp-range")
                if (isSameDate(object.date, state.selectedDate[0])) names.push("start")
                if (isSameDate(object.date, state.selectedDate[1])) names.push("end")
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