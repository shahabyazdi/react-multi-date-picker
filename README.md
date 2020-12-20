# DatePicker

![DatePicker](/screenshot/screenshot.jpg?raw=true)

## Installation

```code
npm install --save react-multi-date-picker
```

## Usage

```javascript
import React from "react";
import DatePicker from "react-multi-date-picker";

export default function Example() {
  return <DatePicker />;
}
```

## Browser (none react-app)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React Multi Date Picker</title>
  </head>
  <body>
    <span>Calendar Example :</span>
    <div id="calendar"></div>

    <span>DatePicker Example :</span>
    <div id="datePicker"></div>

    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/date-object@1.1.7/dist/date-object.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-multi-date-picker@1.8.5/build/date-picker.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-multi-date-picker@1.8.5/build/calendar.min.js"></script>

    <script type="text/babel">
      ReactDOM.render(<Calendar />, document.getElementById("calendar"));
      ReactDOM.render(<DatePicker />, document.getElementById("datePicker"));
    </script>
  </body>
</html>
```

## Demo

[https://shahabyazdi.github.io/react-multi-date-picker](https://shahabyazdi.github.io/react-multi-date-picker/)

## Availble props

| Name                 |                                             Type                                              |                Default                | Availability (DatePicker/ Calendar) |
| -------------------- | :-------------------------------------------------------------------------------------------: | :-----------------------------------: | ----------------------------------- |
| value                | Date, [DateObject](https://github.com/shahabyazdi/react-date-object), String, Number or Array |              new Date()               | both                                |
| multiple             |                                            Boolean                                            |    false (true if value is Array)     | both                                |
| range                |                                            Boolean                                            |                 false                 | both                                |
| timePicker           |                                            Boolean                                            |                 false                 | both                                |
| onlyTimePicker       |                                            Boolean                                            |                 false                 | both                                |
| onlyMonthPicker      |                                            Boolean                                            |                 false                 | both                                |
| onlyYearPicker       |                                            Boolean                                            |                 false                 | both                                |
| mustShowDates        |                                            Boolean                                            | false (true in multiple & range mode) | both                                |
| format               |                                            String                                             |              YYYY/MM/DD               | both                                |
| formattingIgnoreList |                                             Array                                             |               undefined               | both                                |
| local                |                                            String                                             |                  en                   | both                                |
| calendar             |                                            String                                             |               gregorian               | both                                |
| mapDays              |                                           Function                                            |               undefined               | both                                |
| onChange             |                                           Function                                            |               undefined               | both                                |
| className            |                                            String                                             |                  ""                   | both                                |
| weekDays             |                                             Array                                             |               undefined               | both                                |
| months               |                                             Array                                             |               undefined               | both                                |
| showOtherDays        |                                            Boolean                                            |                 true                  | both                                |
| minDate              |                              Date, DateObject, String or Number                               |               undefined               | both                                |
| maxDate              |                              Date, DateObject, String or Number                               |               undefined               | both                                |
| disableYearPicker    |                                            Boolean                                            |                 false                 | both                                |
| disableMonthPicker   |                                            Boolean                                            |                 false                 | both                                |
| eachDaysInRange      |                                            Boolean                                            |                 false                 | both                                |
| zIndex               |                                            Number                                             |                  100                  | both                                |
| animation            |                                            Boolean                                            |                 false                 | DatePicker                          |
| inputClass           |                                            String                                             |                  ""                   | DatePicker                          |
| name                 |                                            String                                             |                  ""                   | DatePicker                          |
| style                |                                            Object                                             |                  {}                   | DatePicker                          |
| type                 |                                            String                                             |                 input                 | DatePicker                          |
| render               |                                  React.Component or Function                                  |               undefined               | DatePicker                          |
| disabled             |                                            Boolean                                            |                 false                 | DatePicker                          |
| placeholder          |                                            String                                             |                  ""                   | DatePicker                          |
| inputMode            |                                            String                                             |               undefined               | DatePicker                          |
| scrollSensitive      |                                            Boolean                                            |                 true                  | DatePicker                          |
| hideOnScroll         |                                            Boolean                                            |                 false                 | DatePicker                          |
| calendarPosition     |                                            String                                             |                 auto                  | DatePicker                          |
| containerStyle       |                                            Object                                             |               undefined               | DatePicker                          |
| containerClassName   |                                            String                                             |               undefined               | DatePicker                          |
| editable             |                                            Boolean                                            |                 true                  | DatePicker                          |
| onlyShowInRangeDates |                                            Boolean                                            |                 true                  | DatePicker                          |

## Calendars and Locals

<table>
  <thead>
    <tr>
      <th>Calendars</th>
      <th>Locals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gregorian (default)</td>
      <td>en (default)</td>
    </tr>
    <tr>
      <td>persian</td>
      <td>fa</td>
    </tr>
    <tr>
      <td>arabic</td>
      <td>ar</td>
    </tr>
    <tr>
      <td>indian</td>
      <td>hi</td>
    </tr>
  </tbody>
</table>

## Types

<table>
  <thead>
    <tr>
      <th colSpan="5">DatePicker Types</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>input (default)</td>
      <td>input-icon</td>
      <td>icon</td>
      <td>button</td>
      <td>custom</td>
    </tr>
  </tbody>
</table>
