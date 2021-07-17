import React from "react";

export default function warn(message) {
  if ("_self" in React.createElement("div")) console.warn(message.join("\n"));
}
