import React from "react"

export default function Example({ id, title, description, code, jsx }) {
  return (
    <div className="example" id={id}>
      {title && <h2 className="title" id={id}><a href={"#" + id}>{title}</a></h2>}
      {description && typeof description === "string" ?
        <p>{description}</p> : (description || null)
      }
      {code &&
        <pre>
          {getCode(code)}
        </pre>
      }
      { jsx}
    </div >
  )

  function getCode(code) {
    if (!code) return null
    return <code className="language-jsx">{code}</code>
  }
}