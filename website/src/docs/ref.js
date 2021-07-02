import React, { useRef, useState } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";
import fa from "react-date-object/locales/persian_fa";

export default function Doc({ translate, language, otherProps }) {
  const datePickerRef = useRef();
  const ref = useRef();
  const ref2 = useRef();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false);
  const [shouldCloseCalendar2, setShouldCloseCalendar2] = useState(false);
  const [date, setDate] = useState(
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
      locale: language === "fa" ? fa : undefined,
    })
  );
  const calendarRef = useRef();

  function update(key, value) {
    let date = calendarRef.current.date;

    calendarRef.current.set(key, date[key] + value);

    setDate(new DateObject(date));
  }

  const style = {
    display: "inline-block",
    width: "90px",
    fontSize: "16px",
  };

  const description = {
    title: "Descriptions",
    description: "forward_ref_description",
    code: `import React, { useRef } from "react"
import { Calendar } from "react-multi-date-picker"

export default function Example() {
  const calendarRef = useRef()

  return (
    <Calendar ref={calendarRef} />
  )
}`,
  };

  const datePicker = {
    title: "Open & Close Calendar By DatePicker Ref",
    description: "date_picker_ref",
    code: `const datePickerRef = useRef()
.
.
.
<div>
  <button
    onClick={() => datePickerRef.current.openCalendar()}
  >
    ${translate("open")}
  </button>
  <DatePicker 
    ref={datePickerRef} 
${
  language === "en"
    ? "  >"
    : `    calendar="persian"
    locale="fa"
    calendarPosition="auto-right"
  >`
}
    <button
      style={{ margin: "5px" }}
      onClick={() => datePickerRef.current.closeCalendar()}
    >
      ${translate("close")}
    </button>
  </DatePicker>
</div>`,
    jsx: (
      <div>
        <button onClick={() => datePickerRef.current.openCalendar()}>
          {translate("open")}
        </button>
        <DatePicker ref={datePickerRef} {...otherProps}>
          <button
            style={{ margin: "5px" }}
            onClick={() => datePickerRef.current.closeCalendar()}
          >
            {translate("close")}
          </button>
        </DatePicker>
      </div>
    ),
  };

  const refresh = {
    title: "Refresh Position",
    description: "refresh_position",
    code: `const ref = useRef()
const ref2 = useRef()
const [visible, setVisible] = useState(false)
const [visible2, setVisible2] = useState(false)
const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false)
const [shouldCloseCalendar2, setShouldCloseCalendar2] = useState(false)
.
.
.
<div>
  <h2>${translate("Example 1 (without using refresh position)")} :</h2>
  {visible && <span>${translate(
    "a demo text to force the datepicker to move forward!"
  )}</span>}
  <DatePicker
    value={{}}
    placeholder="${translate("first click here")}"
    ref={ref}
    onOpen={() => setShouldCloseCalendar(false)}
    onClose={() => shouldCloseCalendar}
  ${
    language === "en"
      ? "/>"
      : `  calendar="persian"
    locale="fa"
    calendarPosition="auto-right"
  />`
  }
  <button
    onClick={() => {
      if (!visible) {
        setVisible(true)
      } else {
        setVisible(false)
        setShouldCloseCalendar(true)
        setTimeout(() => {
          ref.current.closeCalendar()
        }, 20);
      }
    }}
  >
    {visible ? "${translate("refresh and close calendar")}" : "${translate(
      "then click here"
    )}"}
  </button>
  <h2>${translate("Example 2 (with using refresh position)")} :</h2>
  {visible2 && <span>${translate(
    "a demo text to force the datepicker to move forward!"
  )}</span>}
  <DatePicker
    value={{}}
    placeholder="${translate("first click here")}"
    ref={ref2}
    onOpen={() => setShouldCloseCalendar2(false)}
    onClose={() => shouldCloseCalendar2}
  ${
    language === "en"
      ? "/>"
      : `  calendar="persian"
    locale="fa"
    calendarPosition="auto-right"
  />`
  }
  <button
    onClick={() => {
      if (!visible2) {
        setVisible2(true)
        setTimeout(() => {
          ref2.current.refreshPosition()
        }, 20);
      } else {
        setVisible2(false)
        setShouldCloseCalendar2(true)
        setTimeout(() => {
          ref2.current.closeCalendar()
        }, 20);
      }
    }}
  >
    {visible2 ? "${translate("refresh and close calendar")}" : "${translate(
      "then click here"
    )}"}      
  </button>
</div>`,
    jsx: (
      <div>
        <h2>{translate("Example 1 (without using refresh position)")} :</h2>
        {visible && (
          <span>
            {translate("a demo text to force the datepicker to move forward!")}
          </span>
        )}
        <DatePicker
          value={{}}
          placeholder={translate("first click here")}
          ref={ref}
          onOpen={() => setShouldCloseCalendar(false)}
          onClose={() => shouldCloseCalendar}
          {...otherProps}
        />
        <button
          onClick={() => {
            if (!visible) {
              setVisible(true);
            } else {
              setVisible(false);
              setShouldCloseCalendar(true);
              setTimeout(() => {
                ref.current.closeCalendar();
              }, 20);
            }
          }}
        >
          {visible
            ? translate("refresh and close calendar")
            : translate("then click here")}
        </button>
        <h2>{translate("Example 2 (with using refresh position)")} :</h2>
        {visible2 && (
          <span>
            {translate("a demo text to force the datepicker to move forward!")}
          </span>
        )}
        <DatePicker
          value={{}}
          placeholder={translate("first click here")}
          ref={ref2}
          onOpen={() => setShouldCloseCalendar2(false)}
          onClose={() => shouldCloseCalendar2}
          {...otherProps}
        />
        <button
          onClick={() => {
            if (!visible2) {
              setVisible2(true);
              setTimeout(() => {
                ref2.current.refreshPosition();
              }, 20);
            } else {
              setVisible2(false);
              setShouldCloseCalendar2(true);
              setTimeout(() => {
                ref2.current.closeCalendar();
              }, 20);
            }
          }}
        >
          {visible2
            ? translate("refresh and close calendar")
            : translate("then click here")}{" "}
        </button>
      </div>
    ),
  };

  const month = {
    title: "Manually Set Year And Month In Calendar",
    description: "year_month_ref",
    code: `import React, { useRef, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";

export default function Example() {
  const [date, setDate] = useState(new DateObject(${
    language === "en" ? "" : `{ calendar: "persian", locale: "fa" }`
  }));

  const calendarRef = useRef();

  function update(key, value) {
    let date = calendarRef.current.date;

    calendarRef.current.set(key, date[key] + value);

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
      <Calendar 
        ref={calendarRef}
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
        <Calendar ref={calendarRef} {...otherProps} className="inline-block" />
      </div>
    ),
  };

  return [description, datePicker, refresh, month];
}
