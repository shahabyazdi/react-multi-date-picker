import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/locales";

export default function Locales({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
