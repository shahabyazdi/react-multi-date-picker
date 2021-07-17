import React from "react";
import DatePicker from "../../../build";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import size from "react-element-popper/animations/size";

export default function Doc({ otherProps, language }) {
  function code(name, code) {
    name = [].concat(name);
    return `import DatePicker from "react-multi-date-picker"
${name
  .map(
    (name) => `import ${name} from "react-element-popper/animations/${name}"`
  )
  .join("\n")}
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  return (
    ${code}
    ${
      language === "en"
        ? "/>"
        : `  calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-center"
    />`
    }
  )
}
`;
  }

  const $transition = {
    title: "Transition",
    code: code(
      "transition",
      `<DatePicker 
      animations={[transition()]} `
    ),
    jsx: <DatePicker animations={[transition()]} {...otherProps} />,
  };

  const $transition1 = {
    title: "Customizing Transition#1",
    code: code(
      "transition",
      `<DatePicker 
      animations={[
        transition({ duration: 800, from: 35 })
      ]} `
    ),
    jsx: (
      <DatePicker
        animations={[transition({ duration: 800, from: 35 })]}
        {...otherProps}
      />
    ),
  };

  const $transition2 = {
    title: "Customizing Transition#2",
    code: code(
      "transition",
      `<DatePicker 
      animations={[
        transition({
          from: 35,
          transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
        }),
      ]} `
    ),
    jsx: (
      <DatePicker
        animations={[
          transition({
            from: 35,
            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          }),
        ]}
        {...otherProps}
      />
    ),
  };

  const $opacity = {
    title: "Opacity",
    code: code(
      "opacity",
      `<DatePicker 
      animations={[opacity()]} `
    ),
    jsx: <DatePicker animations={[opacity()]} {...otherProps} />,
  };

  const $opacity1 = {
    title: "Customizing Opacity",
    code: code(
      "opacity",
      `<DatePicker 
      animations={[
        opacity({ from: 0.1, to: 0.8, duration: 1000 })
      ]} `
    ),
    jsx: (
      <DatePicker
        animations={[opacity({ from: 0.1, to: 0.8, duration: 1000 })]}
        {...otherProps}
      />
    ),
  };

  const $size = {
    title: "Size",
    code: code(
      "size",
      `<DatePicker 
      animations={[size()]} `
    ),
    jsx: <DatePicker animations={[size()]} />,
  };

  const mix = {
    title: "Opacity & Transition #1",
    code: code(
      ["transition", "opacity"],
      `<DatePicker 
      animations={[
        opacity(), 
        transition({ from: 35, duration: 800 })
      ]} `
    ),
    jsx: (
      <DatePicker
        animations={[opacity(), transition({ from: 35, duration: 800 })]}
        {...otherProps}
      />
    ),
  };

  const mix2 = {
    title: "Opacity & Transition #2",
    code: code(
      ["transition", "opacity"],
      `<DatePicker 
      animations={[
        opacity(),
        transition({
          from: 40,
          transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
        }),
      ]} `
    ),
    jsx: (
      <DatePicker
        animations={[
          opacity(),
          transition({
            from: 40,
            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          }),
        ]}
        {...otherProps}
      />
    ),
  };

  return [
    $transition,
    $transition1,
    $transition2,
    $opacity,
    $opacity1,
    $size,
    mix,
    mix2,
  ];
}
