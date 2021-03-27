import React from "react"

export default function (translate) {
  const typescript = {
    title: "Usage",
    description: "typescript",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker"

export default function Example() {
  const [value, setValue] = useState<Date | DateObject | DateObject[]>(new Date());

  return <DatePicker value={value} onChange={setValue} />;
}`
  }

  return [
    typescript
  ]
}