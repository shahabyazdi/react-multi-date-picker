import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/typescript";

export default function Types({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
