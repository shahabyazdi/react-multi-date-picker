import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/multiple_months";

export default function MultipleMonths({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
