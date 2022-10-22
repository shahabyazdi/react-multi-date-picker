import React from "react";
import DatePicker, { Calendar, DateObject } from "../../../src";

export default function Doc() {
  const validation1 = {
    title: "Descriptions",
    description: "types_v2",
    jsx: (
      <DatePicker
        onChange={(date, validatedValue, input) => {
          const array = input.value.split("/");
          const [year, month, day] = array.map(Number);

          if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
          if (date && day > date.day) return false;
          if (array.some((val) => val.startsWith("00"))) return false;
        }}
      />
    ),
  };

  return [validation1];
}
