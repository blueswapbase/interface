import { InterfaceElementName } from '@uniswap/analytics-events'
import { PropsWithChildren, useCallback } from 'react'
import styled from 'styled-components'
import { ClickableStyle } from 'theme/components'
import { openDownloadApp } from 'utils/openDownloadApp'

const StyledButton = styled.button<{ padded?: boolean; branded?: boolean }>`
  ${ClickableStyle}
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 6px;
  padding: 8px 24px;
  border: none;
  white-space: nowrap;
<<<<<<< HEAD:src/components/AccountDrawer/DownloadButton.tsx
  background: ${({ theme, branded }) => (branded ? theme.promotionalGradient : theme.backgroundInteractive)};
  border-radius: 5px;
=======
  background: ${({ theme, branded }) => (branded ? theme.accent1 : theme.surface3)};
  border-radius: 12px;
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/AccountDrawer/DownloadButton.tsx

  font-weight: 535;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme, branded }) => (branded ? theme.deprecated_accentTextLightPrimary : theme.neutral1)};
`

function BaseButton({ onClick, branded, children }: PropsWithChildren<{ onClick?: () => void; branded?: boolean }>) {
  return (
    <StyledButton branded={branded} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

// Launches App/Play Store if on an iOS/Android device, else navigates to Uniswap Wallet microsite
export function DownloadButton({
  onClick,
  text = 'Download',
  element,
}: {
  onClick?: () => void
  text?: string
  element: InterfaceElementName
}) {
  const onButtonClick = useCallback(() => {
    // handles any actions required by the parent, i.e. cancelling wallet connection attempt or dismissing an ad
    onClick?.()
    openDownloadApp({ element })
  }, [element, onClick])

  return (
    <BaseButton branded onClick={onButtonClick}>
      {text}
    </BaseButton>
  )
}
