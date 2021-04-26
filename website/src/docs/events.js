import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../build/index";

export default function Events(translate, language, otherProps) {
  const [state, setState] = useState({ format: "MM/DD/YYYY" });
  const [props, setProps] = useState({ value: new Date(), ...otherProps });
  const [dateObject, setDateObject] = useState(
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
      locale: language,
    })
  );

  const {
    date,
    format,
    gregorian = "",
    persian = "",
    arabic = "",
    indian = "",
    jsDate = "",
  } = state;

  const convert = (date, format = state.format) => {
    let object = { date, format };

    setState({
      gregorian: new DateObject(object).convert("gregorian").format(),
      persian: new DateObject(object).convert("persian").format(),
      arabic: new DateObject(object).convert("arabic").format(),
      indian: new DateObject(object).convert("indian").format(),
      jsDate: date.toDate(),
      ...object,
    });
  };

  const Span = ({ children }) => (
    <span style={{ fontWeight: "bold" }}>{children}</span>
  );

  const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false);
  const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false);

  const onChangeSingle = {
    title: "onChange (single mode)",
    description: "on_change",
    code: `const [state, setState] = useState({ format: "MM/DD/YYYY" })

const {
  date,
  format,
  gregorian = "",
  persian = "",
  arabic = "",
  indian = "",
  jsDate = ""
} = state
  
const convert = (date, format = state.format) => {
  let object = { date, format }
  
  setState({
    gregorian: new DateObject(object)${
      language === "en" ? "" : `.convert("gregorian")`
    }.format(),
    persian: new DateObject(object)${
      language === "en" ? `.convert("persian")` : ""
    }.format(),
    arabic: new DateObject(object).convert("arabic").format(),
    indian: new DateObject(object).convert("indian").format(),
    jsDate: date.toDate(),
    ...object
  })
}
  
const Span = ({ children }) => <span style={{ fontWeight: "bold" }}>{children}</span>

return(
  <div>
    <div>
      <div>
        <Span>${translate("click to select")}: </Span>
        <DatePicker
          value={date}
          onChange={convert}
        ${
          language === "en"
            ? "/>"
            : `  calendar="persian"
          locale="fa"
          calendarPosition="auto-right"
        />`
        }
      </div>
      <div>
        <Span>${translate("format")}: </Span>
        <select
          value={format}
          onChange={e => convert(date, e.target.value)}
          className="select"
        >
          <option>MM/DD/YYYY</option>
          <option>DD-MM-YYYY</option>
          <option>YYYY,MM,DD</option>
          <option>dddd DD MMMM YYYY</option>
          <option>ddd MMM DD YYYY HH:mm:ss</option>
          <option>MMM/DD/YYYY hh:mm:ss a</option>
          <option>MMM/DD/YYYY HH:mm:ss</option>
        </select>
      </div>
      <div>
        <Span>${translate("gregorian")}: </Span>
        <span>{gregorian}</span>
      </div>
      <div>
        <Span>${translate("persian")}: </Span>
        <span>{persian}</span>
      </div>
      <div>
        <Span>${translate("arabic")}: </Span>
        <span>{arabic}</span>
      </div>
      <div>
        <Span>${translate("indian")}: </Span>
        <span>{indian}</span>
      </div>
      <div>
        <Span>${translate("javascript date")}: </Span>
        <span>{jsDate.toString()}</span>
      </div>
    </div>
  </div>
)
`,
    jsx: (
      <div>
        <div>
          <div>
            <Span>{translate("click to select")}: </Span>
            <DatePicker value={date} onChange={convert} {...otherProps} />
          </div>
          <div>
            <Span>{translate("format")}: </Span>
            <select
              value={format}
              onChange={(e) => convert(date, e.target.value)}
              className="select"
              onBlur={() => {}}
            >
              <option>MM/DD/YYYY</option>
              <option>DD-MM-YYYY</option>
              <option>YYYY,MM,DD</option>
              <option>dddd DD MMMM YYYY</option>
              <option>ddd MMM DD YYYY HH:mm:ss</option>
              <option>MMM/DD/YYYY hh:mm:ss a</option>
              <option>MMM/DD/YYYY HH:mm:ss</option>
            </select>
          </div>
          <div>
            <Span>{translate("gregorian")}: </Span>
            <span>{gregorian}</span>
          </div>
          <div>
            <Span>{translate("persian")}: </Span>
            <span>{persian}</span>
          </div>
          <div>
            <Span>{translate("arabic")}: </Span>
            <span>{arabic}</span>
          </div>
          <div>
            <Span>{translate("indian")}: </Span>
            <span>{indian}</span>
          </div>
          <div>
            <Span>{translate("javascript date")}: </Span>
            <span>{jsDate.toString()}</span>
          </div>
        </div>
      </div>
    ),
  };

  const onChangeMultiple = {
    title: "onChange (multiple mode)",
    code: `<DatePicker
  multiple
  onChange={array => { //${translate("Array of Dateobjecs")}
    alert("${translate("selected dates")} :\\n" + array.join(",\\n"))
  }}
/>`,
    jsx: (
      <DatePicker
        multiple
        onChange={(array) => {
          alert(translate("selected dates") + " :\n" + array.join(",\n"));
        }}
        {...otherProps}
      />
    ),
  };

  const onOpen = {
    title: "OnOpen",
    description: "on_open",
    code: `const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false)
.
.
.
<div>
  <DatePicker
    onOpen={() => shouldOpenCalendar}
  ${
    language === "en"
      ? "/>"
      : `  calendar="persian"
    locale="fa"
    calendarPosition="auto-right"
  />`
  }
  <label>
    <input
      type="checkbox"
      checked={shouldOpenCalendar}
      onChange={() => setShouldOpenCalendar(!shouldOpenCalendar)}
    />
    ${translate("Should open calendar")}
  </label>
</div>`,
    jsx: (
      <div>
        <DatePicker onOpen={() => shouldOpenCalendar} {...otherProps} />
        <label>
          <input
            type="checkbox"
            checked={shouldOpenCalendar}
            onChange={() => setShouldOpenCalendar(!shouldOpenCalendar)}
          />
          {translate("Should open calendar")}
        </label>
      </div>
    ),
  };

  const onClose = {
    title: "OnClose",
    code: `const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false)
.
.
.
<div>
  <DatePicker
    onClose={() => shouldCloseCalendar}
  ${
    language === "en"
      ? "/>"
      : `  calendar="persian"
    locale="fa"
    calendarPosition="auto-right"
  />`
  }
  <label>
    <input
      type="checkbox"
      checked={shouldCloseCalendar}
      onChange={() => setShouldCloseCalendar(!shouldCloseCalendar)}
    />
    ${translate("Should close calendar")}
  </label>
</div>`,
    jsx: (
      <div>
        <DatePicker onClose={() => shouldCloseCalendar} {...otherProps} />
        <label>
          <input
            type="checkbox"
            checked={shouldCloseCalendar}
            onChange={() => setShouldCloseCalendar(!shouldCloseCalendar)}
          />
          {translate("Should close calendar")}
        </label>
      </div>
    ),
  };

  const onPositionChange = {
    title: "onPositionChange",
    description: "on_position_change",
    code: `<DatePicker
  onPositionChange={data => console.log(data)}
/>`,
    jsx: (
      <DatePicker
        onPositionChange={(data) => console.log(data)}
        {...otherProps}
      />
    ),
  };

  const onPropsChange = {
    title: "onPropsChange",
    description: "on_props_change",
    code: `const [props, setProps] = useState({ 
  value: new Date(),${
    language === "en"
      ? ""
      : `
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right"`
  }
});
.
.
.
<DatePicker 
  {...props} 
  onPropsChange={setProps} 
/> `,
    jsx: <DatePicker {...props} onPropsChange={setProps} />,
  };

  const onMonthChange = {
    title: "onMonthChange",
    description: "on_month_change",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Example() {
  const [dateObject, setDateObject] = useState(
    new DateObject(${
      language === "en"
        ? ""
        : `{
      calendar: "persian",
      locale: "fa"
    }`
    })
  );

  return (
    <>
      <DatePicker
        onMonthChange={(date) => setDateObject(new DateObject(date))}
        onChange={(date) => setDateObject(new DateObject(date))}
        currentDate={dateObject}
      />
      <p>${
        language === "en" ? "Selected Month" : "نام ماه انتخاب شده"
      }: {dateObject.month.name}</p>
    </>
  )
}`,
    jsx: (
      <>
        <DatePicker
          onMonthChange={(date) => setDateObject(new DateObject(date))}
          onChange={(date) => setDateObject(new DateObject(date))}
          currentDate={dateObject}
          {...otherProps}
        />
        <p>
          {language === "en" ? "Selected Month" : "نام ماه انتخاب شده"}:{" "}
          {dateObject.month.name}
        </p>
      </>
    ),
  };

  return [
    onChangeSingle,
    onChangeMultiple,
    onOpen,
    onClose,
    onPositionChange,
    onPropsChange,
    onMonthChange,
  ];
}
