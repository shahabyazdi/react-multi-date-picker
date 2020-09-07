import React, { useState, useEffect } from "react"
import DateObject from "react-date-object"

export default function WeekDays({ state }) {
    const [weekDays, setWeekDays] = useState([])

    useEffect(() => {
        let weeks = new DateObject({
            year: undefined,
            calendar: state.date.calendar,
            local: state.date.local
        }).weeks

        setWeekDays(weeks)
    }, [state.date.calendar, state.date.local])

    return (
        <div className="rmdp-week">
            {weekDays.map(weekDay => <div
                key={weekDay.index}
                className="rmdp-week-day"
            >
                {weekDay.shortName}
            </div>)}
        </div>
    )
}