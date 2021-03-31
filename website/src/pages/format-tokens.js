import React from "react"
import Layout from "../components/layout/layout"
import tokens from "../docs/format_tokens"

export default function Tokens({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={tokens} />
  )
}