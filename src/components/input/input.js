import React from "react";

export default function Input({ name, value, onChange, digits }) {
  value = value < 10 ? "0" + value : "" + value;

  return (
    <input
      type="text"
      name={name}
      value={toLocaleDigits(value)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );

  function handleChange(e) {
    let value = toEnglishLocale(e.target.value);

    if (isNaN(value)) return;

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

  function toLocaleDigits(value) {
    return value.replace(/[0-9]/g, (w) => digits[w]);
  }
}
