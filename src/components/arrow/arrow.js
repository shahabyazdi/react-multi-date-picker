import React from "react"

export default function Arrow({ direction, onClick }) {
    return (
        <span
            className="rmdp-arrow-container"
            onClick={onClick}
        >
            <i
                className={`rmdp-arrow ${direction}`}
            >
            </i>
        </span>
    )
}