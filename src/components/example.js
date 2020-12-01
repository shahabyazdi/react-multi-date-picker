import React from "react"

export default function Example({ id, title, description, code, jsx }) {
    return (
        <div className="example" id={id}>
            <div className="title">{title}</div>
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