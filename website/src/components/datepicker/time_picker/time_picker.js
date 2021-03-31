import React, { useMemo } from "react"
import DateObject from "react-date-object"
import Arrow from "../arrow/arrow"
import Input from "../input/input"

export default function TimePicker({ state, onChange, formattingIgnoreList }) {
    const { calendar, locale, date, timePicker, onlyTimePicker, selectedDate } = state,
        meridiems = useMemo(() => new DateObject({ calendar, locale }).meridiems, [calendar, locale]),
        mustShowTimePicker = (timePicker || onlyTimePicker) && !state.multiple && !state.range

    const mustDisplayMeridiem = useMemo(() => {
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
    }, [date._format, formattingIgnoreList])

    let hour = selectedDate?.hour

    if (typeof hour === "undefined") hour = new Date().getHours()

    let am = mustDisplayMeridiem ? hour < 12 : false

    return (mustShowTimePicker ?
        <div className={`rmdp-time-picker ${onlyTimePicker ? "rmdp-only-time-picker" : ""}`} style={{ direction: "ltr" }}>
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
        let { selectedDate } = state

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
        onChange(
            selectedDate,
            {
                ...state,
                selectedDate,
                date: new DateObject(selectedDate)
            }
        )
    }

    function toggleMeridiem() {
        selectedDate.hour += (selectedDate.hour < 12 ? 12 : -12)

        setDate(selectedDate)
    }

    function getHours() {
        if (selectedDate && !selectedDate.hour) selectedDate.hour = 0

        return (selectedDate || date).format(mustDisplayMeridiem ? "hh" : "HH")
    }

    function getMinutes() {
        if (selectedDate && !selectedDate.minute) selectedDate.minute = 0

        return (selectedDate || date).format("mm")
    }

    function getSeconds() {
        if (selectedDate && !selectedDate.second) selectedDate.second = 0

        return (selectedDate || date).format("ss")
    }

    function getStyle() {
        return {
            display: mustDisplayMeridiem ? "flex" : "none"
        }
    }
}