import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";
import TimePicker from "../../../plugins/time_picker";

export default function OtherExamples(translate, language, otherProps) {
  const [date, setDate] = useState(
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
      locale: language,
    })
  );

  function update(key, value) {
    date[key] += value;

    setDate(new DateObject(date));
  }

  const style = {
    display: "inline-block",
    width: "90px",
    fontSize: "16px",
  };

  const currentDate = {
    title: "Opening Calendar On The Specified Date",
    description: (
      <>
        <p>
          {language === "en"
            ? "The currentDate prop forces the datepicker & calendar to open on a specific date."
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
  const [date, setDate] = useState(
    new DateObject(${
      language === "en" ? "" : `{ calendar: "persian", locale: "fa" }`
    }),
  );

  function update(key, value) {
    date[key] += value;

    setDate(new DateObject(date));
  }

  const style = {
    display: "inline-block",
    width: "90px",
    fontSize: "16px",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <button onClick={() => update("month", 1)}>+</button>
        <span style={style}>{date.month.name}</span>
        <button onClick={() => update("month", -1)}>-</button>
      </div>
      <div>
        <button onClick={() => update("year", 1)}>+</button>
        <span style={style}>{date.year}</span>
        <button onClick={() => update("year", -1)}>-</button>
      </div>
      <DatePicker 
        currentDate={date}
        calendarPosition="bottom-center"
      ${
        language === "en"
          ? "/>"
          : `  calendar="persian" 
        locale="fa" 
      />`
      }
    </div>
  )
}  `,
    jsx: (
      <div style={{ textAlign: "center" }}>
        <div>
          <button onClick={() => update("month", 1)}>+</button>
          <span style={style}>{date.month.name}</span>
          <button onClick={() => update("month", -1)}>-</button>
        </div>
        <div>
          <button onClick={() => update("year", 1)}>+</button>
          <span style={style}>{date.year}</span>
          <button onClick={() => update("year", -1)}>-</button>
        </div>
        <DatePicker
          currentDate={date}
          {...{ ...otherProps, calendarPosition: "bottom-center" }}
        />
      </div>
    ),
  };

  const weekStartDayIndex = {
    title: "Changing Start Day Of The Week",
    description: "start_day",
    code: `<DatePicker 
  weekStartDayIndex={1} 
/>`,
    jsx: <DatePicker weekStartDayIndex={1} {...otherProps} />,
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
    code: `<DatePickers
  format="Date:YYYY/MM/DD, Time:HH:mm:ss"
  formattingIgnoreList={["Date", "Time"]}
  plugins={[
    <TimePicker position="bottom" />
  ]}
/>`,
    jsx: (
      <DatePicker
        format="Date:YYYY/MM/DD, Time:HH:mm:ss"
        formattingIgnoreList={["Date", "Time"]}
        plugins={[<TimePicker position="bottom" />]}
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

  const hideMonth = {
    title: "Hiding Month From Header",
    code: `<DatePicker 
  hideMonth 
/>`,
    jsx: <DatePicker hideMonth {...otherProps} />,
  };

  const hideYear = {
    title: "Hiding Year From Header",
    code: `<DatePicker 
  hideYear 
/>`,
    jsx: <DatePicker hideYear {...otherProps} />,
  };

  const hideWeekDays = {
    title: "Hiding Week Days",
    code: `<DatePicker 
  hideWeekDays 
/>`,
    jsx: <DatePicker hideWeekDays {...otherProps} />,
  };

  const readOnly = {
    title: "Read Only Calendar",
    description: "read_only_calendar",
    code: `<Calendar
  value={[
    new DateObject(${
      language === "en" ? "" : `{ calendar: "persian" }`
    }).toFirstOfWeek(),
    new DateObject(${
      language === "en" ? "" : `{ calendar: "persian" }`
    }).toLastOfWeek(),
  ]}
  range
  readOnly
/>`,
    jsx: (
      <Calendar
        value={[
          new DateObject({
            calendar: language === "en" ? "gregorian" : "persian",
          }).toFirstOfWeek(),
          new DateObject({
            calendar: language === "en" ? "gregorian" : "persian",
          }).toLastOfWeek(),
        ]}
        range
        readOnly
        {...otherProps}
      />
    ),
  };

  const readOnlyDatePicker = {
    title: "Read Only DatePicker",
    code: `<DatePicker 
  value={new Date()} 
  readOnly
/>`,
    jsx: <DatePicker value={new Date()} readOnly {...otherProps} />,
  };

  const disabled = {
    title: "Disabled Calendar",
    code: `<Calendar 
  value={new DateObject()} 
  disabled 
/>`,
    jsx: <Calendar value={new DateObject()} disabled {...otherProps} />,
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
    weekStartDayIndex,
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
    hideYear,
    hideMonth,
    hideWeekDays,
    readOnlyDatePicker,
    readOnly,
    disabled,
    disabledInput,
    disabledButton,
  ];
}
