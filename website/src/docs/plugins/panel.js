import React, { useState } from "react";
import DatePicker, { DateObject } from "../../../../build/index";
import DatePanel from "../../../../plugins/date_panel";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const [value, setValue] = useState([
    new DateObject(otherProps),
    new DateObject(otherProps).add(2, "days"),
    new DateObject(otherProps).add(10, "days"),
  ]);

  const [focusedDate, setFocusedDate] = useState();

  const [value1, setValue1] = useState([
    new DateObject(otherProps),
    new DateObject(otherProps).add(1, "day"),
  ]);
  const [value2, setValue2] = useState([
    new DateObject(otherProps),
    new DateObject(otherProps).add(1, "day"),
  ]);
  const [value3, setValue3] = useState(
    [5, 10, 15, 20, 25, 30].map((day) => new DateObject(otherProps).setDay(day))
  );

  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const props = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>"right"</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>sort</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>eachDaysInRange</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>onClickDate</td>
            <td>Function</td>
            <td></td>
          </tr>
          <tr>
            <td>removeButton</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>header</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>markFocused</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>focusedClassName</td>
            <td>String</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const sort = {
    title: "Sort",
    jsx: (
      <ul>
        <li>date</li>
        <li>color</li>
      </ul>
    ),
  };

  const note = {
    title: "Important Note About onClickDate",
    description: "date_panel_note",
  };

  const sortByDate = {
    title: "Sort By Date",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
${$import}const [value, setValue] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: persian }`}),
  new DateObject(${
    language === "en" ? "" : `{ calendar: persian }`
  }).add(2, "days"),
  new DateObject(${
    language === "en" ? "" : `{ calendar: persian }`
  }).add(10, "days")
])
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  multiple
  plugins={[
    <DatePanel sort="date" ${language === "en" ? "" : `position="left" `}/>
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value}
        onChange={setValue}
        multiple
        plugins={[
          <DatePanel
            sort="date"
            position={language === "en" ? "right" : "left"}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  const bottom = {
    title: "Position Left",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
${$import}const [value, setValue] = useState(
  [
    5, 
    10,
    15,
    20,
    25,
    30
  ].map(day => new DateObject(${
    language === "en" ? "" : `{ calendar: persian }`
  }).setDay(day))
)
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  multiple
  plugins={[
    <DatePanel position="${language === "en" ? "left" : "right"}" />
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value3}
        onChange={setValue3}
        multiple
        plugins={[
          <DatePanel position={language === "en" ? "left" : "right"} />,
        ]}
        {...otherProps}
      />
    ),
  };

  const withoutButton = {
    title: "Without Remove Button",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
${$import}const [value, setValue] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: persian }`}), 
  new DateObject(${
    language === "en" ? "" : `{ calendar: persian }`
  }).add(1, "day")
])
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <DatePanel
      removeButton={false}
    ${
      language === "en"
        ? "/>"
        : `  position="left" 
    />`
    }
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value1}
        onChange={setValue1}
        plugins={[
          <DatePanel
            removeButton={false}
            position={language === "en" ? "right" : "left"}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  const clickListener = {
    title: "Date Click Listener",
    code: `import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
${$import}const [value, setValue] = useState([
  new DateObject(${language === "en" ? "" : `{ calendar: persian }`}), 
  new DateObject(${
    language === "en" ? "" : `{ calendar: persian }`
  }).add(1, "day")
])
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <DatePanel
      removeButton={false}
      onClickDate={dateObject => {
        let mustDelete = window.confirm("${translate(
          "are you sure you want to delete this date ?"
        )}")
      
        if (mustDelete) setValue(
          value.filter(date => date !== dateObject)
        )
      }}
    ${
      language === "en"
        ? "/>"
        : `  position="left" 
    />`
    }
  ]}
/>`,
    jsx: (
      <DatePicker
        value={value2}
        onChange={setValue2}
        plugins={[
          <DatePanel
            removeButton={false}
            onClickDate={(dateObject) => {
              let mustDelete = window.confirm(
                translate("are you sure you want to delete this date ?")
              );

              if (mustDelete) {
                setValue2(value2.filter((date) => date !== dateObject));
              }
            }}
            position={language === "en" ? "right" : "left"}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  const header = {
    title: "Custom Header Name",
    code: `import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
${$import}<DatePicker
  plugins={[
    <DatePanel header="${language === "en" ? "All Dates" : "همه تاریخ ها"}" />
  ]}
/>`,
    jsx: (
      <DatePicker
        plugins={[
          <DatePanel
            header={language === "en" ? "All Dates" : "همه تاریخ ها"}
          />,
        ]}
        {...otherProps}
      />
    ),
  };

  const focused = {
    title: "Customizing Focused Date",
    description: "focused",
    code: `import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
${$import}const [focusedDate, setFocusedDate] = useState();
.
.
.
<DatePicker
  multiple
  sort
  onFocusedDateChange={setFocusedDate}
  onClose={() => setFocusedDate(undefined)}
  plugins={[
    <DatePanel markFocused focusedClassName="bg-red" />
  ]}
  mapDays={({ date, isSameDate }) => {
    let props = {}
    
    if (!isSameDate(date, focusedDate)) return

    props.style = { backgroundColor: "red" }
    
    return props
  }}
/>`,
    jsx: (
      <DatePicker
        multiple
        sort
        onFocusedDateChange={setFocusedDate}
        onClose={() => setFocusedDate(undefined)}
        plugins={[<DatePanel markFocused focusedClassName="bg-red" />]}
        mapDays={({ date, isSameDate }) => {
          if (isSameDate(date, focusedDate))
            return {
              style: { backgroundColor: "red" },
            };
        }}
        {...otherProps}
      />
    ),
  };

  return [
    props,
    sort,
    note,
    sortByDate,
    bottom,
    withoutButton,
    clickListener,
    header,
    focused,
  ];
}
