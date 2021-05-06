import React from "react";
import Layout from "../../../components/layout/layout";
import doc from "../../../docs/plugins/docs/props_table";

export default function PropsTable({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} section="plugins/docs" />;
}
