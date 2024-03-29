import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/validation";

export default function Validation({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
