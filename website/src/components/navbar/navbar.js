import React from "react";
import GitHub from "../../assets/github.svg";
import Npm from "../../assets/npm.svg";
import Us from "../../assets/us.svg";
import Ir from "../../assets/ir.svg";
import { IconMenu2 } from "@tabler/icons";
import packageJson from "../../../../package.json";
import { Link } from "gatsby";

export default function Navbar({ language, toggleSidebar, pathname }) {
  return (
    <nav className="navbar">
      <IconMenu2 className="open-sidebar" size={26} onClick={toggleSidebar} />

      <div className="navbar-title">
        <span className="name">React Multi Date Picker</span>
        <span className="version">{" " + packageJson.version}</span>
      </div>

      <div className="icons">
        <div className="icon language">
          <Link
            to={
              language === "en" ? `/fa${pathname}` : pathname.replace("/fa", "")
            }
          >
            {language === "en" ? <Ir /> : <Us />}
          </Link>
        </div>

        <div className="icon">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="github"
            href="https://github.com/shahabyazdi/react-multi-date-picker"
          >
            <GitHub />
          </a>
        </div>

        <div className="icon">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="npm"
            href="https://www.Npmjs.com/package/react-multi-date-picker"
          >
            <Npm />
          </a>
        </div>
      </div>
    </nav>
  );
}
