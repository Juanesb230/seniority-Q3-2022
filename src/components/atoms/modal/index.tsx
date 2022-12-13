import React from 'react'
import CloseIcon from '../../../assets/close-icon.svg'
import Button from '../button'
import './modal.scss'

interface ModalProps {
  children: React.ReactNode
  handleClose: () => void
  title: string
}

export const Modal: React.FC<ModalProps> = ({ children, handleClose, title }) => {
  return (
    <div className="modal" onClick={handleClose}>
      <header className="modal__header">
        <h2>{title}</h2>
        <Button variant="secondary" onClick={handleClose}>
          <img className="modal__close-button" src={CloseIcon} alt="close-icon" />
        </Button>
      </header>
      <section className="modal__body">{children}</section>
    </div>
  )
}
