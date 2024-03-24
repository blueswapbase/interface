<<<<<<< HEAD:src/hooks/useIsTickAtLimit.ts
import { FeeAmount, nearestUsableTick, TICK_SPACINGS, TickMath } from 'blueswap-v3-sdk'
=======
import { FeeAmount, TICK_SPACINGS, TickMath, nearestUsableTick } from '@uniswap/v3-sdk'
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/hooks/useIsTickAtLimit.ts
import { useMemo } from 'react'
import { Bound } from 'state/mint/v3/actions'

export default function useIsTickAtLimit(
  feeAmount: FeeAmount | undefined,
  tickLower: number | undefined,
  tickUpper: number | undefined
) {
  return useMemo(
    () => ({
      [Bound.LOWER]:
        feeAmount && tickLower
          ? tickLower === nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount as FeeAmount])
          : undefined,
      [Bound.UPPER]:
        feeAmount && tickUpper
          ? tickUpper === nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount as FeeAmount])
          : undefined,
    }),
    [feeAmount, tickLower, tickUpper]
  )
}
