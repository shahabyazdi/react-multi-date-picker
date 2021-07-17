import React, { useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";
import TimePicker from "../../../plugins/time_picker";

export default function Doc({ language, otherProps, localeImport }) {
  const [date, setDate] = useState(new DateObject(otherProps));

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
    code: `${localeImport}<DatePicker
  currentDate={
    new DateObject({${
      language === "en"
        ? ""
        : `
      calendar: persian, `
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
            calendar: otherProps.calendar,
            locale: otherProps.locale,
            year: language === "en" ? 2021 : 1399,
            month: language === "en" ? 2 : 12,
            day: 1,
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
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian:
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  const [date, setDate] = useState(
    new DateObject(${
      language === "en" ? "" : `{ calendar: persian, locale: persian_fa }`
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
          : `  calendar={persian}
        locale={persian_fa}
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
    code: `${localeImport}<DatePicker 
  weekStartDayIndex={1} 
/>`,
    jsx: <DatePicker weekStartDayIndex={1} {...otherProps} />,
  };

  const otherDays = {
    title: "Other Days",
    code: `${localeImport}<DatePicker 
  showOtherDays 
/>`,
    jsx: <DatePicker showOtherDays {...otherProps} />,
  };

  const scroll = {
    title: "Disabling Scroll Sensitivity",
    description: "disable_scroll",
    code: `${localeImport}<DatePicker 
  scrollSensitive={false} 
/>`,
    jsx: <DatePicker scrollSensitive={false} {...otherProps} />,
  };

  const fullYear = {
    title: "Full Year View",
    code: `${localeImport}<Calendar 
  fullYear 
/>`,
    jsx: <Calendar fullYear {...otherProps} />,
  };

  const hide = {
    title: "Hide On Scroll",
    code: `${localeImport}<DatePicker 
  hideOnScroll 
/>`,
    jsx: <DatePicker hideOnScroll {...otherProps} />,
  };

  const format = {
    title: "Ignore Formatting",
    code: `${localeImport}<DatePickers
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
    code: `${localeImport}<DatePicker
  inputMode="none"
/>`,
    jsx: <DatePicker inputMode="none" {...otherProps} />,
  };

  const editing = {
    title: "Disable Editing",
    description: "disable_edit",
    code: `${localeImport}<DatePicker
  editable={false}
/>`,
    jsx: <DatePicker editable={false} {...otherProps} />,
  };

  const placeholder = {
    title: "Placeholder",
    code: `${localeImport}<DatePicker
  placeholder="click to open"
/>`,
    jsx: <DatePicker placeholder="click to open" {...otherProps} />,
  };

  const yearPicker = {
    title: "Disable Year Picker",
    code: `${localeImport}<DatePicker 
  disableYearPicker 
/>`,
    jsx: <DatePicker disableYearPicker {...otherProps} />,
  };

  const monthPicker = {
    title: "Disable Month Picker",
    code: `${localeImport}<DatePicker 
  disableMonthPicker 
/>`,
    jsx: <DatePicker disableMonthPicker mind {...otherProps} />,
  };

  const hideMonth = {
    title: "Hiding Month From Header",
    code: `${localeImport}<DatePicker 
  hideMonth 
/>`,
    jsx: <DatePicker hideMonth {...otherProps} />,
  };

  const hideYear = {
    title: "Hiding Year From Header",
    code: `${localeImport}<DatePicker 
  hideYear 
/>`,
    jsx: <DatePicker hideYear {...otherProps} />,
  };

  const hideWeekDays = {
    title: "Hiding Week Days",
    code: `${localeImport}<DatePicker 
  hideWeekDays 
/>`,
    jsx: <DatePicker hideWeekDays {...otherProps} />,
  };

  const readOnly = {
    title: "Read Only Calendar",
    description: "read_only_calendar",
    code: `${localeImport}<Calendar
  value={[
    new DateObject(${
      language === "en" ? "" : `{ calendar: persian }`
    }).toFirstOfWeek(),
    new DateObject(${
      language === "en" ? "" : `{ calendar: persian }`
    }).toLastOfWeek(),
  ]}
  range
  readOnly
/>`,
    jsx: (
      <Calendar
        value={[
          new DateObject(otherProps).toFirstOfWeek(),
          new DateObject(otherProps).toLastOfWeek(),
        ]}
        range
        readOnly
        {...otherProps}
      />
    ),
  };

  const readOnlyDatePicker = {
    title: "Read Only DatePicker",
    code: `${localeImport}<DatePicker 
  value={new Date()} 
  readOnly
/>`,
    jsx: <DatePicker value={new Date()} readOnly {...otherProps} />,
  };

  const disabled = {
    title: "Disabled Calendar",
    code: `${localeImport}<Calendar 
  value={new DateObject()} 
  disabled 
/>`,
    jsx: <Calendar value={new DateObject()} disabled {...otherProps} />,
  };

  const disabledInput = {
    title: "Disabled Input",
    code: `${localeImport}<DatePicker 
  disabled 
/>`,
    jsx: <DatePicker disabled {...otherProps} />,
  };

  return [
    currentDate,
    customMonthYear,
    weekStartDayIndex,
    otherDays,
    scroll,
    fullYear,
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
  ];
}
