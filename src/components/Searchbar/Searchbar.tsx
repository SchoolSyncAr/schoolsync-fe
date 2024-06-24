import './Searchbar.scss'
import { FilterArgs, FilterSelector, emptyFilter } from 'root/src/models/interfaces/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SearchIcon from '@mui/icons-material/Search'
import { Button } from 'components/basic/Button/Button'
import { useState } from 'react'
import { StudentProps } from 'root/src/models/interfaces/User'
import { useOnInit } from 'root/src/utils/useOnInit'
import { PrintError } from '../PrintError/PrintError'
import { getMyChildren } from 'root/src/services/ParentService'
import { ToggleButton } from '@mui/material'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import { authService } from 'root/src/services/AuthService'

type SearchBarProps = {
  onSubmit: SubmitHandler<FilterArgs>
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [selectDefaultText, setSelectDefaultText] = useState('Ordenar por: ')
  const [selectDefaultTextChildren, setSelectDefaultTextChildren] = useState('Seleccionar Hijo: ')
  const [selectedOption, setSelectedOption] = useState<FilterSelector>(FilterSelector.UNDEFINED)
  const [selectedChild, setSelectedChild] = useState('')
  const [children, setChildren] = useState<StudentProps[]>([])
  const [read, setRead] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<FilterArgs>({
    defaultValues: {
      ...emptyFilter,
    },
  })

  useOnInit(async () => {
    try {
      const childrenData = await getMyChildren()
      setChildren(childrenData)
    } catch {
      errorMessage
      setErrorMessage('No se pudo obtener info children')
    }
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

  const handleChildrenChange = (selection: string) => {
    setSelectedChild(selection)
    selection !== ''
      ? setSelectDefaultTextChildren('Limpiar filtros')
      : setSelectDefaultTextChildren('Seleccionar Hijo: ')
  }

  const handleReadChange = (value: boolean) => {
    setRead(value)
    setValue('read', value)
  }

  return (
    <form className="searchbar shadow shadow--big" onSubmit={handleSubmit(onSubmit)}>
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
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {!authService.adminStatus() ? (
          <div className="field__container">
            <select
              {...register('children')}
              className="field field--select field--rounded animated shadow"
              onChange={(e) => handleChildrenChange(e.target.value)}
              value={selectedChild}
            >
              <option value={''}>{selectDefaultTextChildren}</option>
              {children.map((child: StudentProps, index: number) => (
                <option key={index} value={child.id}>
                  {`${child.firstName} ${child.lastName}`}
                </option>
              ))}
            </select>
            <PrintError error={errorMessage} />
          </div>
        ) : (
          <></>
        )}

        {!authService.adminStatus() ? (
          <div className="checkbox checkbox--rounded animated shadow">
            <Controller
              name="read"
              control={control}
              render={({ field }) => (
                <ToggleButton value="check" selected={field.value} onChange={() => handleReadChange(!field.value)}>
                  {field.value ? <MarkChatReadIcon /> : <MarkChatUnreadIcon />}
                </ToggleButton>
              )}
            />
          </div>
        ) : (
          <></>
        )}
      </section>
      <section className="searchbar__action">
        <Button
          text={<SearchIcon style={{ fontSize: '1.6em' }} />}
          className="button--icon"
          rounded
          animated
          data-testid={'search-submit'}
          disabled={isSubmitting}
        />
      </section>
    </form>
  )
}
