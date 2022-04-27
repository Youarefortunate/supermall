<template>
    <div class="goods-item" @click="goToDetail">
        <!-- 
            @load是vue内封装好了的监听图片是否加载完毕事件,图片加载完毕触发此事件
            原生js里面监听图片加载:img.onLoad = function(){}
        -->
        <img :src="showImages" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            showImages() {
                return this.goodsItem.image || this.goodsItem.show.img
            }
        },
        methods: {
            // 监听图片加载事件
            imageLoad() {
                // 发射出去一个监听图片是否加载完毕的事件总线
                this.$bus.emit("imageLoad");
            },
            // 跳转到商品详情页
            goToDetail() {
                // 获取点击的商品的iid
                // console.log(this.goodsItem.iid);
                this.$router.push('/detail/' + this.goodsItem.iid);
            }
        }
        
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
        /* z-index: -1; */
    }
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 5px;
    }
    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>