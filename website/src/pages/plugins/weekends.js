import React from "react";
import Layout from "../../components/layout/layout";
import doc from "../../docs/plugins/weekends";

export default function Weekends({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} section="plugins" />;
}
