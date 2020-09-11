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

| Key            |                                             value                                             |             default             | Availability (DatePicker/ Calendar) |
| -------------- | :-------------------------------------------------------------------------------------------: | :-----------------------------: | ----------------------------------- |
| value          | Date, [DateObject](https://github.com/shahabyazdi/react-date-object), String, Number or Array |           new Date()            | both                                |
| range          |                                            Boolean                                            |              false              | both                                |
| timePicker     |                                            Boolean                                            |              false              | both                                |
| onlyTimePicker |                                            Boolean                                            |              false              | both                                |
| mustShowDates  |                                            Boolean                                            | true (in multiple & range mode) | both                                |
| range          |                                            Boolean                                            |              false              | both                                |
| format         |                                            String                                             |           YYYY/MM/DD            | both                                |
| local          |                                         en, fa or ar                                          |               en                | both                                |
| calendar       |                                 gregorian, persian or arabic                                  |            gregorian            | both                                |
| onChange       |                                           Function                                            |            undefined            | both                                |
| className      |                                            String                                             |               ""                | both                                |
| inputClass     |                                            String                                             |               ""                | DatePicker                          |
| name           |                                            String                                             |               ""                | DatePicker                          |
| placeholder    |                                            String                                             |               ""                | DatePicker                          |
| style          |                                            Object                                             |               {}                | DatePicker                          |

## Examples

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
    onChange={dateObject=>{
        console.log(dateObject.toDate())
    }}
/>

<DatePicker
    value="2020/08/27 11:10:59 am"
    format="YYYY/MM/DD hh:mm:ss a"
    timePicker
    onChange={dateObject =>{
        if(dateObject.isValid){
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
    onChange={dateObject =>{
        console.log(dateObject.convert("gregorian").format())
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
