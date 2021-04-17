import React from "react";

export function Selector({
  title,
  value = "",
  options = [],
  onChange = () => {},
  disabled,
}) {
  return (
    <div className="form-group flex-1">
      <label>{title}</label>
      <select
        className="select full-width"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        onBlur={() => {}}
      >
        {options.map((item, index) => (
          <option key={index} value={item[1]}>
            {item[0]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Selectors({ selectors, translate }) {
  let result = [];

  for (let i = 0; i < selectors.length; i += 2) {
    let first = selectors[i];
    let second = selectors[i + 1];

    if (!first) break;

    result.push(
      <div key={i} className="display-flex">
        <Selector {...getProps(first)} />
        {second && <Selector {...getProps(second)} />}
      </div>
    );
  }

  function getProps({ title, disabled, value, options, onChange }) {
    return {
      title: translate(title),
      disabled,
      value,
      options: options.map(([text, value]) => [translate(text), value]),
      onChange,
    };
  }

  return result;
}
