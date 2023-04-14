import React, { useState } from "react";
import Selectors from "../selectors/selectors";
import DatePicker, { Calendar, DateObject } from "../../../../src";
import DatePanel from "../../../../plugins/date_panel";
import TimePicker from "../../../../plugins/time_picker";
import AnalogTimePicker from "../../../../plugins/analog_time_picker";
import list from "./quick_access";
import transition from "react-element-popper/animations/transition";
import { Link } from "gatsby";
import "./demo.css";

//other types
import InputIcon from "../../../../components/input_icon";
import Icon from "../../../../components/icon";
import Button from "../../../../components/button";

//gregorian calendar & locales
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_hi from "react-date-object/locales/gregorian_hi";

//persian calendar & locales
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_ar from "react-date-object/locales/persian_ar";
import persian_hi from "react-date-object/locales/persian_hi";

//arabic calendar & locales
import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";
import arabic_fa from "react-date-object/locales/arabic_fa";
import arabic_ar from "react-date-object/locales/arabic_ar";
import arabic_hi from "react-date-object/locales/arabic_hi";

//indian calendar & locales
import indian from "react-date-object/calendars/indian";
import indian_en from "react-date-object/locales/indian_en";
import indian_fa from "react-date-object/locales/indian_fa";
import indian_ar from "react-date-object/locales/indian_ar";
import indian_hi from "react-date-object/locales/indian_hi";

const calendars = { gregorian, persian, arabic, indian };
const locales = {
  gregorian_en,
  gregorian_fa,
  gregorian_ar,
  gregorian_hi,
  persian_en,
  persian_fa,
  persian_ar,
  persian_hi,
  arabic_en,
  arabic_fa,
  arabic_ar,
  arabic_hi,
  indian_en,
  indian_fa,
  indian_ar,
  indian_hi,
};
const types = {
  input_icon: <InputIcon />,
  icon: <Icon />,
  button: <Button />,
};

export default function Demo({ language = "en", translate }) {
  const [state, setState] = useState({
    value: new DateObject(),
    calendar: language === "fa" ? persian : gregorian,
    locale: language === "fa" ? persian_fa : gregorian_en,
    mustShowDates: true,
    calendarPosition: "bottom-center",
    numberOfMonths: 1,
    datePanelPosition: ["fa"].includes(language) ? "left" : "right",
    timePickerPosition: "bottom",
    weekStartDayIndex: 0,
    buttons: true,
    arrow: true,
    shadow: true,
    weekDays: "3",
    months: "2",
    highlightToday: "on",
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
    layout = "",
    arrow,
    buttons,
    hideMonth,
    hideYear,
    shadow,
    color = "",
    background = "",
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
    timePickerPosition,
    weekend,
    disableMonthPicker,
    disableYearPicker,
    displayWeekNumbers,
    weekPicker,
    highlightToday,
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

  let $weekend = {
    gregorian: [0, 6],
    persian: [6],
    arabic: [0, 6],
    indian: [0],
  };

  let isFullYear = type === "full-year";

  function getHeaderOrder() {
    switch (state.headerOrder) {
      case "mylr":
        return ["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"];
      case "lrmy":
        return ["LEFT_BUTTON", "RIGHT_BUTTON", "MONTH_YEAR"];
      default:
        return ["LEFT_BUTTON", "MONTH_YEAR", "RIGHT_BUTTON"];
    }
  }

  const props = {
    ...state,
    highlightToday: state.highlightToday === "on",
    headerOrder: getHeaderOrder(),
    type: undefined,
    className: [layout, color, background].join(" "),
    onChange: (value) => updateState("value", value),
    fixRelativePosition: true,
    fixMainPosition: true,
    weekStartDayIndex,
    weekDays: $weekDays[weekDays] || undefined,
    displayWeekNumbers,
    sort: true,
    months:
      months === "1"
        ? new DateObject({
            calendar: language === "en" ? undefined : persian,
            locale: language === "en" ? undefined : persian_fa,
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
    mapDays: ({ date }) => {
      if ($weekend[calendar.name].includes(date.weekDay.index)) {
        if (weekend === "highlight") {
          return {
            className: "highlight highlight-red",
          };
        }

        if (weekend === "disable") {
          return {
            disabled: true,
          };
        }
      }
    },
    render: types[type],
    plugins: [
      // <DatePanel
      //   position={datePanelPosition}
      //   disabled={
      //     (!multiple && !range && !weekPicker) ||
      //     ((multiple || range || weekPicker) && !mustShowDates) ||
      //     isFullYear ||
      //     numberOfMonths > 1
      //   }
      //   markFocused={(multiple || range) && ($timePicker || $analogTimePicker)}
      // />,
      // <TimePicker
      //   position={timePickerPosition}
      //   disabled={(!$timePicker && !$onlyTimePicker) || isFullYear}
      // />,
    ],
    animations: animation && [transition()],
  };

  const analogTimePicker = (
    <AnalogTimePicker
      position={language === "en" ? "right" : "left"}
      disabled={(!$analogTimePicker && !$onlyAnalogTimePicker) || isFullYear}
    />
  );

  if (language === "fa") {
    props.plugins.push(analogTimePicker);
  } else {
    props.plugins.unshift(analogTimePicker);
  }

  if (Array.isArray(value)) {
    value.forEach((date) => {
      if (
        $weekend[calendar.name].includes(date?.weekDay?.index) &&
        weekend === "highlight"
      ) {
        date.color = "red";
      } else {
        delete date.color;
      }
    });
  }

  return (
    <>
      <div className="calendar-demo">
        {["calendar", "full-year"].includes(type) ? (
          <Calendar {...props} fullYear={isFullYear} />
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
              value: calendar.name,
              onChange: (value) => {
                updateState({
                  calendar: calendars[value],
                  locale: locales[`${value}_${locale.name.split("_")[1]}`],
                });
              },
            },
            {
              title: "Locale",
              options: [
                ["English", "en"],
                ["Fa", "fa"],
                ["Ar", "ar"],
                ["Hindi", "hi"],
              ],
              value: locale.name.split("_")[1],
              onChange: (value) =>
                updateState("locale", locales[`${calendar.name}_${value}`]),
            },
            {
              title: "Other Pickers",
              disabled: isFullYear,
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
                  return !["$onlyTimePicker", "$onlyAnalogTimePicker"].includes(
                    value
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
                ["Multiple Range", "multipleRange"],
                ["Range (Week Picker)", "weekPicker"],
              ],
              value:
                !multiple && !range && !weekPicker
                  ? "single"
                  : multiple && range
                  ? "multipleRange"
                  : multiple
                  ? "multiple"
                  : weekPicker
                  ? "weekPicker"
                  : "range",
              onChange: (mode) => {
                let val = value;

                if (Array.isArray(value)) {
                  if (mode === "single") {
                    val = value.flat()[value.length - 1];
                  } else if (mode === "multiple") {
                    val = value.flat();
                  } else if (mode === "range" && Array.isArray(value[0])) {
                    val = value[0];
                  } else if (
                    mode === "multipleRange" &&
                    !Array.isArray(value[0])
                  ) {
                    val = [[value[0], value[1]].filter(Boolean)];
                  }
                } else if (mode === "weekPicker") {
                  val = [].concat(val)[0];
                  val = [
                    new DateObject(val).toFirstOfWeek(),
                    new DateObject(val).toLastOfWeek(),
                  ];
                }

                updateState({
                  multiple: mode === "multipleRange",
                  range: mode === "multipleRange",
                  weekPicker: false,
                  [mode]: true,
                  disableDayPicker: false,
                  $onlyTimePicker: false,
                  value: val,
                });
              },
            },
            {
              title: "Date panel",
              disabled:
                (!range && !multiple && !weekPicker) ||
                isFullYear ||
                numberOfMonths > 1,
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
                (!range && !multiple && !weekPicker) ||
                isFullYear ||
                numberOfMonths > 1 ||
                !mustShowDates,
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
              title: "TimePicker Position",
              disabled: !$timePicker || isFullYear,
              options: [
                ["Left", "left"],
                ["Right", "right"],
                ["Top", "top"],
                ["Bottom", "bottom"],
              ],
              value: timePickerPosition,
              onChange: (value) => updateState("timePickerPosition", value),
            },
            {
              title: "Type",
              options: [
                ["Calendar", "calendar"],
                ["Full Year Calendar", "full-year"],
                ["Input", "input"],
                ["Input-Icon", "input_icon"],
                ["Icon", "icon"],
                ["Button", "button"],
              ],
              value: type,
              onChange: (value) => {
                updateState("type", value);
                document.querySelector(".main").scrollTop = 0;
              },
            },
            {
              title: "Highlight Today",
              options: [
                ["On", "on"],
                ["Off", "off"],
              ],
              value: highlightToday,
              onChange: (value) => updateState("highlightToday", value),
            },
            {
              title: "Number Of Months",
              disabled:
                isFullYear ||
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
              disabled:
                onlyYearPicker ||
                onlyMonthPicker ||
                $onlyAnalogTimePicker ||
                $onlyTimePicker,
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
                locale: language === "en" ? undefined : persian_fa,
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
              disabled:
                isFullYear ||
                onlyYearPicker ||
                onlyMonthPicker ||
                $onlyAnalogTimePicker ||
                $onlyTimePicker,
              options: [
                ["Show", "show"],
                ["Hide", "hide"],
              ],
              value: hideWeekDays ? "hide" : "show",
              onChange: (value) =>
                updateState("hideWeekDays", value === "hide"),
            },
            {
              title: "Month Year Separator",
              options: [
                ["Default", ""],
                ["|", "|"],
                ["/", "/"],
              ],
              value: state.monthYearSeparator,
              onChange: (value) => updateState("monthYearSeparator", value),
            },
            {
              title: "Header Order",
              options: [
                ["Default", ""],
                ["Month Year Left Right", "mylr"],
                ["Left Right Month Year", "lrmy"],
              ],
              value: state.headerOrder,
              onChange: (value) => updateState("headerOrder", value),
            },
            {
              title: "Month",
              disabled:
                isFullYear ||
                onlyYearPicker ||
                $onlyAnalogTimePicker ||
                $onlyTimePicker,
              options: [
                ["Show", "show"],
                ["Hide", "hide"],
              ],
              value: hideMonth || onlyYearPicker ? "hide" : "show",
              onChange: (value) => updateState("hideMonth", value === "hide"),
            },
            {
              title: "Year",
              disabled: $onlyAnalogTimePicker || $onlyTimePicker,
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
              disabled:
                hideWeekDays ||
                onlyYearPicker ||
                onlyMonthPicker ||
                $onlyAnalogTimePicker ||
                $onlyTimePicker,
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
              disabled:
                hideMonth ||
                onlyYearPicker ||
                $onlyAnalogTimePicker ||
                $onlyTimePicker,
              options: [
                ["January, February, ...", "2"],
                ["Jan, Feb, ...", "1"],
              ],
              value: months,
              onChange: (value) => updateState("months", value),
            },
            {
              title: "Display Week Numbers",
              options: [
                ["Disable", "disable"],
                ["Enable", "enable"],
              ],
              value: displayWeekNumbers ? "enable" : "disable",
              onChange: (value) =>
                updateState("displayWeekNumbers", value === "enable"),
            },
            {
              title: "Weekend",
              disabled:
                onlyMonthPicker ||
                onlyYearPicker ||
                $onlyAnalogTimePicker ||
                $onlyTimePicker,
              options: [
                ["Default", "default"],
                ["Highlight", "highlight"],
                ["Disable", "disable"],
              ],
              value: weekend,
              onChange: (val) => {
                let date;

                if (multiple || range || Array.isArray(value)) {
                  date = value.filter((date) =>
                    $weekend[calendar.name].includes(date?.weekDay?.index) &&
                    val === "disable"
                      ? false
                      : true
                  );
                } else {
                  date =
                    $weekend[calendar.name].includes(value?.weekDay?.index) &&
                    val === "disable"
                      ? null
                      : value;
                }

                updateState({
                  weekend: val,
                  value: date,
                });
              },
            },
            {
              title: "Month Picker Header",
              options: [
                ["Enable", "enable"],
                ["Disable", "disable"],
              ],
              value: disableMonthPicker ? "disable" : "enable",
              onChange: (value) =>
                updateState("disableMonthPicker", value === "disable"),
            },
            {
              title: "Year Picker Header",
              options: [
                ["Enable", "enable"],
                ["Disable", "disable"],
              ],
              value: disableYearPicker ? "disable" : "enable",
              onChange: (value) =>
                updateState("disableYearPicker", value === "disable"),
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
              disabled:
                ["calendar", "full-year"].includes(type) ||
                layout === "rmdp-mobile",
            },
            {
              title: "Animation",
              options: [
                ["OFF", "off"],
                ["ON", "on"],
              ],
              value: animation ? "on" : "off",
              onChange: (value) => updateState("animation", value === "on"),
              disabled:
                ["calendar", "full-year"].includes(type) ||
                layout === "rmdp-mobile",
            },
          ]}
        />
      </div>

      <h3>{translate("Descriptions")}:</h3>
      <ul>
        {translate("demo_descriptions").map((description, index) => (
          <li key={index}>{description}</li>
        ))}
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
