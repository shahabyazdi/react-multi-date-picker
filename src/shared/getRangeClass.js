import isSameDate from "./isSameDate";
import isArray from "./isArray";
import formatDate from "./formaDate";

export default function getRangeClass(
  date,
  selectedDate,
  onlyMonthPicker,
  multiple
) {
  const names = [];
  const format = onlyMonthPicker ? "YYYY/MM" : "YYYY/MM/DD";
  const strDate = formatDate(date, format);

  if (multiple) {
    (isArray(selectedDate) ? selectedDate : [[selectedDate]]).forEach(getClass);
  } else {
    getClass(selectedDate);
  }

  function getClass(selectedDate) {
    let first = selectedDate[0],
      second = selectedDate[1];

    if (selectedDate.length === 1) {
      if (isSameDate(date, first, onlyMonthPicker)) names.push("rmdp-range");
    } else if (selectedDate.length === 2) {
      const [strFirst, strSecond] = [first, second].map((date) =>
        formatDate(date, format)
      );

      if (strDate >= strFirst && strDate <= strSecond) {
        names.push("rmdp-range");
      }

      if (strDate === strFirst) names.push("start");
      if (strDate === strSecond) names.push("end");
    }
  }

  return names.join(" ");
}
