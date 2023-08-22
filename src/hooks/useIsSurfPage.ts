
import { useLocation } from 'react-router-dom'

export function useIsSurfPage() {
  const { pathname } = useLocation()
  return pathname.endsWith('/surf')
}
