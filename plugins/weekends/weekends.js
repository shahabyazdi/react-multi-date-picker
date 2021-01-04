import { useEffect, useRef } from "react/cjs/react.development"

export default function Weekends({ state, setMapDays, weekends }) {
  const ref = useRef({})

  useEffect(() => {
    let $weekends = {
      gregorian: [0, 6],
      persian: [6],
      arabic: [0, 6],
      indian: [0]
    }

    let stringWeekends = JSON.stringify(weekends)

    if (
      !(setMapDays instanceof Function) ||
      (
        ref.current.stringWeekends === stringWeekends &&
        ref.current.calendar === state.calendar
      )
    ) return

    ref.current = { stringWeekends, calendar: state.calendar }

    setMapDays(getMapDays)

    function getMapDays() {
      return function mapDays({ date }) {
        let props = { className: "highlight highlight-red" },
          isWeekend = (Array.isArray(weekends) ?
            weekends :
            $weekends[state.calendar]
          ).includes(date.weekDay.index)

        if (isWeekend) return props
      }
    }
  }, [state.calendar, setMapDays, weekends])

  return null
}