import React from "react";
import { Calendar } from "../build";
import DateObject from "react-date-object";
import { render, fireEvent } from "@testing-library/react";

function renderCalendar(props = {}) {
  return render(<Calendar {...props} />);
}

describe("basic render", () => {
  test("all days of the current month should be rendered in day picker", () => {
    const date = new DateObject();
    const { container } = renderCalendar();

    const daysOfCurrentMonth = container
      .querySelector(".rmdp-day-picker")
      .querySelectorAll(".rmdp-day:not(.rmdp-day-hidden)");

    expect(daysOfCurrentMonth.length).toEqual(date.month.length);
    expect(daysOfCurrentMonth[0]).toHaveTextContent("1");
    expect(daysOfCurrentMonth[date.month.length - 1]).toHaveTextContent(
      date.month.length.toString()
    );
  });

  test("all months should be rendered in month picker", () => {
    const { container } = renderCalendar();

    const allMonths = container
      .querySelector(".rmdp-month-picker")
      .querySelectorAll(".rmdp-day");

    expect(allMonths.length).toEqual(12);
    expect(allMonths[0]).toHaveTextContent("January");
    expect(allMonths[11]).toHaveTextContent("December");
  });

  test("week days", () => {
    const { container } = renderCalendar();

    const weekDays = container.querySelectorAll(".rmdp-week-day");

    expect(weekDays.length).toEqual(7);
    expect(weekDays[0]).toHaveTextContent("Sun");
    expect(weekDays[6]).toHaveTextContent("Sat");
  });
});

describe("navigation buttons", () => {
  ["right", "left"].forEach((name) => {
    test(`${name === "right" ? "next" : "previous"} button`, () => {
      const date = new DateObject().add(name === "right" ? 1 : -1, "month");
      const onMonthChange = jest.fn();
      const { container } = renderCalendar({ onMonthChange });
      const button = container.querySelector(`.rmdp-${name}`);
      const header = container.querySelector(".rmdp-header-values");

      fireEvent.click(button);

      expect(onMonthChange).toHaveBeenCalledTimes(1);
      expect(header).toHaveTextContent(date.format("MMMM,YYYY"));
      expect(onMonthChange.mock.calls[0][0].month.index).toEqual(
        date.month.index
      );
    });
  });

  test("hiding buttons", () => {
    const { container } = renderCalendar({ buttons: false });
    const next = container.querySelector(`.rmdp-right`);
    const previous = container.querySelector(`.rmdp-left`);

    expect(next).not.toBeInTheDocument();
    expect(previous).not.toBeInTheDocument();
  });
});

describe("initial value", () => {
  test("single mode", () => {
    const value = new DateObject({ year: 2022, month: 4, day: 1 });
    const { container, getByText, getAllByText } = renderCalendar({ value });
    const day = getByText(value.day).parentNode;
    const month = getAllByText(value.month.name)[1].parentNode;
    const year = container
      .querySelector(".rmdp-year-picker")
      .querySelector(".rmdp-selected");

    expect(day).toHaveClass("rmdp-selected");
    expect(month).toHaveClass("rmdp-selected");
    expect(month).toHaveTextContent("April");
    expect(year).toHaveTextContent("2022");
  });

  test("multiple mode", () => {
    const days = [5, 10, 15, 20];
    const value = days.map((day) => new Date().setDate(day));
    const onChange = jest.fn();
    const { container } = renderCalendar({ value, onChange });
    const selectedDays = container
      .querySelector(".rmdp-day-picker")
      .querySelectorAll(".rmdp-selected");

    expect(selectedDays.length).toEqual(days.length);

    days.forEach((day, index) => {
      day = selectedDays[index];

      fireEvent.click(day);

      expect(day).not.toHaveClass("rmdp-selected");
    });

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  test("range mode", () => {
    const onChange = jest.fn();
    const value = [
      new DateObject().subtract(1, "month"),
      new DateObject().add(1, "month"),
    ];
    const { container, getByText } = renderCalendar({
      value,
      onChange,
      range: true,
    });
    const nextButton = container.querySelector(".rmdp-right");
    const start = getByText(value[0].day).parentNode;

    expect(start).toHaveClass("start");

    fireEvent.click(nextButton);

    const allDays = container
      .querySelector(".rmdp-day-picker")
      .querySelectorAll(".rmdp-range");

    expect(allDays.length).toEqual(new DateObject().month.length);

    fireEvent.click(nextButton);

    const end = getByText(value[1].day).parentNode;

    expect(end).toHaveClass("end");

    fireEvent.click(end);
    fireEvent.click(end);

    const dates = onChange.mock.calls[1][0];

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(dates[0].valueOf()).toEqual(dates[1].valueOf());
    expect(end).toHaveClass("start");
    expect(end).toHaveClass("end");
  });
});

describe("custom locales", () => {
  test("digits", () => {
    const date = new DateObject();
    const digits = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"];
    const { getByText } = renderCalendar({ digits });

    Array.from(Array(date.month.length).keys())
      .filter((i) => i !== 0)
      .forEach((day) => {
        day = day.toString().replace(/[0-9]/g, (w) => digits[w]);
        day = getByText(day);

        expect(day).toBeInTheDocument();
      });
  });

  test("weekDays", () => {
    const weekDays = ["su", "mo", "tu", "we", "th", "fr", "sa"];
    const { getByText } = renderCalendar({ weekDays });

    weekDays.forEach((weekDay) => {
      weekDay = getByText(weekDay);

      expect(weekDay).toHaveClass("rmdp-week-day");
    });
  });

  test("months", () => {
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const { getAllByText } = renderCalendar({ months });

    months.forEach((month) => {
      const nodes = getAllByText(month);
      const node = nodes.length === 2 ? nodes[1] : nodes[0];

      expect(node).toBeInTheDocument();
    });
  });
});

describe("other props", () => {
  test("weekStartDayIndex", () => {
    const weekStartDayIndex = 5; //Friday
    const { container } = renderCalendar({ weekStartDayIndex });
    const weekDays = container.querySelectorAll(".rmdp-week-day");

    expect(weekDays[0]).toHaveTextContent("Fri");
  });

  test("hideMonth", () => {
    const { container } = renderCalendar({ hideMonth: true });
    const header = container.querySelector(".rmdp-header-values");

    expect(header).toHaveTextContent(new Date().getFullYear().toString());
  });

  test("hideYear", () => {
    const { container } = renderCalendar({ hideYear: true });
    const header = container.querySelector(".rmdp-header-values");

    expect(header).toHaveTextContent(new DateObject().month.name);
  });
});
