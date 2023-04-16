import React from "react";
import { Calendar } from "../../../build/index";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const order = {
    title: "Order of Header Components",
    description: "header_order",
    code: `<Calendar 
  headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]} 
/>`,
    jsx: (
      <Calendar
        headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
        {...otherProps}
      />
    ),
  };

  const separator = {
    title: "Separator Between Month & Year",
    description: "month_year_separator",
    code: `<Calendar 
  monthYearSeparator="|"
/>`,
    jsx: <Calendar monthYearSeparator="|" {...otherProps} />,
  };

  const formatMonthAndYear = {
    title: "Custom Month & Year In Header",
    code: `${localeImport}<Calendar 
  formatMonth={(month, year) => {
    return "${translate("month")} " + month;
  }}
  formatYear={(year, month) => {
    return "${translate("year")} " + year;
  }}
/>`,
    jsx: (
      <Calendar
        formatMonth={(month, year) => {
          return translate("month") + " " + month;
        }}
        formatYear={(year, month) => {
          return translate("year") + " " + year;
        }}
        {...otherProps}
      />
    ),
  };

  const disable = {
    title: "Disabling Navigate Buttons",
    description: "disable_buttons",
    code: `${localeImport}<Calendar 
  buttons={false} 
${
  language === "en"
    ? "/>"
    : `  calendar={persian}
  locale={persian_fa}
/>`
} `,

    jsx: <Calendar buttons={false} {...otherProps} />,
  };

  const customFunction = {
    title: "Custom Navigation Buttons (function)",
    description: "custom_buttons",
    code: `${localeImport}<Calendar
  renderButton={(direction, handleClick) => (
    <button onClick={handleClick}>
      {direction === "right" ? ">" : "<"}
    </button>
  )}
${
  language === "en"
    ? "/>"
    : `  calendar={persian}
  locale={persian_fa}
/>`
} `,
    jsx: (
      <Calendar
        renderButton={(direction, handleClick) => (
          <button onClick={handleClick}>
            {direction === "right" ? ">" : "<"}
          </button>
        )}
        {...otherProps}
      />
    ),
  };

  const customElement = {
    title: "Custom Navigation Buttons (component)",
    description: (
      <div>
        <p>{translate("disabled_buttons")}</p>
        <p>{translate("style.css")}:</p>
        <div style={{ direction: "ltr" }}>
          <pre>
            <code className="language-css">
              {`.cursor-pointer {
  cursor: pointer;
}

.cursor-default {
  cursor: default;
}`}
            </code>
          </pre>
        </div>
        <p>{translate("code")}:</p>
      </div>
    ),
    code: `import { Calendar } from "react-multi-date-picker";
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
`
}
function CustomButton({ direction, handleClick, disabled }) {
  return (
    <i
      onClick={handleClick}
      style={{
        padding: "0 10px",
        fontWeight: "bold",
        color: disabled ? "gray" : "blue"
      }}
      className={disabled ? "cursor-default" : "cursor-pointer"}
    >
      {direction === "right" ? ">" : "<"}
    </i>
  )
}

export default function Example(){
  return (
    <Calendar
      minDate={new Date()} 
      renderButton={<CustomButton />} 
    ${
      language === "en"
        ? "/>"
        : `  calendar={persian}
      locale={persian_fa}
    />`
    }
  )
}`,
    jsx: (
      <Calendar
        minDate={new Date()}
        renderButton={<CustomButton />}
        {...otherProps}
      />
    ),
  };

  return [
    order,
    separator,
    formatMonthAndYear,
    disable,
    customFunction,
    customElement,
  ];
}

function CustomButton({ direction, handleClick, disabled }) {
  return (
    <i
      onClick={handleClick}
      style={{
        padding: "0 10px",
        fontWeight: "bold",
        color: disabled ? "gray" : "blue",
      }}
      className={disabled ? "cursor-default" : "cursor-pointer"}
      aria-hidden="true"
    >
      {direction === "right" ? ">" : "<"}
    </i>
  );
}
