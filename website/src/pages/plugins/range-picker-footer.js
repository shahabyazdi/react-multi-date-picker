import React from "react";
import Layout from "../../components/layout/layout";
import doc from "../../docs/plugins/range_picker_footer";

export default function HeaderAndFooter({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={doc} section="plugins" />;
}
