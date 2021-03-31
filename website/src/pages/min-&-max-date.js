import React from "react"
import Layout from "../components/layout/layout"
import minMax from "../docs/min_&_max_date.js"

export default function MinMax({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={minMax} />
  )
}