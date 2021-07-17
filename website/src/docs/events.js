import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../build/index";
import DatePanel from "../../../plugins/date_panel";
import { Link } from "gatsby";

//gregorian calendar & locale
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

//persian calendar & locale
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";

//arabic calendar & locale
import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";
import arabic_fa from "react-date-object/locales/arabic_fa";

//indian calendar & locale
import indian from "react-date-object/calendars/indian";
import indian_en from "react-date-object/locales/indian_en";
import indian_fa from "react-date-object/locales/indian_fa";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const [state, setState] = useState({ format: "MM/DD/YYYY" });
  const [props, setProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
    ...otherProps,
  });
  const [dateObject, setDateObject] = useState(new DateObject(otherProps));

  const convert = (date, format = state.format) => {
    let object = { date, format };

    setState({
      gregorian: new DateObject(object)
        .convert(gregorian, language === "en" ? gregorian_en : gregorian_fa)
        .format(),
      persian: new DateObject(object)
        .convert(persian, language === "en" ? persian_en : persian_fa)
        .format(),
      arabic: new DateObject(object)
        .convert(arabic, language === "en" ? arabic_en : arabic_fa)
        .format(),
      indian: new DateObject(object)
        .convert(indian, language === "en" ? indian_en : indian_fa)
        .format(),
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
  const [value1, setValue1] = useState();

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
    code: `import { useState } from "react"
import DatePicker from "react-multi-date-picker"
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  const [value, setValue] = useState()
  
  return (
    <>
      <DatePicker
        value={value}
        onChange={setValue}
      ${
        language === "en"
          ? "/>"
          : `  calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
      />`
      }
      {value?.toDate?.().toString()}
    </>
  )
}`,
    jsx: (
      <>
        <DatePicker value={value1} onChange={setValue1} {...otherProps} />
        {value1?.toDate?.().toString?.()}
      </>
    ),
  };

  const onChangeConvert = {
    title: "onChange (Converting Selected Date To All Calendars)",
    code: `//gregorian calendar & locale
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_${language} from "react-date-object/locales/gregorian_${language}";

//persian calendar & locale
import persian from "react-date-object/calendars/persian";
import persian_${language} from "react-date-object/locales/persian_${language}";

//arabic calendar & locale
import arabic from "react-date-object/calendars/arabic";
import arabic_${language} from "react-date-object/locales/arabic_${language}";

//indian calendar & locale
import indian from "react-date-object/calendars/indian";
import indian_${language} from "react-date-object/locales/indian_${language}";
.
.
.
const [state, setState] = useState({ format: "MM/DD/YYYY" })
  
const convert = (date, format = state.format) => {
  let object = { date, format }
  
  setState({
    gregorian: new DateObject(object)${
      language === "en" ? "" : `.convert(gregorian, gregorian_${language})`
    }.format(),
    persian: new DateObject(object)${
      language === "en" ? `.convert(persian, persian_${language})` : ""
    }.format(),
    arabic: new DateObject(object).convert(arabic, arabic_${language}).format(),
    indian: new DateObject(object).convert(indian, indian_${language}).format(),
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
          value={state.date}
          onChange={convert}
        ${
          language === "en"
            ? "/>"
            : `  calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />`
        }
      </div>
      <div>
        <Span>${translate("format")}: </Span>
        <select
          value={state.format}
          onChange={e => convert(state.date, e.target.value)}
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
        <span>{state.gregorian}</span>
      </div>
      <div>
        <Span>${translate("persian")}: </Span>
        <span>{state.persian}</span>
      </div>
      <div>
        <Span>${translate("arabic")}: </Span>
        <span>{state.arabic}</span>
      </div>
      <div>
        <Span>${translate("indian")}: </Span>
        <span>{state.indian}</span>
      </div>
      <div>
        <Span>${translate("javascript date")}: </Span>
        <span>{state.jsDate?.toString?.()}</span>
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
            <DatePicker value={state.date} onChange={convert} {...otherProps} />
          </div>
          <div>
            <Span>{translate("format")}: </Span>
            <select
              value={state.format}
              onChange={(e) => convert(state.date, e.target.value)}
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
            <span>{state.gregorian}</span>
          </div>
          <div>
            <Span>{translate("persian")}: </Span>
            <span>{state.persian}</span>
          </div>
          <div>
            <Span>{translate("arabic")}: </Span>
            <span>{state.arabic}</span>
          </div>
          <div>
            <Span>{translate("indian")}: </Span>
            <span>{state.indian}</span>
          </div>
          <div>
            <Span>{translate("javascript date")}: </Span>
            <span>{state.jsDate?.toString?.()}</span>
          </div>
        </div>
      </div>
    ),
  };

  const onChangeMultiple = {
    title: "onChange (multiple mode)",
    code: `${localeImport}<DatePicker
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
    code: `${localeImport}const [shouldOpenCalendar, setShouldOpenCalendar] = useState(false)
.
.
.
<div>
  <DatePicker
    onOpen={() => shouldOpenCalendar}
  ${
    language === "en"
      ? "/>"
      : `  calendar={persian}
    locale={persian_fa}
    calendarPosition="bottom-right"
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
    code: `${localeImport}const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false)
.
.
.
<div>
  <DatePicker
    onClose={() => shouldCloseCalendar}
  ${
    language === "en"
      ? "/>"
      : `  calendar={persian}
    locale={persian_fa}
    calendarPosition="bottom-right"
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
    code: `${localeImport}<DatePicker
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
    code: `${localeImport}const [props, setProps] = useState({ 
  value: new Date(),
  format: "MM-DD-YYYY",
  onChange: (date) => console.log(date.format()),${
    language === "en"
      ? ""
      : `
  calendar: persian,
  locale: persian_fa,
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
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  const [dateObject, setDateObject] = useState(
    new DateObject(${
      language === "en"
        ? ""
        : `{
      calendar: persian,
      locale: persian_fa
    }`
    })
  );

  return (
    <>
      <DatePicker
        onMonthChange={(date) => setDateObject(new DateObject(date))}
        onChange={(date) => setDateObject(new DateObject(date))}
        currentDate={dateObject}${
          language === "en"
            ? ""
            : `
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"`
        }
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
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  const [value, setValue] = useState();

  return (
    <DatePicker
      value={value}
      onChange={setValue}
      onYearChange={updateValue}
      onMonthChange={updateValue}${
        language === "en"
          ? ""
          : `
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"`
      }
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
${localeImport}${
      language === "en"
        ? `.
.
.
`
        : ""
    }const [state, setState] = useState({});
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
        : `calendar={persian}
    locale={persian_fa}
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
    onChangeConvert,
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
