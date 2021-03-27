import React from "react"
import Layout from "../../components/layout/layout"
import weekends from "../../docs/plugins/weekends"

export default function Weekends({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={weekends} section="plugins" />
  )
}