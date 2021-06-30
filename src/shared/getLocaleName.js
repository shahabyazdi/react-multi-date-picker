export default function getLocaleName(locale) {
  return locale.name.split("_")[1];
}
