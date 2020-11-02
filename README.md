# DatePicker

![DatePicker](/screenshot/screenshot.jpg?raw=true)

## Installation

```code
npm install --save react-multi-date-picker
```

## Usage

```javascript
import react from "react";
import DatePicker from "react-multi-date-picker";

export default function Example() {
  return <DatePicker />;
}
```

## Demo

[https://shahabyazdi.github.io/react-multi-date-picker](https://shahabyazdi.github.io/react-multi-date-picker/)

## Availble props

| Name            |                                             Type                                              |                Default                | Availability (DatePicker/ Calendar) |
| --------------- | :-------------------------------------------------------------------------------------------: | :-----------------------------------: | ----------------------------------- |
| value           | Date, [DateObject](https://github.com/shahabyazdi/react-date-object), String, Number or Array |              new Date()               | both                                |
| multiple        |                                            Boolean                                            |    false (true if value is Array)     | both                                |
| range           |                                            Boolean                                            |                 false                 | both                                |
| timePicker      |                                            Boolean                                            |                 false                 | both                                |
| onlyTimePicker  |                                            Boolean                                            |                 false                 | both                                |
| onlyMonthPicker |                                            Boolean                                            |                 false                 | both                                |
| onlyYearPicker  |                                            Boolean                                            |                 false                 | both                                |
| mustShowDates   |                                            Boolean                                            | false (true in multiple & range mode) | both                                |
| format          |                                            String                                             |              YYYY/MM/DD               | both                                |
| local           |                                            String                                             |                  en                   | both                                |
| calendar        |                                            String                                             |               gregorian               | both                                |
| onChange        |                                           Function                                            |               undefined               | both                                |
| className       |                                            String                                             |                  ""                   | both                                |
| inputClass      |                                            String                                             |                  ""                   | DatePicker                          |
| name            |                                            String                                             |                  ""                   | DatePicker                          |
| style           |                                            Object                                             |                  {}                   | DatePicker                          |
| type            |                                            String                                             |                 input                 | DatePicker                          |
| render          |                                  React.Component or Function                                  |               undefined               | DatePicker                          |
| disabled        |                                            Boolean                                            |                 false                 | DatePicker                          |
| placeholder     |                                            String                                             |                  ""                   | DatePicker                          |

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
