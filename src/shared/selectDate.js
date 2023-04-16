import isSameDate from "./isSameDate";
import DateObject from "react-date-object";
import isArray from "./isArray";
import formatDate from "./formaDate";

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

  if (multiple && range) {
    selectedDate = selectMultipleRange();
  } else if (multiple) {
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

  function selectMultipleRange() {
    //[[a,b],[c,d]]
    let mustPushNewRangeOfDates = true;

    if (!isArray(selectedDate)) selectedDate = [[selectedDate]];

    const arrayWithOneDate = selectedDate.find((range) => range.length === 1);
    const format = onlyMonthPicker ? "YYYY/MM" : "YYYY/MM/DD";

    let dates = selectedDate;

    if (arrayWithOneDate) {
      const target = arrayWithOneDate[0];

      dates = dates.filter((range) => {
        if (range.length === 1) return true;

        const [first, second] = range;

        const [targetFirst, targetSecond] = [target, focused].sort(
          (a, b) => a - b
        );

        const [strFirst, strSecond, strtargetFirst, strtargetSecond] = [
          first,
          second,
          targetFirst,
          targetSecond,
        ].map((date) => formatDate(date, format));

        if (
          (strtargetFirst <= strFirst && strtargetSecond >= strSecond) ||
          (strtargetFirst >= strFirst &&
            strtargetSecond >= strSecond &&
            strtargetFirst <= strSecond) ||
          (strtargetFirst <= strFirst &&
            strtargetSecond <= strSecond &&
            strtargetSecond >= strFirst)
        ) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      dates = dates.filter((range) => {
        if (!isArray(range)) return true;
        if (range.length === 0) return false;

        const [first, second] = range;

        const [strFirst, strSecond, strFocused] = [first, second, focused].map(
          (date) => formatDate(date, format)
        );

        if (strFocused >= strFirst && strFocused <= strSecond) {
          return false;
        } else {
          return true;
        }
      });
    }

    dates = dates.map((range) => {
      let newRange;

      if (!isArray(range)) {
        mustPushNewRangeOfDates = false;

        newRange = [range, focused];
      } else if (range.length === 1) {
        mustPushNewRangeOfDates = false;

        newRange = range.concat(focused);
      } else {
        newRange = range;
      }

      return newRange.sort((a, b) => a - b);
    });

    if (mustPushNewRangeOfDates) dates = [...dates, [focused]];

    return dates;
  }
}
