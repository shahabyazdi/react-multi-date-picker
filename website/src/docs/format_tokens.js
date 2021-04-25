import React from "react";
import { DateObject } from "../../../build/index";

export default function FormatTokens(translate, language) {
  const date = new DateObject({
    calendar: language === "en" ? "gregorian" : "persian",
    locale: language,
  });

  const separator = language === "en" ? ", " : "، ";

  const format = (array) =>
    array
      .map((string) => string.replace(/[0-9]/g, (w) => date.digits[w]))
      .join(separator);

  const weekDays = date.weekDays;

  const tokens = {
    title: translate("Formatting Tokens"),
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Token")}</th>
            <th>{translate("Example")}</th>
            <th>{translate("Descriptions")}</th>
            <th>{translate("Availability (Parse /Format)")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>YYYY</td>
            <td>{date.format("YYYY")}</td>
            <td>{translate("full year")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>YY</td>
            <td>{date.format("YY")}</td>
            <td>{translate("2 digits year")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>MMMM</td>
            <td>{date.format("MMMM")}</td>
            <td>{translate("month name")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>MMM</td>
            <td>{date.format("MMM")}</td>
            <td>{translate("month short name")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>MM</td>
            <td>{format(["03", "09", "10", "11", "..."])}</td>
            <td>{translate("2 digits month number")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>M</td>
            <td>{format(["3", "9", "10", "11", "..."])}</td>
            <td>{translate("month number")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>DDDD</td>
            <td>{format(["09"])}</td>
            <td>{translate("2 digits day of year")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>DDD</td>
            <td>{format(["9"])}</td>
            <td>{translate("day of year")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>DD</td>
            <td>{format(["03", "09", "10", "17", "..."])}</td>
            <td>{translate("2 digits day of month")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>D</td>
            <td>{format(["3", "9", "10", "17", "..."])}</td>
            <td>{translate("day of month")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>WW</td>
            <td>{format(["01", "03", "24", "33", "..."])}</td>
            <td>{translate("2 digits week of year")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>W</td>
            <td>{format(["1", "3", "24", "33", "..."])}</td>
            <td>{translate("week of year")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>dddd</td>
            <td>
              {[0, 1, 2]
                .map((index) => weekDays[index].name)
                .concat("...")
                .join(separator)}
            </td>
            <td>{translate("week day name")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>ddd</td>
            <td>
              {[0, 1, 2]
                .map((index) => weekDays[index].shortName)
                .concat("...")
                .join(separator)}
            </td>
            <td>{translate("week day short name")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>dd</td>
            <td>{format(["01", "02", "...", "07"])}</td>
            <td>{translate("2 digits week day number")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>d</td>
            <td>{format(["1", "2", "...", "7"])}</td>
            <td>{translate("week day number")}</td>
            <td>{translate("format")}</td>
          </tr>
          <tr>
            <td>HH</td>
            <td>{format(["03", "09", "13", "17", "..."])}</td>
            <td>{translate("2 digits hour (24 hour mode)")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>H</td>
            <td>{format(["3", "9", "13", "17", "..."])}</td>
            <td>{translate("hour (24 hour mode)")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>hh</td>
            <td>{format(["03", "09", "10", "12", "..."])}</td>
            <td>{translate("2 digits hour (12 hour mode)")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>h</td>
            <td>{format(["3", "9", "10", "12", "..."])}</td>
            <td>{translate("hour (12 hour mode)")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>mm</td>
            <td>{format(["03", "09", "10", "17", "..."])}</td>
            <td>{translate("2 digits minute")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>m</td>
            <td>{format(["3", "9", "10", "17", "..."])}</td>
            <td>{translate("minute")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>ss</td>
            <td>{format(["03", "09", "10", "17", "..."])}</td>
            <td>{translate("2 digits second")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>s</td>
            <td>{format(["3", "9", "10", "17", "..."])}</td>
            <td>{translate("second")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>SSS</td>
            <td>{format(["100"])}</td>
            <td>{translate("3 digits millisecond")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>SS</td>
            <td>{format(["10"])}</td>
            <td>{translate("2 digits millisecond")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>S</td>
            <td>{format(["1"])}</td>
            <td>{translate("1 digit millisecond")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>A</td>
            <td>{date.format("A")}</td>
            <td>{translate("meridiem")}</td>
            <td>{translate("both")}</td>
          </tr>
          <tr>
            <td>a</td>
            <td>{date.format("a")}</td>
            <td>{translate("meridiem lowercase")}</td>
            <td>{translate("both")}</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  return [tokens];
}
