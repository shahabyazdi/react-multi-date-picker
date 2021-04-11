import React from "react";

export default function Arrow({ direction, onClick, disabled }) {
  return (
    <span
      className={`rmdp-arrow-container ${direction} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
    >
      <i className="rmdp-arrow"></i>
    </span>
  );
}
