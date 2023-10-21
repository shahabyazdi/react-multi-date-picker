import isArray from "./isArray";

export default function getRangeHoverClass(
  date,
  selectedDate,
  dateHovered,
  rangeHover,
  type = "day",
  multiple
) {
  const names = [];

  if (rangeHover && dateHovered) {
    const format = type === "day" ? "YYYY/MM/DD" : "YYYY/MM";
    const strHovered = dateHovered.format(format);
    const strDay = date.format(format);

    let strSelected;

    if (!multiple && selectedDate?.length === 1) {
      strSelected = selectedDate[0].format(format);
    } else if (multiple && isArray(selectedDate)) {
      for (let range of selectedDate) {
        if (isArray(range) && range.length === 1) {
          strSelected = range[0].format(format);

          break;
        }
      }
    }

    if (
      (strDay > strSelected && strDay <= strHovered) ||
      (strDay < strSelected && strDay >= strHovered)
    ) {
      names.push("rmdp-range-hover");

      if (strDay === strHovered) {
        names.push(strHovered > strSelected ? "end" : "start");
      }

      if (
        isArray(selectedDate) &&
        selectedDate.flat().some((date) => date.format(format) === strDay)
      ) {
        names.push("force");
      }
    }
  }

  return names;
}
