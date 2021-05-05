import React from "react";
import Layout from "../../components/layout/layout";
import colors from "../../docs/plugins/analog_time_picker";

export default function Colors({ pageContext }) {
  const language = pageContext.language || "en";

  return <Layout language={language} doc={colors} section="plugins" />;
}
