import { useLocation } from 'react-router-dom'

export function useIsCreateFarmPage() {
  const { pathname } = useLocation()
  return pathname.startsWith('/create-farm') || pathname.startsWith('/create-farms')
}
