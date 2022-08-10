import { expect, test} from '@jest/globals'
import * as helpers from './helpers'

test('formatDateString', () => {
  const actual = helpers.formatDateString('2022-08-02T20:05:30.908Z')
  expect(actual).toBe('Aug 2nd, 2022')
})

test('formatMonthYear', () => {
  const actual = helpers.formatMonthYear(8, 2022)
  expect(actual).toBe('Aug 2022')
})

