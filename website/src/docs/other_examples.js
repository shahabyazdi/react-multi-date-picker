import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../build/index";

export default function (translate, language, otherProps) {
  const [date, setDate] = useState(
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
      locale: language,
    })
  );

  const currentDate = {
    title: "Opening Calendar On The Specified Date",
    description: (
      <>
        <p>
          {language === "en"
            ? "The currentDate prop forces the datepicker & calendar to open in specific date."
            : "پراپرتی currentDate تقویم را مجبور به باز شدن در زمان تعیین شده میکند."}
        </p>
        <p>
          {language === "en"
            ? "For example if you want the datepicker opens in February 2021 , you can set the currentDate prop to new DateObject ({ year:2021,month:2,day:1})"
            : "به عنوان نمونه برای باز شدن تقویم در اسفند 1399 مانند مثال زیر عمل کنید:"}
        </p>
      </>
    ),
    code: `<DatePicker
  currentDate={
    new DateObject({${
      language === "en"
        ? ""
        : `
      calendar: "persian", `
    } 
      year: ${language === "en" ? 2021 : 1399},
      month: ${language === "en" ? "2" : "12"},
      day: 1
    })
  }
/>`,
    jsx: (
      <DatePicker
        currentDate={
          new DateObject({
            calendar: language === "en" ? "gregorian" : "persian",
            year: language === "en" ? 2021 : 1399,
            month: language === "en" ? 2 : 12,
            day: 1,
            locale: language,
          })
        }
        {...otherProps}
      />
    ),
  };

  const customMonthYear = {
    title: "Manually Set Year And Month In DatePicker",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Example() {
  const [date, setDate] = useState({
    date:new DateObject(${
      language === "en" ? "" : `{ calendar: "persian", locale: "fa" }`
    }),
  });

  return (
    <>
      <div>
        <button
          onClick={() => {
            date.month += 1;

            setDate(new DateObject(date));
          }}
        >
          +
        </button>
        <span>{date.month.name}</span>
        <button
          onClick={() => {
            date.month -= 1;

            setDate(new DateObject(date));
          }}
        >
          -
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            date.year += 1;

            setDate(new DateObject(date));
          }}
        >
          +
        </button>
        <span>{date.year}</span>
        <button
          onClick={() => {
            date.year -= 1;

            setDate(new DateObject(date));
          }}
        >
          -
        </button>
      </div>
      <DatePicker 
        currentDate={date} 
      ${
        language === "en"
          ? "/>"
          : `  calendar="persian" 
        locale="fa" 
      />`
      }
    </>
  )
}  `,
    jsx: (
      <>
        <div>
          <button
            onClick={() => {
              date.month += 1;

              setDate(new DateObject(date));
            }}
          >
            +
          </button>
          <span>{date.month?.name}</span>
          <button
            onClick={() => {
              date.month -= 1;

              setDate(new DateObject(date));
            }}
          >
            -
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              date.year += 1;

              setDate(new DateObject(date));
            }}
          >
            +
          </button>
          <span>{date.year}</span>
          <button
            onClick={() => {
              date.year -= 1;

              setDate(new DateObject(date));
            }}
          >
            -
          </button>
        </div>
        <DatePicker currentDate={date} {...otherProps} />
      </>
    ),
  };

  const animation = {
    title: "Animation",
    code: `<DatePicker 
  animation 
/>`,
    jsx: <DatePicker animation {...otherProps} />,
  };

  const otherDays = {
    title: "Other Days",
    code: `<DatePicker 
  showOtherDays 
/>`,
    jsx: <DatePicker showOtherDays {...otherProps} />,
  };

  const scroll = {
    title: "Disabling Scroll Sensitivity",
    description: "disable_scroll",
    code: `<DatePicker 
  scrollSensitive={false} 
/>`,
    jsx: <DatePicker scrollSensitive={false} {...otherProps} />,
  };

  const hide = {
    title: "Hide On Scroll",
    code: `<DatePicker 
  hideOnScroll 
/>`,
    jsx: <DatePicker hideOnScroll {...otherProps} />,
  };

  const format = {
    title: "Ignore Formatting",
    code: `<DatePicker
  timePicker
  format="Date:YYYY/MM/DD, Time:HH:mm:ss"
  formattingIgnoreList={["Date", "Time"]}
/>`,
    jsx: (
      <DatePicker
        timePicker
        format="Date:YYYY/MM/DD, Time:HH:mm:ss"
        formattingIgnoreList={["Date", "Time"]}
        {...otherProps}
      />
    ),
  };

  const virtualKeyboard = {
    title: "Disable Virtual Keyboard",
    code: `<DatePicker
  inputMode="none"
/>`,
    jsx: <DatePicker inputMode="none" {...otherProps} />,
  };

  const editing = {
    title: "Disable Editing",
    description: "disable_edit",
    code: `<DatePicker
  editable={false}
/>`,
    jsx: <DatePicker editable={false} {...otherProps} />,
  };

  const placeholder = {
    title: "Placeholder",
    code: `<DatePicker
  placeholder="click to open"
/>`,
    jsx: <DatePicker placeholder="click to open" {...otherProps} />,
  };

  const yearPicker = {
    title: "Disable Year Picker",
    code: `<DatePicker 
  disableYearPicker 
/>`,
    jsx: <DatePicker disableYearPicker {...otherProps} />,
  };

  const monthPicker = {
    title: "Disable Month Picker",
    code: `<DatePicker 
  disableMonthPicker 
/>`,
    jsx: <DatePicker disableMonthPicker mind {...otherProps} />,
  };

  const disabledInput = {
    title: "Disabled Input",
    code: `<DatePicker 
  disabled 
/>`,
    jsx: <DatePicker disabled {...otherProps} />,
  };

  const disabledButton = {
    title: "Disabled Button",
    code: `<DatePicker
  type="button"
  placeholder="this button is disabled"
  disabled
/>`,
    jsx: (
      <DatePicker
        type="button"
        placeholder="this button is disabled"
        disabled
        {...otherProps}
      />
    ),
  };

  return [
    currentDate,
    customMonthYear,
    animation,
    otherDays,
    scroll,
    hide,
    format,
    virtualKeyboard,
    editing,
    placeholder,
    yearPicker,
    monthPicker,
    disabledInput,
    disabledButton,
  ];
}
