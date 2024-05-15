import React from "react";

export default function Arrow({ direction, onClick, disabled, onKeyDown }) {
  return (
    <button
      type="button"
      className={`rmdp-arrow-container ${direction} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-roledescription={`button to navigate ${direction.replace(
        "rmdp-",
        ""
      )}`}
    >
      <i className="rmdp-arrow"></i>
    </button>
  );
}
