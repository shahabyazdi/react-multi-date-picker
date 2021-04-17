import React, { useState } from "react";
import Selectors from "../selectors/selectors";
import DatePicker, { Calendar, DateObject } from "../../../../build/index";
import DatePanel from "../../../../plugins/date_panel";
import { Link } from "gatsby";
import "./demo.css";
import list from "./quick_access";

export default function Demo({ language = "en", translate }) {
  const [state, setState] = useState({
    value: new Date(),
    calendar: language === "fa" ? "persian" : "gregorian",
    locale: language,
    mustShowDates: true,
    calendarPosition: "bottom-center",
    numberOfMonths: 1,
    datePanelPosition: ["fa"].includes(language) ? "left" : "right",
    weekStartDayIndex: 0,
  });

  const {
    type = "calendar",
    value,
    calendar,
    locale,
    multiple,
    range,
    timePicker,
    onlyTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    layout,
    color,
    background,
    showOtherDays,
    mustShowDates,
    calendarPosition,
    animation,
    numberOfMonths,
    datePanelPosition,
    weekStartDayIndex,
  } = state;

  const updateState = (key, value) => {
    if (typeof key === "object") {
      setState({ ...state, ...key });
    } else {
      setState({ ...state, [key]: value });
    }
  };

  const props = {
    ...state,
    className: `${layout} ${color} ${background}`,
    onChange: (dateObject) => updateState("value", dateObject),
    fixRelativePosition: true,
    fixMainPosition: true,
    weekStartDayIndex,
    plugins: [
      <DatePanel
        sort="date"
        position={datePanelPosition}
        disabled={
          (!multiple && !range) ||
          ((multiple || range) && !mustShowDates) ||
          numberOfMonths > 1
        }
      />,
    ],
  };

  return (
    <>
      <div className="calendar-demo">
        {type === "calendar" ? (
          <Calendar {...props} />
        ) : (
          <DatePicker {...props} />
        )}
      </div>

      <Selectors
        translate={translate}
        selectors={[
          {
            title: "Calendar",
            options: [
              ["Gregorian", "gregorian"],
              ["Persian", "persian"],
              ["Arabic", "arabic"],
              ["Indian", "indian"],
            ],
            value: calendar,
            onChange: (value) => updateState("calendar", value),
          },
          {
            title: "Locale",
            options: [
              ["English", "en"],
              ["Fa", "fa"],
              ["Ar", "ar"],
              ["Hindi", "hi"],
            ],
            value: locale,
            onChange: (value) => updateState("locale", value),
          },
          {
            title: "Mode",
            options: [
              ["Single", "single"],
              ["Multiple", "multiple"],
              ["Range", "range"],
            ],
            value:
              !multiple && !range ? "single" : multiple ? "multiple" : "range",
            onChange: (mode) =>
              updateState({
                multiple: false,
                range: false,
                [mode]: true,
                value:
                  Array.isArray(value) && mode === "single"
                    ? value[value.length - 1]
                    : value,
              }),
          },
          {
            title: "Other Pickers",
            options: [
              ["Disable", "disable"],
              ["Time Picker", "timePicker"],
              ["Only Time Picker", "onlyTimePicker"],
              ["Only Month Picker", "onlyMonthPicker"],
              ["Only Year Picker", "onlyYearPicker"],
            ].filter(([text, value]) => {
              if (!multiple && !range) {
                return true;
              } else {
                return !["timePicker", "onlyTimePicker"].includes(value);
              }
            }),
            value:
              !timePicker &&
              !onlyTimePicker &&
              !onlyMonthPicker &&
              !onlyYearPicker
                ? "disable"
                : timePicker
                ? "timePicker"
                : onlyTimePicker
                ? "onlyTimePicker"
                : onlyMonthPicker
                ? "onlyMonthPicker"
                : "onlyYearPicker",
            onChange: (picker) =>
              updateState({
                timePicker: false,
                onlyTimePicker: false,
                onlyMonthPicker: false,
                onlyYearPicker: false,
                [picker]: true,
              }),
          },
          {
            title: "Number Of Months",
            options: [
              ["1", 1],
              ["2", 2],
              ["3", 3],
            ],
            value: numberOfMonths,
            onChange: (value) => updateState("numberOfMonths", Number(value)),
          },
          {
            title: "Type",
            options: [
              ["Calendar", "calendar"],
              ["Input", "input"],
              ["Input-Icon", "input-icon"],
              ["Icon", "icon"],
              ["Button", "button"],
            ],
            value: type,
            onChange: (value) => updateState("type", value),
          },
          {
            title: "Dates panel",
            disabled: (!range && !multiple) || numberOfMonths > 1,
            options: [
              ["Enable", "enable"],
              ["Disable", "disable"],
            ],
            value: mustShowDates ? "enable" : "disable",
            onChange: (value) =>
              updateState("mustShowDates", value === "enable"),
          },
          {
            title: "DatePanel Position",
            disabled: (!range && !multiple) || numberOfMonths > 1,
            options: [
              ["Left", "left"],
              ["Right", "right"],
              ["Top", "top"],
              ["Bottom", "bottom"],
            ],
            value: datePanelPosition,
            onChange: (value) => updateState("datePanelPosition", value),
          },
          {
            title: "Layout",
            options: [
              ["Default", ""],
              ["Prime", "rmdp-prime"],
              ["Mobile", "rmdp-mobile"],
            ],
            value: layout,
            onChange: (value) => updateState("layout", value),
          },
          {
            title: "Other Days",
            options: [
              ["Enable", "enable"],
              ["Disable", "disable"],
            ],
            value: showOtherDays ? "enable" : "disable",
            onChange: (value) =>
              updateState("showOtherDays", value === "enable"),
          },
          {
            title: "First Day Of Week",
            options: new DateObject({
              calendar,
              locale: language,
            }).weekDays.map((weekDay, index) => [weekDay.name, index]),
            value: weekStartDayIndex,
            disabled: onlyTimePicker || onlyMonthPicker || onlyYearPicker,
            onChange: (value) =>
              updateState("weekStartDayIndex", Number(value)),
          },
          {
            title: "Colors",
            options: [
              ["Default", ""],
              ["Green", "green"],
              ["Red", "red"],
              ["Yellow", "yellow"],
              ["Purple", "purple"],
              ["Teal", "teal"],
            ],
            value: color,
            onChange: (value) => updateState("color", value),
          },
          {
            title: "BackGrounds",
            options: [
              ["Default", ""],
              ["Dark", "bg-dark"],
              ["Gray", "bg-gray"],
              ["Brown", "bg-brown"],
            ],
            value: background,
            onChange: (value) => updateState("background", value),
          },
          {
            title: "Calendar Position",
            options: [
              ["Bottom Left", "bottom-left"],
              ["Bottom Center", "bottom-center"],
              ["Bottom Right", "bottom-right"],
              ["Top Left", "top-left"],
              ["Top Center", "top-center"],
              ["Right Top", "right-top"],
              ["Right Center", "right-center"],
              ["Right Bottom", "right-bottom"],
              ["Left Top", "left-top"],
              ["Left Center", "left-center"],
              ["Left Bottom", "left-bottom"],
            ],
            value: calendarPosition,
            onChange: (value) => updateState("calendarPosition", value),
            disabled: type === "calendar" || layout === "rmdp-mobile",
          },
          {
            title: "Animation",
            options: [
              ["OFF", "off"],
              ["ON", "on"],
            ],
            value: animation ? "on" : "off",
            onChange: (value) => updateState("animation", value === "on"),
            disabled: type === "calendar" || layout === "rmdp-mobile",
          },
        ]}
      />

      <h3>{translate("Descriptions")}:</h3>
      <ul>
        {translate("demo_descriptions").map((description, index) => {
          return <li key={index}>{description}</li>;
        })}
      </ul>

      <h3>{translate("Quick Access")} :</h3>
      {getList(list)}
    </>
  );

  function getList(list) {
    return (
      <ul className="quick-access">
        {list.map((item, index) => {
          let path = item.path;

          if (language === "fa") {
            path = item.path.replace(
              /#.*$/,
              "#" + translate(item.name).replace(/\s/g, "-")
            );
          }

          return (
            <li key={index}>
              <Link to={path}>{translate(item.name)}</Link>
              {item.list && getList(item.list)}
            </li>
          );
        })}
      </ul>
    );
  }
}
