import React from "react";
import DatePicker from "../../../../../build/index";

export default function Doc({ translate }) {
  const table = {
    title: "Default Props Table",
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Descriptions")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>current position of the plugin</td>
          </tr>
          <tr>
            <td>nodes</td>
            <td>Object</td>
            <td>
              to determine if there is another plugin around the current plugin
            </td>
          </tr>
          <tr>
            <td>Calendar</td>
            <td>HTML Div Element</td>
            <td></td>
          </tr>
          <tr>
            <td>DatePicker</td>
            <td>HTML Div Element</td>
            <td></td>
          </tr>
          <tr>
            <td>calendarProps</td>
            <td>Object</td>
            <td></td>
          </tr>
          <tr>
            <td>datePickerProps</td>
            <td>Object</td>
            <td></td>
          </tr>
          <tr>
            <td>state</td>
            <td>Object</td>
            <td>the state of the calendar</td>
          </tr>
          <tr>
            <td>setState</td>
            <td>Function</td>
            <td></td>
          </tr>
          <tr>
            <td>registerListener</td>
            <td>Function</td>
            <td></td>
          </tr>
          <tr>
            <td>handleChange</td>
            <td>Function</td>
            <td>if you want to trigger a change event</td>
          </tr>
          <tr>
            <td>handlePropsChange</td>
            <td>Function</td>
            <td>if you want to trigger a props change event</td>
          </tr>
          <tr>
            <td>handleFocusedDate</td>
            <td>Function</td>
            <td>if you want to trigger a focus change event</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const ref = {
    title: "Calendar & DatePicker",
    description: "calendar_datepicker_props",
    code: `import React from "react";
import DatePicker from "react-multi-date-picker";

function MyPlugin({ DatePicker }) {
  return (
    <div>
      <button
        style={{ margin: "5px" }}
        disabled={!DatePicker}
        onClick={() => DatePicker.closeCalendar()}
      >
        Close
      </button>
    </div>
  );
}

export default function Example() {
  return (
    <DatePicker 
      plugins={[
        <MyPlugin position="bottom" />
      ]} 
    />
  )
}`,
    jsx: <DatePicker plugins={[<MyPlugin position="bottom" />]} />,
  };

  const props = {
    title: "calendarProps & datePickerProps",
    description: "calendar_props_datepicker_props",
    code: `function MyPlugin({ datePickerProps, calendarProps }) {
  const props = datePickerProps || calendarProps

  ...
}`,
  };

  const state = {
    title: "State Prop",
    description: "state_prop",
    jsx: (
      <table>
        <thead>
          <tr>
            <th>{translate("Property")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Descriptions")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>date</td>
            <td>DateObject</td>
            <td>
              <p>The date displayed by the calendar</p>
            </td>
          </tr>
          <tr>
            <td>selectedDate</td>
            <td>DateObject or DateObject[]</td>
            <td>
              <p>user-selected date(s)</p>
            </td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>Boolean</td>
            <td rowSpan="2">
              <p> Specifies whether it is in multiple or range mode.</p>
              <p>
                If you want to change the value of any of these properties to
                true, you must change the value of the selectedDate from
                DateObject to DateObject[].
              </p>
            </td>
          </tr>
          <tr>
            <td>range</td>
            <td>Boolean</td>
          </tr>
          <tr>
            <td>onlyMonthPicker</td>
            <td>Boolean</td>
            <td></td>
          </tr>
          <tr>
            <td>onlyYearPicker</td>
            <td>Boolean</td>
            <td></td>
          </tr>
          <tr>
            <td>initialValue</td>
            <td>-</td>
            <td></td>
          </tr>
          <tr>
            <td>value</td>
            <td>-</td>
            <td></td>
          </tr>
          <tr>
            <td>focused</td>
            <td>DateObject or undefined</td>
            <td>
              <p>the date that is focused by the user</p>
            </td>
          </tr>
          <tr>
            <td>calendar</td>
            <td>Object Calendar</td>
            <td></td>
          </tr>
          <tr>
            <td>locale</td>
            <td>Object Locale</td>
            <td></td>
          </tr>
          <tr>
            <td>format</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>year</td>
            <td>Number</td>
            <td></td>
          </tr>
          <tr>
            <td>today</td>
            <td>DateObject</td>
            <td>
              <p>changing this value interferes with calendar performance</p>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };

  return [table, ref, props, state];
}

function MyPlugin({ DatePicker }) {
  return (
    <div>
      <button
        style={{ margin: "5px" }}
        disabled={!DatePicker}
        onClick={() => DatePicker.closeCalendar()}
      >
        Close
      </button>
    </div>
  );
}
