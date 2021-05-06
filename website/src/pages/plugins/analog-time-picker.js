import React from "react";
import Layout from "../../components/layout/layout";
import doc from "../../docs/plugins/analog_time_picker";

export default function Colors({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} section="plugins" />;
}
