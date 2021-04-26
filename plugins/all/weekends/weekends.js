import React, { useEffect, useRef } from "react";

export default function Weekends({
  state,
  setMapDays,
  weekends,
  handlePropsChange,
}) {
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
      ref.current.calendar === state.calendar
    )
      return;

    ref.current = { stringWeekends, calendar: state.calendar };

    let $state = { mapDays: getMapDays() };

    if (setMapDays instanceof Function) {
      warn();
      setMapDays($state.mapDays);
    }

    handlePropsChange($state);

    function getMapDays() {
      return function mapDays({ date }) {
        let props = { className: "highlight highlight-red" },
          isWeekend = (Array.isArray(weekends)
            ? weekends
            : $weekends[state.calendar]
          ).includes(date.weekDay.index);

        if (isWeekend) return props;
      };
    }
  }, [state.calendar, setMapDays, weekends, handlePropsChange]);

  return null;
}

function warn() {
  if ("_self" in React.createElement("div"))
    console.warn(
      [
        "setProps is deprecated and will not available in the next versions.",
        "Use onPropsChange instead",
        "https://shahabyazdi.github.io/react-multi-date-picker/events/#onpropschange",
      ].join("\n")
    );
}
