export default function getFormat(onlyMonthPicker, onlyYearPicker, format) {
  if (format) return format;
  if (onlyMonthPicker) return "MM/YYYY";
  if (onlyYearPicker) return "YYYY";

  return "YYYY/MM/DD";
}
