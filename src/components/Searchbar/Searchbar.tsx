import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface SearchBarProps {
  handleSearchInit: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  filter: {
    searchField: string
    orderParam: string
    sortDirection: string
  }
  handleFilterChange: (filterName: string, filterValue: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchInit, handleChange, filter, handleFilterChange }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchInit()
    }
  }

  const handleOrderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string

    const mapping: { [key: string]: { orderParam: string; sortDirection: string } } = {
      datedesc: { orderParam: 'date', sortDirection: 'desc' },
      dateasc: { orderParam: 'date', sortDirection: 'asc' },
      weightdesc: { orderParam: 'weight', sortDirection: 'desc' },
      weightasc: { orderParam: 'weight', sortDirection: 'asc' },
    }

    const { orderParam, sortDirection } = mapping[value] || { orderParam: '', sortDirection: '' }

    handleFilterChange('orderParam', orderParam)
    handleFilterChange('sortDirection', sortDirection)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        pb: '1rem',
        pt: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1em',
        }}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Search:</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon/>
                {/* <NotificationsIcon /> */}
              </InputAdornment>
            }
            type="text"
            name="searchField"
            value={filter.searchField}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Title..."
          />
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-order-label">Sort by</InputLabel>
          <Select
            labelId="sort-order-label"
            id="sort-order"
            value={`${filter.orderParam}${filter.sortDirection}`}
            onChange={handleOrderChange}
            label="Sort by"
          >
            <MenuItem value="datedesc">Date - From Newest to Oldest</MenuItem>
            <MenuItem value="dateasc">Date - From Oldest to Newest</MenuItem>
            <MenuItem value="weightdesc">Weight - From Highest to Lowest</MenuItem>
            <MenuItem value="weightasc">Weight - From Lowest to Highest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        size="medium"
        startIcon={<SearchRoundedIcon />}
        variant="contained"
        color="success"
        onClick={handleSearchInit}
        onKeyPress={handleKeyPress}
      >
        SEARCH
      </Button>
    </Box>
  )
}

export default SearchBar
