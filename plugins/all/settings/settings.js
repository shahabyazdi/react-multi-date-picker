import React, { useState } from "react"
import { IconLanguage, IconCalendarEvent, IconLetterM, IconClock } from '@tabler/icons';
import "./settings.css"

export default function Settings({
  state,
  setState,
  position,
  setProps,
  calendars = ["gregorian", "persian", "arabic", "indian"],
  locals = ["en", "fa", "ar", "hi"],
  modes = ["single", "multiple", "range"],
  others = ["time picker", "only time picker", "only month picker", "only year picker"],
  defaultActive = "",
  disabledList = [],
  defaultFormat = {},
  className = "",
  ...props
}) {
  const [section, setSection] = useState(defaultActive)
  const shortName = {
    "time picker": "TP",
    "only time picker": "OT",
    "only month picker": "OM",
    "only year picker": "OY"
  }

  delete props.nodes
  delete props.registerListener
  delete props.calendarProps
  delete props.handleChange

  return (
    <div className={`settings ${position} ${className}`} {...props}>
      {!disabledList.includes("calendar") &&
        <div title="Calendar" className={`setting ${section === "calendar" ? "active" : ""}`}>
          <IconCalendarEvent
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "calendar" ? "" : "calendar")}
          />
          <div className="items">
            {calendars.map((calendar, index) => {
              return (
                <span
                  key={index}
                  className={`item ${state.date.calendar === calendar ? "active" : ""}`}
                  title={calendar}
                  onClick={e => setKeyValue(e, "calendar")}
                >
                  {calendar.substring(0, 2).toUpperCase()}
                </span>
              )
            })}
          </div>
        </div>
      }
      {!disabledList.includes("local") &&
        <div title="Local" className={`setting ${section === "local" ? "active" : ""}`}>
          <IconLanguage
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "local" ? "" : "local")}
          />
          <div className="items">
            {locals.map((local, index) => {
              return (
                <span
                  key={index}
                  className={`item ${state.date.local === local ? "active" : ""}`}
                  title={local}
                  onClick={e => setKeyValue(e, "local")}
                >
                  {local.toUpperCase()}
                </span>
              )
            })}
          </div>
        </div>
      }
      {!disabledList.includes("mode") &&
        <div title="Mode" className={`setting ${section === "mode" ? "active" : ""}`}>
          <IconLetterM
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "mode" ? "" : "mode")}
          />
          <div className="items">
            {modes.map((mode, index) => {
              return (
                <span
                  key={index}
                  className={`item ${state[mode] ? "active" : (!state.range && !state.multiple && mode === "single" ? "active" : "")}`}
                  title={mode}
                  onClick={setMode}
                >
                  {mode.substring(0, 2).toUpperCase()}
                </span>
              )
            })}

          </div>
        </div>
      }
      {!disabledList.includes("other") &&
        <div title="Time Picker" className={`setting ${section === "others" ? "active" : ""}`}>
          <IconClock
            size={19}
            stroke={1.5}
            className="icon"
            onClick={() => setSection(section === "others" ? "" : "others")}
          />
          <div className="items">
            <span
              className={`item ${(
                !state.timePicker && !state.onlyTimePicker &&
                  !state.onlyMonthPicker && !state.onlyYearPicker ?
                  "active" : ""
              )}`}
              title="disable"
              onClick={setTimePicker}
            >
              DI
                </span>
            {!state.multiple && !state.range && !Array.isArray(state.selectedDate) &&
              <>
                {others.map((title, index) => {
                  return (
                    <span
                      key={index}
                      className={`item ${state[title.replace(/\s\w/g, w => w[1].toUpperCase())] ? "active" : ""}`}
                      title={title}
                      onClick={setTimePicker}
                    >
                      {shortName[title]}
                    </span>
                  )
                })}
              </>
            }
          </div>
        </div>
      }
    </div>
  )

  function setKeyValue(e, key) {
    let value = e.target.title

    if (state[key] === value) return

    let $state = { ...state, date: state.date.set(key, value), [key]: value }

    notifyChange($state)
  }

  function setMode(e) {
    let mode = e.target.title,
      $state

    switch (mode) {
      case "multiple":
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate) ? state.selectedDate : [state.selectedDate],
          multiple: true,
          range: false
        }
        break
      case "range":
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate) ? state.selectedDate : [state.selectedDate],
          multiple: false,
          range: true
        }

        if ($state.selectedDate.length > 2) {
          $state.selectedDate = [
            $state.selectedDate[0],
            getLastItem($state.selectedDate)
          ]
        }
        break
      default:
        //single
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate) ? getLastItem(state.selectedDate) : state.selectedDate,
          multiple: false,
          range: false
        }
    }

    notifyChange($state)
  }

  function getLastItem(array) {
    return array[array.length - 1]
  }

  function setTimePicker(e) {
    let title = e.target.title,
      $state

    switch (title) {
      case "time picker":
        $state = {
          ...state,
          timePicker: true,
          onlyTimePicker: false,
          onlyMonthPicker: false,
          onlyYearPicker: false,
          format: defaultFormat?.timePicker || "YYYY/MM/DD HH:mm:ss"
        }
        break
      case "only time picker":
        $state = {
          ...state,
          timePicker: false,
          onlyTimePicker: true,
          onlyMonthPicker: false,
          onlyYearPicker: false,
          format: defaultFormat?.onlyTimePicker || "HH:mm:ss"
        }
        break
      case "only month picker":
        $state = {
          ...state,
          timePicker: false,
          onlyTimePicker: false,
          onlyMonthPicker: true,
          onlyYearPicker: false,
          format: defaultFormat?.onlyMonthPicker || "MM/YYYY"
        }
        break
      case "only year picker":
        $state = {
          ...state,
          timePicker: false,
          onlyTimePicker: false,
          onlyMonthPicker: false,
          onlyYearPicker: true,
          format: defaultFormat?.onlyYearPicker || "YYYY"
        }
        break
      default:
        //disable
        $state = {
          ...state,
          timePicker: false,
          onlyTimePicker: false,
          onlyMonthPicker: false,
          onlyYearPicker: false,
          format: defaultFormat?.single || "YYYY/MM/DD"
        }
    }

    notifyChange($state)
  }

  function notifyChange($state) {
    if (setProps instanceof Function) {
      setProps(props => {
        return {
          ...props,
          ...$state,
          value: $state.selectedDate
        }
      })
    }
  }
}