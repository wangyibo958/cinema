const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': { 
        target: "http://121.40.144.56/api", 
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  
  
  }


})
