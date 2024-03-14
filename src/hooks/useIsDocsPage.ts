import { useLocation } from 'react-router-dom'

export function useIsDocsPage() {
  const { pathname } = useLocation()
  return (
    pathname.startsWith('/docs')
  )
}
