import React from "react"

export default function DatsOfWeek({ state }) {
    const daysOfWeek = state.date.weeks

    return (
        <div className="days">
            {daysOfWeek.map(dayOfWeek => <div className="week-day" key={dayOfWeek.index}>{dayOfWeek.shortName}</div>)}
        </div>
    )
}