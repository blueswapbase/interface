import { useWeb3React } from '@web3-react/core'
import { ChainId } from 'blueswap-sdk-core'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { useEffect } from 'react'
import { useDarkModeManager } from 'theme/components/ThemeToggle'

import { darkTheme, lightTheme } from '../colors'

const initialStyles = {
  width: '200vw',
  height: '200vh',
  transform: 'translate(-50vw, -100vh)',
}
const backgroundResetStyles = {
  width: '100vw',
  height: '100vh',
  transform: 'unset',
}

type TargetBackgroundStyles = typeof initialStyles | typeof backgroundResetStyles

const backgroundRadialGradientElement = document.getElementById('background-radial-gradient')
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key as keyof typeof backgroundResetStyles] = value
    }
  })

function setDefaultBackground(backgroundRadialGradientElement: HTMLElement, darkMode?: boolean) {
  setBackground(initialStyles)
  const defaultLightGradient = '#FFFFFF'
  //'radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 226, 0.51) 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF'
  const defaultDarkGradient = 'rgb(52,74,251,100)'
  //linear-gradient(180deg, #202738 0%, #070816 100%)'
  backgroundRadialGradientElement.style.background = darkMode ? defaultDarkGradient : defaultLightGradient
}

export default function RadialGradientByChainUpdater(): null {
  const { chainId } = useWeb3React()
  const [darkMode] = useDarkModeManager()
  const isNftPage = useIsNftPage()

  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) {
      return
    }

    if (isNftPage) {
      setBackground(initialStyles)
      backgroundRadialGradientElement.style.background = darkMode
        ? darkTheme.backgroundBackdrop
        : lightTheme.backgroundBackdrop
      return
    }

    switch (chainId) {
      case ChainId.BASE:
      case ChainId.BASE_GOERLI: {
        setBackground(backgroundResetStyles)
        const baseLightGradient = '#FFFFFF'
        const baseDarkGradient = 'rgb(52,74,251,100)'
        // 'radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0.7) 0%, rgba(0, 82, 255, .1) 40%, rgba(0, 82, 255, 0) 100%), rgb(13, 14, 14)'
        backgroundRadialGradientElement.style.background = darkMode ? baseDarkGradient : baseLightGradient
        break
      }
      default: {
        setDefaultBackground(backgroundRadialGradientElement, darkMode)
      }
    }
  }, [darkMode, chainId, isNftPage])
  return null
}
