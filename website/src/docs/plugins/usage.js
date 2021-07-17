import React from "react";

export default function Doc({ translate, Code }) {
  const usage = {
    title: "Usage",
    description: (
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: translate("plugins_usage_description"),
          }}
        />
        <table>
          <thead>
            <tr>
              <th>{translate("Prop")}</th>
              <th>{translate("Default")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>position</td>
              <td>"right"</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
        <Code title="plugins_usage">
          {`import React from "react"
import DatePicker from "react-multi-date-picker"
import MyFavoritePlugin from "react-multi-date-picker/plugins/my_favorite_plugin"
import myFavoriteFunctionalPlugin from "react-multi-date-picker/plugins/my_favorite_functional_plugin"

export default function Example() {
  return (
    <DatePicker
      plugins={[
        <MyFavoritePlugin />, myFavoriteFunctionalPlugin()
      ]}
    />
  )
}

`}
        </Code>
      </div>
    ),
  };

  const all = {
    title: "Availble Plugins",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Plugin Name")}</th>
            <th>{translate("Path")}</th>
            <th>{translate("Browser Path")}</th>
            <th>{translate("Type")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DatePickerHeader</td>
            <td>plugins/date_picker_header</td>
            <td>build/date_picker_header.browser</td>
            <td>React Component</td>
          </tr>
          <tr>
            <td>DatePanel</td>
            <td>plugins/date_panel</td>
            <td>build/date_panel.browser</td>
            <td>React Component</td>
          </tr>
          <tr>
            <td>colors</td>
            <td>plugins/colors</td>
            <td>build/colors.browser</td>
            <td>Function</td>
          </tr>
          <tr>
            <td>Settings</td>
            <td>plugins/settings</td>
            <td>build/settings.browser</td>
            <td>React Component</td>
          </tr>
          <tr>
            <td>weekends</td>
            <td>plugins/highlight_weekends</td>
            <td>build/highlight_weekends.browser</td>
            <td>Function</td>
          </tr>
          <tr>
            <td>Toolbar</td>
            <td>plugins/toolbar</td>
            <td>build/toolbar.browser</td>
            <td>React Component</td>
          </tr>
          <tr>
            <td>TimePicker</td>
            <td>plugins/time_picker</td>
            <td>build/time_picker.browser</td>
            <td>React Component</td>
          </tr>
          <tr>
            <td>AnalogTimePicker</td>
            <td>plugins/analog_time_picker</td>
            <td>build/analog_time_picker.browser</td>
            <td>React Component</td>
          </tr>
          <tr>
            <td>RangePickerFooter</td>
            <td>plugins/range_picker_footer</td>
            <td>build/range_picker_footer.browser</td>
            <td>React Component</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const positions = {
    title: "Positions",
    description: (
      <ul>
        <li>top</li>
        <li>bottom</li>
        <li>left</li>
        <li>right</li>
      </ul>
    ),
  };

  return [usage, all, positions];
}
