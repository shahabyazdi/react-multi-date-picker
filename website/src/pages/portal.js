import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/portal";

export default function Page({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
