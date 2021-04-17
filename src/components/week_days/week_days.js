import React, { useMemo } from "react";
import DateObject from "react-date-object";

export default function WeekDays({ state, customWeekDays, weekStartDayIndex }) {
  const {
    date: { calendar, locale },
  } = state;

  let weekDays = useMemo(() => {
    let weekDays = customWeekDays;

    if (Array.isArray(weekDays) && weekDays.length >= 7) {
      weekDays.length = 7;

      weekDays = weekDays.map((weekDay) => {
        if (Array.isArray(weekDay) & (weekDay.length > 1)) {
          weekDay = weekDay[1];
        } else if (Array.isArray(weekDay)) {
          weekDay = weekDay[0];
        }

        return weekDay;
      });
    } else {
      weekDays = new DateObject({
        year: undefined,
        calendar,
        locale,
      }).weekDays.map((weekDay) => weekDay.shortName);
    }

    return weekDays;
  }, [calendar, locale, customWeekDays]);

  weekDays = [...weekDays]
    .slice(weekStartDayIndex)
    .concat([...weekDays].splice(0, weekStartDayIndex));

  return (
    <div className="rmdp-week">
      {weekDays.map((weekDay, index) => (
        <div key={index} className="rmdp-week-day">
          {weekDay}
        </div>
      ))}
    </div>
  );
}
