import React from "react"
import Layout from "../components/layout/layout"
import positions from "../docs/positions"

export default function Positions({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={positions} />
  )
}