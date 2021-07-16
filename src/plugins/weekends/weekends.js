import { useEffect, useRef } from "react";

export default function Weekends({ state, weekends, handlePropsChange }) {
  const ref = useRef({});

  useEffect(() => {
    let $weekends = {
      gregorian: [0, 6],
      persian: [6],
      arabic: [0, 6],
      indian: [0],
    };

    let stringWeekends = JSON.stringify(weekends);

    if (
      ref.current.stringWeekends === stringWeekends &&
      ref.current.calendar === state.date.calendar.name
    )
      return;

    ref.current = { stringWeekends, calendar: state.date.calendar.name };

    handlePropsChange({ mapDays: getMapDays() });

    function getMapDays() {
      return function mapDays({ date }) {
        let props = { className: "highlight highlight-red" },
          isWeekend = (
            Array.isArray(weekends) ? weekends : $weekends[date.calendar.name]
          ).includes(date.weekDay.index);

        if (isWeekend) return props;
      };
    }
  }, [state.date.calendar.name, weekends, handlePropsChange]);

  return null;
}
