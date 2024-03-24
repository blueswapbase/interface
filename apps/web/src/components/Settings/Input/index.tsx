import styled from 'styled-components'

import Row from '../../Row'

export const Input = styled.input`
  width: 100%;
  display: flex;
  flex: 1;
  font-size: 16px;
  border: 0;
  outline: none;
  background: transparent;
  text-align: right;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.neutral3};
  }
`

export const InputContainer = styled(Row)<{ error?: boolean }>`
  padding: 8px 16px;
  border-radius: 5px;
  width: auto;
  min-width: 100px;
  flex: 1;
  input {
    color: ${({ theme, error }) => (error ? theme.critical : theme.neutral1)};
  }
<<<<<<< HEAD:src/components/Settings/Input/index.tsx
  border: 2px solid ${({ theme, error }) => (error ? theme.accentFailure : theme.deprecated_bg3)};
  ${({ theme, error }) =>
    error
      ? `
        border: 2px solid ${theme.accentFailure};
=======
  border: 1px solid ${({ theme, error }) => (error ? theme.critical : theme.surface2)};
  ${({ theme, error }) =>
    error
      ? `
        border: 1px solid ${theme.critical};
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/Settings/Input/index.tsx
        :focus-within {
          border-color: ${theme.deprecated_accentFailureSoft};
        }
      `
      : `
<<<<<<< HEAD:src/components/Settings/Input/index.tsx
        border: 2px solid ${theme.backgroundOutline};
=======
        border: 1px solid ${theme.surface3};
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/Settings/Input/index.tsx
        :focus-within {
          border-color: ${theme.accent2};
        }
      `}
`
