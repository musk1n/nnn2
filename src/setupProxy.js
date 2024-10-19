// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.thegraph.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Removes '/api' from the request URL before forwarding it
      },
      logLevel: 'debug', // Enables detailed logs
    })
  );
};
