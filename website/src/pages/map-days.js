import React from "react"
import Layout from "../components/layout/layout"
import mapDays from "../docs/map_days"

export default function MapDays({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={mapDays} />
  )
}