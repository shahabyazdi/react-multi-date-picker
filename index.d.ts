declare module "react-multi-date-picker" {
  import React, { HTMLAttributes } from "react";
  import DateObject, { Calendar, Locale } from "react-date-object";

  export type Value =
    | Date
    | string
    | number
    | DateObject
    | Date[]
    | string[]
    | number[]
    | DateObject[]
    | null;

  export type FunctionalPlugin = { type: string; fn: Function };
  export type Plugin = React.ReactElement | FunctionalPlugin;

  export type HeaderItem =
    | "MONTH_YEAR"
    | "YEAR_MONTH"
    | "LEFT_BUTTON"
    | "RIGHT_BUTTON";

  export type CustomComponentProps = {
    value?: string;
    openCalendar?: () => void;
    onFocus?: () => void;
    handleValueChange?: (e: React.ChangeEvent) => void;
    onChange?: (e: React.ChangeEvent) => void;
    locale?: Locale;
    separator?: string;
  };

  export interface CalendarProps {
    ref?: React.MutableRefObject<any>;
    /**
     * @types Date | string | number | DateObject
     * @types Date[] | string[] | number[] | DateObject[]
     * @example
     * <Calendar value={new Date()} />
     * <DatePicker value={[new Date(), new Date(2020, 2, 12)]} />
     */
    value?: Value;
    /**
     * default calendar is gregorian.
     *
     * if you want to use other calendars instead of gregorian,
     * you must import it from "react-date-object"
     *
     * Availble calendars:
     *
     *   - gregorian
     *   - persian
     *   - arabic
     *   - indian
     *
     * @example
     * import persian from "react-date-object/calendars/persian"
     * <Calendar calendar={persian} />
     *
     * import indian from "react-date-object/calendars/indian"
     * <DatePicker calendar={indian} />
     */
    calendar?: Calendar;
    /**
     * default locale is gregorian_en.
     *
     * if you want to use other locales instead of gregorian_en,
     * you must import it from "react-date-object"
     *
     * Availble locales:
     *
     *  - gregorian_en
     *  - gregorian_fa
     *  - gregorian_ar
     *  - gregorian_hi
     *  - persian_en
     *  - persian_fa
     *  - persian_ar
     *  - persian_hi
     *  - arabic_en
     *  - arabic_fa
     *  - arabic_ar
     *  - arabic_hi
     *  - indian_en
     *  - indian_fa
     *  - indian_ar
     *  - indian_hi
     *
     * @example
     * import gregorian_fa from "react-date-object/locales/gregorian_fa"
     * <Calendar locale={gregorian_fa} />
     *
     * import gregorian_ar from "react-date-object/locales/gregorian_ar"
     * <DatePicker locale={gregorian_ar} />
     */
    locale?: Locale;
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
    weekDays?: string[] | Array<string[]>;
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
    months?: string[] | Array<string[]>;
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
    onChange?(selectedDates: DateObject | DateObject[] | null): void | false;
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
    }):
      | (HTMLAttributes<HTMLSpanElement> & {
          disabled?: boolean;
          hidden?: boolean;
        })
      | void;
    disableMonthPicker?: boolean;
    disableYearPicker?: boolean;
    /**
     * @example
     * <DatePicker
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
    plugins?: (Plugin | Plugin[])[];

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
    onYearChange?(date: DateObject): void;
    onFocusedDateChange?(
      focusedDate: DateObject | undefined,
      clickedDate: DateObject | undefined
    ): void;
    readOnly?: boolean;
    disabled?: boolean;
    hideMonth?: boolean;
    hideYear?: boolean;
    hideWeekDays?: boolean;
    shadow?: boolean;
    fullYear?: boolean;
    displayWeekNumbers?: boolean;
    weekNumber?: string;
    weekPicker?: boolean;
    rangeHover?: boolean;
    monthYearSeparator?: string;
    formatMonth?: (month: string, year: string) => string;
    formatYear?: (year: string, month: string) => string;
    highlightToday?: boolean;
    headerOrder?: Array<HeaderItem>;
  }

  export interface DatePickerProps {
    arrow?: boolean | React.ReactElement;
    arrowClassName?: string;
    arrowStyle?: React.CSSProperties;
    /**
     * Input name.
     * This feature does not work if you render custom input.
     */
    name?: string;
    id?: string;
    title?: string;
    required?: boolean;
    /**
     * Input placeholder.
     * This feature does not work if you render custom input.
     */
    placeholder?: string;
    /**
     * Input style.
     * This feature does not work if you render custom input.
     */
    style?: React.CSSProperties;
    /**
     * This feature does not work if you render custom input.
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
     * This feature does not work if you render custom input.
     */
    disabled?: boolean;
    /**
     * @example
     * <DatePicker
     *   render={<CustomComponent/>}
     * />
     */
    render?:
      | React.ReactElement<CustomComponentProps>
      | ((
          value: string,
          openCalendar: () => void,
          handleValueChange: (e: React.ChangeEvent) => void,
          locale: Locale,
          separator: string
        ) => React.ReactNode);
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
    animations?: Function[];
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
    mobileLabels?: { OK: string; CANCEL: string };
    portal?: boolean;
    portalTarget?: HTMLElement;
    onOpenPickNewDate?: boolean;
    mobileButtons?: Array<
      HTMLAttributes<HTMLButtonElement> & { label: string }
    >;
    onChange?(
      date: DateObject | DateObject[] | null,
      options: {
        validatedValue: string | Array<string>;
        input: HTMLElement;
        isTyping: boolean;
      }
    ): void | false;
    dateSeparator?: string;
    multipleRangeSeparator?: string;
    type?: string;
    typingTimeout?: number;
  }

  export { DateObject };
  export function Calendar(props: CalendarProps): React.ReactElement;
  export function getAllDatesInRange(
    range: DateObject[],
    toDate?: boolean
  ): DateObject[] | Date[];
  export function toDateObject(
    date: Date,
    calendar?: Calendar,
    format?: string
  ): DateObject;
  export default function DatePicker(
    props: Omit<CalendarProps, "onChange"> & DatePickerProps
  ): React.ReactElement;

  type SetDateProps = {
    date?: DateObject;
    year?: number;
    month?: number;
    months?: Array<string[]>;
    weekDays?: Array<string[]>;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    calendar?: Calendar;
    locale?: Locale;
    format?: string;
    ignoreList?: string[];
    digits?: string[];
  };

  function set<K extends keyof SetDateProps = keyof SetDateProps>(
    key: K,
    value: SetDateProps[K]
  ): void;

  export type CalendarRef = HTMLDivElement & { set: typeof set };

  export type DatePickerRef = HTMLDivElement & {
    openCalendar: () => void;
    closeCalendar: () => void;
    refreshPosition: () => void;
  };
}

declare module "react-multi-date-picker/plugins/date_panel" {
  import React, { HTMLAttributes } from "react";
  import DateObject from "react-date-object";

  interface DatePanelProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    position?: string;
    disabled?: boolean;
    eachDaysInRange?: boolean;
    sort?: string;
    style?: React.CSSProperties;
    className?: string;
    onClickDate?(date: DateObject | undefined): void;
    removeButton?: boolean;
    header?: string;
    markFocused?: boolean;
    focusedClassName?: string;
    formatFunction?(object: {
      date: DateObject | undefined;
      format: string;
      index: number;
    }): React.ReactNode;
  }

  export default function DatePanel(props: DatePanelProps): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/date_picker_header" {
  import React, { HTMLAttributes } from "react";
  import type { Calendar, Locale } from "react-date-object";

  interface DatePickerHeaderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    position?: string;
    disabled?: boolean;
    size?: string;
    calendar?: Calendar;
    locale?: Locale;
    className?: string;
  }

  export default function DatePickerHeader(
    props: DatePickerHeaderProps
  ): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/colors" {
  import { HTMLAttributes } from "react";
  import type { Plugin } from "react-multi-date-picker";

  interface ColorsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    position?: string;
    disabled?: boolean;
    colors?: string[];
    defaultColor?: string;
    className?: string;
  }

  export default function colors(object?: ColorsProps): Plugin[];
}

declare module "react-multi-date-picker/plugins/settings" {
  import React, { HTMLAttributes } from "react";

  interface SettingsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
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
  import React, { HTMLAttributes } from "react";

  interface ToolbarProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    position?: string;
    disabled?: boolean;
    className?: string;
    sort?: string[];
    names?: { today: string; deselect: string; close: string };
  }

  export default function Toolbar(props: ToolbarProps): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/highlight_weekends" {
  export default function highlightWeekends(weekends?: number[]): {
    type: string;
    fn: Function;
  };
}

declare module "react-multi-date-picker/plugins/time_picker" {
  import React, { HTMLAttributes } from "react";

  interface TimePickerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    position?: string;
    disabled?: boolean;
    hideSeconds?: boolean;
    /**
     * If the calendar is in multiple or range mode,
     * and the time picker position is right or left,
     * a select with the default format (YYYY/MM/DD)
     * will be added to the time picker.
     * So, you can change the format of the select with this prop.
     */
    format?: string;
    header?: boolean;
    hStep?: number;
    mStep?: number;
    sStep?: number;
  }

  export default function TimePicker(
    props: TimePickerProps
  ): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/analog_time_picker" {
  import React from "react";

  interface TimePickerProps {
    position?: string;
    disabled?: boolean;
    hideSeconds?: boolean;
    /**
     * If the calendar is in multiple or range mode,
     * and the time picker position is right or left,
     * a select with the default format (YYYY/MM/DD)
     * will be added to the time picker.
     * So, you can change the format of the select with this prop.
     */
    format?: string;
    hStep?: number;
    mStep?: number;
    sStep?: number;
  }

  export default function AnalogTimePicker(
    props: TimePickerProps
  ): React.ReactElement;
}

declare module "react-multi-date-picker/plugins/range_picker_footer" {
  import React from "react";

  interface FooterProps {
    position?: string;
    disabled?: boolean;
    format?: string;
    names?: {
      selectedDates: string;
      from: string;
      to: string;
      selectDate: string;
      close: string;
      separator: string;
    };
  }

  export default function Footer(props: FooterProps): React.ReactElement;
}

declare module "react-multi-date-picker/components/button" {
  import React, { HTMLAttributes } from "react";

  export default function Buttons(
    props: HTMLAttributes<HTMLButtonElement>
  ): React.ReactElement;
}

declare module "react-multi-date-picker/components/input_icon" {
  import React, { HTMLAttributes } from "react";

  export default function InputIcon(
    props: HTMLAttributes<HTMLInputElement>
  ): React.ReactElement;
}

declare module "react-multi-date-picker/components/icon" {
  import React, { SVGAttributes } from "react";

  export default function Icon(
    props: SVGAttributes<SVGElement>
  ): React.ReactElement;
}
