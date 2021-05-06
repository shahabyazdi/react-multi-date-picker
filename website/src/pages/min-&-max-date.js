import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/min_&_max_date.js";

export default function MinMax({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
