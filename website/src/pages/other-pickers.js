import React from "react";
import Layout from "../components/layout/layout";
import doc from "../docs/other_pickers";

export default function OtherPickers({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} />;
}
