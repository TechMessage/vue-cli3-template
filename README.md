## vue-cli3.x 脚手架使用


### package.json && package-lock.json

> package.json 是npm 包管理的配置文件，通常情况项目的依赖包 版本号是"@vue/cli-plugin-babel": "^3.9.0",这里^ 表示兼容所有3.x.x的版本，引文每次在不同的机器上clone下项目，然后npm install 安装依赖包，会根据package.json来安装，但是会安装npm源里包的3.9.5(当前的最新版本号)，也就是说仅仅保证了3.x.x大版本号一直，其它取npm源里最新的版本；这回导致一些不兼容情况发生

> package-lock.json的作用就是锁定该项目在首次初始化的时候所有的依赖包的版本号，那么其它的机器在clone该项目的时候安装依赖包的时候就会按照package-lock.json的固定版本号来安装依赖包版本




### assets静态资源
> scss 是sass3 版本的新语法，完全兼容css3，可以看做sass的升级版本

### 图片路径
> 编译过后的css文件都会经过 css-loader处理，处理url()资源路径引入问题
1. 使用相对路径，相对于当前文件
2. 使用 ~ 开头 引入node_modules中第三方包的资源，或者使用webpack定义alias别名@(@符号指向/src)，都要在前面带上~符号



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


















