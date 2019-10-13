## vue-cli3.x 脚手架使用


### package.json && package-lock.json

> package.json 是npm 包管理的配置文件，通常情况项目的依赖包 版本号是"@vue/cli-plugin-babel": "^3.9.0",这里^ 表示兼容所有3.x.x的版本，引文每次在不同的机器上clone下项目，然后npm install 安装依赖包，会根据package.json来安装，但是会安装npm源里包的3.9.5(当前的最新版本号)，也就是说仅仅保证了3.x.x大版本号一直，其它取npm源里最新的版本；这回导致一些不兼容情况发生

> package-lock.json的作用就是锁定该项目在首次初始化的时候所有的依赖包的版本号，那么其它的机器在clone该项目的时候安装依赖包的时候就会按照package-lock.json的固定版本号来安装依赖包版本




### assets静态资源
> scss 是sass3 版本的新语法，完全兼容css3，可以看做sass的升级版本

### 图片路径以及css中@import 引入
> 编译过后的css文件都会经过 css-loader处理，处理url()资源路径引入问题
1. 使用相对路径，相对于当前文件
2. 使用 ~ 开头 引入node_modules中第三方包的资源，或者使用webpack定义alias别名@(@符号指向/src)，都要在前面带上~符号
3. scss, less中使用 @import 导入其它文件时，路径使用 @符号时也要带上 ~ 符号： ~@/assets/scss/xxx.scss


### css模块化
> postcss
1. vue cli3 内部默认使用postcss, autoprefixer插件默认开启，给不同浏览器添加属性前缀 -webkit-


> css modules
1. 默认就支持css 的模块化，在*.vue文件中的script中或者js中引入css文件，需要将文件名符合规范命名
2. 文件名： xxx.module.(css|less|scss)
3. 可以写一些公共的样式类的文件，作为公共使用的css类，在*.vue中script中引入，data数据中接收，通过绑定class的方式来使用，尤其是一些开关类型的类， 可以把scss中类名全部映射为对象的属性名，通过调用导入的**对象.属性**来获取样式，动态通过js的方式来给标签添加样式
```
    //  src/assets/scss/base.module.scss
```

4. 在 *.vue 中的style中可以使用 scss提供的 @import 来导入基础scss文件，模块化；

5. 如何在全局引入基础的scss文件，reset.css来统一标签的表现
   1. 在入口文件main.js 直接import '@/assets/css/reset.css';
   2. 在vue.config.js中配置sass-loader配置option，可以全局引入公共的scss文件，这样公用的变量，样式类，函数都可以在所有的*.vue中直接使用了。


> 总结：

1. 入口文件 main.js 中直接引入reset.css  // 样式重置
```
// 全局css样式重置
import '@/assets/css/reset.css'

```
2. vue.config.js中配置 sass-loader，添加全局的公共变量common.scss文件
```
module.exports = {
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
    }
}
```

3. 其他局部共用的scss，可以在特定的*.vue中 @import 方式引入
```

<style lang="scss" scoped>
@import "@/assets/scss/base.scss";

.about {
  .box {
    border: 1px solid $color;
    height: $h300;
    width: 300px;
    margin: 0 auto;
    background: url("~@/assets/logo.png") no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: $f50;
    }
  }
}
</style>

```


### vue.config.js 
> vue cli3 创建的项目已经没有了webpack.config.js的配置文件了，内部抽象webpack的配置，对外提供接口来个性化调整webpack的个别配置信息，都是通过vue.config.js文件，该文件默认是没有的，需要手动创建，放到项目根目录。

1. vue.config.js中具体的配置项以及如何使用，直接看该文件的注释

```

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
    configureWebpack:{
      
    },
    // outputDir:'build', // 打包输出目录配置
    /**
     * 1 前后端不分离部署时，前端打包静态文件，后台tomat部署javaweb项目，后台部署名比如:CCTCP, 那么静态目录就为/CCTCP/static
     * 2 刚好/CCTCP/static 就是前端资源的根目录
     * 
     */
    publicPath: '/CCTCP/static', // 
}


```



### webpack.config.prod.js
> 由于cli3 抽象了webpack的配置信息，@vue/cli-service 提供了命令可以把内置的webpack配置导出

1. npx vue-cli-service  --mode=product > xxx.js  // 生产模式配置，导出为xxx.js
2. **其实真实的webpack.config.js文件在 node_modules/@vue/cli-service/ 目录下**





### modes and env 模式和环境变量 （可以解决不同环境下 域名api接口url不同的问题）

**环境变量文件修改需要项目重启**

> mode 模式在vue cli中是很重要的概念，默认 有三种模式: development   test   production

1. 根据 命令  vue-cli-service serve(build) , 环境变量 NODE_ENV 就会相应的设置为 development (production)
2. NODE_ENV 决定了你的应用 运行的环境是 开发还是生产，继而在打包应用的时候就会生成该环境下的webpack配置


> 可以在项目的根目录 新建一些环境变量的文件, 每个环境变量文件 就是key=value的键值对，有点类似java中的properties文件

* .env                # loaded in all cases
* .env.local          # loaded in all cases, ignored by git
* .env.[mode]         # only loaded in specified mode
* .env.[mode].local   # only loaded in specified mode, ignored by git

> .local的文件都是本地的，git是忽略的，为了保密考虑


> 环境变量文件的加载优先级

* vue-cli-service build builds a production app, loading .env, .env.production and .env.production.local if they are present;
* vue-cli-service build --mode staging builds a production app in staging mode, using .env, .env.staging and .env.staging.local if they are present


> 环境变量文件中只有定义为VUE_APP_XXX的key-value才会被打包文件获取到，js业务代码中可以直接使用这些相当于是全局变量，打包后都会替换为value值

```
// .env
VUE_APP_GBTYPE_DRY=0100
VUE_APP_GBTYPE_WET=0200
VUE_APP_GBTYPE_RECY=0300
VUE_APP_GBTYPE_POIS=0400

//上面配置的环境变量都会加入到process.env; 前面两个是系统内置

BASE_URL: "/CCTCP/static/"  
NODE_ENV: "development"
VUE_APP_GBTYPE_DRY: "0100"
VUE_APP_GBTYPE_POIS: "0400"
VUE_APP_GBTYPE_RECY: "0300"
VUE_APP_GBTYPE_WET: "0200"


```

> 应用场景：在项目开发的时候，打包测试的时候，可能api域名都不一样，那么就可以配置多个环境变量文件，将其配置进去

1. vue-cli-service build --mode selftest //这种模式打包 会加载 .env, .env.selftest and .env.selftest.local
2. **基于上面的特点，就可以实现不同测试环境的打包自动加载不同的环境变量文件，解决ap调用时域名的问题**
3. 在项目中的应用代码中使用环境变量都必须是process.env.XXX来使用

4. 注意在其他非生产模式环境下打包，其实调用的是dev模式的webpack配置，没有代码分割，打包生成的app.js巨大，解决方法就是在其他环境变量文件中添加
   NODE_ENV=production // 那么就会调用webpack的生产模式打包配置，体积很小，且代码分离了  


5. 可以在package.json中配置npm脚本名称，不必每次都手动输入 npx vue-cli-service build --mode xxx
```

  "scripts": {
    "dev": "vue-cli-service serve",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build:self": "vue-cli-service build --mode self",
    "build:baoxin": "vue-cli-service build --mode baoxin",
    "lint": "vue-cli-service lint"
  },

  npm run build:self  //执行打包， 自测环境
  npm run build:baoxin   //...  宝信测试环境

```


### 开发时的一些小设置

> 在移动端开发的时候，经常需要边开发边打开手机看效果。一般来说，webpack在开发的模式下是开启一个web服务的，那么只要手机和电脑连在同一个wifi下就是可以访问到的，而且也是自动刷新的，具体的设置就是在vue.config.js中

```
 //vue.config.js

 module.exports = {

   devServer:{
     host:'0.0.0.0', // host 默认不配置就可以做到手机端访问，如果配置的话，ip要写成'0.0.0.0',表示任意的ip
     port:'8888',    // 端口这边如果不配置，默认会从8080开始，如果被占用就递增1， 一般配置比较好，这样不会出现有时候8080, 有时候
                     // 8081， 8082 等等
    
   }

 }


```





















