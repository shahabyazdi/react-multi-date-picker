import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/events";

export default function Events({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
