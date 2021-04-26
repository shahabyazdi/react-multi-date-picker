import React from "react";
import DatePicker, { Calendar } from "../../../build/index";

export default function MapDays(translate, language, otherProps) {
  const description = {
    title: "Descriptions",
    jsx: (
      <div>
        <p>{translate("map_days_description_1")}</p>
        <p>{translate("map_days_description_2")}</p>
        <pre>
          <code className="language-jsx">
            {`<DatePicker
  mapDays={object => {
    return { props }
  }}
/>`}
          </code>
        </pre>
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
              <td>{translate("map_days_description_4")}</td>
            </tr>
            <tr>
              <td>today</td>
              <td>DateObject</td>
              <td></td>
            </tr>
            <tr>
              <td>selectedDate</td>
              <td>{translate("DateObject or Array")}</td>
              <td>{translate("map_days_description_5")}</td>
            </tr>
            <tr>
              <td>currentMonth</td>
              <td>Object</td>
              <td>
                <div
                  dangerouslySetInnerHTML={{
                    __html: translate("map_days_description_6"),
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td>isSameDate</td>
              <td>Function</td>
              <td>{translate("map_days_description_7")}</td>
            </tr>
          </tbody>
        </table>
        <p>{translate("map_days_description_8")}</p>
        <pre>
          <code className="language-jsx">{`{ date, today, selectedDate, currentMonth, isSameDate }`}</code>
        </pre>
        <p style={{ color: "red" }}>{translate("map_days_description_9")}</p>
        <p>{translate("map_days_description_10")}</p>
        <pre>
          <code className="language-jsx">
            {`<Calendar
  mapDays={({ date, today }) => {
    date.day = today.day
  }}
${
  language === "en"
    ? "/>"
    : `  calendar="persian"
  locale="fa"
/>`
}`}
          </code>
        </pre>
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
    code: `<DatePicker
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
    code: `<DatePicker
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
    ),
  };

  const highlight = {
    title: "Custom Highlight",
    code: `<DatePicker
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
    code: `<DatePicker
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
    code: `<DatePicker
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

  const title = {
    title: "Adding Tiltle to Days",
    description: "map_days_title",
    code: `<DatePicker
  mapDays={({ date, today }) => {
    let props = {}
    let result = date.dayOfBeginning - today.dayOfBeginning
    
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
          let result = date.dayOfBeginning - today.dayOfBeginning;

          if (result === -1) props.title = translate("Yesterday");
          if (result === 0) props.title = translate("Today");
          if (result === 1) props.title = translate("Tomorrow");

          return props;
        }}
        {...otherProps}
      />
    ),
  };

  return [description, style, weekends, highlight, disable, hide, title];
}
