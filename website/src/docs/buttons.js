import React from "react";
import { Calendar } from "../../../build/index";

export default function (translate, language, otherProps) {
  const disable = {
    title: "Disabling Navigate Buttons",
    description: "disable_buttons",
    code: `<Calendar 
  buttons={false} 
/>`,

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
/>`,
    jsx: (
      <Calendar
        renderButton={(direction, handleClick) => (
          <button onClick={handleClick}>
            {direction === "right" ? ">" : "<"}
          </button>
        )}
      />
    ),
  };

  const customElement = {
    title: "Custom (component)",
    description: (
      <div>
        <p>{translate("style.css")}:</p>
        <pre>
          <code className="language-css">
            {`.cursor-pointer {
  cursor: pointer;
}`}
          </code>
        </pre>
        <p>{translate("code")}:</p>
      </div>
    ),
    code: `import { Calendar } from "react-multi-date-picker";

function CustomButton({ direction, handleClick }) {
  return (
    <i
      onClick={handleClick}
      style={{ padding: "0 10px" }}
      className="cursor-pointer"
    >
      {direction === "right" ? ">" : "<"}
    </i>
  )
}

export default function Example(){
  return (
    <Calendar renderButton={<CustomButton />} />
  )
}`,
    jsx: <Calendar renderButton={<CustomButton />} />,
  };

  return [disable, customFunction, customElement];
}

function CustomButton({ direction, handleClick }) {
  return (
    <i
      onClick={handleClick}
      style={{ padding: "0 10px" }}
      className="cursor-pointer"
    >
      {direction === "right" ? ">" : "<"}
    </i>
  );
}
