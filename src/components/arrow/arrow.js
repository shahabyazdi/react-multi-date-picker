import React from "react"

export default function Arrow({ direction, onClick }) {
    return (
        <span
            className="rm-dp-a-container"
            onClick={onClick}
        >
            <i
                className={`rm-dp-arrow rm-dp-a-${direction}`}
            >
            </i>
        </span>
    )
}