import React from "react"
import Layout from "../components/layout/layout"
import multiple from "../docs/multiple"

export default function Multiple({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={multiple} />
  )
}