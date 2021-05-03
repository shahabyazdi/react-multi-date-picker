import React, { useState, useEffect, useRef } from "react";
import Title from "../title/title";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Demo from "../demo/demo";
import Example from "../example/example";
import Prism from "prismjs";
import Arrow from "../arrow/arrow";
import english from "../../languages/en.json";
import farsi from "../../languages/fa.json";
import useClickOutSide from "./useClickOutside";

import "./layout.css";

import "../../../../styles/backgrounds/bg-dark.css";
import "../../../../styles/backgrounds/bg-gray.css";
import "../../../../styles/backgrounds/bg-brown.css";

import "../../../../styles/colors/red.css";
import "../../../../styles/colors/green.css";
import "../../../../styles/colors/yellow.css";
import "../../../../styles/colors/purple.css";
import "../../../../styles/colors/teal.css";
import "../../../../styles/colors/analog_time_picker_red.css";
import "../../../../styles/colors/analog_time_picker_green.css";
import "../../../../styles/colors/analog_time_picker_yellow.css";
import "../../../../styles/colors/analog_time_picker_purple.css";
import "../../../../styles/colors/analog_time_picker_teal.css";

import "../../../../styles/layouts/mobile.css";
import "../../../../styles/layouts/prime.css";

import "prismjs/components/prism-jsx.min";
import "prismjs/themes/prism-okaidia.css";

const sidebar = {
  default: [
    { name: "Home", path: "" },
    { name: "Installation & Usage", path: "installation/" },
    { name: "TypeScript", path: "typescript/" },
    { name: "Props", path: "props/" },
    { name: "Formatting Tokens", path: "format-tokens/" },
    { name: "Calendars & Locales", path: "calendars/" },
    { name: "DateObject", path: "date-object/" },
    { name: "Component with Children", path: "children/" },
    { name: "Multiple Mode", path: "multiple/" },
    { name: "Range Mode", path: "range/" },
    { name: "Other Pickers", path: "other-pickers/" },
    { name: "Multiple Months", path: "multiple-months/" },
    { name: "Min & Max Date", path: "min-&-max-date/" },
    { name: "Events", path: "events/" },
    { name: "Custom Digits, Months & WeekDays", path: "locales/" },
    { name: "Types & Custom Input", path: "types/" },
    { name: "Customizing Calendar Days", path: "map-days/" },
    { name: "Customizing Navigate Buttons", path: "buttons/" },
    { name: "Calendar Position", path: "positions/" },
    { name: "DatePicker & Calendar Ref", path: "ref/" },
    { name: "Appearance", path: "appearance/" },
    { name: "Colors & Backgrounds", path: "colors/" },
    { name: "ClassNames & Styles", path: "classes-&-styles/" },
    { name: "Custom Arrow", path: "arrow/" },
    { name: "Other Examples", path: "other-examples/" },
    { name: "Plugins", path: "plugins/" },
  ],
  plugins: [
    { name: "Home", path: "" },
    { name: "Plugins", path: "plugins/" },
    { name: "Usage", path: "plugins/usage/" },
    { name: "Date Picker Header", path: "plugins/header/" },
    { name: "Date Panel", path: "plugins/panel/" },
    { name: "Multi Colors", path: "plugins/colors/" },
    { name: "Settings", path: "plugins/settings/" },
    { name: "Weekends", path: "plugins/weekends/" },
    { name: "Toolbar", path: "plugins/toolbar/" },
    { name: "Time Picker", path: "plugins/time-picker/" },
    { name: "Analog Time Picker", path: "plugins/analog-time-picker/" },
    { name: "Range Picker Footer", path: "plugins/range-picker-footer/" },
  ],
};

export default function Layout({ language, doc, section }) {
  const [active, setActive] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => Prism.highlightAll(), [doc]);

  useClickOutSide(sidebarRef, setActive);

  const toggleSidebar = () => setActive(!active);

  const translate = (string) =>
    language === "fa" ? farsi[string] ?? string : english[string] ?? string;

  const pathname =
    typeof window !== "undefined"
      ? window.location.pathname.replace("/react-multi-date-picker", "")
      : "";

  return (
    <main className={language === "fa" ? "rtl" : ""}>
      <Title
        language={language}
        translate={translate}
        section={section}
        sidebar={sidebar}
        pathname={pathname}
      />

      <Navbar
        language={language}
        toggleSidebar={toggleSidebar}
        pathname={pathname}
      />

      <Sidebar
        ref={sidebarRef}
        sidebar={sidebar}
        pathname={pathname}
        language={language}
        translate={translate}
        section={section}
        active={active}
      />

      <div className="main">
        <div className="scroll-to-top">
          <Arrow direction="rmdp-up" />
        </div>
        {getDoc()}
      </div>
    </main>
  );

  function getDoc() {
    if (!doc) return <Demo language={language} translate={translate} />;

    const codeEnd =
      language === "en"
        ? "/>"
        : `  calendar="persian"
  locale="fa"
  calendarPosition="auto-right"
/>`;

    const otherProps = {
      calendar: language === "fa" ? "persian" : "gregorian",
      locale: language === "fa" ? "fa" : "en",
      calendarPosition: language === "fa" ? "bottom-right" : undefined,
    };

    doc = doc(translate, language, otherProps, codeEnd, Code);

    return doc.map(
      ({ title = "", description = "", code = "", jsx }, index) => {
        title = translate(title);
        description = translate(description);

        if (language === "fa") code = code.replace(/\/>$/, codeEnd);

        if (Array.isArray(description)) {
          description = description.map((desc, index) => {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: `<p>${desc}</p>` }}
              ></div>
            );
          });
        } else if (typeof description === "string") {
          description = (
            <div
              dangerouslySetInnerHTML={{ __html: `<p>${description}</p>` }}
            ></div>
          );
        }

        return (
          <div key={index}>
            <Example
              id={title.replace(/\s/g, "-").toLowerCase()}
              title={title}
              description={description}
              code={code}
              jsx={jsx}
            />
          </div>
        );
      }
    );
  }

  function Code({ title, children }) {
    useEffect(() => Prism.highlightAll(), [children]);

    return (
      <>
        {title && <p>{translate(title)}</p>}
        <pre>
          <code className="language-jsx">{children}</code>
        </pre>
      </>
    );
  }
}
