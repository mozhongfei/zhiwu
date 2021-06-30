const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
  configureWebpack: config => {
    // externals: {
    // 	[
    // 		'Vue',
    // 		'VueAxios',
    // 		'ElementUI',
    // 	]
    // }
    //if (process.env.NODE_ENV === 'prodution') {
    const productionGzipExtensions = ['html', 'js', 'css']
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + productionGzipExtensions.join('|') + ')$'
        ),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.9, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      })
    )
    //}
  },
  "transpileDependencies": [
    "vuetify"
  ]
}