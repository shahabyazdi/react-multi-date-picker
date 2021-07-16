export default function weekends(weekends) {
  let defaultWeekends = {
    gregorian: [0, 6],
    persian: [6],
    arabic: [0, 6],
    indian: [0],
  };

  return {
    type: "mapDays",
    fn: () =>
      function mapDays({ date: { calendar, weekDay } }) {
        let isWeekend = (
          Array.isArray(weekends) ? weekends : defaultWeekends[calendar.name]
        ).includes(weekDay.index);

        if (isWeekend) return { className: "highlight highlight-red" };
      },
  };
}
