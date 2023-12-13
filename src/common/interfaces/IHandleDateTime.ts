import { ZonedDateTime } from '@js-joda/core'

export interface IHandleDateTime {
  getToday: () => string

  getYesterday: () => string

  getAWeekAgo: () => string

  getAMonthAgo: () => string

  getFewSecondsLater: (seconds: number) => Date

  getFewHoursLater: (hours: number) => Date

  getFewDaysLater: (days: number) => Date

  getDateString: (date: Date) => string

  getADayAgoFromDate: (date: Date) => string

  getYear: (date: Date) => number

  getMonth: (date: Date) => number

  getMonthDate: (year: number, month: number) => ZonedDateTime

  getEndOfMonth: (date: Date) => Date

  getRemainingDays: (today: Date, endOfMonth: Date) => number

  getYearMonth: (monthString: string) => ZonedDateTime

  convertZonedDateTimeToDate: (zonedDateTime: ZonedDateTime) => Date
}
