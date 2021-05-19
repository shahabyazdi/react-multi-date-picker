import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/props";

export default function Props({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
