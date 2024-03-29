import React from "react";

export default function Arrow({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`rmdp-arrow-container ${direction} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      aria-roledescription={`button to navigate ${direction.replace(
        "rmdp-",
        ""
      )}`}
    >
      <i className="rmdp-arrow"></i>
    </button>
  );
}
