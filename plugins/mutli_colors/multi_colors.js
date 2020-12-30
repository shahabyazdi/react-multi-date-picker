import React, { useEffect, useRef, useState } from "react"
import "./multi_colors.css"

export default function MultiColors({
    state,
    setState,
    setProps,
    position,
    colors = ["blue", "red", "green"],
    isChildInTop,
    isChildInBottom,
    isChildInLeft,
    isChildInRight,
    calendarArguments,
    registerListener
}) {
    let [activeColor, setActiveColor] = useState(calendarArguments.activeColor || "blue"),
        classNames = ["rmdp-colors", position]

    let ref = useRef({})

    useEffect(() => {
        if (Array.isArray(state.selectedDate)) {
            let values = []
            let colors = {}

            for (let i = 0; i < state.selectedDate.length; i++) {
                let date = state.selectedDate[i],
                    value = date.valueOf(),
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

        setProps({ mapDays, value: state.selectedDate, activeColor })

        function mapDays({ date }) {
            let color

            if (state.selectedDate && !Array.isArray(state.selectedDate) && date.format() === state.selectedDate.format()) {
                color = state.selectedDate.color || activeColor
            }

            if (Array.isArray(state.selectedDate)) {
                let value = date.valueOf()

                if (ref.current.stringValues.includes(value)) color = ref.current.colors[value]
            }

            if (color) return {
                className: `highlight highlight-${color}`
            }
        }
    }, [state.selectedDate, activeColor, setProps])


    registerListener("change", handleChange)

    function handleChange(selectedDate) {
        if (!Array.isArray(selectedDate)) {
            selectedDate.color = activeColor
        } else {
            for (let i = 0; i < selectedDate.length; i++) {
                if (!selectedDate[i].color) selectedDate[i].color = activeColor
            }
        }
    }

    if (["left", "right"].includes(position)) {
        if (isChildInLeft) classNames.push("border-left")
        if (isChildInRight) classNames.push("border-right")
    } else {
        if (isChildInTop) classNames.push("border-top")
        if (isChildInBottom) classNames.push("border-bottom")
    }

    return (
        <div className={classNames.join(" ")}>
            {colors.map((color, index) => {
                return (
                    <div
                        key={index}
                        className={`rmdp-color rmdp-${color} ${activeColor === color ? "active" : ""}`}
                        onClick={() => {
                            setActiveColor(color)
                            setProps({ ...calendarArguments, activeColor: color, value: state.selectedDate })
                        }}
                    ></div>
                )
            })}
        </div>
    )
}