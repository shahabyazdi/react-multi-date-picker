import React from "react"

export default function Selector({ title, value = "", options = [], onChange = () => { }, disabled }) {
    return (
        <div className="form-group flex-1">
            <label>{title}</label>
            <select className="select full-width" value={value} onChange={e => onChange(e.target.value)} disabled={disabled}>
                {options.map((item, index) => <option key={index} value={item[1]}>{item[0]}</option>)}
            </select>
        </div>
    )
}