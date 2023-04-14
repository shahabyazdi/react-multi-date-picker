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
      multiple,
      range,
    } = state,
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
          position: "relative",
          display: "grid",
        }}
      >
        {multiple && range
          ? selectedDate.map((range, index) => (
              <div key={index}>{renderDates(range)}</div>
            ))
          : renderDates(selectedDate)}
        {DatePicker && selectedDate?.length > 0 && (
          <button
            className="rmdp-button"
            style={{
              maxHeight: "30px",
              position: horizontal ? "absolute" : "block",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => DatePicker.closeCalendar()}
          >
            {localeNames.close}
          </button>
        )}
      </div>
    </div>
  );

  function renderDates(dates) {
    const from = dates[0]?.format?.(format),
      to = dates[1]?.format?.(format);

    return (
      <div
        className="rmdp-header-values"
        style={{
          flex: "1",
          display: horizontal ? "" : "grid",
          margin: "0",
        }}
      >
        <div style={{ display: "inline-block" }}>
          <i className="rmdp-cancel" onClick={() => deselect(dates[0])}>
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
          <i className="rmdp-cancel" onClick={() => deselect(dates[1])}>
            +
          </i>
          <span>
            {localeNames.to} {to ?? localeNames.selectDate}
          </span>
        </div>
      </div>
    );
  }

  function deselect(date) {
    if (!Array.isArray(selectedDate)) return;

    if (multiple && range) {
      selectedDate = selectedDate
        .map((dates) => dates.filter((d) => d !== date))
        .filter((dates) => dates.length > 0);
    } else {
      selectedDate = selectedDate.filter((d) => d !== date);
    }

    handleChange(selectedDate, { ...state, selectedDate });
  }
}
