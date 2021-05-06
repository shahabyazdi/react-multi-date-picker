import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/other_examples";

export default function OtherExamples({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
