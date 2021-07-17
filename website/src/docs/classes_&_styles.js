import React from "react";
import DatePicker from "../../../build/index";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const inputClass = {
    title: "Adding ClassName To Refrence Element (input)",
    description: (
      <>
        <ul>
          {translate("input_class").map((description, index) => (
            <li key={index}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </li>
          ))}
        </ul>
        <p>{translate("input_class_note")}</p>
      </>
    ),
    code: `${localeImport}<DatePicker
  inputClass="custom-input"
/>`,
    jsx: (
      <>
        <p>{translate("style.css")} :</p>
        <div style={{ direction: "ltr" }}>
          <pre>
            <code className="language-css">
              {`.custom-input {
  border-radius: 15px;
  border: 1px #0c8af8 solid;
  padding: 4px 12px;
  background-color: white;
  height: 22px;
  box-shadow: 0 0 2px #0074d9;
}

.custom-input:focus {
  outline: none;
  border: 1px solid #0c8af8;
  box-shadow: 0 0 10px 2px #0074d9;
}`}
            </code>
          </pre>
        </div>
        <DatePicker inputClass="custom-input" {...otherProps} />
      </>
    ),
  };

  const inputStyle = {
    title: "Adding Style To Refrence Element (input)",
    code: `${localeImport}<DatePicker
  style={{
    backgroundColor: "aliceblue",
    height: "24px",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "3px 10px"
  }}
/>`,
    jsx: (
      <DatePicker
        style={{
          backgroundColor: "aliceblue",
          height: "24px",
          borderRadius: "8px",
          fontSize: "14px",
          padding: "3px 10px",
        }}
        {...otherProps}
      />
    ),
  };

  const popper = {
    title: "Adding ClassName To Popper Element (calendar)",
    description: "calendar_class",
    code: `${localeImport}<DatePicker
  className="custom-calendar"
/>`,
    jsx: (
      <>
        <p>{translate("style.css")} :</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `<p>${translate("rmdp_meaning")}</p>`,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: `<p>${translate("ep_meaning")}</p>`,
          }}
        />
        <div style={{ direction: "ltr" }}>
          <pre>
            <code className="language-css">
              {`.custom-calendar.rmdp-wrapper,
.rmdp-container .custom-calendar.ep-arrow::after {
  background-color: bisque;
}

.rmdp-container .custom-calendar.ep-arrow[direction="bottom"] {
  border-top: 1px solid bisque;
}

.rmdp-container .custom-calendar.ep-arrow[direction="top"] {
  border-bottom: 1px solid bisque;
}`}
            </code>
          </pre>
        </div>
        <DatePicker className="custom-calendar" {...otherProps} />
      </>
    ),
  };

  const arrowStyle = {
    title: "Adding Style To Arrow",
    code: `${localeImport}<DatePicker
  arrowStyle={{
    backgroundColor: "black"
  }}
/>`,
    jsx: (
      <DatePicker
        arrowStyle={{
          backgroundColor: "black",
        }}
        {...otherProps}
      />
    ),
  };

  const arrowClassName = {
    title: "Adding ClassName To Arrow",
    code: `${localeImport}<DatePicker
  arrowClassName="custom-arrow"
/>`,
    jsx: (
      <>
        <p>{translate("style.css")} :</p>
        <div style={{ direction: "ltr" }}>
          <pre>
            <code className="language-css">
              {`.rmdp-container .ep-arrow.custom-arrow::after {
  background-color: blue;
}`}
            </code>
          </pre>
        </div>
        <DatePicker arrowClassName="custom-arrow" {...otherProps} />
      </>
    ),
  };

  const containerStyle = {
    title: "Adding Style To DatePicker Container",
    description: <p>{translate("container_style")}</p>,
    code: `${localeImport}<DatePicker
  style={{
    width: "100%",
    boxSizing: "border-box",
    height: "26px"
  }}
  containerStyle={{
    width: "100%"
  }}
  calendarPosition="bottom-center"
${
  language === "en"
    ? "/> "
    : `  calendar={persian}
  locale={persian_fa}
/> `
}`,
    jsx: (
      <DatePicker
        style={{
          width: "100%",
          boxSizing: "border-box",
          height: "26px",
        }}
        containerStyle={{
          width: "100%",
        }}
        calendar={otherProps.calendar}
        locale={otherProps.locale}
        calendarPosition={"bottom-center"}
      />
    ),
  };

  const containerClass = {
    title: "Adding ClassName To DatePicker Container",
    code: `${localeImport}<DatePicker
  containerClassName="custom-container"
  calendarPosition="bottom-center"
${
  language === "en"
    ? "/> "
    : `  calendar={persian}
  locale={persian_fa}
/> `
}`,
    jsx: (
      <>
        <p>{translate("style.css")} :</p>
        <div style={{ direction: "ltr" }}>
          <pre>
            <code className="language-css">
              {`.custom-container {
  width: 100%;
}

.custom-container .rmdp-input {
  width: 100%;
  box-sizing: border-box;
  height: 26px;
}`}
            </code>
          </pre>
        </div>
        <DatePicker
          containerClassName="custom-container"
          calendar={otherProps.calendar}
          locale={otherProps.locale}
          calendarPosition={"bottom-center"}
        />
      </>
    ),
  };

  return [
    inputClass,
    inputStyle,
    popper,
    arrowStyle,
    arrowClassName,
    containerStyle,
    containerClass,
  ];
}
