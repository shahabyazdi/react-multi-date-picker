import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/date_object";

export default function DateObject({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
