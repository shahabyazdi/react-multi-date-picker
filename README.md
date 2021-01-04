# DatePicker

![DatePicker](/screenshot/screenshot.jpg?raw=true)

# Layouts

![Layouts](/screenshot/layouts.jpg?raw=true)

# Plugins

![Plugins](/screenshot/plugins.jpg?raw=true)

## Installation

```code
npm install --save react-multi-date-picker
```

## Demo

[https://shahabyazdi.github.io/react-multi-date-picker](https://shahabyazdi.github.io/react-multi-date-picker/)

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

    <span>Plugins Example :</span>
    <div id="datePickerWithPlugin"></div>

    <!-- Ract -->
    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>

    <!-- DateObject -->
    <script src="https://cdn.jsdelivr.net/npm/date-object@latest/dist/date-object.min.js"></script>

    <!-- ReactMultiDatePicker -->
    <script src="https://cdn.jsdelivr.net/npm/react-multi-date-picker@latest/build/browser.min.js"></script>

    <!-- Optional Plugins -->
    <script src="https://cdn.jsdelivr.net/npm/react-multi-date-picker@latest/build/browser_plugins.min.js"></script>

    <script>
      const { DatePicker, Calendar } = ReactMultiDatePicker;

      const { DatePickerHeader } = ReactMultiDatePickerPlugins;

      ReactDOM.render(
        React.createElement(Calendar),
        document.getElementById("calendar")
      );

      ReactDOM.render(
        React.createElement(DatePicker),
        document.getElementById("datePicker")
      );

      ReactDOM.render(
        React.createElement(DatePicker, {
          plugins: [React.createElement(DatePickerHeader)],
        }),
        document.getElementById("datePickerWithPlugin")
      );
    </script>
  </body>
</html>
```

## Availble props

| Name                 |                                             Type                                              |            Default             | Availability (DatePicker/ Calendar) |
| -------------------- | :-------------------------------------------------------------------------------------------: | :----------------------------: | ----------------------------------- |
| value                | Date, [DateObject](https://github.com/shahabyazdi/react-date-object), String, Number or Array |           new Date()           | both                                |
| multiple             |                                            Boolean                                            | false (true if value is Array) | both                                |
| range                |                                            Boolean                                            |             false              | both                                |
| timePicker           |                                            Boolean                                            |             false              | both                                |
| onlyTimePicker       |                                            Boolean                                            |             false              | both                                |
| onlyMonthPicker      |                                            Boolean                                            |             false              | both                                |
| onlyYearPicker       |                                            Boolean                                            |             false              | both                                |
| format               |                                            String                                             |           YYYY/MM/DD           | both                                |
| formattingIgnoreList |                                             Array                                             |           undefined            | both                                |
| local                |                                            String                                             |               en               | both                                |
| calendar             |                                            String                                             |           gregorian            | both                                |
| mapDays              |                                           Function                                            |           undefined            | both                                |
| onChange             |                                           Function                                            |           undefined            | both                                |
| className            |                                            String                                             |               ""               | both                                |
| weekDays             |                                             Array                                             |           undefined            | both                                |
| months               |                                             Array                                             |           undefined            | both                                |
| showOtherDays        |                                            Boolean                                            |             false              | both                                |
| minDate              |                              Date, DateObject, String or Number                               |           undefined            | both                                |
| maxDate              |                              Date, DateObject, String or Number                               |           undefined            | both                                |
| disableYearPicker    |                                            Boolean                                            |             false              | both                                |
| disableMonthPicker   |                                            Boolean                                            |             false              | both                                |
| zIndex               |                                            Number                                             |              100               | both                                |
| plugins              |                                             Array                                             |               []               | both                                |
| arrow                |                                            Boolean                                            |              true              | DatePicker                          |
| animation            |                                            Boolean                                            |             false              | DatePicker                          |
| inputClass           |                                            String                                             |               ""               | DatePicker                          |
| name                 |                                            String                                             |           undefined            | DatePicker                          |
| id                   |                                            String                                             |           undefined            | DatePicker                          |
| title                |                                            String                                             |           undefined            | DatePicker                          |
| placeholder          |                                            String                                             |           undefined            | DatePicker                          |
| style                |                                            Object                                             |               {}               | DatePicker                          |
| type                 |                                            String                                             |             input              | DatePicker                          |
| render               |                                  React.Component or Function                                  |           undefined            | DatePicker                          |
| disabled             |                                            Boolean                                            |             false              | DatePicker                          |
| inputMode            |                                            String                                             |           undefined            | DatePicker                          |
| scrollSensitive      |                                            Boolean                                            |              true              | DatePicker                          |
| hideOnScroll         |                                            Boolean                                            |             false              | DatePicker                          |
| calendarPosition     |                                            String                                             |              auto              | DatePicker                          |
| containerStyle       |                                            Object                                             |           undefined            | DatePicker                          |
| containerClassName   |                                            String                                             |           undefined            | DatePicker                          |
| editable             |                                            Boolean                                            |              true              | DatePicker                          |
| onlyShowInRangeDates |                                            Boolean                                            |              true              | DatePicker                          |
| onOpen               |                                           Function                                            |           undefined            | DatePicker                          |
| onClose              |                                           Function                                            |           undefined            | DatePicker                          |

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
-
