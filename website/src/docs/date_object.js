import React from "react";
import { Link } from "gatsby";

export default function Doc({ translate, language, Code }) {
  const description = {
    title: "Descriptions",
    description: "date_object",
    jsx: (
      <>
        <p style={{ fontWeight: "bold" }}>{translate("date_object_v2")}</p>
        <Link to="../v2.x/date-object/">v2.x {translate("DateObject")}</Link>
      </>
    ),
  };

  const current = {
    title: "Current Moment",
    description: (
      <div>
        <Code title="gregorian_1">
          {`const date = new DateObject()

console.log(date.year) //2021
console.log(date.month.number) //3
console.log(date.day) //2
console.log(date.calendar) //gregorian
console.log(date.locale) //en`}
        </Code>

        <Code title="gregorian_2">console.log(date.format()) //2021/03/02</Code>

        <Code title="gregorian_3">
          console.log(date.format("dddd DD MMMM YYYY")) //Tuesday 02 March 2021
        </Code>

        <Code title="gregorian_4">
          {`console.log(
  date.format(
    "Date: YYYY/MM/DD Time: HH:mm:ss",
    ["Date", "Time"]
  )
) //Date: 2021/03/02 Time: 10:53:00`}
        </Code>

        <Code title="gregorian_5">
          {`const {year, month, day, hour, minute} = date`}
        </Code>

        <Code title="gregorian_6">
          {`const {name, shortName, number, index} = date.month

console.log(name, shortName, number, index); //March Mar 3 2`}
        </Code>

        <Code>
          {`const {name, shortName, number, index} = date.weekDay

console.log(name, shortName, number, index); //Tuesday Tue 3 2`}
        </Code>
        <Code title="gregorian_7">
          {`date.toFirstOfMonth()

console.log(date.format()); //2021/03/01

date.toLastOfMonth()

console.log(date.format()); //2021/03/31`}
        </Code>
      </div>
    ),
  };

  const addSubtract = {
    title: "Adding / Subtracting Time From Original Moment",
    description: (
      <>
        {translate("add_subtract").map((text, index) => (
          <p key={index}>{text}</p>
        ))}

        <table>
          <thead>
            <tr>
              <th colSpan="3">{translate("Keys")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>years</td>
              <td>year</td>
              <td>y</td>
            </tr>
            <tr>
              <td>months</td>
              <td>month</td>
              <td>M</td>
            </tr>
            <tr>
              <td>days</td>
              <td>day</td>
              <td>d</td>
            </tr>
            <tr>
              <td>hours</td>
              <td>hour</td>
              <td>h</td>
            </tr>
            <tr>
              <td>minutes</td>
              <td>minute</td>
              <td>m</td>
            </tr>
            <tr>
              <td>seconds</td>
              <td>second</td>
              <td>s</td>
            </tr>
            <tr>
              <td>milliseconds</td>
              <td>millisecond</td>
              <td>ms</td>
            </tr>
          </tbody>
        </table>
        <Code title="add_subtract_1">
          {`const date = new DateObject() //2021/03/02

date.add(5, "days");

console.log(date.format()); //2021/03/07`}
        </Code>
        <Code title="add_subtract_2">
          {`date.subtract(1, "month"); 

console.log(date.format()); //2021/02/07`}
        </Code>
        <Code title="add_subtract_3">
          {`console.log(
  new DateObject()
    .add(5, "days")
    .subtract(1, "month")
    .format()
); //2021/02/07`}
        </Code>
      </>
    ),
  };

  const otherCalendars = {
    title: "Other Calendar & Locales",
    description: "other_calendars",
    jsx: (
      <>
        <p>
          <Link
            to={`../calendars/${
              language === "en" ? "#calendars" : "#تقویم-ها"
            }`}
          >
            {translate("Calendars")}
          </Link>
        </p>
        <p>
          <Link
            to={`../calendars/${language === "en" ? "#locales" : "#زبان-ها"}`}
          >
            {translate("Locales")}
          </Link>
        </p>
      </>
    ),
  };

  const persian = {
    title: "Persian Calendar (Solar Hijri) With Farsi Locale",
    description: translate("persian_calendar_farsi_locale"),
    code: `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const date = new DateObject({ calendar: persian, locale: persian_fa })

console.log(date.format()) //۱۴۰۰/۰۴/۱۳
console.log(date.month.name) //تیر
`,
  };

  const arabic = {
    title: "Arabic Calendar (Lunar Hijri) With Arabic Locale",
    code: `import arabic from "react-date-object/calendars/arabic"
import arabic_ar from "react-date-object/locales/arabic_ar"

const date = new DateObject({ calendar: arabic, locale: arabic_ar })

console.log(date.format()) //١٤٤٢/١١/٢٤
console.log(date.month.name) //ذیقعده`,
  };

  const indian = {
    title: "Indian Calendar With Hindi Locale",
    code: `import indian from "react-date-object/calendars/indian"
import indian_hi from "react-date-object/locales/indian_hi"

const date = new DateObject({ calendar: indian, locale: indian_hi })

console.log(date.format()) //१९४३/०४/१३
console.log(date.month.name) //आषाढ़`,
  };

  const table = {
    title: "Table of most used properties",
    jsx: (
      <>
        <table>
          <thead>
            <tr>
              <th colSpan="2">{translate("Property")}</th>
              <th rowSpan="2">{translate("Type")}</th>
              <th rowSpan="2">{translate("Example")}</th>
            </tr>
            <tr>
              <th>{translate("DateObject")}</th>
              <th>{translate("Javascript Date")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>year</td>
              <td style={{ direction: "ltr" }}>getFullYear()</td>
              <td>Number</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>month</td>
              <td>-</td>
              <td>Object</td>
              <td>{`{ length: 31, name: 'March', shortName: 'Mar', index: 2, number: 3, toString: [Function (anonymous)], valueOf: [Function (anonymous)] }`}</td>
            </tr>
            <tr>
              <td>month.index</td>
              <td style={{ direction: "ltr" }}>getMonth()</td>
              <td>Number</td>
              <td>2</td>
            </tr>
            <tr>
              <td>day</td>
              <td style={{ direction: "ltr" }}>getDate()</td>
              <td>Number</td>
              <td>2</td>
            </tr>
            <tr>
              <td>weekDay</td>
              <td>-</td>
              <td>Object</td>
              <td>{`{ index: 2, number: 3, toString: [Function: toString], valueOf: [Function: valueOf], name: 'Tuesday', shortName: 'Tue' }`}</td>
            </tr>
            <tr>
              <td>weekDay.index</td>
              <td style={{ direction: "ltr" }}>getDay()</td>
              <td>Number</td>
              <td>2</td>
            </tr>
            <tr>
              <td>hour</td>
              <td style={{ direction: "ltr" }}>getHours()</td>
              <td>Number</td>
              <td>10</td>
            </tr>
            <tr>
              <td>minute</td>
              <td style={{ direction: "ltr" }}>getMinutes()</td>
              <td>Number</td>
              <td>53</td>
            </tr>
            <tr>
              <td>second</td>
              <td style={{ direction: "ltr" }}>getSeconds()</td>
              <td>Number</td>
              <td>24</td>
            </tr>
            <tr>
              <td>millisecond</td>
              <td style={{ direction: "ltr" }}>getMilliseconds()</td>
              <td>Number</td>
              <td>458</td>
            </tr>
            <tr>
              <td style={{ direction: "ltr" }}>valueOf()</td>
              <td style={{ direction: "ltr" }}>valueOf()</td>
              <td>Number</td>
              <td>1614672704244</td>
            </tr>
            <tr>
              <td>-</td>
              <td style={{ direction: "ltr" }}>getTimezoneOffset()</td>
              <td>Number</td>
              <td>-210</td>
            </tr>
            <tr>
              <td style={{ direction: "ltr" }}>toUTC()</td>
              <td style={{ direction: "ltr" }}>getUTCDate()</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style={{ direction: "ltr" }}>setYear()</td>
              <td style={{ direction: "ltr" }}>setFullYear()</td>
              <td></td>
              <td>setYear(2021)</td>
            </tr>
            <tr>
              <td style={{ direction: "ltr" }}>setMonth()</td>
              <td style={{ direction: "ltr" }}>setMonth()</td>
              <td></td>
              <td style={{ color: "red" }}>setMonth(10)*</td>
            </tr>
            <tr>
              <td style={{ direction: "ltr" }}>setDay()</td>
              <td style={{ direction: "ltr" }}>setDate()</td>
              <td></td>
              <td>setDay(7)</td>
            </tr>
          </tbody>
        </table>
        <p style={{ color: "red" }}>*{translate("table_1")}</p>
        <Code title="table_2">
          {`const date = new DateObject()

date.year = 2020
date.month = 3
date.day = 4

console.log(date.format()) //2020/03/04

date.set({ year: 2010, month: 4, day: 7 })

console.log(date.format()) //2010/04/07

console.log(
  date
    .setYear(2000)
    .setMonth(1)
    .setDay(1)
    .format()
) //2000/01/01

console.log(
  date
    .set("year", 1907)
    .set("month", 7)
    .set("day", 7)
    .format()
) //1907/07/07`}
        </Code>
      </>
    ),
  };

  const string = {
    title: "New DateObject From String",
    description: (
      <div>
        <p>{translate("string_1")}</p>
        <ul>
          <li>
            <p>{translate("string_2")}</p>

            <ol>
              <li>
                <p>{translate("string_3")}</p>
              </li>
              <li>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${translate("string_4")}</p>`,
                  }}
                />
              </li>
            </ol>

            <Code>
              {`var date = new DateObject("2020 8 21 11 55 36 100 am");

date.format("YYYY/MM/DD hh:mm:ss.SSS a"); //2020/08/21 11:55:36.100 am

date = new DateObject("2020/08/01");

date.format("YYYY/MM/DD hh:mm:ss.SSS a"); //2020/08/01 12:00:00.000 am`}
            </Code>
          </li>
          <li>
            <Code title="string_5">
              {`const date = new DateObject({
  date: "September 04 2021, 12:42 am",
  format: "MMMM DD YYYY, HH:mm a"
})

console.log(date.format()); //September 04 2021, 12:42 pm`}
            </Code>

            <Code title="string_6_v3">
              {`import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const date = new DateObject({
  date: "1400/05/14 18:35:44",
  format: "YYYY/MM/DD HH:mm:ss",
  calendar: persian,
  locale: persian_fa
})

console.log(
  date.format("DD MMMM سال YYYY, ساعت HH و mm دقیقه")
); //۱۴ مرداد سال ۱۴۰۰, ساعت ۱۸ و ۳۵ دقیقه`}
            </Code>
          </li>
        </ul>
        <p>{translate("string_7")}</p>
        <p>{translate("string_8")}</p>
        <Code>
          {`import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const date = new DateObject({
  date: "2021/01/01",
  calendar: persian,
  locale: persian_fa
})`}
        </Code>
        <p>{translate("string_9")}</p>
        <p>{translate("string_10")}</p>
        <Code>
          {`import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const date = new DateObject("2021/01/01").convert(persian, persian_fa)`}
        </Code>
        <p>{translate("string_11")}</p>
        <Code>{`console.log(date.format()) //۱۳۹۹/۱۰/۱۲`}</Code>
        <p>{translate("string_12")}</p>
      </div>
    ),
  };

  const date = {
    title: "New DateObject from javascript Date",
    code: `const date = new DateObject(new Date(2020, 1, 15))

console.log(date.format()) //2020/01/15`,
  };

  const persianDate = {
    title: "Persian DateObject from javascript Date",
    code: `import persian from "react-date-object/calendars/persian"

const date = new DateObject({
  date: new Date(2020, 1, 15),
  calendar: persian
})

console.log(date.format()) //1399/10/26`,
  };

  const number = {
    title: "New DateObject From Numbers",
    code: `const date = new DateObject({
  year:${language === "en" ? "2021" : "1400"},
  month:10,
  day:22,
${
  language === "en"
    ? "})"
    : `  calendar: persian,
  locale: persian_fa
})`
}

console.log(date.format("dddd DD MMMM${
      language === "en" ? "" : " سال"
    } YYYY")) //${
      language === "en" ? "Friday 22 October 2021" : "چهارشنبه ۲۲ دی سال ۱۴۰۰"
    }`,
  };

  const unix = {
    title: "New DateObject from Unix Timestamp",
    description: (
      <div>
        {
          <div
            dangerouslySetInnerHTML={{
              __html: `<p>${translate("unix_1")}</p>`,
            }}
          />
        }
        <p>{translate("unix_2")}</p>
        <p>{translate("unix_3")}</p>
        <Code>
          {`${
            language === "fa"
              ? `import persian from "react-date-object/calendars/persian"

`
              : ""
          }const date = new DateObject(${
            language === "en"
              ? `{
  date: 1614678083 * 1000
}`
              : `{
  date: 1614678083 * 1000,
  calendar: persian
}`
          })

console.log(date.format()) //${
            language === "en" ? "2021/03/02" : "1399/12/12"
          }`}
        </Code>
        <Code title="unix_4">
          {`const date = new DateObject(1614678083 * 1000)`}
        </Code>
        <Code title="unix_5">{`console.log(date.toUnix()) //1614678083`}</Code>
      </div>
    ),
  };

  const convert = {
    title: "Converting Calendars",
    description: "convert",
  };

  const gregorianToPersian = {
    title: "Gregorian Calendar to Persian Calendar",
    description: "gregorian_to_persian",
    jsx: (
      <>
        <Code title="gregorian_to_persian_first">
          {`import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

//--> 1
const date = new DateObject()
console.log(date.format()) //2021/07/05
//<--

//-->2
date.convert(persian, persian_fa)
console.log(date.format()) //۱۴۰۰/۰۴/۱۴
//<--`}
        </Code>
        <Code title="gregorian_to_persian_second">
          {`import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const date = new DateObject().convert(persian, persian_fa)
console.log(date.format()) //۱۴۰۰/۰۴/۱۴`}
        </Code>
      </>
    ),
  };

  const persianToArabic = {
    title: "Persian Calendar to Arabic Calendar",
    description: "persian_to_arabic",
    code: `import persian from "react-date-object/calendars/persian"
import arabic from "react-date-object/calendars/arabic"
import arabic_en from "react-date-object/locales/arabic_en"

const date = new DateObject({calendar:persian, date:"1399/12/24"})
        
date.convert(arabic, arabic_en)

console.log(date.format()) //1442/07/30`,
  };

  const arabicToPersian = {
    title: "Arabic Calendar to Persian Calendar",
    code: `import arabic from "react-date-object/calendars/arabic"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"

const date = new DateObject({ calendar: arabic, date: "1442/05/10" })

date.convert(persian, persian_en)

console.log(date.format()) //1399/10/05`,
  };

  const gregorianToIndian = {
    title: "Gregorian Calendar to Indian Calendar",
    code: `import indian from "react-date-object/calendars/indian"
import indian_en from "react-date-object/locales/indian_en"

console.log(new DateObject().convert(indian, indian_en).format()) //1942/12/11`,
  };

  return [
    description,
    current,
    addSubtract,
    otherCalendars,
    persian,
    arabic,
    indian,
    table,
    string,
    date,
    persianDate,
    number,
    unix,
    convert,
    gregorianToPersian,
    persianToArabic,
    arabicToPersian,
    gregorianToIndian,
  ];
}
