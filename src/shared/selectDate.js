import isSameDate from "./isSameDate";
import DateObject from "react-date-object";

export default function selectDate(
  date,
  sort,
  {
    multiple,
    range,
    selectedDate,
    onlyMonthPicker,
    onlyYearPicker,
    format,
    focused: previousFocused,
    weekPicker,
  }
) {
  date.setFormat(format);

  let focused = new DateObject(date);

  if (multiple) {
    selectedDate = selectMultiple();
  } else if (range) {
    selectedDate = selectRange();
  } else {
    selectedDate = focused;
  }

  return [selectedDate, focused];

  function selectMultiple() {
    let dates = selectedDate.filter(
      ($date) => !isSameDate(date, $date, onlyMonthPicker, onlyYearPicker)
    );

    if (dates.length === selectedDate.length) {
      dates.push(focused);
    } else {
      focused = dates.find((d) => isSameDate(d, previousFocused));
    }

    if (sort) dates.sort((a, b) => a - b);

    return dates;
  }

  function selectRange() {
    if (weekPicker)
      return [
        new DateObject(focused).toFirstOfWeek(),
        new DateObject(focused).toLastOfWeek(),
      ];
    if (selectedDate.length === 2 || selectedDate.length === 0)
      return [focused];
    if (selectedDate.length === 1)
      return [selectedDate[0], focused].sort((a, b) => a - b);
  }
}
