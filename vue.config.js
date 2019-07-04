
/**
 * vue cli 项目的手动配置文件，作为内置webpack配置的补充
 */

module.exports = {
  // css配置
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        // 全局引入公共的变量scss文件
        data: `@import "~@/assets/scss/common.scss";`
      }
    }
  },
  //
  configureWebpack: {

  },
  // outputDir:'build', // 打包输出目录配置
  /**
     * 1 前后端不分离部署时，前端打包静态文件，后台tomat部署javaweb项目，后台部署名比如:CCTCP, 那么静态目录就为/CCTCP/static
     * 2 刚好/CCTCP/static 就是前端资源的根目录，静态资源目录
     * 3 publicPath 值会就是 public/index.html中 模板中使用的 BASE_URL
     */
  publicPath: '/CCTCP/static', //

  /**
     *  内部的webpack 配置 是由 webpack-chain 这个包来管理的。这个库提供了对原始webpack配置的抽象，同时可以自定义一些rules, plugins,然后把这些
     *  自定义的配置 合并到原始的webpack配置中，说白了就是把相对较繁杂的webapck原生配置包装一下，提供一下接口来简化webpack配置的修改操作
     *  通过npx vue-cli-service inspect 命令导出的内置webapck配置信息，就有注释表明：如何访问特定loader的options配置，继而可以修改它，然后返回它，
     *  有点像拦截器的意思，将一些内置的rule规则进行修改后，返回它，就像它的名称表明 chain 链式的意思
     *
     *  例如：  config.module.rule('vue')
     *
     *  对于css ,因为loader rules很多，建议在 css.loaderOptions配置
     */
  chainWebpack: config => {
    config.module.rule('vue').use('vue-loader').tap(options => {
      // 对options修改

      // 返回
      return options
    })

    // 对插件配置
    // config.plugin('html').tap(args => {

    // })
  }
}
