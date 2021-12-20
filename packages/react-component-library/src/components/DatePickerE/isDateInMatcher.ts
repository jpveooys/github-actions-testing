import { isAfter, isBefore, isSameDay, min, max, startOfDay } from 'date-fns'
import { Matcher } from 'react-day-picker-v8'

function isDateInSingleMatcher(date: Date, matcher: Matcher) {
  if (typeof matcher === 'boolean') {
    return matcher
  }

  if (matcher instanceof Date) {
    return isSameDay(date, matcher)
  }

  if (Array.isArray(matcher)) {
    return matcher.some((disabledDate) => isSameDay(date, disabledDate))
  }

  if (typeof matcher === 'function') {
    return matcher(date)
  }

  if ('after' in matcher) {
    const isDateAfter = isAfter(date, startOfDay(matcher.after))

    if ('before' in matcher) {
      return isDateAfter && isBefore(date, startOfDay(matcher.before))
    }
    return isDateAfter
  }

  if ('before' in matcher) {
    return isBefore(date, startOfDay(matcher.before))
  }

  if ('from' in matcher) {
    if ('to' in matcher) {
      const rangeStart = min([matcher.from, matcher.to])
      const rangeEnd = max([matcher.from, matcher.to])
      return !(
        isBefore(date, startOfDay(rangeStart)) ||
        isAfter(date, startOfDay(rangeEnd))
      )
    }

    return !isBefore(date, startOfDay(matcher.from))
  }

  if ('dayOfWeek' in matcher) {
    return matcher.dayOfWeek.includes(date.getDay())
  }

  // Should never happen
  throw new Error(`Unknown matcher encountered: ${matcher}`)
}

// Temporary workaround while this functionality isn't
// exposed by react-day-picker
export function isDateInMatcher(
  date: Date,
  matcher: Matcher | Matcher[]
): boolean {
  const matchersArray = Array.isArray(matcher) ? matcher : [matcher]
  return matchersArray.some((matcherItem) =>
    isDateInSingleMatcher(startOfDay(date), matcherItem)
  )
}
