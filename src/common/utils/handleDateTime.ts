import {
  DateTimeFormatter,
  ZoneId,
  ZonedDateTime,
  convert,
} from '@js-joda/core'
import '@js-joda/timezone'
import { IHandleDateTime } from '@common/interfaces/IHandleDateTime'

export class HandleDateTime implements IHandleDateTime {
  private readonly DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd')

  private getNowZonedTime(): ZonedDateTime {
    return ZonedDateTime.now(ZoneId.of('Asia/Seoul'))
  }

  getToday = () => this.getNowZonedTime().format(this.DATE_FORMATTER)

  getYesterday = () =>
    this.getNowZonedTime().minusDays(1).format(this.DATE_FORMATTER)

  getAWeekAgo = () =>
    this.getNowZonedTime().minusWeeks(1).format(this.DATE_FORMATTER)

  getAMonthAgo = () =>
    this.getNowZonedTime().minusMonths(1).format(this.DATE_FORMATTER)

  getFewSecondsLater = (seconds: number) =>
    convert(this.getNowZonedTime().plusSeconds(seconds)).toDate()

  getFewHoursLater = (hours: number) =>
    convert(this.getNowZonedTime().plusHours(hours)).toDate()

  getFewDaysLater = (days: number) =>
    convert(this.getNowZonedTime().plusDays(days)).toDate()

  getDateString = (date: Date) =>
    ZonedDateTime.parse(date.toISOString()).format(this.DATE_FORMATTER)

  getADayAgoFromDate = (date: Date) =>
    ZonedDateTime.parse(date.toISOString())
      .minusDays(1)
      .format(this.DATE_FORMATTER)
}
