import React from "react";
import getLocaleName from "../../shared/getLocaleName";
import "./range_picker_footer.css";

export default function Footer({
  state,
  handleChange,
  position,
  direction = ["fa", "ar"].includes(getLocaleName(state.date.locale))
    ? "rtl"
    : "ltr",
  format = direction === "rtl" ? "DD MMMM" : "MMMM DD",
  names,
  DatePicker,
}) {
  let {
      selectedDate,
      date: { locale },
    } = state,
    from = selectedDate[0]?.format?.(format),
    to = selectedDate[1]?.format?.(format),
    horizontal = ["bottom", "top"].includes(position),
    allNames = {
      en: {
        selectedDates: "Selected Dates" + (horizontal ? ":" : ""),
        from: "From:",
        to: "To:",
        selectDate: "Select Date",
        close: "Close",
        separator: "-",
      },
      fa: {
        selectedDates: "تاریخ انتخابی شما" + (horizontal ? ":" : ""),
        from: "از:",
        to: "تا:",
        selectDate: "انتخاب کنید",
        close: "بستن",
        separator: "-",
      },
    },
    localeNames = names || allNames[getLocaleName(locale)] || allNames.en;

  /**
   * rmdp-header-values, rmdp-week-day &
   * rmdp-button classNames
   * are taken from the main part to
   * prevent writing duplicate CSS.
   */

  return (
    <div
      className={`rmdp-range-picker-footer ${direction} ${position}`}
      style={{
        display: horizontal ? "block" : "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <h6 className="rmdp-week-day">{localeNames.selectedDates}</h6>
      <div
        style={{
          display: horizontal ? "flex" : "grid",
          gridTemplateRows: "1fr auto",
        }}
      >
        <div
          className="rmdp-header-values"
          style={{
            flex: "1",
            display: horizontal ? "" : "grid",
          }}
        >
          <div style={{ display: "inline-block" }}>
            <i className="rmdp-cancel" onClick={() => deselect(0)}>
              +
            </i>
            <span>
              {localeNames.from} {from ?? localeNames.selectDate}
            </span>
          </div>
          {horizontal && (
            <span style={{ padding: "0px 10px" }}>{localeNames.separator}</span>
          )}
          <div style={{ display: "inline-block" }}>
            <i className="rmdp-cancel" onClick={() => deselect(1)}>
              +
            </i>
            <span>
              {localeNames.to} {to ?? localeNames.selectDate}
            </span>
          </div>
        </div>
        {DatePicker && (
          <button
            className="rmdp-button"
            onClick={() => DatePicker.closeCalendar()}
          >
            {localeNames.close}
          </button>
        )}
      </div>
    </div>
  );

  function deselect(index) {
    if (!Array.isArray(selectedDate)) return;

    selectedDate.splice(index, 1);

    handleChange(selectedDate, { ...state, selectedDate });
  }
}
