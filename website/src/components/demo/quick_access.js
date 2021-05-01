const list = [
  {
    name: "Installation & Usage",
    path: "installation/",
    list: [
      {
        name: "npm",
        path: "installation/#npm",
      },
      {
        name: "yarn",
        path: "installation/#yarn",
      },
      {
        name: "Basic Import",
        path: "installation/#basic-import",
      },
      {
        name: "Important Notes",
        path: "installation/#important-notes",
      },
      {
        name: "DatePicker",
        path: "installation/#datepicker",
      },
      {
        name: "Calendar",
        path: "installation/#calendar",
      },
      {
        name: "DateObject",
        path: "installation/#dateobject",
      },
    ],
  },
  {
    name: "TypeScript",
    path: "typescript/",
    list: [
      {
        name: "Usage",
        path: "typescript/#usage",
      },
      {
        name: "Adding Ref to Calendar & DatePicker",
        path: "typescript/#adding-ref-to-calendar-&-datepicker",
      },
    ],
  },
  {
    name: "Props",
    path: "props/",
  },
  {
    name: "Formatting Tokens",
    path: "format-tokens/",
  },
  {
    name: "Calendars & Locales",
    path: "calendars/",
    list: [
      {
        name: "Calendars",
        path: "calendars/#calendars",
      },
      {
        name: "Locales",
        path: "calendars/#locales",
      },
      {
        name: "Descriptions",
        path: "calendars/#descriptions",
      },
      {
        name: "Default Calendar",
        path: "calendars/#default-calendar",
      },
      {
        name: "Default DatePicker",
        path: "calendars/#default-datepicker",
      },
      {
        name: "Persian calendar with Farsi locale",
        path: "calendars/#persian-calendar-with-farsi-locale",
      },
      {
        name: "Persian DatePicker",
        path: "calendars/#persian-datepicker",
      },
      {
        name: "Arabic calendar with Arabic locale",
        path: "calendars/#arabic-calendar-with-arabic-locale",
      },
      {
        name: "Indian calendar with Indian locale",
        path: "calendars/#indian-calendar-with-indian-locale",
      },
      {
        name: "Persian datepicker with English locale",
        path: "calendars/#persian-datepicker-with-english-locale",
      },
    ],
  },
  {
    name: "DateObject",
    path: "date-object",
    list: [
      {
        name: "Descriptions",
        path: "date-object/#descriptions",
      },
      {
        name: "Current Moment",
        path: "date-object/#current-moment",
      },
      {
        name: "Persian Calendar (Solar Hijri)",
        path: "date-object/#persian-calendar-(solar-hijri)",
      },
      {
        name: "Arabic Calendar (islamic hijri)",
        path: "date-object/#arabic-calendar-(islamic-hijri)",
      },
      {
        name: "Indian Calendar",
        path: "date-object/#indian-calendar",
      },
      {
        name: "Table of most used properties",
        path: "date-object/#table-of-most-used-properties",
      },
      {
        name: "New DateObject From String",
        path: "date-object/#new-dateobject-from-string",
      },
      {
        name: "New DateObject from javascript Date",
        path: "date-object/#new-dateobject-from-javascript-date",
      },
      {
        name: "Persian DateObject from javascript Date",
        path: "date-object/#persian-dateobject-from-javascript-date",
      },
      {
        name: "New DateObject From Numbers",
        path: "date-object/#new-dateobject-from-numbers",
      },
      {
        name: "New DateObject from Unix Timestamp",
        path: "date-object/#new-dateobject-from-unix-timestamp",
      },
      {
        name: "Persian Calendar to Arabic Calendar",
        path: "date-object/#persian-calendar-to-arabic-calendar",
      },
      {
        name: "Arabic Calendar to Persian Calendar",
        path: "date-object/#arabic-calendar-to-persian-calendar",
      },
      {
        name: "Gregorian Calendar to Indian Calendar",
        path: "date-object/#gregorian-calendar-to-indian-calendar",
      },
    ],
  },
  {
    name: "Component with Children",
    path: "children/",
    list: [
      {
        name: "Calendar With Children",
        path: "children/#calendar-with-children",
      },
      {
        name: "DatePicker With Children",
        path: "children/#datepicker-with-children",
      },
    ],
  },
  {
    name: "Multiple Mode",
    path: "multiple/",
    list: [
      {
        name: "Multiple Mode",
        path: "multiple/#multiple-mode",
      },
      {
        name: "DatePanel",
        path: "multiple/#datepanel",
      },
      {
        name: "Sorting Dates",
        path: "multiple/#sorting-dates",
      },
      {
        name: "Multiple Month Picker",
        path: "multiple/#multiple-month-picker",
      },
      {
        name: "Multiple Year Picker",
        path: "multiple/#multiple-year-picker",
      },
    ],
  },
  {
    name: "Range Mode",
    path: "range/",
    list: [
      {
        name: "Range Mode",
        path: "range/#range-mode",
      },
      {
        name: "DatePanel",
        path: "range/#datepanel",
      },
      {
        name: "Displaying Each Days In Range",
        path: "range/#displaying-each-days-in-range",
      },
      {
        name: "Range Month Picker",
        path: "range/#range-month-picker",
      },
      {
        name: "Range Year Picker",
        path: "range/#range-year-picker",
      },
    ],
  },
  {
    name: "Other Pickers",
    path: "other-pickers/",
    list: [
      {
        name: "Time Picker",
        path: "other-pickers/#time-picker",
      },
      {
        name: "Only Time Picker",
        path: "other-pickers/#only-time-picker",
      },
      {
        name: "Only Time Picker Meridiem",
        path: "other-pickers/#only-time-picker-meridiem",
      },
      {
        name: "Only Month Picker",
        path: "other-pickers/#only-month-picker",
      },
      {
        name: "Only Month Picker With Different Format",
        path: "other-pickers/#only-month-picker-with-different-format",
      },
      {
        name: "Only Year Picker",
        path: "other-pickers/#only-year-picker",
      },
    ],
  },
  {
    name: "Multiple Months",
    path: "multiple-months/",
    list: [
      {
        name: "Single Mode",
        path: "multiple-months/#single-mode",
      },
      {
        name: "Multiple Mode",
        path: "multiple-months/#multiple-mode",
      },
      {
        name: "Range Mode",
        path: "multiple-months/#range-mode",
      },
    ],
  },
  {
    name: "Min & Max Date",
    path: "min-&-max-date/",
    list: [
      {
        name: "Min & Max Date",
        path: "min-&-max-date/#min-&-max-date",
      },
      {
        name: "String",
        path: "min-&-max-date/#string",
      },
      {
        name: "Only MinDate",
        path: "min-&-max-date/#only-mindate",
      },
      {
        name: "Only MaxDate",
        path: "min-&-max-date/#only-maxdate",
      },
    ],
  },
  {
    name: "Events",
    path: "events/",
    list: [
      {
        name: "onChange (single mode)",
        path: "events/#on-change-(single-mode)",
      },
      {
        name: "onChange (multiple mode)",
        path: "events/#on-change-(multiple-mode)",
      },
      {
        name: "onOpen",
        path: "events/#onopen",
      },
      {
        name: "onClose",
        path: "events/#onclose",
      },
      {
        name: "onPositionChange",
        path: "events/#onpositionchange",
      },
      {
        name: "onPropsChange",
        path: "events/#onpropschange",
      },
      {
        name: "onMonthChange",
        path: "events/#onmonthchange",
      },
    ],
  },
  {
    name: "Custom Digits, Months & WeekDays",
    path: "locales/",
    list: [
      {
        name: "Digits",
        path: "locales/#digits",
      },
      {
        name: "Week Days #1",
        path: "locales/#week-days-#1",
      },
      {
        name: "Week Days #2",
        path: "locales/#week-days-#2",
      },
      {
        name: "Months #1",
        path: "locales/#months-#1",
      },
      {
        name: "Months #2",
        path: "locales/#months-#2",
      },
      {
        name: "Format Months & WeekDays",
        path: "locales/#format-months-&-weekdays",
      },
    ],
  },
  {
    name: "Types & Custom Input",
    path: "types/",
    list: [
      {
        name: "Types",
        path: "types/#types",
      },
      {
        name: "Input",
        path: "types/#input",
      },
      {
        name: "Button",
        path: "types/#button",
      },
      {
        name: "Input-Icon",
        path: "types/#input-icon",
      },
      {
        name: "Icon",
        path: "types/#icon",
      },
      {
        name: "Custom (function)",
        path: "types/#custom-(function)",
      },
      {
        name: "Custom (component)",
        path: "types/#custom-(component)",
      },
      {
        name: "Custom (input)",
        path: "types/#custom-(input)",
      },
      {
        name: "Multiple & Range",
        path: "types/#multiple-&-range",
      },
      {
        name: "Custom (multiple mode)",
        path: "types/#custom-(multiple-mode)",
      },
      {
        name: "Custom (range mode)",
        path: "types/#custom-(range-mode)",
      },
    ],
  },
  {
    name: "Customizing Calendar Days",
    path: "map-days/",
    list: [
      {
        name: "Descriptions",
        path: "map-days/#descriptions",
      },
      {
        name: "Styling Days",
        path: "map-days/#styling-days",
      },
      {
        name: "Styling Weekends",
        path: "map-days/#styling-weekends",
      },
      {
        name: "Custom Highlight",
        path: "map-days/#custom-highlight",
      },
      {
        name: "Disabling Days",
        path: "map-days/#disabling-days",
      },
      {
        name: "Hiding Days",
        path: "map-days/#hiding-days",
      },
      {
        name: "Adding Tiltle to Days",
        path: "map-days/#adding-tiltle-to-days",
      },
    ],
  },
  {
    name: "Customizing Navigate Buttons",
    path: "buttons/",
    list: [
      {
        name: "Disabling Navigate Buttons",
        path: "buttons/#disabling-navigate-buttons",
      },
      {
        name: "Custom (function)",
        path: "buttons/#custom-(function)",
      },
      {
        name: "Custom (component)",
        path: "buttons/#custom-(component)",
      },
    ],
  },
  {
    name: "Calendar Position",
    path: "positions/",
    list: [
      {
        name: "Descriptions",
        path: "positions/#descriptions",
      },
      {
        name: "Calendar Position",
        path: "positions/#calendar-position",
      },
      {
        name: "Important Points",
        path: "positions/#important-points",
      },
      {
        name: "Example",
        path: "positions/#example",
      },
      {
        name: "Another Examples",
        path: "positions/#another-examples",
      },
    ],
  },
  {
    name: "DatePicker & Calendar Ref",
    path: "ref/",
    list: [
      {
        name: "Descriptions",
        path: "ref/#descriptions",
      },
      {
        name: "Opene & Close Calendar By DatePicker Ref",
        path: "ref/#opene-&-close-calendar-by-datepicker-ref",
      },
      {
        name: "Refresh Position",
        path: "ref/#refresh-position",
      },
      {
        name: "Manually Set Year And Month In Calendar",
        path: "ref/#manually-set-year-and-month-in-calendar",
      },
    ],
  },
  {
    name: "Appearance",
    path: "appearance/",
    list: [
      {
        name: "Prime",
        path: "appearance/#prime",
      },
      {
        name: "Mobile",
        path: "appearance/#mobile",
      },
    ],
  },
  {
    name: "Colors & Backgrounds",
    path: "colors/",
    list: [
      {
        name: "Green",
        path: "colors/#green",
      },
      {
        name: "Red",
        path: "colors/#red",
      },
      {
        name: "Yellow",
        path: "colors/#yellow",
      },
      {
        name: "Purple",
        path: "colors/#purple",
      },
      {
        name: "Teal",
        path: "colors/#teal",
      },
      {
        name: "Background Dark",
        path: "colors/#background-dark",
      },
      {
        name: "Background Gray",
        path: "colors/#background-gray",
      },
      {
        name: "Background Brown",
        path: "colors/#background-brown",
      },
    ],
  },
  {
    name: "ClassNames & Styles",
    path: "classes-&-styles/",
    list: [
      {
        name: "Adding ClassName To Refrence Element (input)",
        path: "classes-&-styles/#adding-classname-to-refrence-element-(input)",
      },
      {
        name: "Adding Style To Refrence Element (input)",
        path: "classes-&-styles/#adding-style-to-refrence-element-(input)",
      },
      {
        name: "Adding ClassName To Popper Element (calendar)",
        path: "classes-&-styles/#adding-classname-to-popper-element-(calendar)",
      },
      {
        name: "Adding Style To Arrow",
        path: "classes-&-styles/#adding-style-to-arrow",
      },
      {
        name: "Adding ClassName To Arrow",
        path: "classes-&-styles/#adding-classname-to-arrow",
      },
      {
        name: "Adding Style To DatePicker Container",
        path: "classes-&-styles/#adding-style-to-datepicker-container",
      },
      {
        name: "Adding ClassName To DatePicker Container",
        path: "classes-&-styles/#adding-classname-to-datepicker-container",
      },
    ],
  },
  {
    name: "Custom Arrow",
    path: "arrow/",
    list: [
      {
        name: "Descriptions",
        path: "arrow/#descriptions",
      },
      {
        name: "Disable Arrow",
        path: "arrow/#disable-arrow",
      },
      {
        name: "Custom Arrow",
        path: "arrow/#custom-arrow",
      },
    ],
  },
  {
    name: "Other Examples",
    path: "other-examples/",
    list: [
      {
        name: "Opening Calendar On The Specified Date",
        path: "other-examples/#current-date",
      },
      {
        name: "Manually Set Year And Month In DatePicker",
        path: "other-examples/#manually-set-year-and-month-in-datepicker",
      },
      {
        name: "Changing Start Day Of The Week",
        path: "other-examples/#changing-start-day-of-the-week",
      },
      {
        name: "Animation",
        path: "other-examples/#animation",
      },
      {
        name: "Other Days",
        path: "other-examples/#other-days",
      },
      {
        name: "Disabling Scroll Sensitivity",
        path: "other-examples/#disabling-scroll-sensitivity",
      },
      {
        name: "Hide On Scroll",
        path: "other-examples/#hide-on-scroll",
      },
      {
        name: "Ignore Formatting",
        path: "other-examples/#ignore-formatting",
      },
      {
        name: "Disable Virtual Keyboard",
        path: "other-examples/#disable-virtual-keyboard",
      },
      {
        name: "Disable Editing",
        path: "other-examples/#disable-editing",
      },
      {
        name: "Placeholder",
        path: "other-examples/#placeholder",
      },
      {
        name: "Disable Year Picker",
        path: "other-examples/#disable-year-picker",
      },
      {
        name: "Disable Month Picker",
        path: "other-examples/#disable-month-picker",
      },
      {
        name: "Disabled Input",
        path: "other-examples/#disabled-input",
      },
      {
        name: "Disabled Button",
        path: "other-examples/#disabled-button",
      },
    ],
  },
  {
    name: "Plugins",
    path: "plugins/",
    list: [
      {
        name: "Usage",
        path: "plugins/usage/",
        list: [
          {
            name: "Availble Plugins",
            path: "plugins/usage/#availble-plugins",
          },
          {
            name: "Positions",
            path: "plugins/usage/#positions",
          },
        ],
      },
      {
        name: "Date Picker Header",
        path: "plugins/header/",
        list: [
          {
            name: "Props",
            path: "plugins/header/#props",
          },
          {
            name: "Sizes",
            path: "plugins/header/#sizes",
          },
          {
            name: "Header Right",
            path: "plugins/header/#header-right",
          },
          {
            name: "Header Left",
            path: "plugins/header/#header-left",
          },
          {
            name: "English Calendar with Indian Header",
            path: "plugins/header/#english-calendar-with-indian-header",
          },
          {
            name: "Styling Header",
            path: "plugins/header/#styling-header",
          },
        ],
      },
      {
        name: "Date Panel",
        path: "plugins/panel/",
        list: [
          {
            name: "Props",
            path: "plugins/panel/#props",
          },
          {
            name: "Sort",
            path: "plugins/panel/#sort",
          },
          {
            name: "Sort By Date",
            path: "plugins/panel/#sort-by-date",
          },
          {
            name: "Position Left",
            path: "plugins/panel/#position-left",
          },
          {
            name: "Without Remove Button",
            path: "plugins/panel/#without-remove-button",
          },
          {
            name: "Date Click Listener",
            path: "plugins/panel/#date-click-listener",
          },
          {
            name: "Custom Header Name",
            path: "plugins/panel/#custom-header-name",
          },
          {
            name: "Customizing Focused Date",
            path: "plugins/panel/#customizing-focused-date",
          },
        ],
      },
      {
        name: "Multi Colors",
        path: "plugins/colors/",
        list: [
          {
            name: "Props",
            path: "plugins/colors/#props",
          },
          {
            name: "Default Color",
            path: "plugins/colors/#default-color",
          },
          {
            name: "With DatePanel",
            path: "plugins/colors/#with-datepanel",
          },
        ],
      },
      {
        name: "Settings",
        path: "plugins/settings/",
        list: [
          {
            name: "Props",
            path: "plugins/settings/#props",
          },
          {
            name: "Settings Bottom",
            path: "plugins/settings/#settings-bottom",
          },
          {
            name: "Custom Settings",
            path: "plugins/settings/#custom-settings",
          },
          {
            name: "Other Pickers",
            path: "plugins/settings/#other-pickers",
          },
        ],
      },
      {
        name: "Weekends",
        path: "plugins/weekends/",
        list: [
          {
            name: "Props",
            path: "plugins/weekends/#props",
          },
          {
            name: "Default Weekends",
            path: "plugins/weekends/#default-weekends",
          },
          {
            name: "Weekends: gregorian",
            path: "plugins/weekends/#weekends:-gregorian",
          },
          {
            name: "Weekends: persian",
            path: "plugins/weekends/#weekends:-persian",
          },
          {
            name: "Weekends: custom",
            path: "plugins/weekends/#weekends:-custom",
          },
        ],
      },
      {
        name: "Toolbar",
        path: "plugins/toolbar/",
        list: [
          {
            name: "Props",
            path: "plugins/toolbar/#props",
          },
          {
            name: "Default Toolbar",
            path: "plugins/toolbar/#default-toolbar",
          },
          {
            name: "Sorting Buttons",
            path: "plugins/toolbar/#sorting-buttons",
          },
          {
            name: "Custom Names",
            path: "plugins/toolbar/#custom-names",
          },
        ],
      },
      {
        name: "Time Picker",
        path: "plugins/time-picker/",
        list: [
          {
            name: "Descriptions",
            path: "plugins/time-picker/#descriptions",
          },
          {
            name: "Using TimePicker in Multiple Mode",
            path: "plugins/time-picker/#using-timepicker-in-multiple-mode",
          },
          {
            name: "Using TimePicker in Range Mode",
            path: "plugins/time-picker/#using-timepicker-in-multiple-mode",
          },
        ],
      },
      {
        name: "Range Picker Footer",
        path: "plugins/range-picker-footer/",
        list: [
          {
            name: "Descriptions",
            path: "plugins/range-picker-footer/#descriptions",
          },
          {
            name: "Props",
            path: "plugins/range-picker-footer/#props",
          },
          {
            name: "Default Range Picker Footer",
            path: "plugins/range-picker-footer/#default-range-picker-footer",
          },
          {
            name: "Custom Names",
            path: "plugins/range-picker-footer/#custom-names",
          },
        ],
      },
    ],
  },
];

export default list;
