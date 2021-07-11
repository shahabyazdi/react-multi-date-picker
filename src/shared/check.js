import warn from "./warn";
import DateObject from "react-date-object";

const { calendar: gregorian, locale: gregorian_en } = new DateObject();

export default function check(calendar, locale) {
  if (calendar && calendar.constructor !== Object) {
    warn(getMessage("calendar"));
    calendar = undefined;
  }

  if (locale && locale.constructor !== Object) {
    warn(getMessage("locale"));
    locale = undefined;
  }

  return [calendar || gregorian, locale || gregorian_en];
}

function getMessage(name) {
  return [
    `${name} must be an object`,
    "https://shahabyazdi.github.io/react-multi-date-picker/calendars/",
  ];
}
