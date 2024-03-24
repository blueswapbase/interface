import { useWeb3React } from '@web3-react/core'
import { OffchainActivityModal } from 'components/AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal'
<<<<<<< HEAD:src/components/TopLevelModals/index.tsx
import ConnectedAccountBlocked from 'components/ConnectedAccountBlocked'
import useAccountRiskCheck from 'hooks/useAccountRiskCheck'
import { lazy } from 'react'
import { useModalIsOpen } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'

const Bag = lazy(() => import('nft/components/bag/Bag'))
const TransactionCompleteModal = lazy(() => import('nft/components/collection/TransactionCompleteModal'))
=======
import UniwalletModal from 'components/AccountDrawer/UniwalletModal'
import { Banners } from 'components/Banner/shared/Banners'
import AddressClaimModal from 'components/claim/AddressClaimModal'
import ConnectedAccountBlocked from 'components/ConnectedAccountBlocked'
import FeatureFlagModal from 'components/FeatureFlagModal/FeatureFlagModal'
import FiatOnrampModal from 'components/FiatOnrampModal'
import { UkDisclaimerModal } from 'components/NavBar/UkDisclaimerModal'
import { PrivacyPolicyModal } from 'components/PrivacyPolicy'
import DevFlagsBox from 'dev/DevFlagsBox'
import useAccountRiskCheck from 'hooks/useAccountRiskCheck'
import Bag from 'nft/components/bag/Bag'
import TransactionCompleteModal from 'nft/components/collection/TransactionCompleteModal'
import { GetTheAppModal } from 'pages/Landing/components/DownloadApp/GetTheAppModal'
import { useModalIsOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import { isDevelopmentEnv, isStagingEnv } from 'utils/env'
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/TopLevelModals/index.tsx

export default function TopLevelModals() {
  const blockedAccountModalOpen = useModalIsOpen(ApplicationModal.BLOCKED_ACCOUNT)
  const { account } = useWeb3React()
  useAccountRiskCheck(account)
  const accountBlocked = Boolean(blockedAccountModalOpen && account)
  const shouldShowDevFlags = isDevelopmentEnv() || isStagingEnv()

  return (
    <>
      <ConnectedAccountBlocked account={account} isOpen={accountBlocked} />
      <Bag />
<<<<<<< HEAD:src/components/TopLevelModals/index.tsx
      <OffchainActivityModal />
      <TransactionCompleteModal />
=======
      <UniwalletModal />

      <Banners />

      <OffchainActivityModal />
      <TransactionCompleteModal />
      <FiatOnrampModal />
      <UkDisclaimerModal />
      <GetTheAppModal />
      <PrivacyPolicyModal />
      <FeatureFlagModal />
      {shouldShowDevFlags && <DevFlagsBox />}
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/TopLevelModals/index.tsx
    </>
  )
}
