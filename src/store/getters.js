export default {
    // 购物车长度(里面有几件商品)
    cartLength: state => state.cartList.length,
    // 返回购物车中存放商品的数组
    cartList: state =>  state.cartList,

    // 判断是否全选
    // !item.checked未选中(checked=false)
    // !(this.cartList.filter(item => !item.checked).length)数字取反,0和NAN都是false取反之后就是true
    // 第一种方法使用filter数组函数方法过滤,需要遍历完整个数组元素(效率较低)
    // return this.cartList.length !== 0 && !(this.cartList.filter(item => !item.checked).length)
    // 第二种使用find数组函数查找,只要有找到一个就会立即返回,不再查找后面的元素(不需遍历整个数组)
    isSelectAll: state => state.cartList.length !== 0 && !state.cartList.find(item => !item.checked) 
    
}