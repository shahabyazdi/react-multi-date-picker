import React from "react";

export default function Input({ max, name, value, onChange, digits }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );

  function handleChange(e) {
    let value = toEnglishLocale(e.target.value);

    if (isNaN(value)) return;
    if (max && Number(value) > max) return;

    onChange(name, value);
  }

  function handleKeyDown(e) {
    let number;

    if (e.key === "ArrowUp") {
      number = 1;
    } else if (e.key === "ArrowDown") {
      number = -1;
    } else {
      return;
    }

    onChange(name, toEnglishLocale(value) + number);
  }

  function toEnglishLocale(value) {
    for (let digit of digits) {
      value = value.replace(digit, digits.indexOf(digit));
    }

    return Number(value);
  }
}
