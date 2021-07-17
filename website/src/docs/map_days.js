import React, { useState, useRef } from "react";
import DatePicker, { Calendar, DateObject } from "../../../build/index";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Link } from "gatsby";

export default function Doc({
  translate,
  language,
  otherProps,
  Code,
  localeImport,
}) {
  const description = {
    title: "Descriptions",
    jsx: (
      <div>
        <p>{translate("map_days_description_1")}</p>
        <p>{translate("map_days_description_2")}</p>
        <Code>
          {`<DatePicker
  mapDays={object => {
    return { props }
  }}
/>`}
        </Code>
        <p>{translate("map_days_description_3")}</p>
        <table>
          <thead>
            <tr>
              <th>{translate("Property")}</th>
              <th>{translate("Type")}</th>
              <th>{translate("Descriptions")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>date</td>
              <td>DateObject</td>
              <td>
                <p>{translate("map_days_description_4")}</p>
              </td>
            </tr>
            <tr>
              <td>today</td>
              <td>DateObject</td>
              <td></td>
            </tr>
            <tr>
              <td>selectedDate</td>
              <td>{translate("DateObject or Array")}</td>
              <td>
                <p>{translate("map_days_description_5")}</p>
              </td>
            </tr>
            <tr>
              <td>currentMonth</td>
              <td>Object</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${translate("map_days_description_6")}</p>`,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>isSameDate</td>
              <td>Function</td>
              <td>
                <p>{translate("map_days_description_7")}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <Code title="map_days_description_8">
          {`{ date, today, selectedDate, currentMonth, isSameDate }`}
        </Code>
        <p style={{ color: "red" }}>{translate("map_days_description_9")}</p>
        <Code title="map_days_description_10">
          {`<Calendar
  mapDays={({ date, today }) => {
    date.day = today.day
  }}
${
  language === "en"
    ? "/>"
    : `  calendar={persian}
  locale={persian_fa}
/>`
}`}
        </Code>
        <Calendar
          mapDays={({ date, today }) => {
            date.day = today.day;
          }}
          {...otherProps}
        />
        <p>{translate("map_days_description_11")}</p>
        <ul>
          <li>disabled</li>
          <li>hidden</li>
        </ul>
        <p>{translate("map_days_description_12")}</p>
      </div>
    ),
  };

  const style = {
    title: "Styling Days",
    code: `${localeImport}<DatePicker
  mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
    let props = {}
    
    props.style = {
      borderRadius: "3px",
      backgroundColor: date.month.index === currentMonth.index ? "#ccc" : ""
    }

    if (isSameDate(date, today)) props.style.color = "green"
    if (isSameDate(date, selectedDate)) props.style = {
      ...props.style,
      color: "#0074d9",
      backgroundColor: "#a5a5a5",
      fontWeight: "bold",
      border: "1px solid #777"
    }

    return props
  }}
/>`,
    jsx: (
      <DatePicker
        mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
          let props = {};

          props.style = {
            borderRadius: "3px",
            backgroundColor:
              date.month.index === currentMonth.index ? "#ccc" : "",
          };

          if (isSameDate(date, today)) props.style.color = "green";
          if (isSameDate(date, selectedDate))
            props.style = {
              ...props.style,
              color: "#0074d9",
              backgroundColor: "#a5a5a5",
              fontWeight: "bold",
              border: "1px solid #777",
            };

          return props;
        }}
        {...otherProps}
      />
    ),
  };

  const weekends = {
    title: "Styling Weekends",
    description: "map_days_weekends",
    code: `${localeImport}<DatePicker
  mapDays={({ date }) => {
    let props = {}
    let isWeekend = ${
      language === "en"
        ? "[0, 6].includes(date.weekDay.index)"
        : "date.weekDay.index === 6"
    }
    
    if (isWeekend) props.className = "highlight highlight-red"
    
    return props
  }}
/>`,
    jsx: (
      <>
        <DatePicker
          mapDays={({ date }) => {
            let props = {};
            let isWeekend = (language === "en" ? [0, 6] : [6]).includes(
              date.weekDay.index
            );

            if (isWeekend) props.className = "highlight highlight-red";

            return props;
          }}
          {...otherProps}
        />
        <h4>{translate("See Also")}:</h4>
        <Link
          to={
            language === "en"
              ? "/plugins/weekends/#weekends:-gregorian"
              : "../plugins/weekends/#%D8%A2%D8%AE%D8%B1-%D9%87%D9%81%D8%AA%D9%87-%D8%B4%D9%85%D8%B3%DB%8C"
          }
        >
          {language === "en"
            ? "plugins #weekends:-gregorian"
            : "پلاگین ها #آخر هفته شمسی"}
        </Link>
      </>
    ),
  };

  const highlight = {
    title: "Custom Highlight",
    code: `${localeImport}<DatePicker
  mapDays={({ date }) => {
    let color
    
    if ([4, 5, 6, 7].includes(date.day)) color = "green"
    if ([11, 12, 13, 14].includes(date.day)) color = "red"
    
    if (color) return { className: "highlight highlight-" + color }
  }}
/>`,
    jsx: (
      <DatePicker
        mapDays={({ date }) => {
          let color;

          if ([4, 5, 6, 7].includes(date.day)) color = "green";
          if ([11, 12, 13, 14].includes(date.day)) color = "red";

          if (color) return { className: `highlight highlight-${color}` };
        }}
        {...otherProps}
      />
    ),
  };

  const disable = {
    title: "Disabling Days",
    code: `${localeImport}<DatePicker
  mapDays={({ date }) => {
    let isWeekend = [0, 6].includes(date.weekDay.index)
    
    if (isWeekend) return {
      disabled: true,
      style: { color: "#ccc" },
      onClick: () => alert("${translate("weekends are disabled")}")
    }
  }}
/>`,
    jsx: (
      <DatePicker
        mapDays={({ date }) => {
          let isWeekend = [0, 6].includes(date.weekDay.index);

          if (isWeekend)
            return {
              disabled: true,
              style: { color: "#ccc" },
              onClick: () => alert(translate("weekends are disabled")),
            };
        }}
        {...otherProps}
      />
    ),
  };

  const hide = {
    title: "Hiding Days",
    code: `${localeImport}<DatePicker
  mapDays={({ date }) => {
    let props = {}
    
    if ([5, 10, 15, 20, 25].includes(date.day)) props.hidden = true
    
    return props
  }}
/>`,
    jsx: (
      <DatePicker
        mapDays={({ date }) => {
          let props = {};

          if ([5, 10, 15, 20, 25].includes(date.day)) props.hidden = true;

          return props;
        }}
        {...otherProps}
      />
    ),
  };

  const children = {
    title: "Multiple Day-Numbers With Different Calendars & Locales",
    description: (
      <>
        <p>{translate("children")}</p>
        <Code>
          {`import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";${
            language === "en"
              ? ""
              : `
import gregorian_en from "react-date-object/locales/gregorian_en";`
          }
.
.
.          
<Calendar
  className="multi-locale-days"
  mapDays={({ date }) => {
    const newDate = new DateObject(date).convert(${
      language === "en" ? "persian" : "undefined"
    }, ${language === "en" ? "persian_fa" : "gregorian_en"})

    return {
      children: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 10px",
            fontSize: "11px",
          }}
        >
          <div style={{ textAlign: "start" }}>{date.format("D")}</div>
          <div style={{ textAlign: "end" }}>{newDate.format("D")}</div>
        </div>
      ),
    };
  }}
${
  language === "en"
    ? "/>"
    : `  calendar={persian}
  locale={persian_fa}
/>`
}`}
        </Code>
        <Code title="style.css" className="language-css">
          {`.multi-locale-days .rmdp-day {
  width: 40px;
  height: 40px;
}`}
        </Code>
      </>
    ),
    jsx: (
      <Calendar
        className="multi-locale-days"
        mapDays={({ date }) => {
          const newDate = new DateObject(date).convert(
            language === "en" ? persian : undefined,
            language === "en" ? persian_fa : gregorian_en
          );

          return {
            children: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 10px",
                  fontSize: "11px",
                }}
              >
                <div style={{ textAlign: "start" }}>{date.format("D")}</div>
                <div style={{ textAlign: "end" }}>{newDate.format("D")}</div>
              </div>
            ),
          };
        }}
        {...otherProps}
      />
    ),
  };

  const title = {
    title: "Adding Tiltle to Days",
    description: "map_days_title",
    code: `${localeImport}<DatePicker
  mapDays={({ date, today }) => {
    let props = {}
    let result = date.toDays() - today.toDays()
    
    if (result === -1) props.title = "${translate("Yesterday")}"
    if (result === 0) props.title = "${translate("Today")}"
    if (result === 1) props.title = "${translate("Tomorrow")}"
    
    return props
  }}
/>`,
    jsx: (
      <DatePicker
        mapDays={({ date, today }) => {
          let props = {};
          let result = date.toDays() - today.toDays();

          if (result === -1) props.title = translate("Yesterday");
          if (result === 0) props.title = translate("Today");
          if (result === 1) props.title = translate("Tomorrow");

          return props;
        }}
        {...otherProps}
      />
    ),
  };

  const tooltip = {
    title: "Custom Tooltip",
    description: "tooltip",
    code: `import React, { useState, useRef } from "react";
import DatePicker from "react-multi-date-picker";
${
  language === "en"
    ? ""
    : `import persian from "react-date-object/calendars/persian:
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example(){
  return <DatePickerWithTooltip />
}

function DatePickerWithTooltip() {
  const [data, setData] = useState({});
  const ref = useRef();

  return (
    <>
      <DatePicker
        ref={ref}
        containerStyle={{ position: "relative" }}
        mapDays={({ date, today }) => {
          let result = date.toDays() - today.toDays();
          let title;

          if (result === -1) title = "Yesterday";
          if (result === 0) title = "Today";
          if (result === 1) title = "Tomorrow";

          return {
            onMouseOver: (e) => {
              let spanRect = e.target.getBoundingClientRect();
              let calendarRect = ref.current
                .querySelector(".rmdp-wrapper")
                .getBoundingClientRect();

              setData({
                ...data,
                left: spanRect.left - calendarRect.left,
                top: spanRect.top - calendarRect.top,
                visible: title ? true : false,
                title,
              });
            },
            onMouseLeave: () => {
              setData({
                ...data,
                visible: false,
                title,
              });
            },
          };
        }}
      ${
        language === "en"
          ? ">"
          : `  calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
      >`
      }
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 0 5px #ccc",
            borderRadius: "5px",
            padding: "3px 5px",
            fontSize: "14px",
            transform: ${"`"}translate($${"{data.left"}}px, $${"{data.top + 30"}}px)${"`"},
            visibility: data.visible ? "visible" : "hidden",
          }}
        >
          {data.title}
        </span>
      </DatePicker>
    </>
  );
}`,
    jsx: <DatePickerWithTooltip {...otherProps} />,
  };

  return [
    description,
    style,
    weekends,
    highlight,
    disable,
    hide,
    children,
    title,
    tooltip,
  ];
}

function DatePickerWithTooltip(props) {
  const [data, setData] = useState({});
  const ref = useRef();

  return (
    <>
      <DatePicker
        ref={ref}
        containerStyle={{ position: "relative" }}
        mapDays={({ date, today }) => {
          let result = date.toDays() - today.toDays();
          let title;

          if (result === -1) title = "Yesterday";
          if (result === 0) title = "Today";
          if (result === 1) title = "Tomorrow";

          return {
            onMouseOver: (e) => {
              let spanRect = e.target.getBoundingClientRect();
              let calendarRect = ref.current
                .querySelector(".rmdp-wrapper")
                .getBoundingClientRect();

              setData({
                ...data,
                left: spanRect.left - calendarRect.left,
                top: spanRect.top - calendarRect.top,
                visible: title ? true : false,
                title,
              });
            },
            onMouseLeave: () => {
              setData({
                ...data,
                visible: false,
                title,
              });
            },
          };
        }}
        {...props}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 0 5px #ccc",
            borderRadius: "5px",
            padding: "3px 5px",
            fontSize: "14px",
            transform: `translate(${data.left}px, ${data.top + 30}px)`,
            visibility: data.visible ? "visible" : "hidden",
          }}
        >
          {data.title}
        </span>
      </DatePicker>
    </>
  );
}
