import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import './Modal.scss'

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
        <button
          className="button button--secondary button--tall button--rounded animated shadow shadow--box"
          onClick={handleClose}
        >
          Cancelar
        </button>
        <button
          className="button button--primary button--tall button--rounded animated shadow shadow--box"
          onClick={() => {
            handleClose()
            onSubmit()
          }}
        >
          Eliminar
        </button>
      </DialogActions>
    </Dialog>
  )
}
