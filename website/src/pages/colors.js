import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/colors";

export default function Colors({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
