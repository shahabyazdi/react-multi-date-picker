import React from "react";
import Layout from "../components/layout/layout";
import calendars from "../docs/buttons";

export default function Calendars({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={calendars} />;
}
