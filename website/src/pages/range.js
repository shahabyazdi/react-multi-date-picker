import React from "react"
import Layout from "../components/layout/layout"
import range from "../docs/range"

export default function Range({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={range} />
  )
}