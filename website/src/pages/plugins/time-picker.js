import React from "react";
import Layout from "../../components/layout/layout";
import colors from "../../docs/plugins/time_picker";

export default function HeaderAndFooter({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={colors} section="plugins" />;
}
