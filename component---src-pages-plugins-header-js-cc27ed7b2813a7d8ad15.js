(self.webpackChunkdate_picker=self.webpackChunkdate_picker||[]).push([[9985],{4724:function(e,t,r){"use strict";var d=r(7294),l=r(1446);function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=a(d),i=a(l);function p(){return(p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var d in r)Object.prototype.hasOwnProperty.call(r,d)&&(e[d]=r[d])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var r,d,l=function(e,t){if(null==e)return{};var r,d,l={},a=Object.keys(e);for(d=0;d<a.length;d++)r=a[d],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(d=0;d<a.length;d++)r=a[d],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function m(e){return Array.isArray(e)}var u=["state","setState","position","registerListener","calendarProps","datePickerProps","handleChange","nodes","Calendar","DatePicker","handlePropsChange","handleFocusedDate","minDate","maxDate"];!function(e,t){void 0===t&&(t={});var r=t.insertAt;if("undefined"!=typeof document){var d=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===r&&d.firstChild?d.insertBefore(l,d.firstChild):d.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}(".rmdp-header-plugin{background-color:#0074d9;color:#fff;display:grid}.rmdp-header-plugin div{display:flex;flex-direction:column;justify-content:center}.rmdp-header-plugin .rmdp-hp-dd{font-size:50px;font-weight:500}.rmdp-header-plugin.small.bottom .rmdp-hp-dd,.rmdp-header-plugin.small.top .rmdp-hp-dd{font-size:28px}.rmdp-header-plugin.top{border-radius:5px 5px 0 0}.rmdp-header-plugin.bottom{border-radius:0 0 5px 5px}.rmdp-header-plugin.left{border-radius:5px 0 0 5px}.rmdp-header-plugin.right{border-radius:0 5px 5px 0}.rmdp-header-plugin.bottom.big,.rmdp-header-plugin.top.big{height:200px}.rmdp-header-plugin.left.big,.rmdp-header-plugin.right.big{width:225px}.rmdp-header-plugin.bottom.medium,.rmdp-header-plugin.top.medium{height:150px}.rmdp-header-plugin.left.medium,.rmdp-header-plugin.right.medium{width:150px}.rmdp-header-plugin.bottom.small,.rmdp-header-plugin.top.small{height:90px}.rmdp-header-plugin.left.small,.rmdp-header-plugin.right.small{width:110px}.green .rmdp-header-plugin{background-color:#3d9970}.purple .rmdp-header-plugin{background-color:#9c27b0}.red .rmdp-header-plugin{background-color:#ea0034}.teal .rmdp-header-plugin{background-color:#009688}.yellow .rmdp-header-plugin{background-color:#f7da37}.rmdp-header-plugin.no-border-top-left-radius{border-top-left-radius:0}.rmdp-header-plugin.no-border-bottom-left-radius{border-bottom-left-radius:0}.rmdp-header-plugin.no-border-top-right-radius{border-top-right-radius:0}.rmdp-header-plugin.no-border-bottom-right-radius{border-bottom-right-radius:0}.rmdp-header-plugin.no-border-radius{border-radius:0}@media (max-height:400px),(max-width:400px){.rmdp-header-plugin.bottom.big,.rmdp-header-plugin.top.big{height:100px}.rmdp-header-plugin.left.big,.rmdp-header-plugin.right.big{width:125px}.rmdp-header-plugin.bottom.medium,.rmdp-header-plugin.top.medium{height:75px}.rmdp-header-plugin.left.medium,.rmdp-header-plugin.right.medium{width:75px}.rmdp-header-plugin.bottom.small,.rmdp-header-plugin.top.small{height:55px}.rmdp-header-plugin.left.small,.rmdp-header-plugin.right.small{width:55px}.rmdp-header-plugin.big.bottom .rmdp-hp-dd,.rmdp-header-plugin.big.top .rmdp-hp-dd,.rmdp-header-plugin.small.left .rmdp-hp-dd,.rmdp-header-plugin.small.right .rmdp-hp-dd{font-size:30px}.rmdp-header-plugin.medium.bottom .rmdp-hp-dd,.rmdp-header-plugin.medium.top .rmdp-hp-dd{font-size:20px}.rmdp-header-plugin.medium.bottom .rmdp-hp-dddd,.rmdp-header-plugin.medium.bottom .rmdp-hp-my,.rmdp-header-plugin.medium.top .rmdp-hp-dddd,.rmdp-header-plugin.medium.top .rmdp-hp-my{font-size:14px}.rmdp-header-plugin.small.bottom .rmdp-hp-dd,.rmdp-header-plugin.small.top .rmdp-hp-dd{font-size:18px}.rmdp-header-plugin.small .rmdp-hp-dddd,.rmdp-header-plugin.small .rmdp-hp-my{font-size:12px}}");var c=["state","position","size","nodes","calendar","locale","className"];t.Z=function(e){var t,r,d=e.state,l=e.position,a=e.size,s=void 0===a?"big":a,h=e.nodes,g=e.calendar,f=void 0===g?d.calendar:g,b=e.locale,k=void 0===b?d.locale:b,E=e.className,x=void 0===E?"":E,P=o(e,c);t=!d.selectedDate||d.multiple||d.range||m(d.selectedDate)?m(d.selectedDate)?d.focused||(r=d.selectedDate)[r.length-1]:new i.default:d.selectedDate,t=new i.default(t).set({calendar:f,locale:k});var D=["rmdp-header-plugin",l,s];return h[l]?D.push("no-border-radius"):["left","right"].includes(l)&&(h.top&&D.push("no-border-top-".concat(l,"-radius")),h.bottom&&D.push("no-border-bottom-".concat(l,"-radius"))),n.default.createElement("div",p({className:"".concat(D.join(" ")," ").concat(x)},function(e){return e.state,e.setState,e.position,e.registerListener,e.calendarProps,e.datePickerProps,e.handleChange,e.nodes,e.Calendar,e.DatePicker,e.handlePropsChange,e.handleFocusedDate,e.minDate,e.maxDate,o(e,u)}(P)),n.default.createElement("div",{className:"rmdp-hp-dddd"},t.format("dddd")),n.default.createElement("div",{className:"rmdp-hp-dd"},t.format("DD")),n.default.createElement("div",{className:"rmdp-hp-my"},t.format("MMM YYYY")))}},8706:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var d=r(7294),l=r(316),a=r(7821),n=r(4724),i=r(6777),p=r.n(i);function o(e){var t=e.translate,r=e.language,l=e.otherProps,i=e.localeImport,o="en"===r?".\n.\n.\n":i;return[{title:"Props",description:d.createElement("table",null,d.createElement("thead",null,d.createElement("tr",null,d.createElement("th",null,t("Prop")),d.createElement("th",null,t("Type")),d.createElement("th",null,t("Default")))),d.createElement("tbody",null,d.createElement("tr",null,d.createElement("td",null,"position"),d.createElement("td",null,"String"),d.createElement("td",null,'"right"')),d.createElement("tr",null,d.createElement("td",null,"disabled"),d.createElement("td",null,"Boolean"),d.createElement("td",null,"false")),d.createElement("tr",null,d.createElement("td",null,"size"),d.createElement("td",null,"String"),d.createElement("td",null,'"big"')),d.createElement("tr",null,d.createElement("td",null,"calendar"),d.createElement("td",null,"Object"),d.createElement("td",null,"Default DatePicker Calendar")),d.createElement("tr",null,d.createElement("td",null,"locale"),d.createElement("td",null,"Object"),d.createElement("td",null,"Default DatePicker Locale"))))},{title:"Sizes",jsx:d.createElement("ul",null,d.createElement("li",null,"big"),d.createElement("li",null,"medium"),d.createElement("li",null,"small"))},{title:"Header Right",code:'import DatePicker from "react-multi-date-picker"\nimport DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"\n'+o+"<DatePicker\n  plugins={[\n    <DatePickerHeader />\n  ]}\n/>",jsx:d.createElement(a.ZP,Object.assign({plugins:[d.createElement(n.Z,null)]},l))},{title:"Header Left",code:'import DatePicker from "react-multi-date-picker"\nimport DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"\n'+o+'<DatePicker\n  plugins={[\n    <DatePickerHeader position="left" />\n  ]}\n/>',jsx:d.createElement(a.ZP,Object.assign({plugins:[d.createElement(n.Z,{position:"left"})]},l))},{title:"English Calendar with Indian Header",code:'import DatePicker from "react-multi-date-picker"\nimport DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"\nimport gregorian_hi from "react-date-object/locales/gregorian_hi" //(gregorian calendar, hindi locale)\n'+o+'<DatePicker\n  plugins={[\n    <DatePickerHeader \n      locale={gregorian_hi}\n      size="medium" \n    />,\n  ]}\n  calendarPosition="'+("en"===r?"bottom-left":"bottom-right")+'"\n/> ',jsx:d.createElement(a.ZP,{plugins:[d.createElement(n.Z,{locale:p(),size:"medium"})],calendarPosition:"en"===r?"bottom-left":"bottom-right"})},{title:"Styling Header",code:'import DatePicker from "react-multi-date-picker"\nimport DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"\n'+o+'<DatePicker\n  plugins={[\n    <DatePickerHeader \n      position="top" \n      size="small" \n      style={{ backgroundColor: "steelblue" }} \n    />\n  ]}\n/>',jsx:d.createElement(a.ZP,Object.assign({plugins:[d.createElement(n.Z,{position:"top",size:"small",style:{backgroundColor:"steelblue"}})]},l))}]}function m(e){var t=e.pageContext.language||"en";return d.createElement(l.Z,{language:t,doc:o,section:"plugins"})}}}]);
//# sourceMappingURL=component---src-pages-plugins-header-js-cc27ed7b2813a7d8ad15.js.map