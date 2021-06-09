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
  let i = 0;

  while (i < selectors.length) {
    result.push(
      <div key={i} className="display-flex">
        {[0, 1].map((number) => {
          let first = selectors[i++];
          let second = selectors[i++];

          if (!first) return null;

          return (
            <div key={number} style={{ display: "flex" }} className="df flex-1">
              <Selector {...getProps(first)} />
              {second && <Selector {...getProps(second)} />}
            </div>
          );
        })}
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
