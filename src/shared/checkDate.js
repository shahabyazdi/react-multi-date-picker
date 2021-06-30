import DateObject from "react-date-object";

export default function checkDate([
  date,
  calendar,
  locale,
  format,
  weekDays,
  months,
  digits,
  ignoreList,
]) {
  if (!date) return;
  if (!(date instanceof DateObject))
    date = new DateObject({ date, calendar, locale, format });
  if (date.calendar !== calendar) date.setCalendar(calendar);
  if (date.locale !== locale) date.setLocale(locale);
  if (date._format !== format) date.setFormat(format);

  date.set({
    weekDays,
    months,
    digits,
    ignoreList: JSON.parse(ignoreList),
  });

  return date;
}
