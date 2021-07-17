import DateObject from "react-date-object";

export default function toDateObject(date, calendar) {
  if (date instanceof DateObject) {
    date.setCalendar(calendar);
  } else {
    date = new DateObject({ date, calendar });
  }

  return date;
}
