import isArray from "./isArray";

export default function stringify(array) {
  if (!isArray(array)) array = [];

  return JSON.stringify(array);
}
