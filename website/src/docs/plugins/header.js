import React from "react";
import DatePicker from "../../../../build/index";
import DatePickerHeader from "../../../../plugins/date_picker_header";
import gregorian_hi from "react-date-object/locales/gregorian_hi";

export default function Doc({ translate, language, otherProps, localeImport }) {
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
            <td>size</td>
            <td>String</td>
            <td>"big"</td>
          </tr>
          <tr>
            <td>calendar</td>
            <td>Object</td>
            <td>Default DatePicker Calendar</td>
          </tr>
          <tr>
            <td>locale</td>
            <td>Object</td>
            <td>Default DatePicker Locale</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const sizes = {
    title: "Sizes",
    jsx: (
      <ul>
        <li>big</li>
        <li>medium</li>
        <li>small</li>
      </ul>
    ),
  };
  const right = {
    title: "Header Right",
    code: `import DatePicker from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
${$import}<DatePicker
  plugins={[
    <DatePickerHeader />
  ]}
/>`,
    jsx: <DatePicker plugins={[<DatePickerHeader />]} {...otherProps} />,
  };

  const left = {
    title: "Header Left",
    code: `import DatePicker from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
${$import}<DatePicker
  plugins={[
    <DatePickerHeader position="left" />
  ]}
/>`,
    jsx: (
      <DatePicker
        plugins={[<DatePickerHeader position="left" />]}
        {...otherProps}
      />
    ),
  };

  const indian = {
    title: "English Calendar with Indian Header",
    code: `import DatePicker from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import gregorian_hi from "react-date-object/locales/gregorian_hi" //(gregorian calendar, hindi locale)
${$import}<DatePicker
  plugins={[
    <DatePickerHeader 
      locale={gregorian_hi}
      size="medium" 
    />,
  ]}
  calendarPosition="${language === "en" ? "bottom-left" : "bottom-right"}"
/> `,
    jsx: (
      <DatePicker
        plugins={[<DatePickerHeader locale={gregorian_hi} size="medium" />]}
        calendarPosition={language === "en" ? "bottom-left" : "bottom-right"}
      />
    ),
  };

  const style = {
    title: "Styling Header",
    code: `import DatePicker from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
${$import}<DatePicker
  plugins={[
    <DatePickerHeader 
      position="top" 
      size="small" 
      style={{ backgroundColor: "steelblue" }} 
    />
  ]}
/>`,
    jsx: (
      <DatePicker
        plugins={[
          <DatePickerHeader
            position="top"
            size="small"
            style={{ backgroundColor: "steelblue" }}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  return [props, sizes, right, left, indian, style];
}
