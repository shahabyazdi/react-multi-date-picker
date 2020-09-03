import React from "react"

export default function DatsOfWeek({ state }) {
    const daysOfWeek = state.date.weeks

    return (
        <div className="rm-dp-days">
            {daysOfWeek.map(dayOfWeek => <div className="rm-dp-d-week-day" key={dayOfWeek.index}>{dayOfWeek.shortName}</div>)}
        </div>
    )
}