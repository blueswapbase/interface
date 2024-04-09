import { useLocation } from 'react-router-dom'

export function useIsFarmPage() {
  const { pathname } = useLocation()
  return pathname.startsWith('/farms') || pathname.startsWith('/farm')
}
