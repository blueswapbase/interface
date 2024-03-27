import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
  '/v1/graphql',
  createProxyMiddleware({
    target: 'https://api.uniswap.org',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // Or, if you need to set a specific origin, you can uncomment the following line:
      proxyReq.setHeader('Origin', 'localhost://3001')
    },
  })
)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})
