import React from "react"
import Layout from "../../components/layout/layout"
import toolbar from "../../docs/plugins/toolbar"

export default function Toolbar({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={toolbar} section="plugins" />
  )
}