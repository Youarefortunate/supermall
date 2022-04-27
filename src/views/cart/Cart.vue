<template>
    <div class="cart">
        <!-- 导航栏 -->
        <nav-bar class="nav-bar">
            <template v-slot:center>购物车({{cartLength}})</template>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list/>
        <!-- 底部汇总 -->
        <cart-bottom-bar/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar' 
    import CartList from './childComponents/CartList'
    import CartBottomBar from './childComponents/CartBottomBar'
    // 导入vuex中的mapGetters,mapGetters是vuex里面已经定义好了的
    import {mapGetters} from 'vuex'
    export default {
        name:'Cart',
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            // 用法一,多个getters里面的东西在这里面的数组里使用逗号隔开
            ...mapGetters(['cartLength']),
            // 用法二,使用自己起的名称
            // ...mapGetters({
            //     length: 'cartLength'
            // })
        }
    }
</script>

<style scoped>
    .nav-bar {
        color: #fff;
        background: var(--color-tint);
    }
</style> 