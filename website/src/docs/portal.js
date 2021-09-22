import React, { useEffect, useState } from "react";
import DatePicker from "../../../build";

export default function Doc({ otherProps, localeImport, language, translate }) {
  const [portalTarget, setPortalTaget] = useState();

  useEffect(() => {
    const portalDiv = document.createElement("div");

    portalDiv.id = "myPortalDiv";

    document.body.appendChild(portalDiv);

    setPortalTaget(portalDiv);

    return () => document.body.removeChild(portalDiv);
  }, []);

  const portal = {
    title: "Portal Mode",
    code: `${localeImport}<div
  style={{
    position: "relative",
    overflow: "auto",
    display: "flex",
    justifyContent: "space-around",
    height: "150px",
    maxWidth: "500px",
    backgroundColor: "lightgray",
    borderRadius: "5px",
  }}
>
  <div>
    <h5>${translate("Default")}:</h5>
    ${
      language === "en"
        ? "<DatePicker />"
        : `<DatePicker
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
    />`
    }
  </div>
  <div>
    <h5>${translate("Portal")}:</h5>
    ${
      language === "en"
        ? "<DatePicker portal />"
        : `<DatePicker
      portal
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
    />`
    }
  </div>
</div>`,
    jsx: (
      <div
        style={{
          height: "150px",
          maxWidth: "500px",
          backgroundColor: "lightgray",
          overflow: "auto",
          position: "relative",
          display: "flex",
          justifyContent: "space-around",
          borderRadius: "5px",
        }}
      >
        <div>
          <h5>{translate("Default")}:</h5>
          <DatePicker {...otherProps} />
        </div>
        <div>
          <h5>{translate("Portal")}:</h5>
          <DatePicker portal {...otherProps} />
        </div>
      </div>
    ),
  };

  const target = {
    title: "Dynamic Portal Target",
    code: `import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker"
${
  language === "en"
    ? ``
    : `import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
`
}
export default function Example() {
  const [portalTarget, setPortalTaget] = useState();

  useEffect(() => {
    const portalDiv = document.createElement("div");
    
    /** 
     * This ID is optional and has been added
     * to better recognize it in the DOM tree.
     */
    portalDiv.id = "myPortalDiv";

    document.body.appendChild(portalDiv);

    setPortalTaget(portalDiv);

    return () => document.body.removeChild(portalDiv);
  }, []);

  return (
    <DatePicker 
      portal 
      portalTarget={portalTarget}
    ${
      language === "en"
        ? "/>"
        : `  calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
    />`
    }
  )
}`,

    jsx: <DatePicker portal portalTarget={portalTarget} {...otherProps} />,
  };

  return [portal, target];
}
