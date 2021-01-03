import React, { useEffect, useRef, useState } from "react"
import DateObject from "react-date-object"
import "./multi_colors.css"

export default function MultiColors({
    state,
    setProps,
    position,
    colors = ["blue", "red", "green", "yellow"],
    defaultColor = colors[0],
    nodes,
    calendarProps,
    registerListener
}) {
    let [activeColor, setActiveColor] = useState(calendarProps.activeColor || defaultColor),
        classNames = ["rmdp-colors", position]

    let ref = useRef({})

    useEffect(() => {
        if (Array.isArray(state.selectedDate)) {
            let values = []
            let colors = {}

            for (let i = 0; i < state.selectedDate.length; i++) {
                let date = state.selectedDate[i],
                    value = new DateObject(date).setLocal("en").format("YYYYMMDD"),
                    color = date.color || activeColor

                if (!date.color) state.selectedDate[i].color = color

                colors[value] = color
                values.push(value)
            }

            let stringValues = JSON.stringify(values)

            if (stringValues === ref.current.stringValues) return

            ref.current.stringValues = stringValues
            ref.current.colors = colors
        }

        if (setProps instanceof Function) setProps(props => {
            return {
                ...props,
                mapDays: getMapDays(state.selectedDate, state.range, ref, activeColor),
                value: state.selectedDate,
                activeColor
            }
        })
    }, [state.selectedDate, state.range, activeColor, setProps])

    registerListener("change", handleChange)

    if (["left", "right"].includes(position)) {
        if (nodes.left) classNames.push("rmdp-border-left")
        if (nodes.right) classNames.push("rmdp-border-right")
    } else {
        if (nodes.top) classNames.push("rmdp-border-top")
        if (nodes.bottom) classNames.push("rmdp-border-bottom")
    }

    return (
        <div className={classNames.join(" ")}>
            {colors.map((color, index) => {
                return (
                    <div
                        key={index}
                        className={`rmdp-color rmdp-${color} ${activeColor === color ? "active" : ""}`}
                        onClick={() => handleClick(color)}
                    ></div>
                )
            })}
        </div>
    )

    function handleChange(selectedDate) {
        if (!Array.isArray(selectedDate)) {
            if (selectedDate) selectedDate.color = activeColor
        } else {
            for (let i = 0; i < selectedDate.length; i++) {
                if (!selectedDate[i].color) {
                    selectedDate[i].color = activeColor
                }
            }
        }
    }

    function handleClick(color) {
        setActiveColor(color)

        let { selectedDate, range } = state

        if (selectedDate && !Array.isArray(selectedDate)) selectedDate.color = color

        if (setProps instanceof Function) setProps(props => {
            return {
                ...props,
                activeColor: color,
                value: selectedDate,
                mapDays: getMapDays(selectedDate, range, ref, color)
            }
        })
    }
}

function getMapDays(selectedDate, range, ref, activeColor) {
    return function mapDays({ date }) {
        let color, className

        if (range) return

        if (selectedDate && !Array.isArray(selectedDate) && date.format() === selectedDate.format()) {
            //single mode
            color = activeColor
        }

        if (Array.isArray(selectedDate)) {
            //not single mode
            let value = new DateObject(date).setLocal("en").format("YYYYMMDD")

            if (ref.current.stringValues.includes(value)) color = ref.current.colors[value]
        }

        if (color) {
            className = `highlight highlight-${color}`
        } else {
            className = `hover-${activeColor}`
        }

        return { className }
    }
}