import express, { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app: Express = express()
const PORT = process.env.PORT || 3001

app.use(
  '/graphql',
  createProxyMiddleware({
    target: 'https://api.uniswap.org',
    changeOrigin: true,
    pathRewrite: {
      '^/graphql': '/v1/graphql', // rewrite path
    },
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
