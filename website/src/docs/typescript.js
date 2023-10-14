export default function Doc() {
  const typescript = {
    title: "Usage",
    description: "typescript",
    code: `import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"

export default function Example() {
  const [value, setValue] = useState<Value>(new Date());

  return <DatePicker value={value} onChange={setValue} />;
}`,
  };

  const ref = {
    title: "Adding Ref to Calendar & DatePicker",
    code: `import React, { useRef } from "react";
import DatePicker, { Calendar, CalendarRef, DatePickerRef } from "react-multi-date-picker"

export default function Example() {
  const calendarRef = useRef<CalendarRef>();
  const datepickerRef = useRef<DatePickerRef>();

  return (
    <>
      <Calendar ref={calendarRef} />
      <DatePicker ref={datepickerRef} />
    </>
  )
}`,
  };

  return [typescript, ref];
}
