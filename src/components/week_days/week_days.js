import React, { useMemo } from "react"
import DateObject from "react-date-object"

export default function WeekDays({ state, customWeekDays }) {
    let weekDays = useMemo(() => {
        let weekDays = customWeekDays

        if (Array.isArray(weekDays) && weekDays.length >= 7) {
            weekDays.length = 7

            weekDays = weekDays.map(weekDay => {
                if (Array.isArray(weekDay) & weekDay.length > 1) {
                    weekDay = weekDay[1]
                } else if (Array.isArray(weekDay)) {
                    weekDay = weekDay[0]
                }

                return weekDay
            })
        } else {
            weekDays = new DateObject({
                year: undefined,
                calendar: state.date.calendar,
                locale: state.date.locale
            }).weekDays.map(weekDay => weekDay.shortName)
        }

        return weekDays
    }, [state.date.calendar, state.date.locale, customWeekDays])

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