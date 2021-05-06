import React from "react";
import { Calendar } from "../../../../../build/index";

export default function Index(translate, language, otherProps, codeEnd, Code) {
  const descriptions = {
    title: "Descriptions",
    description: "plugins_doc",
  };

  const one = {
    title: "Step 1: Write Your First Plugin",
    code: `import React from "react";
import { Calendar } from "react-multi-date-picker";

function MyPlugin() {
  return "my first plugin !";
}

export default function Example() {
  return (
    <Calendar 
      plugins={[<MyPlugin />]} 
    />
  )
}
`,
    jsx: (
      <>
        <Calendar plugins={[<MyPlugin />]} />
        <p>{translate("plugins_step_1")}</p>
        <p>{translate("plugins_step_2")}</p>
        <Code>{`<Calendar 
  plugins={[
    <MyPlugin position="bottom"/>
  ]} 
/>`}</Code>
        <Calendar plugins={[<MyPlugin position="bottom" />]} />
      </>
    ),
  };

  return [descriptions, one];
}

function MyPlugin() {
  return "my first plugin !";
}
