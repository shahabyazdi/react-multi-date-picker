import React from "react"
import Layout from "../components/layout/layout"
import ref from "../docs/ref"

export default function Ref({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={ref} />
  )
}