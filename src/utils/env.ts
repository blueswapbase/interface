export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isStagingEnv(): boolean {
  // This is set in vercel builds and deploys from releases/staging.
  return Boolean(process.env.REACT_APP_STAGING)
}

export function isProductionEnv(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isBrowserRouterEnabled(): boolean {
  return true
}

function isLocalhost({ hostname }: { hostname: string }): boolean {
  return hostname === 'localhost'
}

export function isSentryEnabled(): boolean {
  // Disable in e2e test environments
  if (isStagingEnv()) return false
  if (isProductionEnv()) return false
  return process.env.REACT_APP_SENTRY_ENABLED === 'false'
}

export function getEnvName(): 'production' | 'staging' | 'development' {
  if (isStagingEnv()) {
    return 'staging'
  }
  if (isProductionEnv()) {
    return 'development'
  }
  return 'development'
}
