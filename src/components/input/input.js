import React from "react"
import DateObject from "react-date-object";

export default function Input({ name, value, onChange, local }) {
    let digits = new DateObject({ calendar: "gregorian", local }).digits

    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
        />
    )

    function handleChange(e) {
        let value = e.target.value
        let name = e.target.name

        for (let digit of digits) {
            if (value.includes(digit)) value = value.replace(digit, digits.indexOf(digit))
        }

        if (Number.isNaN(Number(value))) return

        onChange(Number(value), name)
    }
}