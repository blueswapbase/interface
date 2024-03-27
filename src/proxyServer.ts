// proxyServer.ts
import cors from 'cors'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

// CORS Configuration
const corsOptions = {
  origin: 'https://app.lobobase.com',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Proxy configuration
const proxyOptions = {
  target: 'https://api.uniswap.org', // Target server
  changeOrigin: true, // Changes the origin of the host header to the target URL
  onProxyReq: (proxyReq: { setHeader: (arg0: string, arg1: string) => void }) => {
    // Set 'Origin' header to 'app.uniswap.org' for all proxied requests
    proxyReq.setHeader('Origin', 'https://app.uniswap.org')
  },
}

// Use the proxy middleware for requests to '/graphql'
app.use('*', createProxyMiddleware(proxyOptions))

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`)
})
