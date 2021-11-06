//verion > 1.0
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://openapi.iisec.360.cn/',
    changeOrigin: true,
    pathRewrite: { //路径替换
      '^/api': '/',
    }
  }));
 

};