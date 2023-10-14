import DateObject from "react-date-object";

export default function toDateObject(date, calendar, format = "YYYY/MM/DD") {
  if (date instanceof DateObject) {
    date.set({ calendar, format });
  } else {
    date = new DateObject({ date, calendar, format });
  }

  return date;
}
