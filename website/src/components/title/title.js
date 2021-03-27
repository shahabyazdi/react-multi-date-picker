import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export default function Title({ language, section = "default", sidebar, pathname, translate }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl,
            en {
              title
              description
              keywords
              type
            }
            fa {
              title
              description
              keywords
              type
            }
          }
        }
      }
    `
  )

  const sidebarTitle = sidebar[section].find(object => ("/" + object.path) === pathname.replace("/fa", ""))

  const { title, description, type, keywords } = data.site.siteMetadata[language]

  const siteTitle = title + (sidebarTitle ? (" - " + translate(sidebarTitle.name)) : "")

  return (
    <Helmet
      htmlAttributes={{ lang: language }}
      title={siteTitle}
      meta={[
        {
          name: "description",
          content: description
        },
        {
          property: "og:description",
          content: description
        },
        {
          property: "og:url",
          content: data.site.siteMetadata.siteUrl
        },
        {
          property: "og:type",
          content: type
        },
        {
          name: "keywords",
          content: keywords
        }
      ]}
    />
  )
}