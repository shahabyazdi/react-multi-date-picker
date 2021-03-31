import React, { useState } from "react"
import DatePicker from "../../../../build/index"
import Toolbar from "../../../../plugins/toolbar"

export default function (trasnlate, language, otherProps) {
  const [value, setValue] = useState()

  const toolbar = {
    title: "Toolbar",
    code: `import React, { useState } from "react"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
.
.
.
const [value, setValue] = useState()
.
.
.
<DatePicker
  value={value}
  onChange={setValue}
  plugins={[
    <Toolbar position="bottom" />
  ]}
/>`,
    jsx: <DatePicker
      value={value}
      onChange={setValue}
      plugins={[
        <Toolbar position="bottom" />
      ]}
      {...otherProps}
    />
  }

  return [
    toolbar
  ]
}