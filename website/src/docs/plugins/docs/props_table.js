import React from "react";

export default function Doc() {
  const table = {
    jsx: (
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
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
  return [table];
}
