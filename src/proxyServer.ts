import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
  '/graphql',
  createProxyMiddleware({
    target: 'https://api.uniswap.org',
    changeOrigin: true,
    pathRewrite: {
      '^/graphql': '/v1/graphql', // rewrite path
    },
    onProxyReq: (proxyReq, req, res) => {
      // Remove the Origin header
      proxyReq.removeHeader('Origin')
      // Or, if you need to set a specific origin, you can uncomment the following line:
      proxyReq.setHeader('Origin', 'https://api.uniswap.org')
    },
  })
)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})
