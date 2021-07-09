import React, { useState } from "react";
import isArray from "../../shared/isArray";
import getLocaleName from "../../shared/getLocaleName";
import getValidProps from "../../shared/getValidProps";
import {
  IconLanguage,
  IconCalendarEvent,
  IconCircles,
  IconClock,
} from "@tabler/icons";
import "./settings.css";

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

const Calendars = { gregorian, persian, arabic, indian };
const Locales = {
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

export default function Settings({
  state,
  setState,
  position,
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
                  state.date.calendar.name === calendar ? "active" : ""
                }`}
                title={titles[calendar]}
                onClick={() => {
                  let object = {
                    calendar: Calendars[calendar],
                    locale:
                      Locales[
                        `${calendar}_${getLocaleName(state.date.locale)}`
                      ],
                  };

                  notifyChange({
                    ...state,
                    ...object,
                    date: state.date.set(object),
                  });
                }}
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
                  getLocaleName(state.date.locale) === locale ? "active" : ""
                }`}
                title={titles[locale]}
                onClick={() =>
                  setKeyValue(
                    "locale",
                    Locales[`${state.date.calendar.name}_${locale}`]
                  )
                }
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
          selectedDate: isArray(state.selectedDate)
            ? state.selectedDate
            : [state.selectedDate],
          multiple: true,
          range: false,
        };
        break;
      case "range":
        $state = {
          ...state,
          selectedDate: isArray(state.selectedDate)
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
          selectedDate: isArray(state.selectedDate)
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

  function notifyChange(state) {
    state.value = state.selectedDate;

    handlePropsChange(state);
  }
}
