import cors from 'cors'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(
  cors({
    origin: 'app.lobobase.com', // Set the origin to your frontend's URL
    credentials: true,
  })
)

app.use(
  '/graphql',
  createProxyMiddleware({
    target: 'https://api.uniswap.org',
    changeOrigin: true,
    pathRewrite: {
      '^/graphql': '/v1/graphql', // Rewrite the URL path
    },
  })
)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`))
