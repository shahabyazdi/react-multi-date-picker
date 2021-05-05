import React from "react";

export default function installation(translate, language) {
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
        <p>{translate("import_datepicker")} :</p>
        <pre>
          <code className="language-jsx">
            {`import DatePicker from "react-multi-date-picker"`}
          </code>
        </pre>
        <p>{translate("import_calendar")} :</p>
        <pre>
          <code className="language-jsx">
            {`import { Calendar } from "react-multi-date-picker"`}
          </code>
        </pre>
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
            <pre>
              <code className="language-jsx">{`<DatePicker />`}</code>
            </pre>
            <p>{translate("important_note_description_part_4")}</p>
            <pre>
              <code className="language-jsx">
                {`const [value, setValue] = useState(initialValue)
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

`}
              </code>
            </pre>
          </li>
          <li>
            <p>{translate("important_note_description_part_5")}</p>
            <p>{translate("important_note_description_part_6")}</p>
            <p>{translate("important_note_description_part_7")}</p>
            <pre>
              <code className="language-jsx">
                {`let [value, setValue] = useState(new Date())
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

`}
              </code>
            </pre>
          </li>
          <li>
            <p>{translate("important_note_description_part_8")}</p>
            <p>{translate("important_note_description_part_9")}</p>
            <pre>
              <code className="language-jsx">
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
              </code>
            </pre>
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
