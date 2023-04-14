import React from "react";
import DatePicker from "../build";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import arabic from "react-date-object/calendars/arabic";
import indian from "react-date-object/calendars/indian";
import persian_fa from "react-date-object/locales/persian_fa";
import arabic_ar from "react-date-object/locales/arabic_ar";
import indian_hi from "react-date-object/locales/indian_hi";
import { render, fireEvent } from "@testing-library/react";

function renderDatePicker(props = {}) {
  const { container, ...object } = render(<DatePicker {...props} />);

  const input = container.querySelector("input");

  return {
    ...object,
    container,
    input,
    getCalendar,
    openCalendar,
    closeCalendar,
  };

  function getCalendar() {
    return container.querySelector(".rmdp-wrapper");
  }

  function openCalendar() {
    fireEvent.focus(input);
  }

  function closeCalendar() {
    fireEvent.click(container);
  }
}

describe("opening and closing the calendar", () => {
  test("the calendar should be closed by default", () => {
    const { getCalendar } = renderDatePicker();

    expect(getCalendar()).not.toBeInTheDocument();
  });

  test("should open the calendar by clicking on the input", () => {
    const { openCalendar, getCalendar } = renderDatePicker();

    openCalendar();

    expect(getCalendar()).toBeInTheDocument();
  });

  test("should close the calendar by clicking outside", () => {
    const { openCalendar, closeCalendar, getCalendar } = renderDatePicker();

    openCalendar();
    closeCalendar();

    expect(getCalendar()).not.toBeInTheDocument();
  });

  test("the calendar should be close by clicking on today in single-mode", () => {
    const { openCalendar, getCalendar, getByText } = renderDatePicker();

    openCalendar();

    const today = getByText(new Date().getDate());

    fireEvent.click(today);

    expect(getCalendar()).not.toBeInTheDocument();
  });

  test("the calendar should be keep open by clicking on the wrapper", () => {
    const { openCalendar, getCalendar } = renderDatePicker();

    openCalendar();

    fireEvent.click(getCalendar());

    expect(getCalendar()).toBeInTheDocument();
  });

  test("the calendar should be keep open by clicking on multiple days in multiple-mode", () => {
    const { openCalendar, getCalendar, getByText } = renderDatePicker({
      multiple: true,
    });

    openCalendar();

    const day1 = getByText(1);
    const day2 = getByText(15);
    const day3 = getByText(20);

    fireEvent.click(day1);
    fireEvent.click(day2);
    fireEvent.click(day3);

    expect(getCalendar()).toBeInTheDocument();
  });

  test("the calendar should be keep open by clicking on multiple days in range-mode", () => {
    const { getCalendar, openCalendar, getByText } = renderDatePicker({
      range: true,
    });

    openCalendar();

    const day1 = getByText(4);
    const day2 = getByText(24);

    fireEvent.click(day1);
    fireEvent.click(day2);

    expect(getCalendar()).toBeInTheDocument();
  });

  test("the calendar should be keep open by clicking on month and year", () => {
    const { openCalendar, getCalendar } = renderDatePicker();

    openCalendar();

    const calendar = getCalendar();
    const header = calendar.querySelector(".rmdp-header-values");
    const month = header.children[0];
    const year = header.children[1];

    fireEvent.click(month);
    fireEvent.click(year);

    expect(getCalendar()).toBeInTheDocument();
  });

  test("the calendar should not be opened if false is returned in onOpen", () => {
    const { openCalendar, getCalendar } = renderDatePicker({
      onOpen: () => false,
    });

    openCalendar();

    expect(getCalendar()).not.toBeInTheDocument();
  });

  test("the calendar should not be closed if false is returned in onClose", () => {
    const { openCalendar, closeCalendar, getCalendar } = renderDatePicker({
      onClose: () => false,
    });

    openCalendar();
    closeCalendar();

    expect(getCalendar()).toBeInTheDocument();
  });
});

describe("events", () => {
  test("onChange in single-mode", () => {
    const onChange = jest.fn();
    const { input, openCalendar, getByText } = renderDatePicker({ onChange });
    const date = new DateObject();

    openCalendar();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toEqual(date.format());

    openCalendar();

    date.add(date.day === date.month.length ? -1 : 1, "day");

    const day = getByText(date.day);

    fireEvent.click(day);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(input.value).toEqual(date.format());
  });

  test("onChange in multiple-mode", () => {
    const onChange = jest.fn();
    const { input, openCalendar, getByText } = renderDatePicker({
      onChange,
      multiple: true,
    });

    openCalendar();

    expect(onChange).toHaveBeenCalledTimes(0);

    const day1 = getByText(10);
    const day2 = getByText(15);
    const day3 = getByText(20);

    fireEvent.click(day1);
    fireEvent.click(day2);
    fireEvent.click(day3);

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(input.value).toEqual(
      [10, 15, 20].map((day) => new DateObject().setDay(day)).join(", ")
    );
  });

  test("onChange in range-mode", () => {
    const onChange = jest.fn();
    const { input, openCalendar, getByText } = renderDatePicker({
      onChange,
      range: true,
    });

    openCalendar();

    expect(onChange).toHaveBeenCalledTimes(0);

    const day1 = getByText(10);
    const day2 = getByText(20);

    fireEvent.click(day1);
    fireEvent.click(day2);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(input.value).toEqual(
      [10, 20].map((day) => new DateObject().setDay(day)).join(" ~ ")
    );
  });

  test("onChange in only month picker", () => {
    const onChange = jest.fn();
    const { container, openCalendar, getByText } = renderDatePicker({
      onChange,
      onlyMonthPicker: true,
    });

    openCalendar();

    expect(onChange).toHaveBeenCalledTimes(1);

    const nextMonth = getByText(new DateObject().add(1, "month").month.name);

    fireEvent.click(nextMonth);

    expect(onChange).toHaveBeenCalledTimes(2);

    openCalendar();

    const rightArrow = container.querySelector(".rmdp-right");
    const leftArrow = container.querySelector(".rmdp-left");

    fireEvent.click(rightArrow);
    fireEvent.click(leftArrow);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test("onChange in only year picker", () => {
    const onChange = jest.fn();
    const { container, openCalendar, getByText } = renderDatePicker({
      onChange,
      onlyYearPicker: true,
    });

    openCalendar();

    expect(onChange).toHaveBeenCalledTimes(1);

    const nextYear = getByText(new DateObject().add(1, "year").year);

    fireEvent.click(nextYear);

    expect(onChange).toHaveBeenCalledTimes(2);

    openCalendar();

    const rightArrow = container.querySelector(".rmdp-right");
    const leftArrow = container.querySelector(".rmdp-left");

    fireEvent.click(rightArrow);
    fireEvent.click(leftArrow);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test("onOpen", () => {
    const onOpen = jest.fn();
    const { openCalendar } = renderDatePicker({ onOpen });

    openCalendar();

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test("onClose", () => {
    const onClose = jest.fn();
    const { openCalendar, closeCalendar } = renderDatePicker({ onClose });

    openCalendar();
    closeCalendar();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("onPositionChange", () => {
    const onPositionChange = jest.fn();
    const { openCalendar } = renderDatePicker({
      onPositionChange,
    });

    openCalendar();

    expect(onPositionChange).toHaveBeenCalledTimes(1);
  });

  test("onPropsChange", () => {
    const onPropsChange = jest.fn();
    const { input, openCalendar, getByText } = renderDatePicker({
      onPropsChange,
    });
    const date = new DateObject();

    openCalendar();

    expect(onPropsChange).toHaveBeenCalledTimes(1);
    expect(input.value).toEqual(date.format());

    date.add(date.day === date.month.length ? -1 : 1, "day");
    const day = getByText(date.day);

    fireEvent.click(day);

    expect(onPropsChange).toHaveBeenCalledTimes(2);
    expect(input.value).toEqual(date.format());
  });

  test("onMonthChange", () => {
    const date = new DateObject();
    const onMonthChange = jest.fn();
    const { openCalendar, queryByText, getAllByText, container } =
      renderDatePicker({
        onMonthChange,
      });

    openCalendar();

    //opening month picker
    const month = getAllByText(date.month.name)[0];
    fireEvent.click(month);

    //selecting next month
    const nextMonth = queryByText(date.add(1, "month").month.name);
    fireEvent.click(nextMonth);

    expect(onMonthChange).toHaveBeenCalledTimes(1);

    const rightArrow = container.querySelector(".rmdp-right");
    const leftArrow = container.querySelector(".rmdp-left");

    fireEvent.click(rightArrow);
    fireEvent.click(leftArrow);

    expect(onMonthChange).toHaveBeenCalledTimes(3);
  });

  test("onYearChange", () => {
    const date = new DateObject();
    const onYearChange = jest.fn();
    const { openCalendar, queryByText, getCalendar } = renderDatePicker({
      onYearChange,
    });

    openCalendar();

    //opening year picker
    const calendar = getCalendar();
    const year = calendar.querySelector(".rmdp-header-values").children[1];
    fireEvent.click(year);

    //selecting next year
    const nextyear = queryByText(date.year + 1);
    fireEvent.click(nextyear);

    expect(onYearChange).toHaveBeenCalledTimes(1);
  });

  test("onFocusedDateChange", () => {
    const onFocusedDateChange = jest.fn();
    const { openCalendar, getByText } = renderDatePicker({
      onFocusedDateChange,
    });

    openCalendar();

    const day = getByText(5);

    fireEvent.click(day);

    expect(onFocusedDateChange).toHaveBeenCalledTimes(1);
  });
});

describe("initial value", () => {
  test("single mode, Date", () => {
    const date = new DateObject().toFirstOfMonth();

    const { input, openCalendar, getByText } = renderDatePicker({
      value: date.toDate(),
    });

    expect(input.value).toEqual(date.format());

    openCalendar();

    const day = getByText(date.day).parentNode;

    expect(day).toHaveClass("rmdp-selected");
  });

  test("single mode, DateObject", () => {
    const value = new DateObject().toLastWeekOfYear();

    const { input, openCalendar, getByText } = renderDatePicker({ value });

    expect(input.value).toEqual(value.format());

    openCalendar();

    const day = getByText(value.day).parentNode;

    expect(day).toHaveClass("rmdp-selected");
  });

  test("single mode, Number", () => {
    const value = new Date().valueOf();
    const dateObject = new DateObject(value);
    const { input, openCalendar, getByText } = renderDatePicker({ value });

    expect(input.value).toEqual(dateObject.format());

    openCalendar();

    const day = getByText(dateObject.day).parentNode;

    expect(day).toHaveClass("rmdp-selected");
  });

  test("single mode, String", () => {
    const format = "MM-DD-YYYY";
    const value = "05-05-2021";
    const date = new DateObject({ date: value, format });

    const { input, openCalendar, getByText } = renderDatePicker({
      value,
      format,
    });

    expect(input.value).toEqual(value);

    openCalendar();

    const day = getByText(date.day).parentNode;

    expect(day).toHaveClass("rmdp-selected");
  });

  test("multiple mode, all type of dates", () => {
    const format = "MMMM DD YYYY";
    const onChange = jest.fn();

    const value = [
      1597994736000, //unix time in milliseconds (August 21 2020)
      new Date(),
      new DateObject({ year: 2021, month: 9, day: 8 }),
      "December 09 2022",
    ];

    const { input, openCalendar, getCalendar, getByText } = renderDatePicker({
      value,
      format,
      onChange,
    });

    expect(input.value).toEqual(
      value.map((date) => new DateObject({ date, format })).join(", ")
    );

    openCalendar();

    const calendar = getCalendar();
    const header = calendar.querySelector(".rmdp-header-values");

    expect(header).toHaveTextContent(
      new DateObject(value[0]).format("MMMM,YYYY")
    );

    //make sure all dates sent to the onChange method are valid
    const day = getByText(5);

    fireEvent.click(day);

    expect(onChange.mock.calls[0][0].length).toEqual(5);
    expect(onChange.mock.calls[0][0].every((date) => date.isValid)).toEqual(
      true
    );
  });

  test("range mode", () => {
    const value = [
      new DateObject().toFirstOfMonth().toDate(),
      new DateObject().toLastOfMonth(),
    ];

    const { input, openCalendar, getByText, getCalendar } = renderDatePicker({
      value,
      range: true,
    });

    expect(input.value).toEqual(
      value.map((date) => new DateObject(date)).join(" ~ ")
    );

    openCalendar();

    const start = getByText(value[0].getDate()).parentNode;
    const end = getByText(value[1].day).parentNode;

    expect(start).toHaveClass("start");
    expect(end).toHaveClass("end");

    /**
     * make sure the number of selected days in calendar
     * is equal to the number of days of the current month
     */
    const calendar = getCalendar();
    const allDatesInRange = calendar.querySelectorAll(".rmdp-range");

    expect(allDatesInRange.length).toEqual(new DateObject().month.length);
  });
});

describe("other calendars & locales", () => {
  [
    { calendar: persian, locale: persian_fa },
    { calendar: arabic, locale: arabic_ar },
    { calendar: indian, locale: indian_hi },
  ].forEach(({ calendar, locale }) => {
    test(`calendar:${calendar.name}, locale:${locale.name}`, () => {
      const value = new DateObject({ calendar, locale });
      const onChange = jest.fn();

      const { input, openCalendar, getByText } = renderDatePicker({
        value,
        onChange,
        calendar,
        locale,
      });

      expect(input.value).toEqual(value.format());

      openCalendar();

      value.add(value.day === value.month.length ? -1 : 1, "day");

      const nextDay = getByText(value.format("D"));

      fireEvent.click(nextDay);

      expect(input.value).toEqual(value.format());

      const date = onChange.mock.calls[0][0];

      expect(date.calendar.name).toEqual(calendar.name);
      expect(date.locale.name).toEqual(locale.name);
      expect(JSON.stringify(date)).toEqual(JSON.stringify(value));
    });
  });
});
