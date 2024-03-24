<<<<<<< HEAD:src/utils/computeFiatValuePriceImpact.tsx
import { Percent } from 'blueswap-sdk-core'
=======
import { Percent } from '@uniswap/sdk-core'
import { BIPS_BASE } from 'constants/misc'
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/utils/computeFiatValuePriceImpact.tsx

export function computeFiatValuePriceImpact(
  fiatValueInput: number | undefined | null,
  fiatValueOutput: number | undefined | null
): Percent | undefined {
  if (!fiatValueOutput || !fiatValueInput) return undefined
  if (fiatValueInput === 0) return undefined

  const ratio = 1 - fiatValueOutput / fiatValueInput
  const numerator = Math.floor(ratio * BIPS_BASE)
  return new Percent(numerator, BIPS_BASE)
}
