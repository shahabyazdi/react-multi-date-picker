import React, { useState, useEffect, useMemo } from "react"
import DateObject from "react-date-object"
import Arrow from "../arrow/arrow"
import Input from "../input/input"

export default function TimePicker({ state, setState, onChange, formattingIgnoreList }) {
    const [am, setAm] = useState(true),
        [mustDisplayMeridiem, setMustDisplayMeridiem] = useState(false),
        { calendar, local, date, timePicker, onlyTimePicker, selectedDate } = state,
        meridiems = useMemo(() => new DateObject({ calendar, local }).meridiems, [calendar, local]),
        hour = selectedDate?.hour,
        mustShowTimePicker = (timePicker || onlyTimePicker) && !state.multiple && !state.range

    useEffect(() => {
        const $mustDisplayMeridiem = () => {
            let format = date._format

            if (typeof format !== "string") return false

            if (Array.isArray(formattingIgnoreList)) {
                formattingIgnoreList.forEach(item => {
                    if (typeof item === "string") {
                        format = format.replace(new RegExp(item, "g"), "")
                    }
                })
            }

            return format.toLowerCase().includes("a") || format.includes("hh")
        }

        setMustDisplayMeridiem($mustDisplayMeridiem)

        if ($mustDisplayMeridiem) {
            let $hour = hour

            if (typeof $hour === "undefined") $hour = new Date().getHours()

            setAm($hour < 12 ? true : false)
        }

        if (onlyTimePicker) setState(state => { return { ...state, ready: true } })
    }, [hour, date._format, onlyTimePicker, setState, formattingIgnoreList])

    return (mustShowTimePicker ?
        <div className={`rmdp-time-picker ${onlyTimePicker ? "rmdp-only-time-picker" : ""}`}>
            <div>
                <Arrow direction="rmdp-up" onClick={() => changeValue("hours", 1)} />
                <Input value={getHours()} onChange={handleChange} digits={date.digits} name="hours" />
                <Arrow direction="rmdp-down" onClick={() => changeValue("hours", -1)} />
            </div>
            <span className="dvdr">:</span>
            <div>
                <Arrow direction="rmdp-up" onClick={() => changeValue("minutes", 1)} />
                <Input value={getMinutes()} onChange={handleChange} digits={date.digits} name="minutes" />
                <Arrow direction="rmdp-down" onClick={() => changeValue("minutes", -1)} />
            </div>
            <span className="dvdr">:</span>
            <div>
                <Arrow direction="rmdp-up" onClick={() => changeValue("seconds", 1)} />
                <Input value={getSeconds()} onChange={handleChange} digits={date.digits} name="seconds" />
                <Arrow direction="rmdp-down" onClick={() => changeValue("seconds", -1)} />
            </div>
            <div style={getStyle()}>
                <Arrow direction="rmdp-up" onClick={toggleMeridiem} />
                <div className="rmdp-am">{am ? meridiems[0].shortName.toUpperCase() : meridiems[1].shortName.toUpperCase()}</div>
                <Arrow direction="rmdp-down" onClick={toggleMeridiem} />
            </div>
        </div>
        :
        null
    )

    function handleChange(value, name) {
        let { selectedDate } = state.selectedDate

        switch (name) {
            case "hours":
                selectedDate.hour = value
                break
            case "minutes":
                selectedDate.minute = value
                break
            default:
                selectedDate.second = value
                break
        }

        setDate(selectedDate)
    }

    function changeValue(type, value) {
        value = Number(value)

        let { selectedDate } = state

        if (!selectedDate) selectedDate = date

        switch (type) {
            case "hours":
                selectedDate.hour += value
                break
            case "minutes":
                selectedDate.minute += value
                break
            default:
                selectedDate.second += value
                break
        }

        setDate(selectedDate)
    }

    function setDate(selectedDate) {
        setState({
            ...state,
            selectedDate,
            date: new DateObject(selectedDate)
        })

        if (onChange instanceof Function) onChange(selectedDate)
    }

    function toggleMeridiem() {
        if (am && selectedDate.hour < 12) selectedDate.hour += 12
        if (!am && selectedDate.hour > 12) selectedDate.hour -= 12

        setDate(selectedDate)
        setAm(!am)
    }

    function getHours() {
        let hours = ""

        if (selectedDate) {
            if (!selectedDate.hour) selectedDate.hour = 0

            hours = mustDisplayMeridiem ? selectedDate.format("hh") : selectedDate.format("HH")
        } else {
            hours = mustDisplayMeridiem ? date.format("hh") : date.format("HH")
        }

        return hours
    }

    function getMinutes() {
        if (selectedDate && !selectedDate.minute) selectedDate.minute = 0

        return selectedDate ? selectedDate.format("mm") : date.format("mm")
    }

    function getSeconds() {
        if (selectedDate && !selectedDate.second) selectedDate.second = 0

        return selectedDate ? selectedDate.format("ss") : date.format("ss")
    }

    function getStyle() {
        return {
            display: mustDisplayMeridiem ? "flex" : "none"
        }
    }
}