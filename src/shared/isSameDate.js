export default function isSameDate(
  firstDate,
  secondDate,
  onlyMonthPicker = false,
  onlyYearPicker = false
) {
  if (!firstDate || !secondDate) return false;

  if (firstDate.year === secondDate.year) {
    if (onlyYearPicker) return true;

    if (firstDate.month.number === secondDate.month.number) {
      if (onlyMonthPicker) return true;

      return firstDate.day === secondDate.day;
    }
  }
}
