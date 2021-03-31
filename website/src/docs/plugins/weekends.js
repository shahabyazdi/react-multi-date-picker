import React, { useState } from "react"
import DatePicker from "../../../../build/index"
import Weekends from "../../../../plugins/weekends"

export default function (trasnlate, language, otherProps) {
  const [mapDays, setMapDays] = useState()
  const [mapDays2, setMapDays2] = useState()
  const [mapDays3, setMapDays3] = useState()

  const props = {
    title: "Props",
    description: <table>
      <thead>
        <tr>
          <th>{trasnlate("Prop")}</th>
          <th>{trasnlate("Type")}</th>
          <th>{trasnlate("Default")}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>weekends</td>
          <td>Array</td>
          <td>*see default weekends</td>
        </tr>
        <tr>
          <td>setMapDays</td>
          <td>Function</td>
          <td>undefined</td>
        </tr>
      </tbody>
    </table>
  }
  const defaultWeekends = {
    title: "Default Weekends",
    description: <table>
      <thead>
        <tr>
          <th>{trasnlate("Calendar")}</th>
          <th>{trasnlate("Default Weekends")}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>gregorian</td>
          <td>[0, 6]</td>
        </tr>
        <tr>
          <td>persian</td>
          <td>[6]</td>
        </tr>
        <tr>
          <td>arabic</td>
          <td>[0, 6]</td>
        </tr>
        <tr>
          <td>indian</td>
          <td>[0]</td>
        </tr>
      </tbody>
    </table>
  }

  const gregorian = {
    title: "Weekends: gregorian",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Weekends from "react-multi-date-picker/plugins/weekends"
.
.
.
const [value, setValue] = useState()
const [mapDays, setMapDays] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  mapDays={mapDays}
  plugins={[
    <Weekends setMapDays={setMapDays} />
  ]}
/> `,
    jsx: <DatePicker
      mapDays={mapDays}
      plugins={[
        <Weekends setMapDays={setMapDays} />
      ]}
      calendarPosition={language === "en" ? "bottom-left" : "auto-right"}
    />
  }

  const persian = {
    title: "Weekends: persian",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Weekends from "react-multi-date-picker/plugins/weekends"
.
.
.
const [value, setValue] = useState()
const [mapDays, setMapDays] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  mapDays={mapDays}
  plugins={[
    <Weekends setMapDays={setMapDays} />
  ]}
/>`,
    jsx: <DatePicker
      calendar="persian"
      locale="fa"
      calendarPosition={language === "en" ? "bottom-left" : "auto-right"}
      mapDays={mapDays2}
      plugins={[
        <Weekends setMapDays={setMapDays2} />
      ]}
    />
  }

  const custom = {
    title: "Weekends: custom",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Weekends from "react-multi-date-picker/plugins/weekends"
.
.
.
const [value, setValue] = useState()
const [mapDays, setMapDays] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  mapDays={mapDays}
  plugins={[
    <Weekends
      weekends={[5, 6]}
      setMapDays={setMapDays}
    />
  ]}
/>`,
    jsx: <DatePicker
      mapDays={mapDays3}
      plugins={[
        <Weekends
          weekends={[5, 6]}
          setMapDays={setMapDays3}
        />
      ]}
      {...otherProps}
    />
  }
  return [
    props,
    defaultWeekends,
    gregorian,
    persian,
    custom
  ]
}