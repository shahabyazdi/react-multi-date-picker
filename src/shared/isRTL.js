import getLocaleName from "./getLocaleName";

export default function isRTL(locale) {
  return ["fa", "ar"].includes(getLocaleName(locale));
}
