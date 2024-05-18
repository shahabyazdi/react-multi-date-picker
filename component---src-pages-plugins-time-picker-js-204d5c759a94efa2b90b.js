(self.webpackChunkdate_picker=self.webpackChunkdate_picker||[]).push([[6737],{7780:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var l=n(7294),r=n(316),a=n(7821),i=n(6724),m=n(2128);function c(e){var t=e.language,n=e.otherProps,r=e.translate,c=e.localeImport,u=(0,l.useState)([1,2,3].map((function(e){return new a.NT(n).set({day:e,hour:e,minute:e,second:e})}))),s=u[0],o=u[1],p=(0,l.useState)([new a.NT(n),new a.NT(n).add(1,"day")]),d=p[0],E=p[1],Y="en"===t?".\n.\n.\n":c;return[{title:"Descriptions",description:"time_picker"},{title:"Props",description:l.createElement("table",null,l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",null,r("Prop")),l.createElement("th",null,r("Type")),l.createElement("th",null,r("Default")),l.createElement("th",null,r("Descriptions")))),l.createElement("tbody",null,l.createElement("tr",null,l.createElement("td",null,"position"),l.createElement("td",null,"String"),l.createElement("td",null,'"right"'),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"disabled"),l.createElement("td",null,"Boolean"),l.createElement("td",null,"false"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"hideSeconds"),l.createElement("td",null,"Boolean"),l.createElement("td",null,"false"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"header"),l.createElement("td",null,"Boolean"),l.createElement("td",null,"true"),l.createElement("td",null,"positions top/bottom: always false, positions right/left: default true"," ")),l.createElement("tr",null,l.createElement("td",null,"format"),l.createElement("td",null,"String"),l.createElement("td",null,'"YYYY/MM/DD"'),l.createElement("td",null,r("time_picker_format_prop").map((function(e,t){return l.createElement("p",{key:t},e)})))),l.createElement("tr",null,l.createElement("td",null,"hStep"),l.createElement("td",null,"Number"),l.createElement("td",null,"1"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"mStep"),l.createElement("td",null,"Number"),l.createElement("td",null,"1"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"sStep"),l.createElement("td",null,"Number"),l.createElement("td",null,"1"),l.createElement("td",null))))},{title:"Utilizing Step for Arrow Icons",description:"step_time_picker",code:'import React from "react";\nimport DatePicker from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/time_picker";\n'+Y+'<DatePicker\n  format="'+("en"===t?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss")+'"\n  plugins={[\n    <TimePicker position="bottom" hStep={2} mStep={3} sStep={4}/>,\n  ]}\n/>',jsx:l.createElement(a.ZP,Object.assign({format:"en"===t?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss",plugins:[l.createElement(i.Z,{position:"bottom",hStep:2,mStep:3,sStep:4})]},n))},{title:"Using TimePicker in Multiple Mode",description:"multiple_time_picker",code:'import React, { useState } from "react";\nimport DatePicker, { DateObject } from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/time_picker";\nimport DatePanel from "react-multi-date-picker/plugins/date_panel";\n'+Y+"const [values, setValues] = useState(\n  [1, 2, 3].map((number) =>\n    new DateObject("+("en"===t?"":'{ calendar: "persian", locale: "fa"}')+').set({\n      day: number,\n      hour: number,\n      minute: number,\n      second: number,\n    })\n  )\n);\n.\n.\n.\n<DatePicker\n  value={values}\n  onChange={setValues}\n  format="'+("en"===t?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss")+'"\n  multiple\n  plugins={[\n    <TimePicker position="bottom" />,\n    <DatePanel markFocused />\n  ]}\n/>',jsx:l.createElement(a.ZP,Object.assign({value:s,onChange:o,format:"en"===t?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss",multiple:!0,plugins:[l.createElement(i.Z,{position:"bottom"}),l.createElement(m.Z,{markFocused:!0})]},n))},{title:"Position Right",description:"time_picker_position_right",code:'import React, { useState } from "react";\nimport DatePicker, { DateObject } from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/time_picker";\n'+Y+"const [values, setValues] = useState([\n  new DateObject("+("en"===t?"":"{ calendar: persian, locale: persian_fa }")+"),\n  new DateObject("+("en"===t?"":"{ calendar: persian, locale: persian_fa }")+').add(1,"day")\n]);\n.\n.\n.\n<Calendar\n  value={values}\n  onChange={setValues}\n  multiple\n  plugins={[<TimePicker />]}\n/> ',jsx:l.createElement(a.f,{value:d,onChange:E,multiple:!0,plugins:[l.createElement(i.Z,null)]})},{title:"Using TimePicker in Range Mode",code:'import React from "react";\nimport DatePicker from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/time_picker";\nimport DatePanel from "react-multi-date-picker/plugins/date_panel";\n'+Y+'<DatePicker\n  format="'+("en"===t?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss")+'"\n  range\n  plugins={[\n    <TimePicker position="bottom" />,\n    <DatePanel markFocused />\n  ]}\n/>',jsx:l.createElement(a.ZP,Object.assign({format:"en"===t?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss",range:!0,plugins:[l.createElement(i.Z,{position:"bottom"}),l.createElement(m.Z,{markFocused:!0})]},n))},{title:"Styling TimePicker",description:"time_picker_style",code:Y+'<DatePicker\n  format="MM/DD/YYYY HH:mm"\n  plugins={[\n    <TimePicker\n      hideSeconds\n      style={{ minWidth: "100px" }}\n    />\n  ]}\n/>',jsx:l.createElement(a.ZP,Object.assign({format:"MM/DD/YYYY HH:mm",plugins:[l.createElement(i.Z,{hideSeconds:!0,style:{minWidth:"100px"}})]},n))}]}function u(e){var t=e.pageContext.language||"en";return l.createElement(r.Z,{language:t,doc:c,section:"plugins"})}}}]);
//# sourceMappingURL=component---src-pages-plugins-time-picker-js-204d5c759a94efa2b90b.js.map