export default function toLocaleDigits(value, digits) {
  return value.replace(/[0-9]/g, (w) => digits[w]);
}
