import React from "react"
import Layout from "../components/layout/layout"
import colors from "../docs/colors"

export default function Colors({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={colors} />
  )
}