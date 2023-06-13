(self.webpackChunkdate_picker=self.webpackChunkdate_picker||[]).push([[4972],{6685:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var l=n(7294),r=n(316),a=n(7821),i=n(766);function c(e){var t=e.translate,n=e.language,r=e.otherProps,c=e.localeImport,m=(0,l.useState)(new Date),o=m[0],s=m[1],u=(0,l.useState)(new Date),p=u[0],d=u[1],k=(0,l.useState)(new Date),g=k[0],E=k[1],f="en"===n?".\n.\n.\n":c;return[{title:"Props",description:l.createElement("table",null,l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",null,t("Prop")),l.createElement("th",null,t("Type")),l.createElement("th",null,t("Default")),l.createElement("th",null,t("Descriptions")))),l.createElement("tbody",null,l.createElement("tr",null,l.createElement("td",null,"position"),l.createElement("td",null,"String"),l.createElement("td",null,'"right"')),l.createElement("tr",null,l.createElement("td",null,"disabled"),l.createElement("td",null,"Boolean"),l.createElement("td",null,"false")),l.createElement("tr",null,l.createElement("td",null,"hideSeconds"),l.createElement("td",null,"Boolean"),l.createElement("td",null,"false"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"format"),l.createElement("td",null,"String"),l.createElement("td",null,'"YYYY/MM/DD"'),l.createElement("td",null,t("time_picker_format_prop").map((function(e,t){return l.createElement("p",{key:t},e)})))),l.createElement("tr",null,l.createElement("td",null,"hStep"),l.createElement("td",null,"Number"),l.createElement("td",null,"1"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"mStep"),l.createElement("td",null,"Number"),l.createElement("td",null,"1"),l.createElement("td",null)),l.createElement("tr",null,l.createElement("td",null,"sStep"),l.createElement("td",null,"Number"),l.createElement("td",null,"1"),l.createElement("td",null))))},{title:"Default Analog Time Picker",description:"default_analog_time_picker",code:'import React, { useState } from "react";\nimport DatePicker from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/analog_time_picker";\n'+f+'const [value, setValue] = useState(new Date());\n.\n.\n.\n<DatePicker\n  value={value} \n  onChange={setValue}\n  format="MM/DD/YYYY HH:mm:ss"\n  plugins={[<TimePicker '+("en"===n?"":'position="left"')+"/>]} \n/>",jsx:l.createElement(a.ZP,Object.assign({format:"MM/DD/YYYY HH:mm:ss",value:o,onChange:s,plugins:[l.createElement(i.Z,{position:"en"===n?"right":"left"})]},r))},{title:"Utilizing Step for Arrow Icons",description:"step_time_picker",code:'import React from "react";\nimport DatePicker from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/analog_time_picker";\n'+f+'<DatePicker\n  format="'+("en"===n?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss")+'"\n  plugins={[\n    <TimePicker hStep={2} mStep={3} sStep={4}/>,\n  ]}\n/>',jsx:l.createElement(a.ZP,Object.assign({format:"en"===n?"MM/DD/YYYY HH:mm:ss":"YYYY/MM/DD HH:mm:ss",plugins:[l.createElement(i.Z,{hStep:2,mStep:3,sStep:4})]},r))},{title:"Color & Background",description:"red_clock",code:'import React, { useState } from "react";\nimport { Calendar } from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/analog_time_picker";\n\nimport "react-multi-date-picker/styles/backgrounds/bg-dark.css";\nimport "react-multi-date-picker/styles/colors/red.css";\nimport "react-multi-date-picker/styles/colors/analog_time_picker_red.css";\n'+f+'const [value, setValue] = useState(new Date());\n.\n.\n.\n<Calendar \n  value={value} \n  onChange={setValue}\n  className="bg-dark red"\n  plugins={[<TimePicker '+("en"===n?"":'position="left"')+"/>]} \n/>",jsx:l.createElement(a.f,Object.assign({value:p,onChange:d,plugins:[l.createElement(i.Z,{position:"en"===n?"right":"left"})],className:"bg-dark red"},r))},{title:"Hiding Seconds",code:'import DatePicker from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/analog_time_picker";\n'+f+'<DatePicker\n  format="MM/DD/YYYY HH:mm"\n  plugins={[\n    <TimePicker hideSeconds '+("en"===n?"":'position="left"')+"/>\n  ]} \n/>",jsx:l.createElement(a.ZP,Object.assign({format:"MM/DD/YYYY HH:mm",plugins:[l.createElement(i.Z,{hideSeconds:!0,position:"en"===n?"right":"left"})]},r))},{title:"Position Bottom",code:'import React, { useState } from "react";\nimport { Calendar } from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/analog_time_picker";\n'+f+'const [value, setValue] = useState(new Date());\n.\n.\n.\n<Calendar \n  value={value} \n  onChange={setValue}\n  plugins={[<TimePicker position="bottom"/>]} \n/>',jsx:l.createElement(a.f,Object.assign({value:g,onChange:E,plugins:[l.createElement(i.Z,{position:"bottom"})]},r))},{title:"Only Analog Time Picker",code:'import DatePicker from "react-multi-date-picker";\nimport TimePicker from "react-multi-date-picker/plugins/analog_time_picker";\n'+f+'<DatePicker \n  disableDayPicker \n  format="HH:mm:ss"\n  plugins={[<TimePicker />]} \n/>',jsx:l.createElement(a.ZP,Object.assign({disableDayPicker:!0,format:"HH:mm:ss",plugins:[l.createElement(i.Z,null)]},r))}]}function m(e){var t=e.pageContext.language||"en";return l.createElement(r.Z,{language:t,doc:c,section:"plugins"})}}}]);
//# sourceMappingURL=component---src-pages-plugins-analog-time-picker-js-4d5981bec60341e696d2.js.map