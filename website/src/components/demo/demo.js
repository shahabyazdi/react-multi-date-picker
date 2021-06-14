import React, { useState } from "react";
import Selectors from "../selectors/selectors";
import DatePicker, { Calendar, DateObject } from "../../../../build/index";
import DatePanel from "../../../../plugins/date_panel";
import TimePicker from "../../../../plugins/time_picker";
import AnalogTimePicker from "../../../../plugins/analog_time_picker";
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
    buttons: true,
    arrow: true,
    shadow: true,
    weekDays: "3",
    months: "2",
  });

  const {
    type = "calendar",
    value,
    calendar,
    locale,
    multiple,
    range,
    $timePicker,
    $onlyTimePicker,
    $analogTimePicker,
    $onlyAnalogTimePicker,
    onlyMonthPicker,
    onlyYearPicker,
    layout,
    arrow,
    buttons,
    hideMonth,
    hideYear,
    shadow,
    color,
    background,
    showOtherDays,
    mustShowDates,
    calendarPosition,
    animation,
    numberOfMonths,
    datePanelPosition,
    weekStartDayIndex,
    weekDays,
    months,
    hideWeekDays,
  } = state;

  const updateState = (key, value) => {
    if (typeof key === "object") {
      setState({ ...state, ...key });
    } else {
      setState({ ...state, [key]: value });
    }
  };

  let gregorianWeekDays = {
    2: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
    1: ["S", "M", "T", "W", "T", "F", "S"],
  };

  let persianWeekDays = {
    2: ["شن", "یک", "دو", "سه", "چه", "پن", "جم"],
    1: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  };

  let $weekDays = language === "en" ? gregorianWeekDays : persianWeekDays;

  const props = {
    ...state,
    className: `${layout} ${color} ${background}`,
    onChange: (dateObject) => updateState("value", dateObject),
    fixRelativePosition: true,
    fixMainPosition: true,
    weekStartDayIndex,
    weekDays: $weekDays[weekDays] || undefined,
    months:
      months === "1"
        ? new DateObject({
            calendar: language === "en" ? "gregorian" : "persian",
            locale: language,
          }).months.map(({ shortName }) => shortName)
        : undefined,
    format:
      (multiple || range) && !$timePicker && !$analogTimePicker
        ? undefined
        : $timePicker || $analogTimePicker
        ? "YYYY/MM/DD HH:mm:ss"
        : $onlyTimePicker || $onlyAnalogTimePicker
        ? "HH:mm:ss"
        : undefined,
    plugins: [
      <DatePanel
        sort="date"
        position={datePanelPosition}
        disabled={
          (!multiple && !range) ||
          ((multiple || range) && !mustShowDates) ||
          numberOfMonths > 1
        }
        markFocused={(multiple || range) && ($timePicker || $analogTimePicker)}
      />,
      <TimePicker
        position="bottom"
        disabled={!$timePicker && !$onlyTimePicker}
      />,
    ],
  };

  const analogTimePicker = (
    <AnalogTimePicker
      position={language === "en" ? "right" : "left"}
      disabled={!$analogTimePicker && !$onlyAnalogTimePicker}
    />
  );

  if (language === "fa") {
    props.plugins.push(analogTimePicker);
  } else {
    props.plugins.unshift(analogTimePicker);
  }

  return (
    <>
      <div className="calendar-demo">
        {type === "calendar" ? (
          <Calendar {...props} />
        ) : (
          <DatePicker {...props} />
        )}
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              title: "Other Pickers",
              options: [
                ["Disable", "disable"],
                ["Time Picker", "$timePicker"],
                ["Only Time Picker", "$onlyTimePicker"],
                ["Analog Time Picker", "$analogTimePicker"],
                ["Only Analog Time Picker", "$onlyAnalogTimePicker"],
                ["Only Month Picker", "onlyMonthPicker"],
                ["Only Year Picker", "onlyYearPicker"],
              ].filter(([text, value]) => {
                if (!multiple && !range) {
                  return true;
                } else {
                  return (
                    value !== "$onlyTimePicker" &&
                    value !== "$onlyAnalogTimePicker"
                  );
                }
              }),
              value:
                !$timePicker &&
                !$onlyTimePicker &&
                !$analogTimePicker &&
                !$onlyAnalogTimePicker &&
                !onlyMonthPicker &&
                !onlyYearPicker
                  ? "disable"
                  : $timePicker
                  ? "$timePicker"
                  : $onlyTimePicker
                  ? "$onlyTimePicker"
                  : $analogTimePicker
                  ? "$analogTimePicker"
                  : $onlyAnalogTimePicker
                  ? "$onlyAnalogTimePicker"
                  : onlyMonthPicker
                  ? "onlyMonthPicker"
                  : "onlyYearPicker",
              onChange: (picker) =>
                updateState({
                  $timePicker: false,
                  $onlyTimePicker: false,
                  $analogTimePicker: false,
                  $onlyAnalogTimePicker: false,
                  onlyMonthPicker: false,
                  onlyYearPicker: false,
                  disableDayPicker:
                    picker === "$onlyTimePicker" ||
                    picker === "$onlyAnalogTimePicker",
                  [picker]: true,
                }),
            },
            {
              title: "Mode",
              options: [
                ["Single", "single"],
                ["Multiple", "multiple"],
                ["Range", "range"],
              ],
              value:
                !multiple && !range
                  ? "single"
                  : multiple
                  ? "multiple"
                  : "range",
              onChange: (mode) =>
                updateState({
                  multiple: false,
                  range: false,
                  [mode]: true,
                  disableDayPicker: false,
                  $onlyTimePicker: false,
                  // $timePicker: false,
                  value:
                    Array.isArray(value) && mode === "single"
                      ? value[value.length - 1]
                      : value,
                }),
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
              disabled:
                (!range && !multiple) || numberOfMonths > 1 || !mustShowDates,
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
              title: "Number Of Months",
              disabled:
                $onlyTimePicker ||
                $onlyAnalogTimePicker ||
                onlyMonthPicker ||
                onlyYearPicker,
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
              disabled: $onlyTimePicker || onlyMonthPicker || onlyYearPicker,
              onChange: (value) =>
                updateState("weekStartDayIndex", Number(value)),
            },
            {
              title: "Arrow",
              disabled: type === "calendar" || layout === "rmdp-mobile",
              options: [
                ["Enable", "enable"],
                ["Disable", "disable"],
              ],
              value: arrow ? "enable" : "disable",
              onChange: (value) => updateState("arrow", value === "enable"),
            },
            {
              title: "Navigate Buttons",
              options: [
                ["Enable", "enable"],
                ["Disable", "disable"],
              ],
              value: buttons ? "enable" : "disable",
              onChange: (value) => updateState("buttons", value === "enable"),
            },
            {
              title: "Week Days",
              options: [
                ["Show", "show"],
                ["Hide", "hide"],
              ],
              value: hideWeekDays ? "hide" : "show",
              onChange: (value) =>
                updateState("hideWeekDays", value === "hide"),
            },
            {
              title: "Month",
              options: [
                ["Show", "show"],
                ["Hide", "hide"],
              ],
              value: hideMonth || onlyYearPicker ? "hide" : "show",
              onChange: (value) => updateState("hideMonth", value === "hide"),
            },
            {
              title: "Year",
              options: [
                ["Show", "show"],
                ["Hide", "hide"],
              ],
              value: hideYear ? "hide" : "show",
              onChange: (value) => updateState("hideYear", value === "hide"),
            },
            {
              title: "Shadow",
              options: [
                ["Enable", "enable"],
                ["Disable", "disable"],
              ],
              value: shadow ? "enable" : "disable",
              onChange: (value) => updateState("shadow", value === "enable"),
            },
            {
              title: "Days Of Week",
              options: [
                ["SUN, MON, ...", "3"],
                ["SU, MO, ...", "2"],
                ["S, M, ...", "1"],
              ],
              value: weekDays,
              onChange: (value) => updateState("weekDays", value),
            },
            {
              title: "Months",
              options: [
                ["January, February, ...", "2"],
                ["Jan, Feb, ...", "1"],
              ],
              value: months,
              onChange: (value) => updateState("months", value),
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
      </div>

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
              "#" + translate(item.name).toLowerCase().replace(/\s/g, "-")
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
