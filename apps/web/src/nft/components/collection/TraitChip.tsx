import { CrossIcon } from 'nft/components/icons'
import styled from 'styled-components'

const TraitChipWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 6px 6px 12px;
<<<<<<< HEAD:src/nft/components/collection/TraitChip.tsx
  font-weight: 600;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.backgroundInteractive};
=======
  font-weight: 535;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.surface3};
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/nft/components/collection/TraitChip.tsx
  font-size: 14px;
`

const CrossIconWrap = styled.div`
  color: ${({ theme }) => theme.neutral2};
  height: 28px;
  width: 28px;
  border: none;
  padding-top: 1px;
`

export const TraitChip = ({ onClick, value }: { value: string | JSX.Element; onClick: () => void }) => {
  return (
    <TraitChipWrap>
      <span>{value}</span>
      <CrossIconWrap onClick={onClick}>
        <CrossIcon cursor="pointer" />
      </CrossIconWrap>
    </TraitChipWrap>
  )
}
