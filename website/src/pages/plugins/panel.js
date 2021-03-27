import React from "react"
import Layout from "../../components/layout/layout"
import panel from "../../docs/plugins/panel"

export default function Panel({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={panel} section="plugins" />
  )
}