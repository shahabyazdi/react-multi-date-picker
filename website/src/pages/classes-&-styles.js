import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/classes_&_styles";

export default function Styles({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
