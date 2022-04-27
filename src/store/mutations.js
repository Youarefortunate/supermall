export default {
    // 添加同一商品,count加1
    addCounter(state, payload) {
        payload.count++;
    },
    // 添加的是其他商品,添加到购物车中
    addToCart(state, payload) {
        // 往商品对象里面添加一个属性checked,用于判断是否选中该商品(默认选中)
        payload.checked = true;
        state.cartList.push(payload);
    },
    // 修改商品选中状态
    checkClick: (state, index) => state.cartList[index].checked = !state.cartList[index].checked,
    // 取消全选
    allSelect: state => state.cartList.forEach(item => item.checked =false),
    // 全选
    notAllSelect: state => state.cartList.forEach(item => item.checked = true)
} 