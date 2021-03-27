import React from "react"
import Layout from "../../components/layout/layout"
import usage from "../../docs/plugins/usage"

export default function Usage({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={usage} section="plugins" />
  )
}