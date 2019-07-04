
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
    // 该配置
    configureWebpack:{
      
    },
    // outputDir:'build', // 打包输出目录配置
    publicPath: '/CCTCP/static', // 项目部署目录    
}