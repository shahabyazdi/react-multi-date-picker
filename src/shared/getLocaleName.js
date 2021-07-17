export default function getLocaleName(locale) {
  if (!locale || !locale.name) return "";

  return locale.name.split("_")[1];
}
