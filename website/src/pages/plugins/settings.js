import React from "react"
import Layout from "../../components/layout/layout"
import settings from "../../docs/plugins/settings"

export default function Settings({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={settings} section="plugins" />
  )
}