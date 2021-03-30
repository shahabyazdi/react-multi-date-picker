import React, { useState } from "react"
import Selectors from "../selectors/selectors"
import DatePicker, { Calendar } from "../../../../build/index"
import DatePanel from "../../../../plugins/date_panel"
import "./demo.css"

export default function Demo({ language = "en", translate }) {
  const [state, setState] = useState({
    value: new Date(),
    calendar: language === "fa" ? "persian" : "gregorian",
    locale: language,
    mustShowDates: true,
    calendarPosition: "bottom-center",
    numberOfMonths: 1,
    datePanelPosition: ["fa"].includes(language) ? "left" : "right"
  })

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
    datePanelPosition
  } = state

  const updateState = (key, value) => {
    if (typeof key === "object") {
      setState({ ...state, ...key })
    } else {
      setState({ ...state, [key]: value })
    }
  }
  console.log((!multiple && !range), (multiple || range), !mustShowDates, numberOfMonths > 1);
  const props = {
    ...state,
    className: `${layout} ${color} ${background}`,
    onChange: dateObject => updateState("value", dateObject),
    fixRelativePosition: true,
    fixMainPosition: true,
    plugins: [
      <DatePanel
        sort="date"
        position={datePanelPosition}
        disabled={(!multiple && !range) || ((multiple || range) && !mustShowDates) || numberOfMonths > 1}
      />
    ]
  }

  return (
    <>
      <div className="calendar-demo">
        {type === "calendar" ?
          <Calendar {...props} />
          :
          <DatePicker {...props} />
        }
      </div>

      <Selectors
        selectors={[
          {
            title: translate("Calendar"),
            options: [
              [translate("Gregorian"), "gregorian"],
              [translate("Persian"), "persian"],
              [translate("Arabic"), "arabic"],
              [translate("Indian"), "indian"],
            ],
            value: calendar,
            onChange: value => updateState("calendar", value)
          },
          {
            title: translate("Locale"),
            options: [
              [translate("English"), "en"],
              [translate("Fa"), "fa"],
              [translate("Ar"), "ar"],
              [translate("Hindi"), "hi"],
            ],
            value: locale,
            onChange: value => updateState("locale", value)
          },
          {
            title: translate("Mode"),
            options: [
              [translate("Single"), "single"],
              [translate("Multiple"), "multiple"],
              [translate("Range"), "range"],
            ],
            value: !multiple && !range
              ? "single"
              : multiple
                ? "multiple"
                : "range"
            ,
            onChange: mode => updateState({
              multiple: false,
              range: false,
              [mode]: true,
              value: Array.isArray(value) && mode === "single" ? value[value.length - 1] : value
            })
          },
          {
            title: translate("Other Pickers"),
            options: [
              [translate("Disable"), "disable"],
              [translate("Time Picker"), "timePicker"],
              [translate("Only Time Picker"), "onlyTimePicker"],
              [translate("Only Month Picker"), "onlyMonthPicker"],
              [translate("Only Year Picker"), "onlyYearPicker"],
            ].filter(([text, value]) => {
              if (!multiple && !range) {
                return true
              } else {
                return !["timePicker", "onlyTimePicker"].includes(value)
              }
            }),
            value: !timePicker && !onlyTimePicker && !onlyMonthPicker && !onlyYearPicker ? "disable"
              : timePicker ? "timePicker"
                : onlyTimePicker ? "onlyTimePicker"
                  : onlyMonthPicker ? "onlyMonthPicker"
                    : "onlyYearPicker"
            ,
            onChange: picker => updateState({
              timePicker: false,
              onlyTimePicker: false,
              onlyMonthPicker: false,
              onlyYearPicker: false,
              [picker]: true
            })
          }
          ,
          {
            title: translate("Number Of Months"),
            options: [
              ["1", 1],
              ["2", 2],
              ["3", 3]
            ],
            value: numberOfMonths,
            onChange: value => updateState("numberOfMonths", Number(value))
          }
          ,
          {
            title: translate("Type"),
            options: [
              [translate("Calendar"), "calendar"],
              [translate("Input"), "input"],
              [translate("Input-Icon"), "input-icon"],
              [translate("Icon"), "icon"],
              [translate("Button"), "button"],
            ],
            value: type,
            onChange: value => updateState("type", value)
          },
          {
            title: translate("Dates panel"),
            disabled: (!range && !multiple) || numberOfMonths > 1,
            options: [
              [translate("Enable"), "enable"],
              [translate("Disable"), "disable"]
            ],
            value: mustShowDates ? "enable" : "disable",
            onChange: value => updateState("mustShowDates", value === "enable")
          },
          {
            title: translate("DatePanel Position"),
            disabled: (!range && !multiple) || numberOfMonths > 1,
            options: [
              [translate("Left"), "left"],
              [translate("Right"), "right"],
              [translate("Top"), "top"],
              [translate("Bottom"), "bottom"]
            ],
            value: datePanelPosition,
            onChange: value => updateState("datePanelPosition", value)
          },
          {
            title: translate("Layout"),
            options: [
              [translate("Default"), ""],
              [translate("Prime"), "rmdp-prime"],
              [translate("Mobile"), "rmdp-mobile"]
            ],
            value: layout,
            onChange: value => updateState("layout", value)
          },
          {
            title: translate("Other Days"),
            options: [
              [translate("Enable"), "enable"],
              [translate("Disable"), "disable"]
            ],
            value: showOtherDays ? "enable" : "disable",
            onChange: value => updateState("showOtherDays", value === "enable")
          },
          {
            title: translate("Colors"),
            options: [
              [translate("Default"), ""],
              [translate("Green"), "green"],
              [translate("Red"), "red"],
              [translate("Yellow"), "yellow"],
              [translate("Purple"), "purple"],
              [translate("Teal"), "teal"],
            ],
            value: color,
            onChange: value => updateState("color", value)
          },
          {
            title: translate("BackGrounds"),
            options: [
              [translate("Default"), ""],
              [translate("Dark"), "bg-dark"],
              [translate("Gray"), "bg-gray"],
              [translate("Brown"), "bg-brown"]
            ],
            value: background,
            onChange: value => updateState("background", value)
          },
          {
            title: translate("Calendar Position"),
            options: [
              [translate("Bottom Left"), "bottom-left"],
              [translate("Bottom Center"), "bottom-center"],
              [translate("Bottom Right"), "bottom-right"],
              [translate("Top Left"), "top-left"],
              [translate("Top Center"), "top-center"],
              [translate("Right Top"), "right-top"],
              [translate("Right Center"), "right-center"],
              [translate("Right Bottom"), "right-bottom"],
              [translate("Left Top"), "left-top"],
              [translate("Left Center"), "left-center"],
              [translate("Left Bottom"), "left-bottom"]
            ],
            value: calendarPosition,
            onChange: value => updateState("calendarPosition", value),
            disabled: type === "calendar" || layout === "rmdp-mobile"
          },
          {
            title: translate("Animation"),
            options: [
              [translate("OFF"), "off"],
              [translate("ON"), "on"]
            ],
            value: animation ? "on" : "off",
            onChange: value => updateState("animation", value === "on"),
            disabled: type === "calendar" || layout === "rmdp-mobile"
          }
        ]}
      />

      <h3>{translate("Descriptions")}:</h3>
      <ul>
        {translate("demo_descriptions").map((description, index) => {
          return (
            <li key={index}>{description}</li>
          )
        })}
      </ul>
    </>
  )
}