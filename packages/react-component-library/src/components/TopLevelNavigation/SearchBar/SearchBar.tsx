import React, { useCallback, useRef, useState } from 'react'
import { IconChevronRight } from '@defencedigital/icon-library'

import { TextInput } from '../../TextInput'
import { useDocumentClick } from '../../../hooks'
import { StyledSearchBar } from './partials/StyledSearchBar'
import { StyledForm } from './partials/StyledForm'
import { StyledButton } from './partials/StyledButton'

export interface SearchbarProps {
  className?: string
  containerWidth: number
  onSearch: (event: React.FormEvent<HTMLFormElement>, term: string) => void
  searchButtonRef: React.RefObject<HTMLElement>
  setShowSearch: (isVisible: boolean) => void
}

export const SearchBar: React.FC<SearchbarProps> = ({
  containerWidth,
  onSearch,
  searchButtonRef,
  setShowSearch,
  ...rest
}) => {
  const searchBoxRef = useRef(null)
  const [term, setTerm] = useState('')

  const onDocumentClick = useCallback(
    (event: Event) => {
      if (
        event.target instanceof Node &&
        searchButtonRef.current?.contains(event.target)
      ) {
        return
      }

      setShowSearch(false)
    },
    [searchButtonRef, setShowSearch]
  )

  useDocumentClick(searchBoxRef, onDocumentClick)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(event, term)
  }

  return (
    <StyledSearchBar
      ref={searchBoxRef}
      data-testid="searchbar"
      $width={`${containerWidth}px`}
      {...rest}
    >
      <StyledForm data-testid="searchbar-form" onSubmit={onSubmit}>
        <TextInput
          autoFocus
          id="term"
          name="term"
          label=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTerm(event.target.value)
          }}
          value={term}
        />
        <StyledButton
          aria-label="Search"
          data-testid="searchbar-submit-button"
          type="submit"
        >
          <IconChevronRight />
        </StyledButton>
      </StyledForm>
    </StyledSearchBar>
  )
}

SearchBar.displayName = 'SearchBar'
