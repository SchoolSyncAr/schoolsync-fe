import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsIcon from '@mui/icons-material/Notifications'

interface SearchBarProps {
  handleSearchInit: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchField: string
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchInit, handleChange, searchField }) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchInit()
    }
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
          <InputLabel htmlFor="input-with-icon-adornment">Search: </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <NotificationsIcon />
              </InputAdornment>
            }
            type="text"
            name="title"
            value={searchField}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Title..."
          />
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
