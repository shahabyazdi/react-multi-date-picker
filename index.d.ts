declare module "react-multi-date-picker" {
    import React from "react"
    import DateObject from "react-date-object"

    interface CalendarProps{
        /**
         * @types Date | string | number | DateObject
         * @types Date[] | string[] | number[] | DateObject[]
         * @example
         * <Calendar value={new Date()} />
         * <DatePicker value={[new Date(), new Date(2020, 2, 12)]} />
         */
        value: Date | string | number | DateObject,
        /**
         * Availble calendars: 
         *
         *   - gregorian
         *   - persian
         *   - arabic
         *   - indian
         * 
         * @example
         * <Calendar calendar="persian" />
         * <DatePicker calendar="indian" />
         */
        calendar: string,
        /**
         * Availble locals: 
         *
         *  - en `english`
         *  - fa `farsi`
         *  - ar `arabic`
         *  - hi `hindi`
         * 
         * @example
         * <Calendar local="fa" />
         * <DatePicker local="ar" />
         */
        local: string,
        /**
         * @type string
         * @default "YYYY/MM/DD"
         * @see https://shahabyazdi.github.io/react-multi-date-picker/#formatting-tokens
         * @example 
         * <Calendar format="MM/DD/YYYY hh:mm:ss a" />
         * <DatePicker format="MM-DD-YYYY HH:mm:ss" />
         */
        format: string,
        /**
         * Enable it if you want to use time picker.
         * @example
         * <Calendar timePicker />
         * <DatePicker timePicker />
         */
        timePicker: boolean,
        onlyTimePicker:boolean,
        onlyMonthPicker:boolean,
        onlyYearPicker:boolean,
        /**
         * @example
         * <Calendar
         *  value={[new Date(2020,10,10), new Date(2020,10,14)]}
         *  range
         * />
         * <DatePicker range />
         */
        range:boolean,
        /**
         * @example
         * <Calendar
         *  value={[new Date(2020,10,10), new Date(2020,10,14)]}
         *  multiple
         * />
         * <DatePicker multiple />
         */
        multiple:boolean,
        /**
         * This feature is only available in range and multiple mode.
         * Disable it if you don't want to see dates panel.
         * @default true
         */
        mustShowDates:boolean,
        /**
         * Calendar wrapper className
         */
        className:string,
        /**
         * @see https://shahabyazdi.github.io/react-multi-date-picker/#custom-months-&-weekdays
         * @example
         * <Calendar
         *   weekDays={[
         *     "SU", 
         *     "MO", 
         *     "TU", 
         *     "WE",
         *     "TH", 
         *     "FR", 
         *     "SA"
         *   ]}
         * />
         */
        weekDays:[string[]],
        /**
         * @see https://shahabyazdi.github.io/react-multi-date-picker/#custom-months-&-weekdays
         * @example
         * <Calendar
         *  months={[
         *    "jan",
         *    "feb",
         *    "mar",
         *    "apr",
         *    "may",
         *    "jun",
         *    "jul",
         *    "aug",
         *    "sep",
         *    "oct",
         *    "nov",
         *    "dec"
         *  ]}
         * />
         */
        months:[string[]],
        /**
         * @example
         * <Calendar
         *  onChange={dateObject=>{
         *    console.log(dateObject.format())
         *  }}
         * />
         * <DatePicker
         *  onChange={dateObject=>{
         *    console.log(JSON.stringify(dateObject))
         *  }}
         * />
         */
        onChange:Function,
        showOtherDays:boolean,
        /**
         * the date you set in datepicker as value must be equal or bigger than min date.
         * 
         * otherwise datepicker recognise it as `invalid date` and doesn't format it.
         * 
         * @example
         * <DatePicker 
         *  value="2020/12/05" 
         *  minDate="2020/12/05" 
         * />
         */
        minDate:Date | string | number | DateObject,
        /**
         * the date you set in datepicker as value must be equal or smaller than max date.
         * 
         * otherwise datepicker recognise it as `invalid date` and doesn't format it.
         * 
         * @example
         * <DatePicker 
         *  value="2020/12/01" 
         *  maxDate="2020/12/06" 
         * />
         */
        maxDate:Date | string | number | DateObject,
        /**
         * You can customize your calendar days 
         * with the mapDays Prop and create different properties 
         * for each of them by returning the Props you want.
         * @see https://shahabyazdi.github.io/react-multi-date-picker/#map-days
         * @example
         * <DatePicker
         *  mapDays={() => {
         *    return {
         *      style: {
         *        backgroundColor: "brown",
         *        color: "white"
         *      }
         *    }
         *  }}
         * />
         */
        mapDays:Function,
        disableMonthPicker:boolean,
        disableYearPicker:boolean,
        /**
         * @example
         * <DatePicker
         *   timePicker
         *   format="Date:YYYY/MM/DD, Time:HH:mm:ss"
         *   formattingIgnoreList={["Date", "Time"]}
         * />
         */
        formattingIgnoreList:string[]
    } 

    interface DatePickerProps{
        /**
         * Input name.
         * This feature does not work in custom type.
         */
        name:string,
        /**
         * Input placeholder.
         * This feature does not work in custom type.
         */
        placeholder:string,
        /**
         * Input style.
         * This feature does not work in custom type.
         */
        style:React.CSSProperties,
        /**
         * This feature does not work in custom type.
         * 
         * You can also use this prop for button and icon type.
         * 
         * Default class names:
         * 
         *  - input : `rmdp-input`
         * 
         *  - button : `rmdp-button`
         * 
         * Note that when you enter a new className, the default className is automatically `removed`.
         */
        inputClass:string
        /**
         * This feature does not work in custom type.
         */
        disabled:boolean,
        /**
         * Availble types:
         *
         *   - input
         *   - input-icon
         *   - icon
         *   - button
         *   - custom
         * 
         * @default "input"
         */
        type:string,
        /**
         * This feature only works in custom type.
         * @example
         * <DatePicker
         *   type="custom"
         *   render={<CustomComponent/>}
         * />
         */
        render:React.ReactElement | Function
        /**
         * This feature only affects on `input` in `single` mode
         * 
         * Input modes:
         * 
         *  - none `useful for disabling virtual keyboard`
         *  - text 
         * 
         * @default "text"
         */
        inputMode:string,
        scrollSensitive:boolean,
        hideOnScroll:boolean,
        /**
         * DatePicker container style.
         */
        containerStyle:React.CSSProperties,
        /**
         * DatePicker container className.
         */
        containerClassName:string,
        /**
         * You can use this feature to adjust the calendar position relative to the input.
         * 
         * To use this, you must enter the X and Y positions as positionY-positionX.
         * @see https://shahabyazdi.github.io/react-multi-date-picker/#calendar-position
         * @example
         * <DatePicker
         *   calendarPosition="bottom-left"
         * />
         */
        calendarPosition:string,
        animation:boolean,
        /**
         * This feature only affects on `input` in `single` mode
         */
        editable:boolean
    }

    export { DateObject }
    export function Calendar(props: CalendarProps): React.ReactElement
    export default function DatePicker(props: CalendarProps & DatePickerProps): React.ReactElement
}