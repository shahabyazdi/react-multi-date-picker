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
                            className={getClassName(object)}
                            onClick={() => selectDate(object.date)}
                        >
                            <span>{typeof object.date.day === "number" ? object.date.format("D") : object.date.digits[0]}</span>
                        </div>
                    })}
                </div>
            })}
        </div>
    )

    function getClassName(object) {
        let names = ["day"]

        if (!object.current) names.push("deactive")
        if (isToday(object.date)) names.push("today")
        if (isSelected(object.date)) names.push("selected")

        if (state.range) {
            if (state.selectedDate.length === 1) {
                if (isSameDate(object.date, state.selectedDate[0])) names.push("range")
            } else {
                if (object.date >= state.selectedDate[0] && object.date <= state.selectedDate[1]) names.push("range")
                if (isSameDate(object.date, state.selectedDate[0])) names.push("start")
                if (isSameDate(object.date, state.selectedDate[1])) names.push("end")
            }
        }

        return names.join(" ")
    }

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

        if (state.multiple) {
            for (let selectedDate of state.selectedDate) {
                if (isSameDate(selectedDate, date)) return true
            }
        } else {
            return isSameDate(state.selectedDate, date)
        }
    }

    function selectDate(date) {
        let $state = {
            ...state,
            date,
            year: date.year,
            month: date.month.index
        }

        if (state.multiple) {
            let dates = []
            let formats = []
            let mustPush = true

            for (let $date of $state.selectedDate) {
                if (isSameDate($date, date)) {
                    mustPush = false
                } else {
                    dates.push($date)
                }
            }

            if (mustPush) dates.push(date)

            for (let $date of dates) {
                formats.push($date.format())
            }

            $state.selectedDate = dates
            $state.stringDate = formats.join(" , ")

        } else if (state.range) {
            if ($state.selectedDate.length === 2 || $state.selectedDate.length === 0) {

                $state.selectedDate = [date]
                $state.stringDate = date.format()

            } else if ($state.selectedDate.length === 1) {

                if ($state.selectedDate[0] < date) {

                    $state.selectedDate = [$state.selectedDate[0], date]

                } else if ($state.selectedDate[0] > date) {

                    $state.selectedDate = [date, $state.selectedDate[0]]
                }

                if ($state.selectedDate.length === 2) $state.stringDate = $state.selectedDate.join(" ~ ")
            }
        } else {
            $state.selectedDate = new DateObject(date)
            $state.stringDate = date.format()
            $state.isVisible = false
        }

        setState($state)
    }
}

export function isSameDate(firstDate, secondDate) {
    if (!firstDate || !secondDate) return false

    return firstDate.year === secondDate.year &&
        firstDate.month.number === secondDate.month.number &&
        firstDate.day === secondDate.day
}