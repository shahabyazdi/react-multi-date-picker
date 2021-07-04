import React from "react";
import DatePicker, { Calendar } from "../../../build/index";
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
  ];
}
