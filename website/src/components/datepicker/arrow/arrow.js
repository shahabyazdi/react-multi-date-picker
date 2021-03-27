import React from "react"

export default function Arrow({ direction, onClick }) {
    return (
        <span
            className={`rmdp-arrow-container ${direction}`}
            onClick={onClick}
        >
            <i className="rmdp-arrow"></i>
        </span>
    )
}