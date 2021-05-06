import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/multiple";

export default function Multiple({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
