import { format, parseJSON } from 'date-fns'

export const formatDateString = (date: string) => {
  // 2022-08-02T20:05:30.908Z
  const parsedDate = parseJSON(date)
  return format(parsedDate, 'MMM do, yyyy')
}

export const formatMonthYear = (month: number, year: number): string => {
  const date = new Date()
  date.setMonth(month - 1)
  date.setFullYear(year)
  return format(date, 'MMM Y')
}

