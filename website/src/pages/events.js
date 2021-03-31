import React from "react"
import Layout from "../components/layout/layout"
import events from "../docs/events"

export default function Events({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={events} />
  )
}