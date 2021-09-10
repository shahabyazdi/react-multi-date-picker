import React, { useEffect, useState } from "react";
import DatePicker from "../../../src";

export default function Doc({ otherProps, localeImport, language }) {
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
    code: `${localeImport}<DatePicker 
  portal 
/>`,
    jsx: <DatePicker portal {...otherProps} />,
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
     * so that you can recognize the portalDiv in the DOM tree.
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
    />
  )
}`,

    jsx: <DatePicker portal portalTarget={portalTarget} {...otherProps} />,
  };

  return [portal, target];
}
