import React from "react"
import Layout from "../components/layout/layout"
import appearance from "../docs/appearance"

export default function Appearance({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={appearance} />
  )
}