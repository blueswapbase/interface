import jazzicon from '@metamask/jazzicon'
import useENSAvatar from 'hooks/useENSAvatar'
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

const StyledIdenticon = styled.div<{ iconSize: number }>`
  height: ${({ iconSize }) => `${iconSize}px`};
  width: ${({ iconSize }) => `${iconSize}px`};
<<<<<<< HEAD:src/components/Identicon/index.tsx
  border-radius: 25px;
  background-color: ${({ theme }) => theme.deprecated_bg4};
=======
  border-radius: 50%;
  background-color: ${({ theme }) => theme.surface3};
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/Identicon/index.tsx
  font-size: initial;
`

const StyledAvatar = styled.img`
  height: inherit;
  width: inherit;
  border-radius: inherit;
`

export default function Identicon({ account, size }: { account: string; size?: number }) {
  const { avatar } = useENSAvatar(account ?? undefined)
  const [fetchable, setFetchable] = useState(true)
  const iconSize = size ?? 24

  const icon = useMemo(() => account && jazzicon(iconSize, parseInt(account.slice(2, 10), 16)), [account, iconSize])
  const iconRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const current = iconRef.current
    if (icon) {
      current?.appendChild(icon)
      return () => {
        try {
          current?.removeChild(icon)
        } catch (e) {
          console.error('Avatar icon not found')
        }
      }
    }
    return
  }, [icon, iconRef])

  const handleError = useCallback(() => setFetchable(false), [])

  return (
    <StyledIdenticon iconSize={iconSize}>
      {avatar && fetchable ? (
        <StyledAvatar alt="avatar" src={avatar} onError={handleError}></StyledAvatar>
      ) : (
        <span ref={iconRef} />
      )}
    </StyledIdenticon>
  )
}
