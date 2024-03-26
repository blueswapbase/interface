import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware'
const proxy = {
  target: 'https://app.uniswap.org',
  changeOrigin: true,
}
module.exports = function (app: { use: (arg0: string, arg1: RequestHandler) => void }) {
  app.use('/search', createProxyMiddleware(proxy))
}
