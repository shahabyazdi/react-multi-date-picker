import React from "react";
import Layout from "../../components/layout/layout";
import doc from "../../docs/plugins/header";

export default function Header({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} section="plugins" />;
}
