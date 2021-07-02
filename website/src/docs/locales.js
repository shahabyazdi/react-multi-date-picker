import React from "react";
import DatePicker, { DateObject } from "../../../build/index";
import fa from "react-date-object/locales/persian_fa";

export default function Doc({ language, otherProps }) {
  const digits = {
    title: "Digits",
    description: "digits",
    code: `<DatePicker
  digits={[
    "๐",
    "๑",
    "๒",
    "๓",
    "๔",
    "๕",
    "๖",
    "๗",
    "๘",
    "๙"
  ]}
/>`,
    jsx: (
      <DatePicker
        digits={["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"]}
        {...otherProps}
      />
    ),
  };

  const weekDay = {
    title: "Week Days #1",
    description: "weekday",
    code: `<DatePicker
  weekDays={${
    language === "en"
      ? `[
    "S", 
    "M", 
    "T", 
    "W", 
    "T", 
    "F", 
    "S"
  ]`
      : `[
    "ش", 
    "ی", 
    "د", 
    "س", 
    "چ", 
    "پ", 
    "ج"
  ]`
  }}
/>`,
    jsx: (
      <DatePicker
        weekDays={
          language === "en"
            ? ["S", "M", "T", "W", "T", "F", "S"]
            : ["ش", "ی", "د", "س", "چ", "پ", "ج"]
        }
        {...otherProps}
      />
    ),
  };

  const weekDay2 = {
    title: "Week Days #2",
    code: `<DatePicker
  weekDays={${
    language === "en"
      ? `[
    "SU", 
    "MO", 
    "TU", 
    "WE", 
    "TH", 
    "FR", 
    "SA"
  ]`
      : `[
    "شن", 
    "یک", 
    "دو", 
    "سه", 
    "چه", 
    "پن", 
    "جم"
  ]`
  }}
/>`,
    jsx: (
      <DatePicker
        weekDays={
          language === "en"
            ? ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]
            : ["شن", "یک", "دو", "سه", "چه", "پن", "جم"]
        }
        {...otherProps}
      />
    ),
  };

  const month = {
    title: "Months #1",
    description: "months",
    code: `<DatePicker
  months={${
    language === "en"
      ? `[
    "Jan", 
    "Feb", 
    "Mar", 
    "Apr", 
    "May", 
    "Jun", 
    "Jul", 
    "Aug", 
    "Sep", 
    "Oct", 
    "Nov", 
    "Dec"
  ]`
      : `[
    "فر",
    "ار",
    "خرد",
    "تیر",
    "مر",
    "شه",
    "مه",
    "آبا",
    "آذ",
    "دی",
    "بهم",
    "اسف",
  ]`
  }}
/>`,
    jsx: (
      <DatePicker
        months={
          language === "en"
            ? [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]
            : [
                "فر",
                "ار",
                "خرد",
                "تیر",
                "مر",
                "شه",
                "مه",
                "آبا",
                "آذ",
                "دی",
                "بهم",
                "اسف",
              ]
        }
        {...otherProps}
      />
    ),
  };

  const month2 = {
    title: "Months #2",
    description: "months_2",
    code: `import DatePicker, {DateObject} from "react-multi-date-picker"
.
.
.
<DatePicker
  months={new DateObject(${
    language === "en" ? "" : `{ calendar:"persian", locale:"fa" }`
  }).months.map(month => month.shortName)}
/>`,
    jsx: (
      <DatePicker
        months={new DateObject({
          calendar: language === "fa" ? "persian" : "gregorian",
          locale: language === "fa" ? fa : undefined,
        }).months.map((month) => month.shortName)}
        {...otherProps}
      />
    ),
  };

  const locale = {
    title: "Format Months & WeekDays",
    description: "locale",
    code: `<DatePicker
  months={${
    language === "en"
      ? `[
    ["jan", "j"], //[["name","shortName"], ... ]
    ["feb", "f"],
    ["mar", "m"],
    ["apr", "a"],
    ["may", "m"],
    ["jun", "j"],
    ["jul", "j"],
    ["aug", "a"],
    ["sep", "s"],
    ["oct", "o"],
    ["nov", "n"],
    ["dec", "d"],
  ]`
      : `[
    ["فر", "ف"], //[["نام","نام کوتاه"], ... ]
    ["ارد", "ا"],
    ["خرد", "خ"],
    ["تیر", "ت"],
    ["مر", "م"],
    ["شه", "ش"],
    ["مهر", "م"],
    ["آبا", "آ"],
    ["آذر", "آ"],
    ["دی", "د"],
    ["بهم", "ب"],
    ["اسف", "ا"]
  ]`
  }}
  weekDays={${
    language === "en"
      ? `[
    ["sun", "s"], //[["name","shortName"], ... ]
    ["mon", "m"],
    ["tue", "t"],
    ["wed", "w"],
    ["thu", "t"],
    ["fri", "f"],
    ["sat", "s"],
  ]`
      : `[
    ["شنبه", "ش"], //[["نام","نام کوتاه"], ... ]
    ["یکشنبه", "ی"],
    ["دوشنبه", "د"],
    ["سه شنبه", "س"],
    ["چهارشنبه", "چ"],
    ["پنجشنبه", "پ"],
    ["جمعه", "ج"]
  ]`
  }}
  format=${
    language === "en"
      ? '"week day name: ddd (dddd), month name: MMM (MMMM) of YYYY"'
      : '"نام هفته: ddd (dddd), نام ماه: MMM (MMMM) از سال YYYY"'
  }${
      language === "en"
        ? `
  formattingIgnoreList={["week", "day", "name", "month", "of"]}`
        : ""
    }
  containerStyle={{ width: "100%" }}
  style={{ 
    width: "100%", 
    height: "26px", 
    boxSizing: "border-box" 
  }}
/>`,
    jsx: (
      <DatePicker
        months={
          language === "en"
            ? [
                ["jan", "j"],
                ["feb", "f"],
                ["mar", "m"],
                ["apr", "a"],
                ["may", "m"],
                ["jun", "j"],
                ["jul", "j"],
                ["aug", "a"],
                ["sep", "s"],
                ["oct", "o"],
                ["nov", "n"],
                ["dec", "d"],
              ]
            : [
                ["فر", "ف"],
                ["ارد", "ا"],
                ["خرد", "خ"],
                ["تیر", "ت"],
                ["مر", "م"],
                ["شه", "ش"],
                ["مهر", "م"],
                ["آبا", "آ"],
                ["آذر", "آ"],
                ["دی", "د"],
                ["بهم", "ب"],
                ["اسف", "ا"],
              ]
        }
        weekDays={
          language === "en"
            ? [
                ["sun", "s"],
                ["mon", "m"],
                ["tue", "t"],
                ["wed", "w"],
                ["thu", "t"],
                ["fri", "f"],
                ["sat", "s"],
              ]
            : [
                ["شنبه", "ش"],
                ["یکشنبه", "ی"],
                ["دوشنبه", "د"],
                ["سه شنبه", "س"],
                ["چهارشنبه", "چ"],
                ["پنجشنبه", "پ"],
                ["جمعه", "ج"],
              ]
        }
        format={
          language === "en"
            ? "week day name: ddd (dddd), month name: MMM (MMMM) of YYYY"
            : "نام هفته: ddd (dddd), نام ماه: MMM (MMMM) از سال YYYY"
        }
        formattingIgnoreList={["week", "day", "name", "month", "of"]}
        containerStyle={{ width: "100%" }}
        style={{ width: "100%", height: "26px", boxSizing: "border-box" }}
        {...otherProps}
      />
    ),
  };

  return [digits, weekDay, weekDay2, month, month2, locale];
}
