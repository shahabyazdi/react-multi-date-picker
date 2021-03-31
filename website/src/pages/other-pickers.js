import React from "react"
import Layout from "../components/layout/layout"
import otherPickers from "../docs/other_pickers"

export default function OtherPickers({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={otherPickers} />
  )
}