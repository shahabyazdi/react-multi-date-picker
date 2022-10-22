import React from "react";
import DatePicker from "../../../build";
import { Link } from "gatsby";

//other types
import InputIcon from "../../../components/input_icon";
import Icon from "../../../components/icon";
import Button from "../../../components/button";

export default function Doc({ language, otherProps, translate }) {
  function code(component, string, customComponent) {
    return `import DatePicker from "react-multi-date-picker"${
      language === "en"
        ? component
          ? `
${component}`
          : ""
        : `
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"${
            component
              ? `
${component}`
              : ""
          }`
    }

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
}${
      customComponent
        ? `

${customComponent}`
        : ""
    }`;
  }

  const descriptions = {
    title: "Descriptions",
    description: "types_v2",
    jsx: <Link to="../v2.x/types/">v2.x {translate("Types")}</Link>,
  };

  const inputIcon = {
    title: "Input-Icon",
    code: code(
      `import InputIcon from "react-multi-date-picker/components/input_icon"`,
      `<DatePicker 
      render={<InputIcon/>}`
    ),
    jsx: <DatePicker render={<InputIcon />} {...otherProps} />,
  };

  const icon = {
    title: "Icon",
    code: code(
      `import Icon from "react-multi-date-picker/components/icon"`,
      `<DatePicker 
      render={<Icon/>}`
    ),
    jsx: <DatePicker render={<Icon />} {...otherProps} />,
  };

  const button = {
    title: "Button",
    code: code(
      `import Button from "react-multi-date-picker/components/button"`,
      `<DatePicker 
      render={<Button/>}`
    ),
    jsx: <DatePicker render={<Button />} {...otherProps} />,
  };

  const customFunction = {
    title: "Custom (function)",
    code: code(
      ``,
      `<DatePicker
      value="2020/10/19"
      render={(value, openCalendar) => {
        return (
          <button onClick={openCalendar}>
            {value}
          </button>
        )
      }}`
    ),
    jsx: (
      <DatePicker
        value="2020/10/19"
        render={(value, openCalendar) => {
          return <button onClick={openCalendar}>{value}</button>;
        }}
        {...otherProps}
      />
    ),
  };

  const customComponent = {
    title: "Custom (component)",
    code: code(
      `import React from "react"`,
      `<DatePicker
      value="2020/10/19"
      render={<CustomComponent />}`,
      `class CustomComponent extends React.Component {
  render() {
    return (
      <button onClick={this.props.openCalendar}>
        {this.props.value}
      </button >
    )
  }
}`
    ),
    jsx: (
      <DatePicker
        value="2020/10/19"
        render={<CustomComponent />}
        {...otherProps}
      />
    ),
  };

  const customComponentInput = {
    title: "Custom (input)",
    description: "custom_input",
    code: code(
      "",
      `<DatePicker
      render={<CustomInput />}`,
      `function CustomInput({ openCalendar, value, handleValueChange }) {
  return (
    <input
      onFocus={openCalendar}
      value={value}
      onChange={handleValueChange}
    />
  )
}`
    ),
    jsx: <DatePicker render={<CustomInput />} {...otherProps} />,
  };
  const multipleDescription = {
    title: "Multiple & Range",
    description: "multiple_range_v3",
  };
  const multiple = {
    title: "Custom (multiple mode)",
    code: code(
      "",
      `<DatePicker
      multiple
      render={<CustomMultipleInput />}`,
      `function CustomMultipleInput({openCalendar, value}) {
  return (
    <input
      onFocus={openCalendar}
      value={value}
      readOnly
    />
  )
}`
    ),
    jsx: (
      <DatePicker multiple render={<CustomMultipleInput />} {...otherProps} />
    ),
  };

  const range = {
    title: "Custom (range mode)",
    code: code(
      "",
      `<DatePicker
      range
      eachDaysInRange
      render={<CustomRangeInput />}`,
      `function CustomRangeInput({openCalendar, value}) {
  let from = value[0] || ""
  let to = value[1] || ""
  
  value = from && to ? ${
    language === "en"
      ? `"from " + from + ", to " + to`
      : `"از " + from + "، تا " + to"`
  } : from
  
  return (
    <input
      onFocus={openCalendar}
      value={value}
      readOnly
    />
  )
}`
    ),
    jsx: (
      <DatePicker
        range
        eachDaysInRange
        render={<CustomRangeInput />}
        {...otherProps}
      />
    ),
  };

  return [
    descriptions,
    inputIcon,
    icon,
    button,
    customFunction,
    customComponent,
    customComponentInput,
    multipleDescription,
    multiple,
    range,
  ];

  function CustomRangeInput({ openCalendar, value }) {
    let from = value[0] || "";
    let to = value[1] || "";

    value =
      from && to
        ? language === "en"
          ? `from ${from}, to ${to}`
          : `از ${from}، تا ${to}`
        : from;

    return <input onFocus={openCalendar} value={value} readOnly />;
  }
}

function CustomMultipleInput({ openCalendar, value }) {
  return <input onFocus={openCalendar} value={value} readOnly />;
}

class CustomComponent extends React.Component {
  render() {
    return (
      <button onClick={this.props.openCalendar}>{this.props.value}</button>
    );
  }
}

function CustomInput({ openCalendar, value, handleValueChange }) {
  return (
    <input onFocus={openCalendar} value={value} onChange={handleValueChange} />
  );
}
