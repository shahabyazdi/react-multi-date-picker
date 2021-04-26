import React from "react";

export default function Usage(translate, language) {
  const usage = {
    title: "Usage",
    description: (
      <div>
        <p>{translate("plugins_usage_description")}</p>
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
        <p>{translate("plugins_usage")}</p>
        <pre>
          <code className="language-jsx">
            {`import React from "react"
import DatePicker from "react-multi-date-picker"
import MyFavoritePlugin from "react-multi-date-picker/plugins/my_favorite_plugin"

export default function Example() {
  return (
    <DatePicker
      plugins={[
        <MyFavoritePlugin />
      ]}
    />
  )
}

`}
          </code>
        </pre>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DatePickerHeader</td>
            <td>plugins/date_picker_header</td>
            <td>build/date_picker_header.browser</td>
          </tr>
          <tr>
            <td>DatePanel</td>
            <td>plugins/date_panel</td>
            <td>build/date_panel.browser</td>
          </tr>
          <tr>
            <td>MultiColors</td>
            <td>plugins/multi_colors</td>
            <td>build/multi_colors.browser</td>
          </tr>
          <tr>
            <td>Settings</td>
            <td>plugins/settings</td>
            <td>build/settings.browser</td>
          </tr>
          <tr>
            <td>Weekends</td>
            <td>plugins/weekends</td>
            <td>build/weekends.browser</td>
          </tr>
          <tr>
            <td>Toolbar</td>
            <td>plugins/toolbar</td>
            <td>build/toolbar.browser</td>
          </tr>
          <tr>
            <td>TimePicker</td>
            <td>plugins/time_picker</td>
            <td>build/time_picker.browser</td>
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
