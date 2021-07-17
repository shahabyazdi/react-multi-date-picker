import React from "react";
import { Link } from "gatsby";

export default function Doc({ translate }) {
  return [
    {
      jsx: (
        <>
          <p>
            <Link to="./calendars">{translate("Calendars & Locales")}</Link>
          </p>
          <p>
            <Link to="./date-object">{translate("DateObject")}</Link>
          </p>
          <p>
            <Link to="./types">{translate("Types & Custom Input")}</Link>
          </p>
        </>
      ),
    },
  ];
}
