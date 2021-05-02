import React, { useEffect, useRef, useState } from "react";
import DatePicker from "../../../build/index";
import { Link } from "gatsby";

export default function Positions(translate, language) {
  const containerRef = useRef(),
    datePickerRef = useRef(),
    [state, setState] = useState({
      mainPosition: "bottom",
      relativePosition: "center",
      fixMainPosition: false,
      fixRelativePosition: false,
      offsetY: 0,
      offsetX: 0,
    }),
    updateState = (key, value) => setState({ ...state, [key]: value });

  useEffect(() => {
    containerRef.current.scrollTo(
      containerRef.current.clientWidth * (language === "fa" ? -1 : 1),
      containerRef.current.clientHeight / 2
    );

    datePickerRef.current.openCalendar();
  }, [language]);

  const {
    mainPosition,
    relativePosition,
    fixMainPosition,
    fixRelativePosition,
    offsetY,
    offsetX,
  } = state;

  const descriptions = {
    title: translate("Descriptions"),
    description: translate("calendar_position_description"),
  };

  const calendarPosition = {
    title: translate("Calendar Position"),
    description: translate("calendar_position"),
    jsx: (
      <ul>
        <li>top {translate("or")} top-center</li>
        <li>top-start {translate("or")} top-left</li>
        <li>top-end {translate("or")} top-right</li>
        <li>bottom {translate("or")} bottom-center</li>
        <li>bottom-start {translate("or")} bottom-left</li>
        <li>bottom-end {translate("or")} bottom-right</li>
        <li>left {translate("or")} left-center</li>
        <li>left-start {translate("or")} left-top</li>
        <li>left-end {translate("or")} left-bottom</li>
        <li>right {translate("or")} right-center</li>
        <li>right-start {translate("or")} right-top</li>
        <li>right-end {translate("or")} right-bottom</li>
      </ul>
    ),
  };

  const points = {
    title: "Important Points",
    description: (
      <ol>
        {(translate("important_points") || []).map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ol>
    ),
  };

  const example = {
    title: "Example",
    code: `const containerRef = useRef()
const datePickerRef = useRef()

const [state, setState] = useState({
  mainPosition: "bottom",
  relativePosition: "center",
  fixMainPosition: false,
  fixRelativePosition: false,
  offsetY: 0,
  offsetX: 0
})

const updateState = (key, value) => setState({ 
  ...state, 
  [key]: value
})

useEffect(() => {
  containerRef.current.scrollTo(
    (containerRef.current.clientWidth${language === "en" ? "" : " * -1"}),
    (containerRef.current.clientHeight / 2)
  )

  datePickerRef.current.openCalendar()
}, [])

const {
  mainPosition,
  relativePosition,
  fixMainPosition,
  fixRelativePosition,
  offsetY,
  offsetX
} = state
.
.
.
<div>
  <div 
    style={{ 
      display: "flex", 
      justifyContent: "space-around",
      flexWrap: "wrap",
      margin: "10px 0" 
    }}
  >
    <label>
      ${translate("Main Position")}:
      <select
        value={mainPosition}
        onChange={e => updateState("mainPosition", e.target.value)}
        className="select"
      >${["top", "bottom", "left", "right"]
        .map(
          (position) => `
        <option value="${position}">${translate(position)}</option>`
        )
        .join("")}
      </select>
    </label>
    <label>
      <input
        type="checkbox"
        value={fixMainPosition}
        onChange={e => updateState("fixMainPosition", e.target.checked)}
      />
      ${translate("Fix Main Position")}
    </label>
    <label>
      ${translate("Relative Position")}:
      <select
        value={relativePosition}
        onChange={e => updateState("relativePosition", e.target.value)}
        className="select"
      >${["start", "center", "end"]
        .map(
          (position) => `
        <option value="${position}">${translate(position)}</option>`
        )
        .join("")}
      </select>
    </label>
    <label>
      <input
        type="checkbox"
        value={fixRelativePosition}
        onChange={e => updateState("fixRelativePosition", e.target.checked)}
      />
      ${translate("Fix Relative Position")}
    </label>
    <label>
      ${translate("Offset Y")}:
      <input
        type="number"
        className="input"
        style={{ width: "30px" }}
        value={offsetY}
        onChange={e => updateState("offsetY", Number(e.target.value))}
      />
    </label>
    <label>
      ${translate("Offset X")}:
      <input
        type="number"
        className="input"
        style={{ width: "30px" }}
        value={offsetX}
        onChange={e => updateState("offsetX", Number(e.target.value))}
      />
    </label>
  </div>
  <div
    ref={containerRef}
    style={{ 
      backgroundColor: "whitesmoke", 
      height: "500px", 
      overflow: "auto", 
      position: "relative",
      borderRadius: "5px",
      boxShadow: "inset 0 0 6px 0 #888" 
    }}
  >
    <div
      style={{ 
        width: "300%", 
        height: "200%", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center" 
      }}
    >
      <DatePicker
        ref={datePickerRef}
        containerStyle={{ //datepicker container style
          width: "180px",
          margin: "auto"
        }}
        style={{ //input style
          width: "100%",
          height: "26px",
          boxSizing: "border-box"
        }}
        calendarPosition={${"`${"}mainPosition}-${"${"}relativePosition}${"`"}}
        fixMainPosition={fixMainPosition}
        fixRelativePosition={fixRelativePosition}
        offsetY={offsetY}
        offsetX={offsetX}
        onClose={() => false}
      ${
        language === "en"
          ? "/>"
          : `  calendar="persian"
        locale="fa"
      />`
      }
    </div>
  </div>
</div>`,
    jsx: (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            margin: "10px 0",
          }}
        >
          <label>
            {translate("Main Position")}:
            <select
              value={mainPosition}
              onChange={(e) => updateState("mainPosition", e.target.value)}
              className="select"
              onBlur={() => {}}
            >
              {["top", "bottom", "left", "right"].map((position, index) => {
                return (
                  <option key={index} value={position}>
                    {translate(position)}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              value={fixMainPosition}
              onChange={(e) => updateState("fixMainPosition", e.target.checked)}
            />
            {translate("Fix Main Position")}
          </label>
          <label>
            {translate("Relative Position")}:
            <select
              value={relativePosition}
              onChange={(e) => updateState("relativePosition", e.target.value)}
              className="select"
              onBlur={() => {}}
            >
              {["start", "center", "end"].map((position, index) => {
                return (
                  <option key={index} value={position}>
                    {translate(position)}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              value={fixRelativePosition}
              onChange={(e) =>
                updateState("fixRelativePosition", e.target.checked)
              }
            />
            {translate("Fix Relative Position")}
          </label>
          <label>
            {translate("Offset Y")}:
            <input
              type="number"
              className="input"
              style={{ width: "30px" }}
              value={offsetY}
              onChange={(e) => updateState("offsetY", Number(e.target.value))}
            />
          </label>
          <label>
            {translate("Offset X")}:
            <input
              type="number"
              className="input"
              style={{ width: "30px" }}
              value={offsetX}
              onChange={(e) => updateState("offsetX", Number(e.target.value))}
            />
          </label>
        </div>
        <div
          ref={containerRef}
          style={{
            backgroundColor: "whitesmoke",
            height: "500px",
            overflow: "auto",
            position: "relative",
            borderRadius: "5px",
            boxShadow: "inset 0 0 6px 0 #888",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "300%",
              height: "200%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <DatePicker
              ref={datePickerRef}
              containerStyle={{ width: "180px", margin: "auto" }}
              style={{ width: "100%", height: "26px", boxSizing: "border-box" }}
              calendarPosition={`${mainPosition}-${relativePosition}`}
              fixMainPosition={fixMainPosition}
              fixRelativePosition={fixRelativePosition}
              offsetY={offsetY}
              offsetX={offsetX}
              onClose={() => false}
              calendar={language === "fa" ? "persian" : "gregorian"}
              locale={language === "fa" ? "fa" : "en"}
            />
          </div>
        </div>
      </div>
    ),
  };

  const anotherExample = {
    title: translate("Another Examples"),
    description: translate("another_examples"),
    jsx: (
      <ol>
        <li>
          <Link to="../events/#onpositionchange">
            {translate("another_examples_1")}
          </Link>
        </li>
        <li>
          <Link
            to={
              language === "en"
                ? "/ref/#refresh-position"
                : "../ref/#رفرش-کردن-موقعیت-تقویم"
            }
          >
            {translate("another_examples_2")}
          </Link>
        </li>
      </ol>
    ),
  };

  return [descriptions, calendarPosition, points, example, anotherExample];
}
