import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../build/index";
import DatePanel from "../../../plugins/date_panel";
import fa from "react-date-object/locales/persian_fa";
import { Link } from "gatsby";

export default function Doc({ translate, language, otherProps }) {
  const [state, setState] = useState({ format: "MM/DD/YYYY" });
  const [props, setProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
    ...otherProps,
  });
  const [dateObject, setDateObject] = useState(
    new DateObject({
      calendar: language === "en" ? "gregorian" : "persian",
      locale: language === "fa" ? fa : undefined,
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
  const [dates, setDates] = useState({});
  const [value, setValue] = useState();

  function updateValue({ year, month }) {
    setValue(
      new DateObject(value).set({
        day: value.day > month.length ? month.length : value.day,
        month,
        year,
      })
    );
  }

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
  value: new Date(),
  format: "MM-DD-YYYY",
  onChange: (date) => console.log(date.format()),${
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

  const onYearChange = {
    title: "onYearChange",
    description: "on_year_change",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Example() {
  const [value, setValue] = useState();

  return (
    <DatePicker
      value={value}
      onChange={setValue}
      onYearChange={updateValue}
      onMonthChange={updateValue}
    />
  )

  function updateValue({ year, month }) {
    setValue(
      new DateObject(value).set({
        day: value.day > month.length ? month.length : value.day,
        month,
        year,
      })
    );
  }
}`,
    jsx: (
      <DatePicker
        value={value}
        onChange={setValue}
        onYearChange={updateValue}
        onMonthChange={updateValue}
        {...otherProps}
      />
    ),
  };

  const onFocusedDateChange = {
    title: "onFocusedDateChange",
    description: (
      <>
        {translate("focus_event_1").map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <ol>
          {translate("focus_event_2").map((text, index) => (
            <li key={index}>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        {translate("focus_event_3").map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <ul>
          {translate("focus_event_4").map((text, index) => (
            <li key={index}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
        <p>{translate("focus_event_5")}</p>
        <ul>
          <li>
            <p style={{ fontWeight: "bold" }}>{translate("focus_event_6")}</p>
            <ul>
              {translate("focus_event_7").map((text, index) => (
                <li key={index}>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p style={{ fontWeight: "bold" }}>{translate("focus_event_8")}</p>
            <ul>
              <li>
                <p>{translate("focus_event_9")}</p>
              </li>
              <li>
                <p>{translate("focus_event_10")}</p>
              </li>
              <li>
                <p>{translate("focus_event_11")}</p>
                <ul>
                  {translate("focus_event_12").map((text, index) => (
                    <li key={index}>
                      <p>{text}</p>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <p style={{ fontWeight: "bold" }}>{translate("focus_event_13")}</p>
            <ul>
              {translate("focus_event_14").map((text, index) => (
                <li key={index}>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </>
    ),
    code: `import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
.
.
.
const [state, setState] = useState({});
.
.
.
<>
  <DatePicker
    multiple
    onFocusedDateChange={(dateFocused, dateClicked) => {
      setState({ dateFocused, dateClicked });
    }}
    onClose={() => setState({})}
    plugins={[<DatePanel markFocused />]}
    ${
      language === "en"
        ? ""
        : `calendar="persian"
    locale="fa"
    calendarPosition="bottom-left"`
    }
  />
  <div>
    <p>
      <b>Date focused:</b> {state.dateFocused?.format?.()}
    </p>
    <p>
      <b>Date clicked:</b> {state.dateClicked?.format?.()}
    </p>
  </div>
</> `,
    jsx: (
      <>
        <DatePicker
          multiple
          onFocusedDateChange={(dateFocused, dateClicked) => {
            setDates({ dateFocused, dateClicked });
          }}
          onClose={() => setDates({})}
          plugins={[<DatePanel markFocused />]}
          {...otherProps}
        />
        <div>
          <p>
            <b>{translate("Date focused")}:</b> {dates.dateFocused?.format?.()}
          </p>
          <p>
            <b>{translate("Date clicked")}:</b> {dates.dateClicked?.format?.()}
          </p>
        </div>
        <h4>{translate("See Also")}:</h4>
        <Link
          to={
            language === "en"
              ? "../plugins/panel/#customizing-focused-date"
              : "../plugins/panel/#%D8%B4%D8%AE%D8%B5%DB%8C-%D8%B3%D8%A7%D8%B2%DB%8C-%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE-%D9%85%D8%AA%D9%85%D8%B1%DA%A9%D8%B2-%D8%B4%D8%AF%D9%87"
          }
        >
          {language === "en"
            ? "DatePanel #customizing-focused-date"
            : "پنل تاریخ ها #شخصی سازی تاریخ متمرکز شده"}
        </Link>
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
    onYearChange,
    onFocusedDateChange,
  ];
}
