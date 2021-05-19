import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/format_tokens";

export default function Tokens({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
