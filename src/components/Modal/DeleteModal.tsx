import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import './Modal.scss'
import { Button } from 'components/basic/Button/Button'

type ModalDelete = {
  isOpen: boolean
  handleClose: () => void
  onSubmit: () => void
  elementName?: string
  errorMessage?: string
}

export const ModalDelete = (props: ModalDelete) => {
  const { isOpen, handleClose, onSubmit, elementName } = props

  const title = elementName ? `Confirmar Eliminación de ${elementName}` : 'Confirmar Eliminación'

  return (
    <Dialog className="modalito" open={isOpen} onClose={handleClose}>
      <DialogTitle className="modalito__header">
        <p className="text text--xl text--stronger">{title}</p>
      </DialogTitle>
      <DialogActions className="modalito__actions">
        <Button variant={'secondary'} text={'Cancelar'} onClick={handleClose} rounded taller animated />
        <Button
          text={'Eliminar'}
          onClick={() => {
            handleClose()
            onSubmit()
          }}
          rounded
          taller
          animated
        />
      </DialogActions>
    </Dialog>
  )
}
