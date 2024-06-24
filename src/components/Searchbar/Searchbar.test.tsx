import { fireEvent, render, screen } from '@testing-library/react'
import { SearchBar } from './Searchbar'
import { describe, it, expect } from 'vitest'

describe('SearchBar Component', () => {
  it('renders without errors', () => {
    render(<SearchBar onSubmit={() => {}} />)
    const searchBarElement = screen.getByTestId('searchbar')
    expect(searchBarElement).toBeInTheDocument()
  })

  it('updates sortField value correctly', async () => {
    render(<SearchBar onSubmit={() => {}} />)
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement

    fireEvent.change(selectElement, { target: { value: 'DATE_DESC' } })

    expect(selectElement.value).toBe('DATE_DESC')
  })

  it('updates searchField value correctly', async () => {
    render(<SearchBar onSubmit={() => {}} />)
    const searchInputElement = screen.getByTestId('search-field') as HTMLInputElement

    fireEvent.change(searchInputElement, { target: { value: 'test query' } })

    expect(searchInputElement.value).toBe('test query')
  })

  it('updates sortField option text correctly', async () => {
    render(<SearchBar onSubmit={() => {}} />)
    const selectElement = screen.getByTestId('sort-field') as HTMLSelectElement

    fireEvent.change(selectElement, { target: { value: 'DATE_DESC' } })
    expect(selectElement.options[selectElement.selectedIndex].text).toBe('Más actual')

    fireEvent.change(selectElement, { target: { value: 'WEIGHT_DESC' } })
    expect(selectElement.options[selectElement.selectedIndex].text).toBe('Menos importante')
  })
})
