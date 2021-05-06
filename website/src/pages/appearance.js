import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/appearance";

export default function Appearance({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
