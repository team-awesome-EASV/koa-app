import { today } from "@quasar/quasar-ui-qcalendar/src/index";

export default {
  calendarView: "month",
  selectedDate: today(),
  locale: "pl",
  maxDays: 1,
  weekdays: [1, 2, 3, 4, 5, 6, 0],
  bordered: true,
  fiveDayWorkWeek: false,
  firstDayMonday: true,
  shortMonthLabel: false,
  showDayOfYearLabel: false,
  shortWeekdayLabel: false,
  shortIntervalLabel: false,
  hour24Format: false,
  hideHeader: false,
  noScroll: false,
  showMonthLabel: true,
  showWorkWeeks: false,
  noDefaultHeaderBtn: false,
  noDefaultHeaderText: false,
  intervalRange: { min: 0, max: 24 },
  intervalRangeStep: 1,
  intervalHeight: 60,
  resourceHeight: 60,
  resourceWidth: 100,
  dayHeight: 100,
  enableTheme: true,
  theme: {
    name: "deafult",
    backgroundBodyOutside: "rgba(64,100,159, .1)",

    colorDayLabelCurrent: "accent"
  },
  titlebarHeight: 0
};
