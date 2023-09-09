# DatePicker

Simple React datepicker component for working with `gregorian`, `persian`, `arabic` and `indian` calendars
with the ability to select the date in `single`, `multiple`, `range` and `multiple range` modes.

<div align="center">
  <img src="https://github.com/shahabyazdi/react-multi-date-picker/blob/master/screenshot/screenshot.jpg?raw=true" alt="date picker"/>
</div>

# Layouts

You can change the appearance of the datepicker to `prime` or `mobile` by importing css files from the styles folder.

<div align="center">
  <img src="https://github.com/shahabyazdi/react-multi-date-picker/blob/master/screenshot/layouts.jpg?raw=true"  alt="date picker layouts"/>
</div>

# Plugins

Ability to further customize the calendar and datepicker by adding one or more plugins.

<div align="center">
  <img src="https://github.com/shahabyazdi/react-multi-date-picker/blob/master/screenshot/plugins.jpg?raw=true" alt="date picker plugins all in one"/>
</div>

## Installation

```code
npm i react-multi-date-picker
```

## Demo

- **[DatePicker & Calendar](https://shahabyazdi.github.io/react-multi-date-picker/)**
  - [Multiple Date Picker](https://shahabyazdi.github.io/react-multi-date-picker/multiple/)
  - [Range Picker](https://shahabyazdi.github.io/react-multi-date-picker/range/)
  - [Time Picker & Other Pickers](https://shahabyazdi.github.io/react-multi-date-picker/other-pickers/)
  - [FullYear Picker](https://shahabyazdi.github.io/react-multi-date-picker/other-examples/#full-year-view)
  - [Locales](https://shahabyazdi.github.io/react-multi-date-picker/locales/)
- **[Plugins](https://shahabyazdi.github.io/react-multi-date-picker/plugins)**

  - [Date Panel](https://shahabyazdi.github.io/react-multi-date-picker/plugins/panel/)
  - [Multiple Time Picker](https://shahabyazdi.github.io/react-multi-date-picker/plugins/time-picker/)
  - [Analog Time Picker](https://shahabyazdi.github.io/react-multi-date-picker/plugins/analog-time-picker/)
  - [Toolbar](https://shahabyazdi.github.io/react-multi-date-picker/plugins/toolbar/)
  - [Range Picker Footer](https://shahabyazdi.github.io/react-multi-date-picker/plugins/range-picker-footer/)

- **[آموزش نصب و راه اندازی دیت پیکر به فارسی](https://shahabyazdi.github.io/react-multi-date-picker/fa)**

## Usage

```javascript
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";

export default function Example() {
  const [value, setValue] = useState(new Date());

  return <DatePicker value={value} onChange={setValue} />;
}
```

## Browser (non react-app)

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

    <!-- DatePicker and dependencies-->
    <script src="https://cdn.jsdelivr.net/npm/date-object@latest/dist/umd/date-object.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-element-popper@latest/build/browser.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-multi-date-picker@latest/build/browser.min.js"></script>

    <!-- Optional Plugin -->
    <script src="https://cdn.jsdelivr.net/npm/react-multi-date-picker@latest/build/date_picker_header.browser.js"></script>

    <script>
      const { DatePicker, Calendar } = ReactMultiDatePicker;

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

## Available props

<table>
      <thead>
        <tr>
          <th>Name</th>
          <th style="text-align:center">Type</th>
          <th style="text-align:center">Default</th>
          <th>Availability (DatePicker/ Calendar)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>value</td>
          <td style="text-align:center">
            Date,
            <a href="https://github.com/shahabyazdi/react-date-object">
              DateObject
            </a>
            , String, Number or Array
          </td>
          <td style="text-align:center">new Date()</td>
          <td>both</td>
        </tr>
        <tr>
          <td>ref</td>
          <td style="text-align:center">React.RefObject</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>multiple</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false (true if value is Array)</td>
          <td>both</td>
        </tr>
        <tr>
          <td>range</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>onlyMonthPicker</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>onlyYearPicker</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>format</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center">YYYY/MM/DD</td>
          <td>both</td>
        </tr>
        <tr>
          <td>formattingIgnoreList</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>calendar</td>
          <td style="text-align:center">Object</td>
          <td style="text-align:center">gregorian</td>
          <td>both</td>
        </tr>
        <tr>
          <td>locale</td>
          <td style="text-align:center">Object</td>
          <td style="text-align:center">gregorian_en</td>
          <td>both</td>
        </tr>
        <tr>
          <td>mapDays</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>onPropsChange</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>onMonthChange</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>onYearChange</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>onFocusedDateChange</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>digits</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>weekDays</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>months</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>showOtherDays</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>minDate</td>
          <td style="text-align:center">Date, DateObject, String or Number</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>maxDate</td>
          <td style="text-align:center">Date, DateObject, String or Number</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>disableYearPicker</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>disableMonthPicker</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>disableDayPicker</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>zIndex</td>
          <td style="text-align:center">Number</td>
          <td style="text-align:center">100</td>
          <td>both</td>
        </tr>
        <tr>
          <td>plugins</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center">[]</td>
          <td>both</td>
        </tr>
        <tr>
          <td>sort</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>numberOfMonths</td>
          <td style="text-align:center">Number</td>
          <td style="text-align:center">1</td>
          <td>both</td>
        </tr>
        <tr>
          <td>currentDate</td>
          <td style="text-align:center">DateObject</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>buttons</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>both</td>
        </tr>
        <tr>
          <td>renderButton</td>
          <td style="text-align:center">React.ReactElement or Function</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>weekStartDayIndex</td>
          <td style="text-align:center">Number</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>className</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>readOnly</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>hideMonth</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>hideYear</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
         <tr>
          <td>hideWeekDays</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>shadow</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>both</td>
        </tr>
        <tr>
          <td>fullYear</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>displayWeekNumbers</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>weekNumber</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>both</td>
        </tr>
        <tr>
          <td>weekPicker</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>rangeHover</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>both</td>
        </tr>
        <tr>
          <td>monthYearSeparator</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center">"," for LTR locales, "،" for RTL locales</td>
          <td>both</td>
        </tr>
        <tr>
          <td>formatMonth</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center">undefined</td>
          <td>both</td>
        </tr>
        <tr>
          <td>formatYear</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center">undefined</td>
          <td>both</td>
        </tr>
        <tr>
          <td>highlightToday</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>both</td>
        </tr>
        <tr>
          <td>style</td>
          <td style="text-align:center">React.CSSProperties</td>
          <td style="text-align:center">{}</td>
          <td>both</td>
        </tr>
        <tr>
          <td>headerOrder</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center">["LEFT_BUTTON", "MONTH_YEAR", "RIGHT_BUTTON"]</td>
          <td>both</td>
        </tr>
        <tr>
          <td>onOpen</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>onClose</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>onPositionChange</td>
          <td style="text-align:center">Function</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>containerClassName</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>arrowClassName</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center">0</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>containerStyle</td>
          <td style="text-align:center">React.CSSProperties</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>arrowStyle</td>
          <td style="text-align:center">React.CSSProperties</td>
          <td style="text-align:center">0</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>arrow</td>
          <td style="text-align:center">Boolean or React.ReactElement</td>
          <td style="text-align:center">true</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>animations</td>
          <td style="text-align:center">Array</td>
          <td style="text-align:center">false</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>inputClass</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>name</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>id</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>title</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>required</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>render</td>
          <td style="text-align:center">React.ReactElement or Function</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>inputMode</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>scrollSensitive</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>hideOnScroll</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>calendarPosition</td>
          <td style="text-align:center">String</td>
          <td style="text-align:center">&quot;bottom-left&quot;</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>editable</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>onlyShowInRangeDates</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>fixMainPosition</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>fixRelativePosition</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">false</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>offsetY</td>
          <td style="text-align:center">Number</td>
          <td style="text-align:center">0</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>offsetX</td>
          <td style="text-align:center">Number</td>
          <td style="text-align:center">0</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>mobileLabels</td>
          <td style="text-align:center">Object</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>portal</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>portalTarget</td>
          <td style="text-align:center">HTMLElement</td>
          <td style="text-align:center"></td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>onOpenPickNewDate</td>
          <td style="text-align:center">Boolean</td>
          <td style="text-align:center">true</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>mobileButtons</td>
          <td style="text-align:center"> HTMLButtonElement[]</td>
          <td style="text-align:center">[]</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>dateSeparator</td>
          <td style="text-align:center"> string</td>
          <td style="text-align:center">'~' in range mode, ',' in multiple mode</td>
          <td>DatePicker</td>
        </tr>
        <tr>
          <td>multipleRangeSeparator</td>
          <td style="text-align:center"> string</td>
          <td style="text-align:center">','</td>
          <td>DatePicker</td>
        </tr>
         <tr>
          <td>typingTimeout</td>
          <td style="text-align:center"> string</td>
          <td style="text-align:center">700</td>
          <td>DatePicker</td>
        </tr>
      </tbody>
    </table>

# Calendars & Locales

Click [here](https://shahabyazdi.github.io/react-multi-date-picker/calendars) to see the descriptions.

<table>
  <tbody>
    <tr>
      <th colspan="2" rowspan="2">Calendars</th>
      <th>Gregorian</th>
      <th>Persian (Solar Hijri)</th>
      <th>Jalali</th>
      <th>Arabic (Lunar Hijri)</th>
      <th>Indian</th>
    </tr>
    <tr>
      <td>/calendars/gregorian</td>
      <td>/calendars/persian</td>
      <td>/calendars/jalali</td>
      <td>/calendars/arabic</td>
      <td>/calendars/indian</td>
    </tr>
    <tr>
      <th rowspan="5">Locales</th>
      <th>English</th>
      <td>/locales/gregorian_en</td>
      <td>/locales/persian_en</td>
      <td>/locales/persian_en</td>
      <td>/locales/arabic_en</td>
      <td>/locales/indian_en</td>
    </tr>
    <tr>
      <th>Portuguese - BRAZIL</th>
      <td>/locales/gregorian_pt_br</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <th>Farsi</th>
      <td>/locales/gregorian_fa</td>
      <td>/locales/persian_fa</td>
      <td>/locales/persian_fa</td>
      <td>/locales/arabic_fa</td>
      <td>/locales/indian_fa</td>
    </tr>
    <tr>
      <th>Arabic</th>
      <td>/locales/gregorian_ar</td>
      <td>/locales/persian_ar</td>
      <td>/locales/persian_ar</td>
      <td>/locales/arabic_ar</td>
      <td>/locales/indian_ar</td>
    </tr>
    <tr>
      <th>Hindi</th>
      <td>/locales/gregorian_hi</td>
      <td>/locales/persian_hi</td>
      <td>/locales/persian_hi</td>
      <td>/locales/arabic_hi</td>
      <td>/locales/indian_hi</td>
    </tr>
  </tbody>
</table>

<br/>

Of course, you can customize the names of the months and days of the week
in both the calendar & input by using the `months` and `weekDays` Props.

Also, you can create a custom Calendar and Locale:

- [Creating a custom Calendar](https://shahabyazdi.github.io/react-multi-date-picker/calendars/#custom-calendar)
- [Creating a custom Locale](https://shahabyazdi.github.io/react-multi-date-picker/locales/#custom-locale)
