import React from "react"
import Layout from "../components/layout/layout"

export default function Index({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} />
  )
}