import DateObject from "react-date-object";

export default function getAllDatesInRange(range = [], toDate) {
  if (!Array.isArray(range)) return [];

  let startDate = range[0],
    endDate = range[range.length - 1],
    dates = [];

  if (
    !(startDate instanceof DateObject) ||
    !(endDate instanceof DateObject) ||
    !startDate.isValid ||
    !endDate.isValid ||
    startDate > endDate
  )
    return [];

  startDate = new DateObject(startDate);
  endDate = new DateObject(endDate);

  for (startDate; startDate <= endDate; startDate.day++) {
    dates.push(toDate ? startDate.toDate() : new DateObject(startDate));
  }

  return dates;
}
