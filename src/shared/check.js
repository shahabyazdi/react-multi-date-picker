import warn from "./warn";

export default function check(calendar, locale) {
  if (calendar && calendar.constructor !== Object) {
    warn(getMessage("calendar"));
    calendar = undefined;
  }

  if (locale && locale.constructor !== Object) {
    warn(getMessage("locale"));
    locale = undefined;
  }

  return [calendar, locale];
}

function getMessage(name) {
  return [
    `${name} must be an object`,
    "https://shahabyazdi.github.io/react-multi-date-picker/calendars/",
  ];
}
