import React, { useState, useEffect } from "react"
import DateObject from "react-date-object"

export default function WeekDays({ state }) {
    const [weekDays, setWeekDays] = useState([])

    useEffect(() => {
        let weeks = Array.isArray(state.weekDays) && state.weekDays.length === 7 ?
            state.weekDays :
            new DateObject({
                year: undefined,
                calendar: state.date.calendar,
                local: state.date.local
            }).weeks.map(weekDay => weekDay.shortName)

        setWeekDays(weeks)
    }, [state.date.calendar, state.date.local, state.weekDays])

    return (
        <div className="rmdp-week">
            {weekDays.map((weekDay, index) => <div
                key={index}
                className="rmdp-week-day"
            >
                {weekDay}
            </div>)}
        </div>
    )
}