/* eslint-disable react/prop-types */
/* eslint-disable import/no-unused-modules */
import { ButtonPrimary } from 'components/Button'
import React from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const FormField = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`
interface CreateIncentiveModalProps {
  onClose: () => void
}

const CreateIncentiveModal: React.FC<CreateIncentiveModalProps> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Logic to send transaction
    onClose() // Close modal after submission
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <FormField type="text" placeholder="Field 1" />
          <FormField type="text" placeholder="Field 2" />
          <FormField type="text" placeholder="Field 3" />
          <FormField type="text" placeholder="Field 4" />
          <FormField type="text" placeholder="Field 5" />
          <ButtonPrimary type="submit">Send Transaction</ButtonPrimary>
        </form>
        <ButtonPrimary onClick={onClose}>Close</ButtonPrimary>
      </ModalContent>
    </ModalOverlay>
  )
}

export default CreateIncentiveModal
