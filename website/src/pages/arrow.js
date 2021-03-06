import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/arrow";

export default function Arrow({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
