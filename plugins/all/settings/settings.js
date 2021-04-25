import React, { useState } from "react";
import { getValidProps } from "../utils";
import {
  IconLanguage,
  IconCalendarEvent,
  IconCircles,
  IconClock,
} from "@tabler/icons";
import "./settings.css";

export default function Settings({
  state,
  setState,
  position,
  setProps,
  calendars = ["gregorian", "persian", "arabic", "indian"],
  locales = ["en", "fa", "ar", "hi"],
  modes = ["single", "multiple", "range"],
  others = ["onlyMonthPicker", "onlyYearPicker"],
  defaultActive = "",
  disabledList = [],
  defaultFormat = {},
  className = "",
  handlePropsChange,
  names = {
    gregorian: "GE",
    persian: "PE",
    arabic: "AR",
    indian: "IN",
    en: "EN",
    fa: "FA",
    ar: "AR",
    hi: "HI",
    single: "SI",
    multiple: "MU",
    range: "RA",
    disable: "DI",
    onlyMonthPicker: "OM",
    onlyYearPicker: "OY",
  },
  titles = {
    calendar: "Calendar",
    locale: "Locale",
    mode: "Mode",
    otherPickers: "Other Pickers",
    gregorian: "Gregorian",
    persian: "Persian",
    arabic: "Arabic",
    indian: "Indian",
    en: "English",
    fa: "Farsi",
    ar: "Arabic",
    hi: "Hindi",
    single: "Single",
    multiple: "Multiple",
    range: "Range",
    disable: "Disable",
    onlyMonthPicker: "Only Month Picker",
    onlyYearPicker: "Only Year Picker",
  },
  ...props
}) {
  const [section, setSection] = useState(defaultActive),
    globalIconProps = {
      size: 19,
      stroke: 1.5,
      className: "icon",
    };

  return (
    <div
      className={`settings ${position} ${className}`}
      {...getValidProps(props)}
    >
      {!disabledList.includes("calendar") && (
        <div
          title={titles.calendar}
          className={`setting ${section === "calendar" ? "active" : ""}`}
        >
          <IconCalendarEvent
            {...globalIconProps}
            onClick={() => setSection(section === "calendar" ? "" : "calendar")}
          />
          <div className="items">
            {calendars.map((calendar, index) => (
              <span
                key={index}
                className={`item ${
                  state.date.calendar === calendar ? "active" : ""
                }`}
                title={titles[calendar]}
                onClick={() => setKeyValue("calendar", calendar)}
              >
                {names[calendar]}
              </span>
            ))}
          </div>
        </div>
      )}
      {!disabledList.includes("locale") && (
        <div
          title={titles.locale}
          className={`setting ${section === "locale" ? "active" : ""}`}
        >
          <IconLanguage
            {...globalIconProps}
            onClick={() => setSection(section === "locale" ? "" : "locale")}
          />
          <div className="items">
            {locales.map((locale, index) => (
              <span
                key={index}
                className={`item ${
                  state.date.locale === locale ? "active" : ""
                }`}
                title={titles[locale]}
                onClick={() => setKeyValue("locale", locale)}
              >
                {names[locale]}
              </span>
            ))}
          </div>
        </div>
      )}
      {!disabledList.includes("mode") && (
        <div
          title={titles.mode}
          className={`setting ${section === "mode" ? "active" : ""}`}
        >
          <IconCircles
            {...globalIconProps}
            onClick={() => setSection(section === "mode" ? "" : "mode")}
          />
          <div className="items">
            {modes.map((mode, index) => (
              <span
                key={index}
                className={`item ${
                  state[mode]
                    ? "active"
                    : !state.range && !state.multiple && mode === "single"
                    ? "active"
                    : ""
                }`}
                title={titles[mode]}
                onClick={setMode}
              >
                {names[mode]}
              </span>
            ))}
          </div>
        </div>
      )}
      {!disabledList.includes("other") && (
        <div
          title={titles.otherPickers}
          className={`setting ${section === "others" ? "active" : ""}`}
        >
          <IconClock
            {...globalIconProps}
            onClick={() => setSection(section === "others" ? "" : "others")}
          />
          <div className="items">
            <span
              className={`item ${
                !state.onlyMonthPicker && !state.onlyYearPicker ? "active" : ""
              }`}
              title={titles.disable}
              onClick={setOtherPickers}
            >
              {names.disable}
            </span>
            {others.map((picker, index) => (
              <span
                key={index}
                className={`item ${
                  state[picker.replace(/\s\w/g, (w) => w[1].toUpperCase())]
                    ? "active"
                    : ""
                }`}
                title={titles[picker]}
                onClick={() => setOtherPickers(picker)}
              >
                {names[picker]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  function setKeyValue(key, value) {
    if (state[key] === value) return;

    let $state = { ...state, date: state.date.set(key, value), [key]: value };

    notifyChange($state);
  }

  function setMode(e) {
    let mode = e.target.title.toLowerCase(),
      $state;

    switch (mode) {
      case "multiple":
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate)
            ? state.selectedDate
            : [state.selectedDate],
          multiple: true,
          range: false,
        };
        break;
      case "range":
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate)
            ? state.selectedDate
            : [state.selectedDate],
          multiple: false,
          range: true,
        };

        if ($state.selectedDate.length > 2) {
          $state.selectedDate = [
            $state.selectedDate[0],
            getLastItem($state.selectedDate),
          ];
        }
        break;
      default:
        //single
        $state = {
          ...state,
          selectedDate: Array.isArray(state.selectedDate)
            ? getLastItem(state.selectedDate)
            : state.selectedDate,
          multiple: false,
          range: false,
        };
    }

    notifyChange($state);
  }

  function getLastItem(array) {
    return array[array.length - 1];
  }

  function setOtherPickers(picker) {
    let $state;

    switch (picker) {
      case "onlyMonthPicker":
        $state = {
          ...state,
          onlyMonthPicker: true,
          onlyYearPicker: false,
          format: defaultFormat?.onlyMonthPicker || "MM/YYYY",
        };
        break;
      case "onlyYearPicker":
        $state = {
          ...state,
          onlyMonthPicker: false,
          onlyYearPicker: true,
          format: defaultFormat?.onlyYearPicker || "YYYY",
        };
        break;
      default:
        //disable
        $state = {
          ...state,
          onlyMonthPicker: false,
          onlyYearPicker: false,
          format: defaultFormat?.single || "YYYY/MM/DD",
        };
    }

    notifyChange($state);
  }

  function notifyChange($state) {
    if (setProps instanceof Function) {
      if ("_self" in React.createElement("div"))
        console.warn(
          [
            "setProps is deprecated and will not available in the next versions.",
            "https://shahabyazdi.github.io/react-multi-date-picker/plugins/settings/",
          ].join("\n")
        );

      setProps((props) => {
        return {
          ...props,
          ...$state,
          value: $state.selectedDate,
        };
      });
    }

    handlePropsChange($state);
  }
}
