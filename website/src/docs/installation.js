import React from "react";
import { Link } from "gatsby";

export default function Doc({ translate, language, Code }) {
  const npm = {
    title: "npm",
    description: translate("npm_description"),
    code: `npm install --save react-multi-date-picker`,
  };

  const yarn = {
    title: "yarn",
    description: translate("yarn_description"),
    code: `yarn add react-multi-date-picker`,
  };

  const basicImport = {
    title: "Basic Import",
    description: (
      <>
        <Code title={translate("import_datepicker")}>
          {`import DatePicker from "react-multi-date-picker"`}
        </Code>
        <Code title={translate("import_calendar")}>
          {`import { Calendar } from "react-multi-date-picker"`}
        </Code>
        {language === "fa" && (
          <Link to="../calendars/#%D8%AA%D9%88%D8%B6%DB%8C%D8%AD%D8%A7%D8%AA">
            فارسی کردن تقویم
          </Link>
        )}
      </>
    ),
  };

  const note = {
    title: translate("Important Notes"),
    jsx: (
      <>
        <ul>
          <li>
            <p>{translate("important_note_description_part_1")}</p>
            <p>{translate("important_note_description_part_2")}</p>
            <p>{translate("important_note_description_part_3")}</p>
            <Code>{`<DatePicker />`}</Code>
            <p>{translate("important_note_description_part_4")}</p>
            <Code>{`const [value, setValue] = useState(initialValue)
.
.
.
<DatePicker 
  value={value}
  onChange={handleChange}
/>

function handleChange(value){
  //${translate("important_note_code_comment_1")}
  setValue(value)
}

`}</Code>
          </li>
          <li>
            <p>{translate("important_note_description_part_5")}</p>
            <p>{translate("important_note_description_part_6")}</p>
            <p>{translate("important_note_description_part_7")}</p>
            <Code>{`let [value, setValue] = useState(new Date())
.
.
.
<DatePicker 
  value={value}
  onChange={setValue}
/>
.
.
.
<button onClick={handleSubmit}>submit</button>
.
.
.
function handleSubmit(){
  if (value instanceof DateObject) value = value.toDate()
  
  submitDate(value)
}

`}</Code>
          </li>
          <li>
            <p>{translate("important_note_description_part_8")}</p>
            <p>{translate("important_note_description_part_9")}</p>
            <Code>
              {`<DatePicker
  value="${language === "en" ? "05/18/2020 02:20:36" : "۰۵/۱۸/۲۰۲۰ ۰۲:۲۰:۳۶"}"
  format="MM/DD/YYYY HH:mm:ss"
${
  language === "en"
    ? "/>"
    : `  calendar="persian"
  locale="fa"
/>`
}`}
            </Code>
          </li>
        </ul>
      </>
    ),
  };

  const datePicker = {
    title: translate("DatePicker"),
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"

export default function Example() {
  const [value, setValue] = useState(new Date())

  return (
    <DatePicker 
      value={value}
      onChange={setValue}
    />
  )
}`,
  };

  const calendar = {
    title: translate("Calendar"),
    code: `import React, { useState } from "react"
import { Calendar } from "react-multi-date-picker"

export default function Example() {
  const [value, setValue] = useState(new Date())

  return (
    <Calendar 
      value={value}
      onChange={setValue}
    />
  )
}`,
  };

  const dateObject = {
    title: "DateObject",
    description: translate("dateobject"),
    code: `import React from "react"
import DatePicker, { DateObject } from "react-multi-date-picker"

export default function Example() {
  const [value, setValue] = useState(new DateObject())
  
  return (
    <DatePicker 
      value={value} 
      onChange={setValue} 
    />
  )
}`,
  };

  return [npm, yarn, basicImport, note, datePicker, calendar, dateObject];
}
