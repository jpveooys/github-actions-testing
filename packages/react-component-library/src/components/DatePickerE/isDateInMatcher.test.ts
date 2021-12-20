import { parseISO } from 'date-fns'

import { isDateInMatcher } from './isDateInMatcher'

describe('isDateInMatcher', () => {
  it.each([
    {
      name: 'single date',
      matcher: parseISO('2021-01-02T-11:00:00Z'),
    },
    {
      name: 'list of dates',
      matcher: [
        parseISO('2021-01-02T-11:00:00Z'),
        parseISO('2021-01-03T-11:00:00Z'),
      ],
    },
    {
      name: 'before range',
      matcher: {
        before: parseISO('2021-01-03T-11:00:00Z'),
      },
    },
    {
      name: 'after range',
      matcher: {
        after: parseISO('2021-01-01T-11:00:00Z'),
      },
    },
    {
      name: 'from range',
      matcher: {
        from: parseISO('2021-01-01T-11:00:00Z'),
      },
    },
    {
      name: 'from and to range',
      matcher: {
        from: parseISO('2021-01-01T-11:00:00Z'),
        to: parseISO('2021-01-05T-11:00:00Z'),
      },
    },
    {
      name: 'reverse from and to range',
      matcher: {
        from: parseISO('2021-01-05T-11:00:00Z'),
        to: parseISO('2021-01-01T-11:00:00Z'),
      },
    },
    {
      name: 'boolean',
      matcher: true,
    },
    {
      name: 'function',
      matcher: () => true,
    },
    {
      name: 'list of days of week',
      matcher: { dayOfWeek: [5, 6] },
    },
  ])('matches a $name', ({ matcher }) => {
    const date = parseISO('2021-01-02T-21:00:00Z')
    expect(isDateInMatcher(date, matcher)).toBeTruthy()
  })

  it.each([
    {
      name: 'single date',
      matcher: parseISO('2021-01-02T-11:00:00Z'),
    },
    {
      name: 'list of dates',
      matcher: [
        parseISO('2021-01-02T-11:00:00Z'),
        parseISO('2021-01-03T-11:00:00Z'),
      ],
    },
    {
      name: 'before range',
      matcher: {
        before: parseISO('2021-01-03T-11:00:00Z'),
      },
    },
    {
      name: 'after range',
      matcher: {
        after: parseISO('2023-02-02T-11:00:00Z'),
      },
    },
    {
      name: 'from range',
      matcher: {
        from: parseISO('2023-02-02T-11:00:00Z'),
      },
    },
    {
      name: 'from and to range',
      matcher: {
        from: parseISO('2023-02-02T-11:00:00Z'),
        to: parseISO('2023-02-05T-11:00:00Z'),
      },
    },
    {
      name: 'reverse from and to range',
      matcher: {
        from: parseISO('2023-02-05T-11:00:00Z'),
        to: parseISO('2023-02-02T-11:00:00Z'),
      },
    },
    {
      name: 'boolean',
      matcher: false,
    },
    {
      name: 'function',
      matcher: () => false,
    },
    {
      name: 'list of days of week',
      matcher: { dayOfWeek: [3, 4] },
    },
  ])('does not match a $name', ({ matcher }) => {
    const date = parseISO('2021-02-12T-21:00:00Z')
    expect(isDateInMatcher(date, matcher)).toBeFalsy()
  })

  it('matches an array of matchers', () => {
    const date = parseISO('2021-02-12T-21:00:00Z')
    const matchers = [() => false, () => true]

    expect(isDateInMatcher(date, matchers)).toBeTruthy()
  })

  it('does not match an array of matchers', () => {
    const date = parseISO('2021-02-12T-21:00:00Z')
    const matchers = [() => false, () => false]

    expect(isDateInMatcher(date, matchers)).toBeFalsy()
  })
})
