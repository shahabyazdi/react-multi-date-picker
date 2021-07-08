import React from "react";
import DatePicker from "react-multi-date-picker";

export default function Doc({ language }) {
  const otherProps =
    language === "en"
      ? {}
      : {
          calendar: "persian",
          locale: "fa",
          calendarPosition: "bottom-right",
        };

  const singleDescription = {
    title: "Types",
    jsx: (
      <ul>
        <li>input (default)</li>
        <li>input-icon</li>
        <li>button</li>
        <li>icon</li>
        <li>custom</li>
      </ul>
    ),
  };

  const input = {
    title: "Input",
    code: `<DatePicker 
  type="input"
/>`,
    jsx: <DatePicker type="input" {...otherProps} />,
  };

  const inputIcon = {
    title: "Input-Icon",
    code: `<DatePicker 
  type="input-icon" 
/>`,
    jsx: <DatePicker type="input-icon" {...otherProps} />,
  };

  const button = {
    title: "Button",
    code: `<DatePicker 
  type="button"
/>`,
    jsx: <DatePicker type="button" {...otherProps} />,
  };

  const icon = {
    title: "Icon",
    code: `<DatePicker 
  type="icon" 
/>`,
    jsx: <DatePicker type="icon" {...otherProps} />,
  };

  const customFunction = {
    title: "Custom (function)",
    code: `<DatePicker
  value="2020/10/19"
  type="custom"
  render={(stringDate, openCalendar) => {
    return (
      <button onClick={openCalendar}>
        {stringDate}
      </button>
    )
  }}
/>`,
    jsx: (
      <DatePicker
        value="2020/10/19"
        type="custom"
        render={(stringDate, openCalendar) => {
          return <button onClick={openCalendar}>{stringDate}</button>;
        }}
        {...otherProps}
      />
    ),
  };

  const customComponent = {
    title: "Custom (component)",
    code: `import React from "react"
.
.
.
class CustomComponent extends React.Component {
  render() {
    return (
      <button onClick={this.props.openCalendar}>
        {this.props.stringDate}
      </button >
    )
  }
}
.
.
.
<DatePicker
  value="2020/10/19"
  type="custom"
  render={<CustomComponent />}
/>`,
    jsx: (
      <DatePicker
        value="2020/10/19"
        type="custom"
        render={<CustomComponent />}
        {...otherProps}
      />
    ),
  };

  const customComponentInput = {
    title: "Custom (input)",
    description: "custom_input",
    code: `import React from "react"

function CustomInput({ openCalendar, stringDate, handleValueChange }) {
  return (
    <input
      onFocus={openCalendar}
      value={stringDate}
      onChange={handleValueChange}
    />
  )
}

<DatePicker
  type="custom"
  render={<CustomInput />}
/>`,
    jsx: <DatePicker type="custom" render={<CustomInput />} {...otherProps} />,
  };
  const multipleDescription = {
    title: "Multiple & Range",
    description: "multiple_range",
  };
  const multiple = {
    title: "Custom (multiple mode)",
    code: `import React from "react"

function CustomMultipleInput({openCalendar, stringDates}) {
  return (
    <input
      onFocus={openCalendar}
      value={stringDates.join(", ")}
      readOnly
    />
  )
}

<DatePicker
  multiple
  type="custom"
  render={<CustomMultipleInput />}
/>`,
    jsx: (
      <DatePicker
        multiple
        type="custom"
        render={<CustomMultipleInput />}
        {...otherProps}
      />
    ),
  };

  const range = {
    title: "Custom (range mode)",
    code: `import React from "react"

function CustomRangeInput({openCalendar, stringDates}) {
  let from = stringDates[0] || ""
  let to = stringDates[1] || ""
  let value = from && to ? ${
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
}

<DatePicker
  range
  eachDaysInRange
  type="custom"
  render={<CustomRangeInput />}
/>`,
    jsx: (
      <DatePicker
        range
        eachDaysInRange
        type="custom"
        render={<CustomRangeInput />}
        {...otherProps}
      />
    ),
  };

  return [
    singleDescription,
    input,
    button,
    inputIcon,
    icon,
    customFunction,
    customComponent,
    customComponentInput,
    multipleDescription,
    multiple,
    range,
  ];

  function CustomRangeInput({ openCalendar, stringDates }) {
    let from = stringDates[0] || "";
    let to = stringDates[1] || "";
    let value =
      from && to
        ? language === "en"
          ? `from ${from}, to ${to}`
          : `از ${from}، تا ${to}`
        : from;

    return <input onFocus={openCalendar} value={value} readOnly />;
  }
}

function CustomMultipleInput({ openCalendar, stringDates }) {
  return (
    <input onFocus={openCalendar} value={stringDates.join(", ")} readOnly />
  );
}

class CustomComponent extends React.Component {
  render() {
    return (
      <button onClick={this.props.openCalendar}>{this.props.stringDate}</button>
    );
  }
}

function CustomInput({ openCalendar, stringDate, handleValueChange }) {
  return (
    <input
      onFocus={openCalendar}
      value={stringDate}
      onChange={handleValueChange}
    />
  );
}
