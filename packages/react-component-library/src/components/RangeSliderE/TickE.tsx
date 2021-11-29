import React, { useMemo } from 'react'
import { SliderItem } from 'react-compound-slider'

import { useThresholdColor } from './useThresholdColor'
import { StyledLabel } from './partials/StyledLabel'
import { StyledMarker } from './partials/StyledMarker'

export interface TickEProps {
  tick: SliderItem
  count: number
  hasLabels?: boolean
  hasMarkers?: boolean
  values: ReadonlyArray<number>
  domain: ReadonlyArray<number>
  isReversed?: boolean
  thresholds?: number[]
}

function isActive(values: ReadonlyArray<number>, tickValue: number): boolean {
  return values.some((item) => item >= tickValue)
}

export const TickE: React.FC<TickEProps> = ({
  tick,
  count,
  hasLabels,
  hasMarkers,
  values,
  domain,
  isReversed,
  thresholds,
}) => {
  const percent: number = useMemo(
    () => (isReversed ? 100 - tick.percent : tick.percent),
    [tick.percent, isReversed]
  ) // invert if reversed

  const tickValue: number = useMemo(
    () => (domain[1] / 100) * percent,
    [domain, percent]
  )

  const thresholdColor = useThresholdColor(percent, thresholds)

  const showMarker = percent === 0 || percent === 100 || hasMarkers

  return (
    <div data-testid="rangeslider-tick">
      {showMarker && (
        <StyledMarker
          $left={`${tick.percent}%`}
          $isActive={isActive(values, tickValue)}
          $thresholdColor={thresholdColor}
          data-testid="rangeslider-marker"
        />
      )}
      {hasLabels && (
        <StyledLabel
          $marginLeft={`${-(100 / count) / 2}%`}
          $width={`${100 / count}%`}
          $left={`${tick.percent}%`}
          data-testid="rangeslider-label"
        >
          {tick.value}
        </StyledLabel>
      )}
    </div>
  )
}

TickE.displayName = 'TickE'
