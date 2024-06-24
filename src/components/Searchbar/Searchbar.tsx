import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import SearchIcon from '@mui/icons-material/Search'
import { Button } from 'components/basic/Button/Button'
import { useState } from 'react'
import { FilterArgs, FilterSelector, emptyFilter } from 'root/src/models/interfaces/types'

type SearchBarProps = {
  onSubmit: SubmitHandler<FilterArgs>
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [selectDefaultText, setSelectDefaultText] = useState('Ordenar por: ')
  const [selectedOption, setSelectedOption] = useState<FilterSelector>(FilterSelector.UNDEFINED)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FilterArgs>({
    defaultValues: {
      ...emptyFilter,
    },
  })

  const options: { label: string; value?: FilterSelector }[] = [
    { label: selectDefaultText, value: FilterSelector.UNDEFINED },
    { label: 'Más actual', value: FilterSelector.DATE_DESC },
    { label: 'Más antiguo', value: FilterSelector.DATE_ASC },
    { label: 'Más importante', value: FilterSelector.WEIGHT_ASC },
    { label: 'Menos importante', value: FilterSelector.WEIGHT_DESC },
  ]

  const handleSortChange = (selection: FilterSelector) => {
    setSelectedOption(selection)
    selection !== FilterSelector.UNDEFINED
      ? setSelectDefaultText('Limpiar filtros')
      : setSelectDefaultText('Ordenar por: ')
  }

  return (
    <form className="searchbar shadow shadow--big" onSubmit={handleSubmit(onSubmit)} data-testid="searchbar">
      <section className="searchbar__inputs">
        <div className="field__container">
          <input
            id="searchfor"
            className="field field--rounded field--large animated shadow"
            {...register('searchField')}
            data-testid="login-username"
            placeholder="Buscar: "
          />
        </div>

        <div className="field__container">
          <select
            {...register('sortField')}
            className="field field--select field--rounded animated shadow"
            onChange={(e) => handleSortChange(e.target.value as FilterSelector)}
            value={selectedOption}
            data-testid="sort-field"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="searchbar__action">
        <Button
          text={<SearchIcon style={{ fontSize: '1.6em' }} />}
          className="button--icon"
          rounded
          animated
          data-testid="search-submit"
          disabled={isSubmitting}
        />
      </section>
    </form>
  )
}
