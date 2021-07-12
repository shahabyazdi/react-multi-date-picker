import React from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";
import { Link } from "gatsby";

//persian calendar & locales
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";

//arabic calendar & locale
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";

//indian calendar & locale
import indian from "react-date-object/calendars/indian";
import indian_hi from "react-date-object/locales/indian_hi";

const thai = {
  name: "thai",
  startYear: 1,
  yearLength: 365,
  epoch: 1523097,
  century: 20,
  weekDaysIndex: [0, 1, 2, 3, 4, 5, 6],
  getMonthLengths(isLeap) {
    return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },
  isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  getLeaps(currentYear) {
    if (currentYear === 0) return;

    let year = currentYear > 0 ? 1 : -1;

    let leaps = [],
      condition = () =>
        currentYear > 0 ? year <= currentYear : currentYear <= year,
      increase = () => (currentYear > 0 ? year++ : year--);

    while (condition()) {
      if (this.isLeap(year)) leaps.push(year);

      increase();
    }

    return leaps;
  },
  getDayOfYear({ year, month, day }) {
    let monthLengths = this.getMonthLengths(this.isLeap(year));

    for (let i = 0; i < month.index; i++) {
      day += monthLengths[i];
    }

    return day;
  },
  getAllDays(date) {
    const { year } = date;

    return (
      this.yearLength * (year - 1) +
      this.leapsLength(year) +
      this.getDayOfYear(date)
    );
  },
  leapsLength(year) {
    return (
      (((year - 1) / 4) | 0) +
      (-((year - 1) / 100) | 0) +
      (((year - 1) / 400) | 0)
    );
  },
  guessYear(days, currentYear) {
    let year = ~~(days / 365.24);

    return year + (currentYear > 0 ? 1 : -1);
  },
};

const thai_th = {
  name: "thai_th",
  months: [
    ["มกราคม", "ม.ค."],
    ["กุมภาพันธ์", "ก.พ."],
    ["มีนาคม", "มี.ค."],
    ["เมษายน", "เม.ย.	"],
    ["พฤษภาคม", "พ.ค."],
    ["มิถุนายน", "มิ.ย."],
    ["กรกฎาคม", "ก.ค."],
    ["สิงหาคม", "ส.ค."],
    ["กันยายน", "ก.ย."],
    ["ตุลาคม", "ต.ค."],
    ["พฤศจิกายน", "พ.ย."],
    ["ธันวาคม", "ธ.ค."],
  ],
  weekDays: [
    ["วันอาทิตย์", "อา"],
    ["วันจันทร์", "จ"],
    ["วันอังคาร", "อ"],
    ["วันพุธ", "พ"],
    ["วันพฤหัส", "พฤ"],
    ["วันศุกร์", "ศ"],
    ["วันเสาร์", "ส"],
  ],
  digits: ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"],
  meridiems: [
    ["ก่อนเที่ยง", "เอเอ็ม"],
    ["หลังเที่ยง", "พีเอ็ม"],
  ],
};

const epoch =
  new DateObject().toJulianDay() - new DateObject().add(543, "y").toDays();

console.log(epoch); //1523097;

export default function Doc({ translate, language, Code }) {
  let descriptions = {
    title: "Descriptions",
    description: "calendar_descriptions_v3",
    jsx: (
      <>
        <p style={{ fontWeight: "bold" }}>{translate("calendars_v2")}</p>
        <Link to="../v2.x/calendars/">
          v2.x {translate("Calendars & Locales")}
        </Link>
      </>
    ),
  };

  let calendars = {
    title: "Calendars",
    description: (
      <>
        <Code title="import_calendar_descriptions">
          {`import favorite_calendar from "react-date-object/calendars/favorite_calendar"`}
        </Code>
        <p>{translate("import_calendar_descriptions_1")}</p>
      </>
    ),
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Calendar")}</th>
            <th>{translate("Import Path")}</th>
            <th>{translate("Descriptions")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>{translate("Gregorian")}</p>
            </td>
            <td style={{ whiteSpace: "nowrap" }}>
              <p>react-date-object/calendars/gregorian</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <p>{translate("Solar Hijri")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/calendars/persian
              </p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <p>{translate("Jalali")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/calendars/jalali
              </p>
            </td>
            <td>
              <p>{translate("jalali_description")}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("Lunar Hijri")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/calendars/arabic
              </p>
            </td>
            <td>
              <p>{translate("lunar_hijri_description")}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("indian")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/calendars/indina
              </p>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    ),
  };

  let locales = {
    title: "Locales",
    description: "locales_v3",
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Calendar")}</th>
            <th>{translate("Language")}</th>
            <th>{translate("Import Path")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="5">
              <p>{translate("Gregorian")}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("english")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/gregorian_en
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("farsi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/gregorian_fa
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("ar")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/gregorian_ar
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("hindi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/gregorian_hi
              </p>
            </td>
          </tr>
          {/*  */}
          <tr>
            <td rowSpan="5">
              <p>
                {translate("Solar Hijri")} {translate("and")}{" "}
                {translate("Jalali")}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("english")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/persian_en
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("farsi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/persian_fa
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("ar")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/persian_ar
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("hindi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/persian_hi
              </p>
            </td>
          </tr>
          {/*  */}
          <tr>
            <td rowSpan="5">
              <p>{translate("Lunar Hijri")}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("english")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/arabic_en
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("farsi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/arabic_fa
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("ar")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/arabic_ar
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("hindi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/arabic_hi
              </p>
            </td>
          </tr>
          {/*  */}
          <tr>
            <td rowSpan="5">
              <p>{translate("Indian")}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("english")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/indian_en
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("farsi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/indian_fa
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("ar")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/indian_ar
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>{translate("hindi")}</p>
            </td>
            <td>
              <p style={{ whiteSpace: "nowrap" }}>
                react-date-object/locales/indian_hi
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const examples = {
    title: "Examples",
    description: "import_examples",
  };

  const gregorian = {
    title: "Default Calendar",
    code: `<Calendar /> `,
    jsx: <Calendar />,
  };

  const defaultDatepicker = {
    title: "Default DatePicker",
    code: `<DatePicker /> `,
    jsx: <DatePicker />,
  };

  const persianCalendar = {
    title: "Persian calendar with Farsi locale",
    code: `import React from "react"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function Example() {
  return (
    <Calendar
      calendar={persian}
      locale={persian_fa}
    />
  )
}`,
    jsx: <Calendar calendar={persian} locale={persian_fa} />,
  };

  const persianDatepicker = {
    title: "Persian DatePicker",
    description: "persian_datepicker_description",
    code: `import React from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function Example() {
  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
      />
    </div>
  )
}`,
    jsx: (
      <div style={{ direction: "rtl" }}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
      </div>
    ),
  };

  const arabicCalendar = {
    title: "Arabic calendar with Arabic locale",
    code: `import React from "react"
import { Calendar } from "react-multi-date-picker"
import arabic from "react-date-object/calendars/arabic"
import arabic_ar from "react-date-object/locales/arabic_ar"

export default function Example() {
  return (
    <Calendar
      calendar={arabic}
      locale={arabic_ar}
    />
  )
}`,
    jsx: <Calendar calendar={arabic} locale={arabic_ar} />,
  };

  const indianCalendar = {
    title: "Indian calendar with Indian locale",
    code: `import React from "react"
import { Calendar } from "react-multi-date-picker"
import indian from "react-date-object/calendars/indian"
import indian_hi from "react-date-object/locales/indian_hi"

export default function Example() {
  return (
    <Calendar
      calendar={indian}
      locale={indian_hi}
    />
  )
}`,
    jsx: <Calendar calendar={indian} locale={indian_hi} />,
  };

  const datepicker = {
    title: "Persian datepicker with English locale",
    code: `import React from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_fa"

export default function Example() {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_en}
      calendarPosition="bottom-right"
    />
  )
}`,
    jsx: (
      <DatePicker
        calendar={persian}
        locale={persian_en}
        calendarPosition={language === "fa" ? "bottom-right" : "bottom-left"}
      />
    ),
  };

  const customCalendar = {
    title: "Custom Calendar",
    description: "custom_calendar",
    jsx: (
      <>
        <Code title="*thai.js:">{`const thai = {
  name: "thai",
  startYear: 1,
  yearLength: 365,
  epoch: 1721424,
  century: 20,
  weekDaysIndex: [0, 1, 2, 3, 4, 5, 6],
  getMonthLengths(isLeap) {
    return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },
  isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  getLeaps(currentYear) {
    if (currentYear === 0) return;

    let year = currentYear > 0 ? 1 : -1;

    let leaps = [],
      condition = () =>
        currentYear > 0 ? year <= currentYear : currentYear <= year,
      increase = () => (currentYear > 0 ? year++ : year--);

    while (condition()) {
      if (this.isLeap(year)) leaps.push(year);

      increase();
    }

    return leaps;
  },
  getDayOfYear({ year, month, day }) {
    let monthLengths = this.getMonthLengths(this.isLeap(year));

    for (let i = 0; i < month.index; i++) {
      day += monthLengths[i];
    }

    return day;
  },
  getAllDays(date) {
    const { year } = date;

    return (
      this.yearLength * (year - 1) +
      this.leapsLength(year) +
      this.getDayOfYear(date)
    );
  },
  leapsLength(year) {
    return (
      (((year - 1) / 4) | 0) +
      (-((year - 1) / 100) | 0) +
      (((year - 1) / 400) | 0)
    );
  },
  guessYear(days, currentYear) {
    let year = ~~(days / 365.24);

    return year + (currentYear > 0 ? 1 : -1);
  },
};

export default thai;`}</Code>
        {translate("custom_calendar_1").map((str, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: str }} />
        ))}
        <Code>{`const julianDay = new DateObject().toJulianDay();

console.log(julianDay); // 2459407 (Monday, July 12 2021)`}</Code>
        <p
          dangerouslySetInnerHTML={{ __html: translate("custom_calendar_2") }}
        />
        <Code>{`const days = new DateObject().add(543, "years").toDays();

console.log(days); // 936310 (Monday, July 12 2564)`}</Code>
        <p>{translate("custom_calendar_3")}</p>
        <Code>{`// delta_t = t - t0
const epoch = julianDay - days

console.log(epoch) // 1523097`}</Code>
        <p>{translate("custom_calendar_4")}</p>
        <Code>
          {`const thai = {
  name: "thai",
  startYear: 1,
  yearLength: 365,
  epoch: 1523097,
  century: 25,
  weekDaysIndex: [0, 1, 2, 3, 4, 5, 6],
  getMonthLengths(isLeap) {
    return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },
  isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  getLeaps(currentYear) {
    if (currentYear === 0) return;

    let year = currentYear > 0 ? 1 : -1;

    let leaps = [],
      condition = () =>
        currentYear > 0 ? year <= currentYear : currentYear <= year,
      increase = () => (currentYear > 0 ? year++ : year--);

    while (condition()) {
      if (this.isLeap(year)) leaps.push(year);

      increase();
    }

    return leaps;
  },
  getDayOfYear({ year, month, day }) {
    let monthLengths = this.getMonthLengths(this.isLeap(year));

    for (let i = 0; i < month.index; i++) {
      day += monthLengths[i];
    }

    return day;
  },
  getAllDays(date) {
    const { year } = date;

    return (
      this.yearLength * (year - 1) +
      this.leapsLength(year) +
      this.getDayOfYear(date)
    );
  },
  leapsLength(year) {
    return (
      (((year - 1) / 4) | 0) +
      (-((year - 1) / 100) | 0) +
      (((year - 1) / 400) | 0)
    );
  },
  guessYear(days, currentYear) {
    let year = ~~(days / 365.24);

    return year + (currentYear > 0 ? 1 : -1);
  },
};

export default thai;`}
        </Code>
        <p>{translate("custom_calendar_5")}</p>
        <Code>{`import { Calendar } from "react-multi-date-picker"
import thai from "./thai"

export default function Example() {
  return <Calendar calendar={thai} />
}`}</Code>
        <Calendar calendar={thai} />
        <p
          dangerouslySetInnerHTML={{ __html: translate("custom_calendar_6") }}
        />
        <Code title="*thai_th.js">{`const thai_th = {
  name: "thai_th",
  months: [
    ["มกราคม", "ม.ค."],
    ["กุมภาพันธ์", "ก.พ."],
    ["มีนาคม", "มี.ค."],
    ["เมษายน", "เม.ย.	"],
    ["พฤษภาคม", "พ.ค."],
    ["มิถุนายน", "มิ.ย."],
    ["กรกฎาคม", "ก.ค."],
    ["สิงหาคม", "ส.ค."],
    ["กันยายน", "ก.ย."],
    ["ตุลาคม", "ต.ค."],
    ["พฤศจิกายน", "พ.ย."],
    ["ธันวาคม", "ธ.ค."],
  ],
  weekDays: [
    ["วันอาทิตย์", "อา"],
    ["วันจันทร์", "จ"],
    ["วันอังคาร", "อ"],
    ["วันพุธ", "พ"],
    ["วันพฤหัส", "พฤ"],
    ["วันศุกร์", "ศ"],
    ["วันเสาร์", "ส"],
  ],
  digits: ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"],
  meridiems: [
    ["ก่อนเที่ยง", "เอเอ็ม"],
    ["หลังเที่ยง", "พีเอ็ม"],
  ],
};

export default thai_th`}</Code>
        <p>{translate("custom_calendar_7")}</p>
        <Code>{`import { Calendar } from "react-multi-date-picker"
import thai from "./thai"
import thai_th from "./thai_th"

export default function Example() {
  return (
    <Calendar 
      calendar={thai} 
      locale={thai_th} 
    />
  )
}`}</Code>
        <Calendar calendar={thai} locale={thai_th} />
      </>
    ),
  };

  return [
    descriptions,
    calendars,
    locales,
    examples,
    gregorian,
    defaultDatepicker,
    persianCalendar,
    persianDatepicker,
    arabicCalendar,
    indianCalendar,
    datepicker,
    customCalendar,
  ];
}
