import React from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";

export default function Doc({ translate, language }) {
  let calendars = {
    title: translate("Calendars"),
    description: translate("calendars"),
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Calendar")}</th>
            <th>{translate("Value")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{translate("gregorian")}</td>
            <td>gregorian</td>
          </tr>
          <tr>
            <td>{translate("persian")}</td>
            <td>persian</td>
          </tr>
          <tr>
            <td>{translate("arabic")}</td>
            <td>arabic</td>
          </tr>
          <tr>
            <td>{translate("indian")}</td>
            <td>indian</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  let locales = {
    title: translate("Locales"),
    description: translate("locales"),
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Language")}</th>
            <th>{translate("Value")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{translate("english")}</td>
            <td>en</td>
          </tr>
          <tr>
            <td>{translate("fa")}</td>
            <td>fa</td>
          </tr>
          <tr>
            <td>{translate("ar")}</td>
            <td>ar</td>
          </tr>
          <tr>
            <td>{translate("hi")}</td>
            <td>hi</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const examples = {
    title: "Descriptions",
    description: "calendar_descriptions",
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

  const persian = {
    title: "Persian calendar with Farsi locale",
    code: `<Calendar
  calendar="persian"
  locale="fa"
/> `,
    jsx: <Calendar calendar="persian" locale="fa" />,
  };

  const persianDatepicker = {
    title: "Persian DatePicker",
    description: "persian_datepicker_description",
    code: `<div style={{ direction: "rtl" }}>
  <DatePicker
    calendar="persian"
    locale="fa"
    calendarPosition="bottom-right"
  />
</div>`,
    jsx: (
      <div style={{ direction: "rtl" }}>
        <DatePicker
          calendar="persian"
          locale="fa"
          calendarPosition="bottom-right"
        />
      </div>
    ),
  };

  const arabic = {
    title: "Arabic calendar with Arabic locale",
    code: `<Calendar
  calendar="arabic"
  locale="ar"
/> `,
    jsx: <Calendar calendar="arabic" locale="ar" />,
  };

  const indian = {
    title: "Indian calendar with Indian locale",
    code: `<Calendar
  calendar="indian"
  locale="hi"
/> `,
    jsx: <Calendar calendar="indian" locale="hi" />,
  };

  const datepicker = {
    title: "Persian datepicker with English locale",
    code: `<DatePicker
  calendar="persian"
  locale="en"
${
  language === "en"
    ? "/> "
    : `  calendarPosition="bottom-right"
/> `
}`,
    jsx: (
      <DatePicker
        calendar="persian"
        locale="en"
        calendarPosition={language === "fa" ? "bottom-right" : "bottom-left"}
      />
    ),
  };

  return [
    calendars,
    locales,
    examples,
    gregorian,
    defaultDatepicker,
    persian,
    persianDatepicker,
    arabic,
    indian,
    datepicker,
  ];
}
