import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/positions";

export default function Positions({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
