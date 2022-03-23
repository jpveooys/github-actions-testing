import styled, { css } from 'styled-components'
import { selectors } from '@defencedigital/design-tokens'

import { StyledCheckmark } from './StyledCheckmark'
import { CheckboxRootProps } from '../../CheckboxRadioBase'

const RADIO_ACTIVE_BORDER_WIDTH = '2px'

const { spacing, fontSize, color } = selectors

const BackgroundColor = css<CheckboxRootProps>`
  ${({ $isDisabled, $hasContainer, $isChecked }) => {
    if ($isDisabled) {
      return color('neutral', '000')
    }

    if ($hasContainer && $isChecked) {
      return color('action', '000')
    }

    return color('neutral', 'white')
  }}
`

const CheckmarkActiveBorderColor = css<CheckboxRootProps>`
  ${({ $isDisabled }) =>
    $isDisabled ? color('neutral', '200') : color('action', '500')}
`

const CheckmarkCheckedFillColor = css<CheckboxRootProps>`
  ${({ $isDisabled }) =>
    $isDisabled ? color('neutral', '200') : color('action', '500')}
`

export const StyledRadio = styled.div<CheckboxRootProps>`
  display: inline-flex;
  position: relative;
  padding: ${({ $hasContainer }) =>
    $hasContainer ? `0 0 0 ${spacing('13')}` : `0 0 0 ${spacing('12')}`};
  cursor: pointer;
  font-size: ${fontSize('base')};
  user-select: none;
  background: ${BackgroundColor};

  * {
    cursor: pointer;
  }

  ${({ $hasContainer }) =>
    $hasContainer &&
    css`
      border: 1px solid ${color('neutral', '200')};
      border-radius: 15px;

      &:focus-within,
      &:active {
        outline: none;
        border-color: ${color('action', '500')};
        box-shadow: 0 0 0 2px ${color('action', '500')},
          0 0 0 5px ${color('action', '100')};
      }
    `}

  ${StyledCheckmark} {
    background: ${BackgroundColor};

    &::before {
      display: block;
      box-shadow: 0 0 0 0 transparent;
    }
  }

  /* Checkmark hover and active states, blue border */

  ${({ $isDisabled }) =>
    !$isDisabled &&
    css`
      &:hover ${StyledCheckmark}::before {
        box-shadow: 0 0 0 ${RADIO_ACTIVE_BORDER_WIDTH} ${color('action', '500')};
      }
    `}

  /* Checkmark focus state */

  ${({ $hasContainer }) =>
    !$hasContainer &&
    css`
      ${StyledCheckmark}:focus-within::before {
        box-shadow: 0 0 0 ${RADIO_ACTIVE_BORDER_WIDTH}
          ${CheckmarkActiveBorderColor};
      }
    `}

  /* Checkmark checked state */

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      ${StyledCheckmark} {
        &::before {
          box-shadow: 0 0 0 ${RADIO_ACTIVE_BORDER_WIDTH}
            ${CheckmarkActiveBorderColor};
        }

        &::after {
          display: block;
          background: ${CheckmarkCheckedFillColor};
          border: 2px solid ${BackgroundColor};
        }
      }
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: not-allowed;

      * {
        cursor: not-allowed;
      }

      border-color: transparent;

      &:focus-within,
      &:active {
        border-color: transparent;
        box-shadow: none;
      }
    `}

  ${({ $isInvalid }) =>
    $isInvalid &&
    css`
      border-color: ${color('danger', '800')};
      box-shadow: 0 0 0 2px ${color('danger', '800')};
    `}
`
