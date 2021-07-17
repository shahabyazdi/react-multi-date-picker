import React from "react";
import { Calendar } from "../../../../../build/index";

export default function Doc({ translate, Code }) {
  const info = {
    description: (
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{translate("plugin_info")}</p>
      </div>
    ),
  };

  const descriptions = {
    title: "Descriptions",
    description: "plugins_doc",
  };

  const stepOne = {
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

  const stepTwo = {
    title: "Step 2: Detecting The Position Of The Plugin",
    description: "step_two",
    code: `import React from "react";
import { Calendar } from "react-multi-date-picker";

function MyPlugin({ position }) {
  return <div>My plugin is in the {position}!</div>;
}

export default function Example() {
  return (
    <>
      <Calendar 
        plugins={[<MyPlugin />, <MyPlugin position="left"/>]} 
      />
      <br/>
      <Calendar 
        disableDayPicker
        plugins={[<MyPlugin />, <MyPlugin position="left"/>]} 
      />
    </>
  )
}
`,
    jsx: (
      <>
        <Calendar plugins={[<MyPlugin2 />, <MyPlugin2 position="left" />]} />
        <br />
        <Calendar
          disableDayPicker
          plugins={[<MyPlugin2 />, <MyPlugin2 position="left" />]}
        />
      </>
    ),
  };

  const stepThree = {
    title:
      "Step 3: Detecting If Another Plugin Is Before Or After The Current Plugin",
    code: `import React from "react";
import { Calendar } from "react-multi-date-picker";

function MyPlugin({ nodes }) {
  const className = [];

  if (nodes.left) className.push("rmdp-border-left");
  if (nodes.right) className.push("rmdp-border-right");

  return (
    <div 
      className={className.join(" ")} 
      style={{ padding: "0 5px" }}
    >
      {Object.keys(nodes).join(" and ")}
    </div>
  );
}

export default function Example() {
  return (
    <Calendar 
      plugins={[
        <MyPlugin />, 
        <MyPlugin />, 
        <MyPlugin />
      ]} 
    />
  )
}
`,
    jsx: <Calendar plugins={[<MyPlugin3 />, <MyPlugin3 />, <MyPlugin3 />]} />,
  };

  return [info, descriptions, stepOne, stepTwo, stepThree];
}

function MyPlugin() {
  return "my first plugin !";
}

function MyPlugin2({ position }) {
  return <div>My plugin is in the {position}!</div>;
}

function MyPlugin3({ nodes }) {
  const className = [];

  if (nodes.left) className.push("rmdp-border-left");
  if (nodes.right) className.push("rmdp-border-right");

  return (
    <div className={className.join(" ")} style={{ padding: "0 5px" }}>
      {Object.keys(nodes).join(" and ")}
    </div>
  );
}
