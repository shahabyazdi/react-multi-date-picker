import React, { useState } from "react";
import DatePicker from "../../../../build/index";
import Settings from "../../../../plugins/settings";
import DatePanel from "../../../../plugins/date_panel";

export default function Doc({ translate, language, otherProps, localeImport }) {
  const [settings1, setSettings1] = useState({ ...otherProps });
  const [settings2, setSettings2] = useState({ multiple: true, ...otherProps });
  const [settings3, setSettings3] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    ...otherProps,
  });

  const $import =
    language === "en"
      ? `.
.
.
`
      : localeImport;

  const props = {
    title: "Props",
    description: (
      <table>
        <thead>
          <tr>
            <th>{translate("Prop")}</th>
            <th>{translate("Type")}</th>
            <th>{translate("Default")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>position</td>
            <td>String</td>
            <td>"right"</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>calendars</td>
            <td>Array</td>
            <td>["gregorian", "persian", "arabic", "indian"]</td>
          </tr>
          <tr>
            <td>locales</td>
            <td>Array</td>
            <td>["en", "fa", "ar", "hi"]</td>
          </tr>
          <tr>
            <td>modes</td>
            <td>Array</td>
            <td>["single", "multiple", "range"]</td>
          </tr>
          <tr>
            <td>others</td>
            <td>Array</td>
            <td>["onlyMonthPicker", "onlyYearPicker"]</td>
          </tr>
          <tr>
            <td>defaultActive</td>
            <td>string</td>
            <td>""</td>
          </tr>
          <tr>
            <td>disabledList</td>
            <td>Array</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>defaultFormat</td>
            <td>Object</td>
            <td>{"{}"}</td>
          </tr>
          <tr>
            <td>names</td>
            <td>Object</td>
            <td>
              <pre className="language-jsx">
                <code>{`{
  gregorian: "GE",
  persian: "PE",
  arabic: "AR",
  indian: "IN",
  en: "EN",
  fa: "FA",
  ar: "AR",
  hi: "HI",
  single: "SI",
  multiple: "MU",
  range: "RA",
  disable: "DI",
  onlyMonthPicker: "OM",
  onlyYearPicker: "OY",
}`}</code>
              </pre>
            </td>
          </tr>
          <tr>
            <td>titles</td>
            <td>Object</td>
            <td>
              <pre className="language-jsx">
                <code>{`{
  calendar: "Calendar",
  locale: "Locale",
  mode: "Mode",
  otherPickers: "Other Pickers",
  gregorian: "Gregorian",
  persian: "Persian",
  arabic: "Arabic",
  indian: "Indian",
  en: "English",
  fa: "Farsi",
  ar: "Arabic",
  hi: "Hindi",
  single: "Single",
  multiple: "Multiple",
  range: "Range",
  disable: "Disable",
  onlyMonthPicker: "Only Month Picker",
  onlyYearPicker: "Only Year Picker",
}`}</code>
              </pre>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  };

  const bottom = {
    title: "Settings Bottom",
    description: <div></div>,
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
${$import}const [props, setProps] = useState(${
      language === "en"
        ? "{}"
        : `{
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right"
}`
    })
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Settings
      position="bottom"
      defaultActive="mode"
    />,
    <DatePanel 
      disabled={!props.multiple && !props.range} 
      position={["fa", "ar"].includes(props.locale?.name?.split?.("_")?.[1]) ? "left" : "right"}
    />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...settings1}
        onPropsChange={setSettings1}
        plugins={[
          <Settings position="bottom" defaultActive="mode" />,
          <DatePanel
            disabled={!settings1.multiple && !settings1.range}
            position={
              ["fa", "ar"].includes(settings1.locale?.name?.split?.("_")?.[1])
                ? "left"
                : "right"
            }
          />,
        ]}
      />
    ),
  };

  const custom = {
    title: "Custom Settings",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
${$import}const [props, setProps] = useState(${
      language === "en"
        ? "{ multiple: true }"
        : `{
  calendar: "persian",
  locale: "fa",
  calendarPosition: "bottom-right",
  multiple: true
}`
    })
.
.
.
<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Settings
      position="left"
      calendars={["gregorian", "persian"]}
      locales={["en", "fa"]}
      modes={["multiple", "range"]}
      disabledList={["other"]}
    />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...settings2}
        onPropsChange={setSettings2}
        plugins={[
          <Settings
            position="left"
            calendars={["gregorian", "persian"]}
            locales={["en", "fa"]}
            modes={["multiple", "range"]}
            disabledList={["other"]}
          />,
        ]}
      />
    ),
  };

  const otherPickers = {
    title: "Other Pickers",
    code: `import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import Settings from "react-multi-date-picker/plugins/settings"
${$import}const initialProps = ${
      language === "en"
        ? `{ 
  value: new Date(), 
  format: "MM-DD-YYYY", 
}`
        : `{ 
  value: new Date(), 
  format: "MM-DD-YYYY", 
  calendar: "persian",
  locale: "fa",
  calendarPosition:"bottom-right"
}`
    }

const [props, setProps] = useState(initialProps)
${$import}<DatePicker
  {...props}
  onPropsChange={setProps}
  plugins={[
    <Settings
      position="bottom"
      disabledList={["calendar", "locale", "mode"]}
      defaultActive="others"
      defaultFormat={{
        single: "MM-DD-YYYY",
        onlyMonthPicker: "MMMM YYYY",
        onlyYearPicker: "YYYY",
      }}
    />
  ]}
/> `,
    jsx: (
      <DatePicker
        {...settings3}
        onPropsChange={setSettings3}
        plugins={[
          <Settings
            position="bottom"
            disabledList={["calendar", "locale", "mode"]}
            defaultActive="others"
            defaultFormat={{
              single: "MM-DD-YYYY",
              onlyMonthPicker: "MMMM YYYY",
              onlyYearPicker: "YYYY",
            }}
          />,
        ]}
      />
    ),
  };

  return [props, bottom, custom, otherPickers];
}
