import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/installation";

export default function Installation({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
