declare module "react-multi-date-picker" {
  import React from "react";
  import DateObject from "react-date-object";

  interface CalendarProps {
    ref?: React.MutableRefObject<any>;
    /**
     * @types Date | string | number | DateObject
     * @types Date[] | string[] | number[] | DateObject[]
     * @example
     * <Calendar value={new Date()} />
     * <DatePicker value={[new Date(), new Date(2020, 2, 12)]} />
     */
    value?:
      | Date
      | string
      | number
      | DateObject
      | Date[]
      | string[]
      | number[]
      | DateObject[];
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
     *
     * <DatePicker calendar="indian" />
     */
    calendar?: string;
    /**
     * Availble locales:
     *
     *  - en `english`
     *  - fa `farsi`
     *  - ar `arabic`
     *  - hi `hindi`
     *
     * @example
     * <Calendar locale="fa" />
     *
     * <DatePicker locale="ar" />
     */
    locale?: string;
    /**
     * @type string
     * @default "YYYY/MM/DD"
     * @see https://shahabyazdi.github.io/react-multi-date-picker/format-tokens/
     * @example
     * <Calendar format="MM/DD/YYYY hh:mm:ss a" />
     *
     * <DatePicker format="MM-DD-YYYY HH:mm:ss" />
     */
    format?: string;
    /**
     * Enable it if you want to use time picker.
     * @example
     * <Calendar timePicker />
     *
     * <DatePicker timePicker />
     */
    timePicker?: boolean;
    onlyTimePicker?: boolean;
    onlyMonthPicker?: boolean;
    onlyYearPicker?: boolean;
    /**
     * @example
     * <Calendar
     *  value={[new Date(2020,10,10), new Date(2020,10,14)]}
     *  range
     * />
     *
     * <DatePicker range />
     */
    range?: boolean;
    /**
     * @example
     * <Calendar
     *  value={[new Date(2020,10,10), new Date(2020,10,14)]}
     *  multiple
     * />
     *
     * <DatePicker multiple />
     */
    multiple?: boolean;
    /**
     * Calendar wrapper className
     */
    className?: string;
    /**
     * @see https://shahabyazdi.github.io/react-multi-date-picker/locales/
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
    weekDays?: string[] | [string[]];
    /**
     * @see https://shahabyazdi.github.io/react-multi-date-picker/locales/
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
    months?: string[] | [string[]];
    /**
     * @example
     * <Calendar
     *  onChange={dateObject=>{
     *    console.log(dateObject.format())
     *  }}
     * />
     *
     * <DatePicker
     *  onChange={dateObject=>{
     *    console.log(JSON.stringify(dateObject))
     *  }}
     * />
     */
    onChange?(selectedDates: DateObject | DateObject[]): void;
    showOtherDays?: boolean;
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
    minDate?: Date | string | number | DateObject;
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
    maxDate?: Date | string | number | DateObject;
    /**
     * You can customize your calendar days
     * with the mapDays Prop and create different properties
     * for each of them by returning the Props you want.
     * @see https://shahabyazdi.github.io/react-multi-date-picker/map-days/
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
    mapDays?(object: {
      date: DateObject;
      selectedDate: DateObject | DateObject[];
      currentMonth: object;
      isSameDate(arg1: DateObject, arg2: DateObject): boolean;
    }): object | void;
    disableMonthPicker?: boolean;
    disableYearPicker?: boolean;
    /**
     * @example
     * <DatePicker
     *   timePicker
     *   format="Date:YYYY/MM/DD, Time:HH:mm:ss"
     *   formattingIgnoreList={["Date", "Time"]}
     * />
     */
    formattingIgnoreList?: string[];
    /**
     * Calendar z-index
     * @default 100
     */
    zIndex?: number;
    /**
     * Availble Positions:
     *  - top
     *  - bottom
     *  - left
     *  - right
     *
     * @example
     *
     * <DatePicker
     *  plugins={[
     *      <ImportedPlugin position="right" />
     *  ]}
     * />
     */
    plugins?: React.ReactElement[];
    /**
     * In Multiple mode, use this Prop to sort the selected dates.
     *
     * @example
     *
     * <DatePicker multiple sort />
     */
    sort?: boolean;
    numberOfMonths?: number;
    currentDate?: DateObject;
    children?: React.ReactNode;
    digits?: string[];
    /**
     * You can set the buttons prop to false to disable the previous & next buttons.
     *
     * @example
     * <Calendar buttons={false} />
     */
    buttons?: boolean;
    /**
     * You can render your favorite element instead of the previous & next buttons.
     *
     * @example
     * <Calendar renderButton={<CustomButton />} />
     */
    renderButton?: React.ReactElement | Function;
    /**
     * Use this property to change the start day of the week.
     *
     * Only numbers between 0 and 6 are valid
     *
     * @example
     *
     * <Calendar weekStartDayIndex={2} />
     */
    weekStartDayIndex?: number;
    disableDayPicker?: boolean;
    onPropsChange?(props: object): void;
    onMonthChange?(date: DateObject): void;
  }

  interface DatePickerProps {
    arrow?: boolean | React.ReactElement;
    /**
     * Input name.
     * This feature does not work in custom type.
     */
    arrowClassName?: string;
    arrowStyle?: React.CSSProperties;
    name?: string;
    /**
     * Input placeholder.
     * This feature does not work in custom type.
     */
    id?: string;
    title?: string;
    required?: boolean;
    placeholder?: string;
    /**
     * Input style.
     * This feature does not work in custom type.
     */
    style?: React.CSSProperties;
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
    inputClass?: string;
    /**
     * This feature does not work in custom type.
     */
    disabled?: boolean;
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
    type?: string;
    /**
     * This feature only works in custom type.
     * @example
     * <DatePicker
     *   type="custom"
     *   render={<CustomComponent/>}
     * />
     */
    render?: React.ReactElement | Function;
    /**
     * This feature only affects on `input` in `single` mode
     *
     * Input modes:
     *
     *  - text
     *  - numeric
     *  - decimal
     *  - none `useful for disabling virtual keyboard`
     *
     * @default "text"
     */
    inputMode?: string;
    scrollSensitive?: boolean;
    hideOnScroll?: boolean;
    /**
     * DatePicker container style.
     */
    containerStyle?: React.CSSProperties;
    /**
     * DatePicker container className.
     */
    containerClassName?: string;
    /**
     * Availble positions:
     *
     *  - top or top-center
     *  - bottom or bottom-center
     *  - left or left-center
     *  - right or right-center
     *  - top-start or top-left
     *  - bottom-start or bottom-left
     *  - left-start or left-top
     *  - right-start or right-top
     *  - top-end or top-right
     *  - bottom-end or bottom-right
     *  - left-end or left-bottom
     *  - right-end or right-bottom
     *
     * @see https://shahabyazdi.github.io/react-multi-date-picker/positions/
     * @example
     *
     * <DatePicker
     *   calendarPosition="bottom-start"
     * />
     */
    calendarPosition?: string;
    animation?: boolean;
    /**
     * This feature only affects on `input` in `single` mode
     */
    editable?: boolean;
    /**
     * Set it to false if you want to see selected date(s)
     * that are not in range of min and max dates in calendar.
     * @default true
     */
    onlyShowInRangeDates?: boolean;
    /**
     * Return `false` in case you don't want to open Calendar
     */
    onOpen?(): void | boolean;
    /**
     * Return `false` in case you don't want to close Calendar
     */
    onClose?(): void | boolean;
    fixMainPosition?: boolean;
    fixRelativePosition?: boolean;
    offsetY?: number;
    offsetX?: number;
    onPositionChange?(data: {
      popper: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        height: number;
        width: number;
      };
      element: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        height: number;
        width: number;
      };
      arrow: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        height: number;
        width: number;
        direction: string;
      };
      position: string;
      scroll: {
        scrollLeft: number;
        scrollTop: number;
      };
    }): void;
  }

  export { DateObject };
  export function Calendar(props: CalendarProps): React.ReactElement;
  export function getAllDatesInRange(
    range: DateObject[],
    toDate?: boolean
  ): DateObject[] | Date[];
  export default function DatePicker(
    props: CalendarProps & DatePickerProps
  ): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/date_panel" {
  import React from "react";
  import DateObject from "react-date-object";

  interface DatePanelProps {
    position?: string;
    disabled?: boolean;
    eachDaysInRange?: boolean;
    sort?: "string";
    style?: React.CSSProperties;
    className?: string;
    onDateClicked?(date: DateObject): void;
    removeButton?: boolean;
    header?: string;
    markFocused?: boolean;
    focusedClassName: string;
  }

  export default function DatePanel(props: DatePanelProps): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/date_picker_header" {
  import React from "react";

  interface DatePickerHeaderProps {
    position?: string;
    disabled?: boolean;
    size?: string;
    calendar?: string;
    locale?: string;
    className?: string;
  }

  export default function DatePickerHeader(
    props: DatePickerHeaderProps
  ): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/multi_colors" {
  import React from "react";

  interface MultiColorsProps {
    position?: string;
    disabled?: boolean;
    colors?: string[];
    defaultColor?: string;
    className?: string;
  }

  export default function MultiColors(
    props: MultiColorsProps
  ): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/settings" {
  import React from "react";

  interface SettingsProps {
    position?: string;
    disabled?: boolean;
    calendars?: string[];
    locales?: string[];
    modes?: string[];
    others?: string[];
    defaultActive?: string;
    disabledList?: string[];
    defaultFormat?: {
      single?: string;
      onlyYearPicker?: string;
      onlyMonthPicker?: string;
    };
    className?: string;
    names?: {
      gregorian: string;
      persian: string;
      arabic: string;
      indian: string;
      en: string;
      fa: string;
      ar: string;
      hi: string;
      single: string;
      multiple: string;
      range: string;
      disable: string;
      onlyMonthPicker: string;
      onlyYearPicker: string;
    };
    titles?: {
      calendar: string;
      locale: string;
      mode: string;
      otherPickers: string;
      gregorian: string;
      persian: string;
      arabic: string;
      indian: string;
      en: string;
      fa: string;
      ar: string;
      hi: string;
      single: string;
      multiple: string;
      range: string;
      disable: string;
      onlyMonthPicker: string;
      onlyYearPicker: string;
    };
  }

  export default function Settings(props: SettingsProps): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/toolbar" {
  import React from "react";

  interface ToolbarProps {
    position?: string;
    disabled?: boolean;
    className?: string;
    sort?: string[];
    names?: { today: string; deselect: string; close: string };
  }

  export default function Toolbar(props: ToolbarProps): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/weekends" {
  import React from "react";

  interface WeekendsProps {
    position?: string;
    disabled?: boolean;
    weekends?: number[];
  }

  export default function Weekends(props: WeekendsProps): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/time_picker" {
  import React from "react";

  interface TimePickerProps {
    position?: string;
    disabled?: boolean;
  }

  export default function TimePicker(
    props: TimePickerProps
  ): React.ReactElement;
}
