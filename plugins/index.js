import r,{createElement as e,useState as n}from"react";import t from"react-date-object";function i(r,e,n){return e in r?Object.defineProperty(r,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[e]=n,r}function o(){return(o=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r}).apply(this,arguments)}function a(r,e){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.push.apply(n,t)}return n}function d(r){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(r,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(n,e))}))}return r}function l(r,e){if(null==r)return{};var n,t,i=function(r,e){if(null==r)return{};var n,t,i={},o=Object.keys(r);for(t=0;t<o.length;t++)n=o[t],e.indexOf(n)>=0||(i[n]=r[n]);return i}(r,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);for(t=0;t<o.length;t++)n=o[t],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(r,n)&&(i[n]=r[n])}return i}function p(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var n=[],t=!0,i=!1,o=void 0;try{for(var a,d=r[Symbol.iterator]();!(t=(a=d.next()).done)&&(n.push(a.value),!e||n.length!==e);t=!0);}catch(r){i=!0,o=r}finally{try{t||null==d.return||d.return()}finally{if(i)throw o}}return n}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return m(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(r);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(r,e){(null==e||e>r.length)&&(e=r.length);for(var n=0,t=new Array(e);n<e;n++)t[n]=r[n];return t}function c(){return(c=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r}).apply(this,arguments)}function s(r,e){if(null==r)return{};var n,t,i=function(r,e){if(null==r)return{};var n,t,i={},o=Object.keys(r);for(t=0;t<o.length;t++)n=o[t],e.indexOf(n)>=0||(i[n]=r[n]);return i}(r,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);for(t=0;t<o.length;t++)n=o[t],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(r,n)&&(i[n]=r[n])}return i}function u(r){var n=r.size,t=void 0===n?24:n,i=r.color,o=void 0===i?"currentColor":i,a=r.stroke,d=void 0===a?2:a,l=s(r,["size","color","stroke"]);return e("svg",c({className:"icon icon-tabler icon-tabler-calendar-event",width:t,height:t,viewBox:"0 0 24 24",strokeWidth:d,stroke:o,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},l),e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("rect",{x:4,y:5,width:16,height:16,rx:2}),e("line",{x1:16,y1:3,x2:16,y2:7}),e("line",{x1:8,y1:3,x2:8,y2:7}),e("line",{x1:4,y1:11,x2:20,y2:11}),e("rect",{x:8,y:15,width:2,height:2}))}function h(r){var n=r.size,t=void 0===n?24:n,i=r.color,o=void 0===i?"currentColor":i,a=r.stroke,d=void 0===a?2:a,l=s(r,["size","color","stroke"]);return e("svg",c({className:"icon icon-tabler icon-tabler-clock",width:t,height:t,viewBox:"0 0 24 24",strokeWidth:d,stroke:o,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},l),e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("circle",{cx:12,cy:12,r:9}),e("polyline",{points:"12 7 12 12 15 15"}))}function g(r){var n=r.size,t=void 0===n?24:n,i=r.color,o=void 0===i?"currentColor":i,a=r.stroke,d=void 0===a?2:a,l=s(r,["size","color","stroke"]);return e("svg",c({className:"icon icon-tabler icon-tabler-language",width:t,height:t,viewBox:"0 0 24 24",strokeWidth:d,stroke:o,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},l),e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4"}),e("path",{d:"M11 19l4 -9l4 9m-.9 -2h-6.2"}))}function f(r){var n=r.size,t=void 0===n?24:n,i=r.color,o=void 0===i?"currentColor":i,a=r.stroke,d=void 0===a?2:a,l=s(r,["size","color","stroke"]);return e("svg",c({className:"icon icon-tabler icon-tabler-letter-m",width:t,height:t,viewBox:"0 0 24 24",strokeWidth:d,stroke:o,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},l),e("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M6 20v-16l6 14l6 -14v16"}))}function b(r,e){void 0===e&&(e={});var n=e.insertAt;if(r&&"undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&t.firstChild?t.insertBefore(i,t.firstChild):t.appendChild(i),i.styleSheet?i.styleSheet.cssText=r:i.appendChild(document.createTextNode(r))}}function y(e){var t=e.state,a=e.setState,m=e.position,c=e.onSettingChanged,s=e.calendars,b=void 0===s?["gregorian","persian","arabic","indian"]:s,y=e.locals,v=void 0===y?["en","fa","ar","hi"]:y,k=e.modes,x=void 0===k?["single","multiple","range"]:k,w=e.others,O=void 0===w?["time picker","only time picker","only month picker","only year picker"]:w,P=e.defaultActive,D=void 0===P?"":P,j=e.disabledList,E=void 0===j?[]:j,C=e.defaultFormat,N=void 0===C?{}:C,Y=l(e,["state","setState","position","onSettingChanged","calendars","locals","modes","others","defaultActive","disabledList","defaultFormat"]),z=p(n(D),2),M=z[0],S=z[1],A={"time picker":"TP","only time picker":"OT","only month picker":"OM","only year picker":"OY"};return r.createElement("div",o({className:"settings ".concat(m)},Y),!E.includes("calendar")&&r.createElement("div",{title:"Calendar",className:"setting ".concat("calendar"===M?"active":"")},r.createElement(u,{size:19,stroke:1.5,className:"icon",onClick:function(){return S("calendar"===M?"":"calendar")}}),r.createElement("div",{className:"items"},b.map((function(e,n){return r.createElement("span",{key:n,className:"item ".concat(t.calendar===e?"active":""),title:e,onClick:function(r){return T(r,"calendar")}},e.substring(0,2).toUpperCase())})))),!E.includes("local")&&r.createElement("div",{title:"Local",className:"setting ".concat("local"===M?"active":"")},r.createElement(g,{size:19,stroke:1.5,className:"icon",onClick:function(){return S("local"===M?"":"local")}}),r.createElement("div",{className:"items"},v.map((function(e,n){return r.createElement("span",{key:n,className:"item ".concat(t.local===e?"active":""),title:e,onClick:function(r){return T(r,"local")}},e.toUpperCase())})))),!E.includes("mode")&&r.createElement("div",{title:"Mode",className:"setting ".concat("mode"===M?"active":"")},r.createElement(f,{size:19,stroke:1.5,className:"icon",onClick:function(){return S("mode"===M?"":"mode")}}),r.createElement("div",{className:"items"},x.map((function(e,n){return r.createElement("span",{key:n,className:"item ".concat(t[e]?"active":t.range||t.multiple||"single"!==e?"":"active"),title:e,onClick:L},e.substring(0,2).toUpperCase())})))),!E.includes("others")&&r.createElement("div",{title:"Time Picker",className:"setting ".concat("others"===M?"active":"")},r.createElement(h,{size:19,stroke:1.5,className:"icon",onClick:function(){return S("others"===M?"":"others")}}),r.createElement("div",{className:"items"},r.createElement("span",{className:"item ".concat(t.timePicker||t.onlyTimePicker||t.onlyMonthPicker||t.onlyYearPicker?"":"active"),title:"disable",onClick:B},"DI"),!t.multiple&&!t.range&&!Array.isArray(t.selectedDate)&&r.createElement(r.Fragment,null,O.map((function(e,n){return r.createElement("span",{key:n,className:"item ".concat(t[e.replace(/\s\w/g,(function(r){return r[1].toUpperCase()}))]?"active":""),title:e,onClick:B},A[e])}))))));function T(r,e){var n=r.target.title;t[e]!==n&&H(d(d({},t),{},i({date:t.date.set(e,n)},e,n)))}function L(r){var e;switch(r.target.title){case"multiple":e=d(d({},t),{},{selectedDate:Array.isArray(t.selectedDate)?t.selectedDate:[t.selectedDate],multiple:!0,range:!1,mustShowDates:!0});break;case"range":(e=d(d({},t),{},{selectedDate:Array.isArray(t.selectedDate)?t.selectedDate:[t.selectedDate],multiple:!1,range:!0,mustShowDates:!0})).selectedDate.length>2&&(e.selectedDate=[e.selectedDate[0],I(e.selectedDate)]);break;default:e=d(d({},t),{},{selectedDate:Array.isArray(t.selectedDate)?I(t.selectedDate):t.selectedDate,multiple:!1,range:!1,mustShowDates:!1})}H(e)}function I(r){return r[r.length-1]}function B(r){var e;switch(r.target.title){case"time picker":e=d(d({},t),{},{timePicker:!0,onlyTimePicker:!1,onlyMonthPicker:!1,onlyYearPicker:!1,format:(null==N?void 0:N.timePicker)||"YYYY/MM/DD HH:mm:ss"});break;case"only time picker":e=d(d({},t),{},{timePicker:!1,onlyTimePicker:!0,onlyMonthPicker:!1,onlyYearPicker:!1,format:(null==N?void 0:N.onlyTimePicker)||"HH:mm:ss"});break;case"only month picker":e=d(d({},t),{},{timePicker:!1,onlyTimePicker:!1,onlyMonthPicker:!0,onlyYearPicker:!1,format:(null==N?void 0:N.onlyMonthPicker)||"MM/YYYY"});break;case"only year picker":e=d(d({},t),{},{timePicker:!1,onlyTimePicker:!1,onlyMonthPicker:!1,onlyYearPicker:!0,format:(null==N?void 0:N.onlyYearPicker)||"YYYY"});break;default:e=d(d({},t),{},{timePicker:!1,onlyTimePicker:!1,onlyMonthPicker:!1,onlyYearPicker:!1,format:(null==N?void 0:N.single)||"YYYY/MM/DD"})}H(e)}function H(r){a(r),r.value=r.selectedDate,c instanceof Function&&c(r)}}b(".settings {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  padding: 0 5px;\r\n}\r\n\r\n.settings.bottom,\r\n.settings.top {\r\n  margin-bottom: 8px;\r\n  margin-top: 8px;\r\n}\r\n\r\n.settings.left,\r\n.settings.right {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 5px;\r\n}\r\n\r\n.setting {\r\n  width: 24px;\r\n  height: 24px;\r\n  padding: 2px;\r\n  border-radius: 15px;\r\n  background-color: #0074d9;\r\n  color: white;\r\n  box-shadow: 0 0 3px 1px #ccc;\r\n  display: flex;\r\n  transition: 0.4s;\r\n  margin: auto 3px;\r\n}\r\n\r\n.left .setting,\r\n.right .setting {\r\n  display: grid;\r\n}\r\n\r\n.setting.active {\r\n  flex: 1;\r\n}\r\n\r\n.left .setting.active,\r\n.right .setting.active {\r\n  height: 100%;\r\n}\r\n\r\n.setting .icon {\r\n  cursor: pointer;\r\n  margin: auto 2px;\r\n  transition: 0.4s;\r\n}\r\n\r\n.setting .items {\r\n  width: 0;\r\n  overflow: hidden;\r\n  visibility: hidden;\r\n}\r\n\r\n.setting.active .items {\r\n  flex: 1;\r\n  box-shadow: inset 0 0 3px #ccc;\r\n  visibility: visible;\r\n  flex: 1;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  margin: 0 1px;\r\n  border-radius: 15px;\r\n  padding: 0 5px;\r\n  width: unset;\r\n  background-color: white;\r\n  transition: 0.4s;\r\n}\r\n\r\n.left .setting.active .items,\r\n.right .setting.active .items {\r\n  display: grid;\r\n}\r\n\r\n.items .item {\r\n  background-color: rgb(126, 166, 240);\r\n  box-shadow: 0 0 3px 1px #ccc;\r\n  width: 16px;\r\n  height: 16px;\r\n  margin: auto 0;\r\n  font-size: 9px;\r\n  line-height: 16px;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n}\r\n\r\n.items .item.active {\r\n  background-color: #0074d9;\r\n  color: white;\r\n}\r\n\r\n.green .items .item {\r\n  background-color: var(--rmdp-hover-green);\r\n}\r\n\r\n.green .setting,\r\n.green .items .item.active {\r\n  background-color: var(--rmdp-primary-green);\r\n}\r\n\r\n.purple .items .item {\r\n  background-color: var(--rmdp-hover-purple);\r\n}\r\n\r\n.purple .setting,\r\n.purple .items .item.active {\r\n  background-color: var(--rmdp-primary-purple);\r\n}\r\n\r\n.red .items .item {\r\n  background-color: var(--rmdp-hover-red);\r\n}\r\n\r\n.red .setting,\r\n.red .items .item.active {\r\n  background-color: var(--rmdp-primary-red);\r\n}\r\n\r\n.teal .items .item {\r\n  background-color: var(--rmdp-hover-teal);\r\n}\r\n\r\n.teal .setting,\r\n.teal .items .item.active {\r\n  background-color: var(--rmdp-primary-teal);\r\n}\r\n\r\n.yellow .items .item {\r\n  background-color: var(--rmdp-hover-yellow);\r\n}\r\n\r\n.yellow .setting,\r\n.yellow .items .item.active {\r\n  background-color: var(--rmdp-primary-yellow);\r\n}\r\n\r\n@media (max-width: 400px) {\r\n  .rmdp-wrapper:not(.rmdp-mobile) .settings:not(.left):not(.right) {\r\n    width: 190px;\r\n    height: 35px;\r\n    overflow: hidden;\r\n    margin: auto;\r\n  }\r\n\r\n  .rmdp-wrapper:not(.rmdp-mobile) .top .setting.active,\r\n  .rmdp-wrapper:not(.rmdp-mobile) .bottom .setting.active {\r\n    width: 120px;\r\n  }\r\n}\r\n\r\n@media (max-height: 400px) {\r\n  .rmdp-wrapper .settings:not(.left):not(.right) {\r\n    width: 190px;\r\n    height: 35px;\r\n    overflow: hidden;\r\n    margin: auto;\r\n  }\r\n\r\n  .rmdp-wrapper .top .setting.active,\r\n  .rmdp-wrapper .bottom .setting.active {\r\n    width: 120px;\r\n  }\r\n}\r\n");function v(e){var n,i,a,d=e.state,p=(e.setState,e.position),m=e.size,c=void 0===m?"big":m,s=e.isChildInTop,u=e.isChildInBottom,h=l(e,["state","setState","position","size","isChildInTop","isChildInBottom"]);return!d.selectedDate||d.multiple||d.range||Array.isArray(d.selectedDate)?Array.isArray(d.selectedDate)?(n=(a=d.selectedDate)[a.length-1],i=!1):n||(n=new t,i=!1):(n=d.selectedDate,i=!0),r.createElement("div",o({className:"rmdp-header-plugin ".concat(p," ").concat(c," ").concat(i?"":"not-single"," ").concat(s?"no-border-radius-top":u?"no-border-radius-bottom":"")},h),r.createElement("div",{className:"rmdp-hp-dddd"},n.format("dddd")),r.createElement("div",{className:"rmdp-hp-dd"},n.format("DD")),r.createElement("div",{className:"rmdp-hp-my"},n.format("MMM YYYY")))}b(".rmdp-header-plugin {\r\n  background-color: #0074d9;\r\n  display: grid;\r\n  color: white;\r\n  grid-template-rows: repeat(1fr);\r\n}\r\n\r\n.rmdp-header-plugin.top {\r\n  border-radius: 7px 7px 0 0;\r\n}\r\n\r\n.rmdp-header-plugin.bottom {\r\n  border-radius: 0 0 7px 7px;\r\n}\r\n\r\n.rmdp-header-plugin.left {\r\n  border-radius: 7px 0 0 7px;\r\n}\r\n\r\n.rmdp-header-plugin.right {\r\n  border-radius: 0 7px 7px 0;\r\n}\r\n\r\n.rmdp-header-plugin.top.big,\r\n.rmdp-header-plugin.bottom.big {\r\n  height: 200px;\r\n}\r\n\r\n.rmdp-header-plugin.left.big,\r\n.rmdp-header-plugin.right.big {\r\n  width: 250px;\r\n}\r\n\r\n.rmdp-header-plugin.top.medium,\r\n.rmdp-header-plugin.bottom.medium {\r\n  height: 150px;\r\n}\r\n\r\n.rmdp-header-plugin.left.medium,\r\n.rmdp-header-plugin.right.medium {\r\n  width: 150px;\r\n}\r\n\r\n.rmdp-header-plugin.top.small,\r\n.rmdp-header-plugin.bottom.small {\r\n  height: 90px;\r\n}\r\n\r\n.rmdp-header-plugin.left.small,\r\n.rmdp-header-plugin.right.small {\r\n  width: 110px;\r\n}\r\n\r\n.rmdp-header-plugin.not-single.top {\r\n  border-radius: 7px 0 0 0;\r\n}\r\n\r\n.rmdp-header-plugin.not-single.bottom {\r\n  border-radius: 0 0 0 7px;\r\n}\r\n\r\n.rmdp-header-plugin div {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n}\r\n\r\n.rmdp-header-plugin .rmdp-hp-dd {\r\n  font-size: 50px;\r\n  font-weight: 500;\r\n}\r\n\r\n.rmdp-header-plugin.small.top .rmdp-hp-dd,\r\n.rmdp-header-plugin.small.bottom .rmdp-hp-dd {\r\n  font-size: 28px;\r\n}\r\n\r\n.rmdp-rtl .rmdp-header-plugin.left {\r\n  border-radius: 0 7px 7px 0;\r\n}\r\n\r\n.rmdp-rtl .rmdp-header-plugin.right {\r\n  border-radius: 7px 0 0 7px;\r\n}\r\n\r\n.rmdp-rtl .rmdp-header-plugin.not-single.top {\r\n  border-radius: 0 7px 0 0;\r\n}\r\n\r\n.rmdp-rtl .rmdp-header-plugin.not-single.bottom {\r\n  border-radius: 0 0 7px 0;\r\n}\r\n\r\n.green .rmdp-header-plugin {\r\n  background-color: var(--rmdp-primary-green);\r\n}\r\n\r\n.purple .rmdp-header-plugin {\r\n  background-color: var(--rmdp-primary-purple);\r\n}\r\n\r\n.red .rmdp-header-plugin {\r\n  background-color: var(--rmdp-primary-red);\r\n}\r\n\r\n.teal .rmdp-header-plugin {\r\n  background-color: var(--rmdp-primary-teal);\r\n}\r\n\r\n.yellow .rmdp-header-plugin {\r\n  background-color: var(--rmdp-primary-yellow);\r\n}\r\n\r\n.rmdp-mobile .rmdp-header-plugin {\r\n  border-radius: 0;\r\n}\r\n\r\n.rmdp-header-plugin.no-border-radius-top {\r\n  border-top-left-radius: 0;\r\n}\r\n\r\n.rmdp-rtl .rmdp-header-plugin.no-border-radius-top {\r\n  border-top-right-radius: 0;\r\n}\r\n\r\n.rmdp-header-plugin.no-border-radius-bottom {\r\n  border-bottom-left-radius: 0;\r\n}\r\n\r\n.rmdp-rtl .rmdp-header-plugin.no-border-radius-bottom {\r\n  border-bottom-right-radius: 0;\r\n}\r\n\r\n@media (max-width: 400px), (max-height: 400px) {\r\n  .rmdp-header-plugin.top.big,\r\n  .rmdp-header-plugin.bottom.big {\r\n    height: 100px;\r\n  }\r\n\r\n  .rmdp-header-plugin.left.big,\r\n  .rmdp-header-plugin.right.big {\r\n    width: 125px;\r\n  }\r\n\r\n  .rmdp-header-plugin.top.medium,\r\n  .rmdp-header-plugin.bottom.medium {\r\n    height: 75px;\r\n  }\r\n\r\n  .rmdp-header-plugin.left.medium,\r\n  .rmdp-header-plugin.right.medium {\r\n    width: 75px;\r\n  }\r\n\r\n  .rmdp-header-plugin.top.small,\r\n  .rmdp-header-plugin.bottom.small {\r\n    height: 55px;\r\n  }\r\n\r\n  .rmdp-header-plugin.left.small,\r\n  .rmdp-header-plugin.right.small {\r\n    width: 55px;\r\n  }\r\n\r\n  .rmdp-header-plugin.big.top .rmdp-hp-dd,\r\n  .rmdp-header-plugin.big.bottom .rmdp-hp-dd,\r\n  .rmdp-header-plugin.small.left .rmdp-hp-dd,\r\n  .rmdp-header-plugin.small.right .rmdp-hp-dd {\r\n    font-size: 30px;\r\n  }\r\n\r\n  .rmdp-header-plugin.medium.top .rmdp-hp-dd,\r\n  .rmdp-header-plugin.medium.bottom .rmdp-hp-dd {\r\n    font-size: 20px;\r\n  }\r\n\r\n  .rmdp-header-plugin.medium.top .rmdp-hp-dddd,\r\n  .rmdp-header-plugin.medium.bottom .rmdp-hp-dddd,\r\n  .rmdp-header-plugin.medium.top .rmdp-hp-my,\r\n  .rmdp-header-plugin.medium.bottom .rmdp-hp-my {\r\n    font-size: 14px;\r\n  }\r\n\r\n  .rmdp-header-plugin.small.top .rmdp-hp-dd,\r\n  .rmdp-header-plugin.small.bottom .rmdp-hp-dd {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .rmdp-header-plugin.small.top .rmdp-hp-dddd,\r\n  .rmdp-header-plugin.small.bottom .rmdp-hp-dddd,\r\n  .rmdp-header-plugin.small.top .rmdp-hp-my,\r\n  .rmdp-header-plugin.small.bottom .rmdp-hp-my {\r\n    font-size: 12px;\r\n  }\r\n\r\n  .rmdp-header-plugin.small.left .rmdp-hp-dddd,\r\n  .rmdp-header-plugin.small.right .rmdp-hp-dddd,\r\n  .rmdp-header-plugin.small.left .rmdp-hp-my,\r\n  .rmdp-header-plugin.small.right .rmdp-hp-my {\r\n    font-size: 12px;\r\n  }\r\n}\r\n");export{v as DatePickerHeader,y as Settings};
