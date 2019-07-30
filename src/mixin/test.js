
/**
 * 
 * mixin就是一个可包含所有创建vue实例 的选项对象，这些对象都会在vue实例创建时 进行合并，
 * 
 * 优先级是实例，但是在钩子函数中，mixin的钩子函数先执行，异步的不算。
 * 
 * 1.属性冲突时，以实例中优先
 * 2.钩子函数会合并成一个执行函数的数组，mixin的先执行，实例的钩子后执行
 * 
 * 3.Vue.mixin() 全局，慎用
 */

export default {
    data() {
        return {
            userInfo: {}
        }
    },
    created() {
        console.log('先调用')
    }
}