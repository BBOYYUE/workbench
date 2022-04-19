const isProduction = process.env.NODE_ENV !== 'development'
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  publicPath: '/workbench/',
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeIntegration: true,
      builderOptions: {
        publish: null,
      },
    },
  },
  configureWebpack: (config) => {
    if (isProduction) {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'all',
              test: /node_modules/,
              name: 'vendor',
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100,
            },
            common: {
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60,
            },
            styles: {
              chunks: 'all',
              test: /\.(sa|sc|c)ss$/,
              name: 'styles',
              enforce: true,
            },
            runtimeChunk: {
              name: 'manifest',
            },
          },
        },
      }
    }
  },
}
