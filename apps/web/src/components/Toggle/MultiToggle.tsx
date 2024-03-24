import styled from 'styled-components'

export const ToggleWrapper = styled.button<{ width?: string }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width ?? '100%'};
  padding: 1px;
<<<<<<< HEAD:src/components/Toggle/MultiToggle.tsx
  background: ${({ theme }) => theme.deprecated_bg1};
  border-radius: 5px;
  border: ${({ theme }) => '1px solid ' + theme.backgroundInteractive};
=======
  background: ${({ theme }) => theme.surface2};
  border-radius: 8px;
  border: ${({ theme }) => '1px solid ' + theme.surface3};
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/Toggle/MultiToggle.tsx
  cursor: pointer;
  outline: none;
`

export const ToggleElement = styled.span<{ isActive?: boolean; fontSize?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 0.5rem;
  border-radius: 6px;
  justify-content: center;
  height: 100%;
  background: ${({ theme, isActive }) => (isActive ? theme.surface1 : 'none')};
  color: ${({ theme, isActive }) => (isActive ? theme.neutral1 : theme.neutral3)};
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  font-weight: 535;
  white-space: nowrap;
  :hover {
    user-select: initial;
    color: ${({ theme, isActive }) => (isActive ? theme.neutral2 : theme.neutral3)};
  }
`
