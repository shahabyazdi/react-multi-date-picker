import React from "react";
import DatePicker, { Calendar, DateObject } from "../../../src";

export default function Doc() {
  const validation1 = {
    title: "Validating Input Value",
    code: `<DatePicker
  onChange={(date, validatedValue, input) => {
    const strings = input.value.split("/");
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user wants to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val) => val.startsWith("00"))) return false;
  }}
/>
    `,
    jsx: (
      <DatePicker
        onChange={(date, validatedValue, input) => {
          const strings = input.value.split("/");
          const numbers = strings.map(Number);
          const [year, month, day] = numbers;

          if (input.value && numbers.some((number) => isNaN(number))) {
            return false; //in case user enter something other than digits
          }

          if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
          if (day < 0 || (date && day > date.day)) return false;
          if (strings.some((val) => val.startsWith("00"))) return false;
        }}
      />
    ),
  };

  return [validation1];
}
