import React, { forwardRef } from "react";
import { Link } from "gatsby";

function Sidebar(
  { sidebar, language, translate, section = "default", active },
  ref
) {
  const rootPath = `/${language === "fa" ? "fa/" : ""}`;

  return (
    <ul ref={ref} className={`sidebar ${active ? "active" : ""}`}>
      {sidebar[section].map((item, index) => {
        let path = rootPath + item.path;

        return (
          <li key={index}>
            <Link to={path} activeClassName="active">
              {translate(item.name)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default forwardRef(Sidebar);
