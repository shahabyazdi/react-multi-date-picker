import DateObject from "react-date-object";
import findNode, { findCalendar } from "./findNode";

const array = [
  "selected",
  "today",
  "day:not(.rmdp-day-hidden):not(.rmdp-disabled)",
];

export default function handleFocus(e, object, { type = "day", format }) {
  e.preventDefault();

  const { currentTarget, key, code } = e;
  const skip = type === "day" ? 7 : 3;
  const calendar = findCalendar(currentTarget);
  const isRtl = calendar && calendar.classList.contains("rmdp-rtl");

  const numbers = {
    ArrowRight: isRtl ? -1 : 1,
    ArrowLeft: isRtl ? 1 : -1,
    ArrowUp: -skip,
    ArrowDown: skip,
  };

  if (code === "Space" || key === " ") {
    currentTarget.click();
  } else if (Object.keys(numbers).includes(key)) {
    const number = numbers[key];
    const date = new DateObject(object.date).add(number, type);

    focus(
      findNode(
        currentTarget,
        `[aria-label*="${
          object.year ? `year ${object.year + number}` : date.format(format)
        }"]`
      )
    );

    function focus(node) {
      if (!node) return next();

      const classes = node.getAttribute("class");

      if (!classes.includes("hidden") && !classes.includes("disabled")) {
        node.focus();
      } else {
        handleFocus(e, { ...object, date }, { type, format });
      }
    }

    function next() {
      if (type === "month") return findFocusable(calendar, [array[2]]);

      const button = findNode(
        currentTarget,
        number < 0 ? ".rmdp-left" : ".rmdp-right"
      );

      if (button) {
        button.click();

        findFocusable(calendar);
      }
    }
  } else {
    const button = findNode(currentTarget, ".rmdp-arrow-container");

    if (button) button.focus();
  }
}

export function findFocusable(calendar, selectors = array, focus = true) {
  const prefix = "[data-active='true']";

  calendar
    .querySelectorAll(`${prefix} [tabindex='0']`)
    .forEach((element) => element.setAttribute("tabindex", "-1"));

  setTimeout(() => {
    for (let selector of selectors) {
      const node = calendar.querySelector(`${prefix} .rmdp-${selector}`);

      if (node) {
        node.setAttribute("tabindex", "0");

        if (focus) node.focus();

        break;
      }
    }
  }, 10);
}
