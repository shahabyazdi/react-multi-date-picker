import isSameDate from "./isSameDate";

export default function getRangeClass(date, selectedDate, checkMonth) {
  let first = selectedDate[0],
    second = selectedDate[1],
    names = [];

  if (selectedDate.length === 1) {
    if (isSameDate(date, first, checkMonth)) names.push("rmdp-range");
  } else if (selectedDate.length === 2) {
    if (date.toDays() >= first.toDays() && date.toDays() <= second.toDays()) {
      names.push("rmdp-range");
    }

    if (isSameDate(date, first, checkMonth)) names.push("start");
    if (isSameDate(date, second, checkMonth)) names.push("end");
  }

  return names.join(" ");
}
