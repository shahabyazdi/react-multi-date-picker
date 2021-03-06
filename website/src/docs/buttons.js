import React from "react";
import { Calendar } from "../../../build/index";

export default function Buttons(
  translate,
  language,
  otherProps,
  codeEnd,
  Code
) {
  const disable = {
    title: "Disabling Navigate Buttons",
    description: "disable_buttons",
    code: `<Calendar 
  buttons={false} 
${
  language === "en"
    ? "/>"
    : `  calendar="persian"
  locale="fa"
/>`
} `,

    jsx: <Calendar buttons={false} {...otherProps} />,
  };

  const customFunction = {
    title: "Custom (function)",
    description: "custom_buttons",
    code: `<Calendar
  renderButton={(direction, handleClick) => (
    <button onClick={handleClick}>
      {direction === "right" ? ">" : "<"}
    </button>
  )}
${
  language === "en"
    ? "/>"
    : `  calendar="persian"
  locale="fa"
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
    title: "Custom (component)",
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
        : `  calendar="persian"
      locale="fa"
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

  return [disable, customFunction, customElement];
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
