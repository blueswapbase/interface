import { useWeb3React } from '@web3-react/core'
import { ChainId } from 'blueswap-sdk-core'
import { useScreenSize } from 'hooks/useScreenSize'
import { useLocation } from 'react-router-dom'
import { useHideBaseWalletBanner } from 'state/user/hooks'
import { isMobileSafari } from 'utils/userAgent'

export default function BaseWalletBanner() {
  const { chainId } = useWeb3React()
  const [hideBaseWalletBanner, toggleHideBaseWalletBanner] = useHideBaseWalletBanner()
  const location = useLocation()
  const isLandingScreen = location.search === '?intro=true' || location.pathname === '/'

  const shouldDisplay = Boolean(!hideBaseWalletBanner && !isLandingScreen && chainId === ChainId.BASE)

  const screenSize = useScreenSize()

  if (isMobileSafari) return null

  return <div></div>
}
