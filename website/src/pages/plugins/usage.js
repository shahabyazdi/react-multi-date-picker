import React from "react";
import Layout from "../../components/layout/layout";
import doc from "../../docs/plugins/usage";

export default function Usage({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} section="plugins" />;
}
