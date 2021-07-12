import React from "react";
import DatePicker, { DateObject } from "../../../build/index";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import { Link } from "gatsby";
import gregorian_en_lowercase from "../assets/gregorian_en_lowercase";

export default function Doc({ language, otherProps, translate, Code }) {
  function code(locale, string, mustImportDateObject) {
    return `import DatePicker${
      mustImportDateObject ? `, { DateObject }` : ""
    } from "react-multi-date-picker"
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
//${translate("locale_comment")}
${locale}

export default function Example() {
  return (
    ${string}
    ${
      language === "en"
        ? "/>"
        : `  calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-left"
    />`
    }
  )
}`;
  }

  const descriptions = {
    title: "Descriptions",
    description: "locales_description",
  };

  const digits = {
    title: "Digits",
    description: "digits",
    code: code(
      `const digits = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"]`,
      `<DatePicker
      digits={digits}`
    ),
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
    code: code(
      language === "en"
        ? `const weekDays = ["S", "M", "T", "W", "T", "F", "S"]`
        : `const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]`,
      `<DatePicker
      weekDays={weekDays}`
    ),
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
    code: code(
      language === "en"
        ? `const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]`
        : `const weekDays = ["شن", "یک", "دو", "سه", "چه", "پن", "جم"]`,
      `<DatePicker
      weekDays={weekDays}`
    ),
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
    code: code(
      language === "en"
        ? `const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]`
        : `const months = ["فر","ار","خرد","تیر","مر","شه","مه","آبا","آذ","دی","بهم","اسف",]`,
      `<DatePicker
      months={months}`
    ),
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
    code: code(
      `const months = new DateObject(${
        language === "en" ? "" : `{ calendar: persian, locale: persian_fa }`
      }).months.map(month => month.shortName)`,
      `<DatePicker
      months={months}`,
      true
    ),
    jsx: (
      <DatePicker
        months={new DateObject(otherProps).months.map(
          (month) => month.shortName
        )}
        {...otherProps}
      />
    ),
  };

  const locale = {
    title: "Format Months & WeekDays",
    description: "locale",
    code: code(
      `${
        language === "en"
          ? `const months = [
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
          : `const months = [
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
      }${
        language === "en"
          ? `
const weekDays = [
  ["sun", "s"], //[["name","shortName"], ... ]
  ["mon", "m"],
  ["tue", "t"],
  ["wed", "w"],
  ["thu", "t"],
  ["fri", "f"],
  ["sat", "s"],
]`
          : `
const weekDays = [
  ["شنبه", "ش"], //[["نام","نام کوتاه"], ... ]
  ["یکشنبه", "ی"],
  ["دوشنبه", "د"],
  ["سه شنبه", "س"],
  ["چهارشنبه", "چ"],
  ["پنجشنبه", "پ"],
  ["جمعه", "ج"]
]`
      }`,
      `<DatePicker
      months={months}
      weekDays={weekDays}
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
      }}`
    ),
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

  const importLocale = {
    title: "Importing A Locale File From The date-object Package",
    description: (
      <>
        {language === "en" ? (
          <>
            <p>
              All the locales in the date-object package are listed separately
              in the table of{" "}
              <Link to="../calendars/#locales">Calendars & Locales</Link>{" "}
              section.
            </p>
            <p>
              For example, if you want to use Arabic locale for the Gregorian
              calendar, you must do the following:
            </p>
          </>
        ) : (
          <>
            <p>
              تمامی لوکال های موجود در پکیج date-object، به تفکیک تقویم، در جدول
              بخش <Link to="../calendars/#زبان-ها">تقویم ها و زبان ها</Link>{" "}
              آمده است.
            </p>
            <p>
              برای مثال در صورتی که میخواهید برای تقویم میلادی از لوکال عربی
              استفاده کنید باید به روش زیر عمل کنید:
            </p>
          </>
        )}
        <Code>
          {`import DatePicker from "react-multi-date-picker"
import gregorian_ar from "react-date-object/locales/gregorian_ar"

export default function Example() {
  return (
    <DatePicker 
      locale={gregorian_ar}
    />
  )
}`}
        </Code>
      </>
    ),
    jsx: <DatePicker locale={gregorian_ar} />,
  };

  const customLocale = {
    title: "Custom Locale",
    description: "custom_locale",
    jsx: (
      <>
        <Code title="*gregorian_en_lowercase.js:">
          {`const gregorian_en_lowercase = {
  name: "gregorian_en_lowercase",
  months: [
    ["january", "jan"],
    ["february", "feb"],
    ["march", "mar"],
    ["april", "apr"],
    ["may", "may"],
    ["june", "jun"],
    ["july", "jul"],
    ["august", "aug"],
    ["september", "sep"],
    ["october", "oct"],
    ["november", "nov"],
    ["december", "dec"],
  ],
  weekDays: [
    ["sunday", "sun"],
    ["monday", "mon"],
    ["tuesday", "tue"],
    ["wednesday", "wed"],
    ["thursday", "thu"],
    ["friday", "fri"],
    ["saturday", "sat"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["AM", "am"],
    ["PM", "pm"],
  ],
};

export default gregorian_en_lowercase;
`}
        </Code>
        <Code title="*example.js:">
          {`import DatePicker from "react-multi-date-picker"
import gregorian_en_lowercase from "./gregorian_en_lowercase"

export default function Example() {
  return (
    <DatePicker 
      locale={gregorian_en_lowercase} 
    />
  )
}`}
        </Code>
        <DatePicker locale={gregorian_en_lowercase} />
        <h4>{translate("See Also")}:</h4>
        <Link
          to={
            language === "en"
              ? "../calendars/#custom-calendar"
              : "../calendars/#ایجاد-یک-تقویم-شخصی-سازی-شده"
          }
        >
          {language === "en"
            ? "Calendars & Locales #custom-calendar"
            : "تقویم ها و زبان ها #ایجاد یک تقویم شخصی سازی شده"}
        </Link>
      </>
    ),
  };

  return [
    descriptions,
    digits,
    weekDay,
    weekDay2,
    month,
    month2,
    locale,
    importLocale,
    customLocale,
  ];
}
