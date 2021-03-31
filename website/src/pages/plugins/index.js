import React from "react"
import Layout from "../../components/layout/layout"
import plugins from "../../docs/plugins"

export default function Plugins({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={plugins} section="plugins" />
  )
}