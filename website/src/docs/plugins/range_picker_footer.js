import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../../build/index";
import Footer from "../../../../plugins/range_picker_footer";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const [value, setValue] = useState([
    new DateObject(otherProps).setDay(15),
    new DateObject(otherProps).add(1, "month").setDay(15),
  ]);

  const descriptions = {
    title: "Descriptions",
    description: "range_picker_footer",
  };

  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const props = {
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
            <td>position</td>
            <td>String</td>
            <td>"right"</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>format</td>
            <td>String</td>
            <td>
              Farsi & Arabic locale : "DD MMMM" <br />
              English & Indian locale : "MMMM DD"
            </td>
          </tr>
          <tr>
            <td>names</td>
            <td>Object</td>
            <td>
              English locale{" "}
              <pre className="language-jsx">
                <code>
                  {`
{
  selectedDates: "Selected Dates:",
  from: "From:",
  to: "To:",
  selectDate: "Select Date",
  close: "Close",
  separator: "-",
}`}
                </code>
              </pre>
              <br />
              Farsi locale
              <pre className="language-jsx">
                <code>
                  {" "}
                  {`
{
  selectedDates: "تاریخ انتخابی شما:",
  from: "از:",
  to: "تا:",
  selectDate: "انتخاب کنید",
  close: "بستن",
  separator: "-",
}`}
                </code>
              </pre>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const example = {
    title: "Default Range Picker Footer",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
${$import}const [value, setValue] = useState([
  new DateObject(${
    language === "en"
      ? ""
      : `{
    calendar: persian,
    locale: persian_fa
  }`
  }).setDay(15),
  new DateObject(${
    language === "en"
      ? ""
      : `{
    calendar: persian,
    locale: persian_fa
}`
  }).add(1, "month").setDay(15),
]);
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  range
  numberOfMonths={2}
  plugins={[
    <Footer position="bottom" />
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value}
        onChange={setValue}
        range
        numberOfMonths={2}
        plugins={[<Footer position="bottom" />]}
        {...otherProps}
      />
    ),
  };

  const customNames = {
    title: "Custom Names",
    code: `import React from "react";
import { Calendar } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
${$import}<Calendar
  range
  numberOfMonths={2}
  plugins={[
    <Footer
      position="bottom"
      format="${language === "en" ? "MMM DD" : "dddd DD MMMM"}"
      names={{
        selectedDates: "${
          language === "en" ? "Flight information:" : "اطلاعات پرواز"
        }",
        from: "${language === "en" ? "Departure date:" : "تاریخ رفت"}",
        to: "${language === "en" ? "Return date:" : "تاریخ برگشت"}",
        selectDate: "${language === "en" ? "select" : "انتخاب نشده"}",
        close: "${language === "en" ? "Close" : "بستن"}",
        separator: "${language === "en" ? "," : "،"}",
      }}
    />,
  ]}
/>`,
    jsx: (
      <Calendar
        range
        numberOfMonths={2}
        plugins={[
          <Footer
            position="bottom"
            format={language === "en" ? "MMM DD" : "dddd DD MMMM"}
            names={{
              selectedDates:
                language === "en" ? "Flight information:" : "اطلاعات پرواز",
              from: language === "en" ? "Departure date:" : "تاریخ رفت",
              to: language === "en" ? "Return date:" : "تاریخ برگشت",
              selectDate: language === "en" ? "select" : "انتخاب نشده",
              close: language === "en" ? "Close" : "بستن",
              separator: language === "en" ? "," : "،",
            }}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  return [descriptions, props, example, customNames];
}
