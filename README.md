# DatePicker

![DatePicker](/example/screenshot.jpg?raw=true)

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

[Demo](https://shahabyazdi.github.io/react-multi-date-picker/)

## Availble props

| Key            |                                      value                                       |         default         |
| -------------- | :------------------------------------------------------------------------------: | :---------------------: |
| value          | Date, [DateObject](https://github.com/shahabyazdi/date-object), String or Number |       new Date()        |
| timePicker     |                                     Boolean                                      |          false          |
| onlyTimePicker |                                     Boolean                                      |          false          |
| liveChange     |                                     Boolean                                      |          false          |
| multiple       |                                     Boolean                                      |          false          |
| mustShowDates  |                                     Boolean                                      | true (in multiple mode) |
| range          |                                     Boolean                                      |          false          |
| format         |                                      String                                      |       YYYY/MM/DD        |
| local          |                                   en, fa or ar                                   |           en            |
| calendar       |                           gregorian, persian or arabic                           |        gregorian        |
| onChange       |                                     Function                                     |            -            |

## Example

### 1- Date

```xml
<DatePicker
    value={new Date()}
/>

<DatePicker
    value={new Date(2020,9,27)}
/>

```

### 2- String

```xml
<DatePicker
    value="2020/08/27"
/>

<DatePicker
    value="2020/27/08"
    format="YYYY/DD/MM"
/>

<DatePicker
    value="August 27 2020"
    format="MMMM DD YYYY"
/>
```

### 3-timePicker

```xml
<DatePicker
    value="2020/08/27 12:30:31"
    format="YYYY/MM/DD HH:mm:ss"
    timePicker
/>

<DatePicker
    value={new Date()}
    format="YYYY-MM-DD HH:mm:ss"
    timePicker
/>

<DatePicker
    value="August 27 2020 12:30:31 am"
    format="MMMM DD YYYY hh:mm:ss a"
    timePicker
/>
```

### 4-onlyTimePicker

```xml
<DatePicker
    value="12:30:31 am"
    format="hh:mm:ss a"
    onlyTimePicker
/>

<DatePicker
    value={new Date()}
    format="hh-mm-ss A"
    onlyTimePicker
/>
```

### 5-onChange

```xml
<DatePicker
    value={new Date()}
    format="YYYY/MM/DD hh:mm:ss a"
    timePicker
    onChange={(stringDate,dateObject)=>{
        console.log(stringDate,dateObject.toDate())
    }}
/>

<DatePicker
    value="2020/08/27 11:10:59 am"
    format="YYYY/MM/DD hh:mm:ss a"
    timePicker
    onChange={(stringDate, dateObject)=>{
        if(dateObject.isValid){
            console.log(stringDate)
        }
    }}
/>

<DatePicker
    value="2020/08/27 11:10:59 am"
    format="YYYY/MM/DD hh:mm:ss a"
    timePicker
    onChange={(stringDate, dateObject)=>{
        if(dateObject.weekDay.name === "Friday" ){
            console.log(dateObject.format())
        }
    }}
/>
```

### 6-local and calendar

```xml
<DatePicker
    value={new Date()}
    format="YYYY/MM/DD hh:mm:ss a"
    calendar="persian"
    local="fa"
    timePicker
    onChange={(stringDate,dateObject)=>{
        console.log(stringDate,dateObject.convert("gregorian"))
    }}
/>

<DatePicker
    value="1399/06/05 12:30:24 pm"
    format="YYYY/MM/DD hh:mm:ss a"
    calendar="persian"
    local="en"
    timePicker
/>

<DatePicker
    calendar="arabic"
    local="ar"
/>

```
