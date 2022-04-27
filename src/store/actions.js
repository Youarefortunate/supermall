export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 数组函数find()查找数组中是否有一个元素,参数里面自动传递进使用该函数的数组的每一项 item
            // 当找到有之后会立即停止并且返回找到的该元素
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
            // oldProduct里面有值就说明添加了同一件商品,这时时里面count加1
            if (oldProduct) {
                context.commit('addCounter', oldProduct);
                resolve("商品数量加1");
            } else {
                // 否则就是添加了其他商品,这时我们往这个商品里面添加一个属性count(默认值为1)
                payload.count = 1;
                // 并将该商品添加到cartList里面
                context.commit('addToCart', payload);
                resolve("该商品数量加1");
            }
            // let oldProduct = null;
            // for(let item of state.cartList) {
            //     if(item.iid === payload.iid) {
            //         oldProduct = item;
            //     }
            // }
            // if(oldProduct) {
            //     oldProduct.count += 1;
            // } else {
            //     payload.count = 1;
            //     state.cartList.push(payload);
            // }
        }) 
    },
    // 全选与全取消
    checkAllClick(context, isSelectAll) {
        // 全选
        if (isSelectAll) {
            context.commit('allSelect');
        } else { // 部分选中或者不选中
            context.commit('notAllSelect');
        }
    }
}