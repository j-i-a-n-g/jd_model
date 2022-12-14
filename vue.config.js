const path = require('path')

module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
    } else {
      // 为开发环境修改配置
    }
    return {
      resolve: {
        alias: {
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/image'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    }
  }
}
