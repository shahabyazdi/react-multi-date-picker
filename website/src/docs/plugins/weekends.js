import React from "react";
import DatePicker from "../../../../build/index";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "../../../../plugins/highlight_weekends";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const allProps = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>weekends</td>
            <td>Array</td>
            <td>
              {language === "en"
                ? "*see default weekends"
                : "مطابق با جدول پایین"}
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const defaultWeekends = {
    title: "Default Weekends",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Calendar")}</th>
            <th>{translate("Default Weekends")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>gregorian</td>
            <td>[0, 6]</td>
          </tr>
          <tr>
            <td>persian</td>
            <td>[6]</td>
          </tr>
          <tr>
            <td>arabic</td>
            <td>[0, 6]</td>
          </tr>
          <tr>
            <td>indian</td>
            <td>[0]</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const gregorian = {
    title: "Weekends: gregorian",
    code: `import DatePicker from "react-multi-date-picker"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
.
.
.
<DatePicker
  plugins={[weekends()]}
${
  language === "en"
    ? "/>"
    : `  calendarPosition="bottom-right"
/>`
} `,
    jsx: (
      <DatePicker
        plugins={[weekends()]}
        calendarPosition={otherProps.calendarPosition}
      />
    ),
  };

  const persianWeekend = {
    title: "Weekends: persian",
    code: `import DatePicker from "react-multi-date-picker"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
${$import}<DatePicker
  plugins={[weekends()]}
  calendar={persian}
  locale={persian_fa}
${
  language === "en"
    ? "/>"
    : `  calendarPosition="bottom-right"
/> `
} `,
    jsx: (
      <DatePicker
        plugins={[weekends()]}
        calendar={persian}
        locale={persian_fa}
        calendarPosition={otherProps.calendarPosition}
      />
    ),
  };

  const custom = {
    title: "Weekends: custom",
    code: `import DatePicker from "react-multi-date-picker"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
${$import}<DatePicker 
  plugins={[weekends([5, 6])]} 
/>`,
    jsx: <DatePicker plugins={[weekends([5, 6])]} {...otherProps} />,
  };
  return [allProps, defaultWeekends, gregorian, persianWeekend, custom];
}
