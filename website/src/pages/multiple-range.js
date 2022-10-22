import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/multiple_range";

export default function Multiple({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
