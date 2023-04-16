import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../src";
import persian_fa from "react-date-object/locales/persian_fa";

const digits = persian_fa.digits;

export default function Doc({ translate, language, otherProps, localeImport }) {
  const obj =
    language === "en" ? "" : `{ calendar: persian, locale: persian_fa}`;
  const reserved = [
    [
      new DateObject(otherProps).setDay(1).format(),
      new DateObject(otherProps).setDay(5).format(),
    ],
    [
      new DateObject(otherProps).setDay(7).format(),
      new DateObject(otherProps).setDay(8).format(),
    ],
  ];

  const inService = [
    [
      new DateObject(otherProps).setDay(12).format(),
      new DateObject(otherProps).setDay(13).format(),
    ],
    [
      new DateObject(otherProps).setDay(27).format(),
      new DateObject(otherProps).setDay(27).format(),
    ],
  ];

  const initialValue = [...reserved, ...inService];

  function isReserved(strDate) {
    return reserved.some(([start, end]) => strDate >= start && strDate <= end);
  }

  function isInService(strDate) {
    return inService.some(([start, end]) => strDate >= start && strDate <= end);
  }

  const [values, setValues] = useState(initialValue);
  const [value, setValue] = useState();

  const validation1 = {
    title: "Validating Input Value",
    description: "validating_single_date",
    code: `${
      language === "fa"
        ? `import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/ccalendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const digits = persian_fa.digits;`
        : "import DatePicker from 'react-multi-date-picker'"
    }
.
.
.
const [value, setValue] = useState();

<DatePicker
  value={value}
  onChange={(date, { input, isTyping }) => {
    if (!isTyping) return setValue(date); // user selects the date from the calendar and no needs for validation.

    ${
      language === "fa"
        ? `let value = input.value;

    for (let digit of digits) {
      value = value.replace(
        new RegExp(digit, "g"),
        digits.indexOf(digit)
      );
    }

    const strings = value.split("/");`
        : `const strings = input.value.split("/");`
    }
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val) => val.startsWith("00"))) return false;

    setValue(date);
  }}
${
  language === "fa"
    ? `    calendar="persian"
    locale="persian_fa"
    calendarPosition="bottom-right"
/>`
    : "/>"
}
    `,
    jsx: (
      <DatePicker
        value={value}
        onChange={(date, { input, isTyping }) => {
          if (!isTyping) return setValue(date);

          let value = input.value;

          if (language === "fa") {
            for (let digit of digits) {
              value = value.replace(
                new RegExp(digit, "g"),
                digits.indexOf(digit)
              );
            }
          }

          const strings = value.split("/");
          const numbers = strings.map(Number);
          const [year, month, day] = numbers;

          if (input.value && numbers.some((number) => isNaN(number))) {
            return false; //in case user enter something other than digits
          }

          if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
          if (day < 0 || (date && day > date.day)) return false;
          if (strings.some((val) => val.startsWith("00"))) return false;

          setValue(date);
        }}
        {...otherProps}
      />
    ),
  };

  const validation2 = {
    title: "Validating Range of Dates",
    description: "validation_multiple_range",
    code: `import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
${localeImport}
const reserved = [
  [new DateObject(${obj}).setDay(1).format(), new DateObject(${obj}).setDay(5).format()],
  [new DateObject(${obj}).setDay(7).format(), new DateObject(${obj}).setDay(8).format()],
];

const inService = [
  [new DateObject(${obj}).setDay(12).format(), new DateObject(${obj}).setDay(13).format()],
  [new DateObject(${obj}).setDay(27).format(), new DateObject(${obj}).setDay(27).format()],
];

const initialValue = [...reserved, ...inService];

function isReserved(strDate) {
  return reserved.some(([start, end]) => strDate >= start && strDate <= end);
}

function isInService(strDate) {
  return inService.some(([start, end]) => strDate >= start && strDate <= end);
}

export default function Example() {
  const [values, setValues] = useState(initialValue);

  return (
    <div>
      <h5>${translate("Room reservation")}</h5>
      <p>${translate("Please select the date range you want to book")}</p>

      <div style={{ margin: "10px " }}>
        <div className="un-availble">
          <div className="reserved" />
          <p>${translate("Already reserved")}</p>
        </div>
        <div className="un-availble">
          <div className="in-service" />
          <p>${translate("In service")}</p>
        </div>
      </div>

      <Calendar
        multiple
        range
        value={values}
        onChange={(ranges) => {
          const isClickedOutsideUnAvailbleDates = initialValue.every(
            ([start, end]) => ranges.some((range) => range[0]?.format?.() === start && range[1]?.format?.() === end)
          );
          
          if (!isClickedOutsideUnAvailbleDates) return false;
          
          setValues(ranges);
        }}
        mapDays={({ date }) => {
          let className;
          const strDate = date.format();
        
          if (isReserved(strDate)) className = "reserved";
          if (isInService(strDate)) className = "in-service";
          if (className) return { className };
        }}
      />
    </div>
  )
`,
    jsx: (
      <div>
        <h5>{translate("Room reservation")}</h5>
        <p>{translate("Please select the date range you want to book")}</p>

        <div style={{ margin: "10px " }}>
          <div className="un-availble">
            <div className="reserved" />
            <p>{translate("Already reserved")}</p>
          </div>
          <div className="un-availble">
            <div className="in-service" />
            <p>{translate("In service")}</p>
          </div>
        </div>

        <Calendar
          multiple
          range
          value={values}
          onChange={(ranges) => {
            const isClickedOutsideUnAvailbleDates = initialValue.every(
              ([start, end]) =>
                ranges.some(
                  (range) =>
                    range[0]?.format?.() === start &&
                    range[1]?.format?.() === end
                )
            );

            if (!isClickedOutsideUnAvailbleDates) return false;

            setValues(ranges);
          }}
          mapDays={({ date }) => {
            let className;
            const strDate = date.format();

            if (isReserved(strDate)) className = "reserved";
            if (isInService(strDate)) className = "in-service";
            if (className) return { className };
          }}
          {...otherProps}
        />

        <p>{translate("style.css")} :</p>
        <div style={{ direction: "ltr" }}>
          <pre>
            <code className="language-css">
              {`.rmdp-range:has(.reserved) {
  background-color: #8fb4f9;
}

.rmdp-range:has(.in-service) {
  background-color: #cc0303;
}

div.reserved {
  background-color: #8fb4f9;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

div.in-service {
  background-color: #cc0303;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.un-availble {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.un-availble p {
  margin: 0;
}`}
            </code>
          </pre>
        </div>
      </div>
    ),
  };

  return [validation1, validation2];
}
