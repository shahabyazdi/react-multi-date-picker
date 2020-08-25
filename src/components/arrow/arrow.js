import React from "react"

export default function Arrow({ direction, onClick }) {
    return (
        <span
            className="arrow-container"
            onClick={onClick}
        >
            <i
                className={`arrow ${direction}`}
            >
            </i>
        </span>
    )
}