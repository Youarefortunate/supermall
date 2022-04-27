<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll 
            class="content" :probeType="3" 
            :pullUpLoad="true" ref="scroll"
            @scroll="contentScroll">
            <detail-swiper :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :paramInfo="paramInfo"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top @click="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import DetailNavBar from 'views/detail/childComponents/DetailNavBar'
    import DetailSwiper from 'views/detail/childComponents/DetailSwiper'
    import DetailBaseInfo from 'views/detail/childComponents/DetailBaseInfo'
    import DetailShopInfo from 'views/detail/childComponents/DetailShopInfo'
    import DetailGoodsInfo from 'views/detail/childComponents/DetailGoodsInfo'
    import DetailParamInfo from 'views/detail/childComponents/DetailParamInfo'
    import DetailCommentInfo from 'views/detail/childComponents/DetailCommentInfo'
    import DetailBottomBar from 'views/detail/childComponents/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'
    
    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail';

    import {itemListenerMixin, backTopMixin} from 'common/mixin'

    import {mapActions} from 'vuex'
    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodsList
        },
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                currentIndex: 0,
                
            }
        },
        created() {
            // 保存传入的商品的iid
            // console.log(this.$route.params.iid);
            this.iid = this.$route.params.iid;
            // 获取商品详情页的数据
            getDetail(this.iid).then(res => {
                // console.log(res);
                const data = res.result;
                this.topImages = res.result.itemInfo.topImages;
                // 获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                // 创建店铺信息对象
                this.shop = new Shop(data.shopInfo);
                // 保存商品的详情数据
                this.detailInfo = data.detailInfo;
                // 获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                // 取出评论信息
                if(data.rate.cRate !== 0) {
                    // data.rate.list[0]只取出一条评论信息
                    this.commentInfo = data.rate.list[0];
                }

                // this.$nextTick(() => {
                //     this.themeTopYs = [];
                //     this.themeTopYs.push(0);
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                //     console.log(this.themeTopYs); 
                // })
            })
            // 请求推荐数据
            getRecommend().then(res => {
                // console.log(res);
                this.recommends = res.data.list;
            })
        },
        unmounted() {
            // 取消详情页全局事件监听
            this.$bus.off('imageLoad', this.itemImgListen);
        },
        methods: {
            ...mapActions(['addCart']),
            // 图片加载完毕之后进行统一刷新
            imageLoad() {
                this.$refs.scroll.refresh();
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE);
                // console.log(this.themeTopYs); 
            },
            // 顶部tab点击事件
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
                // console.log(-this.themeTopYs[index]);
            },
            // 监听scroll的滚动
            contentScroll(position) {
                // console.log(position);
                const positionY = -position.y;
                const length = this.themeTopYs.length;
                for(let i = 0; i<this.themeTopYs.length - 1; i++) {
                    if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                }
                // for(let i = 0; i<this.themeTopYs.length; i++) {
                //     if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                //         this.currentIndex = i;
                //         this.$refs.nav.currentIndex = this.currentIndex;
                //     }
                // }

                // 是否显示返回顶部图标
                this.isShowBackTop = (-position.y) > 1000;
            },
            // 添加到购物车
            addToCart() {
                // 获取购物车需要展示的信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                // 将添加的商品的信息存放到vuex中,dispatch()会返回一个Promise
                // this.$store.dispatch('addCart', product).then(res => {
                //     console.log(res);
                // })
                // 使用map映射action里面的异步函数addCart
                this.addCart(product).then(res => {
                    this.$toast.show(res)
                })
            }
        },
        
    }
</script>

<style scoped>
    #detail {
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        /* 注意这里calc如果前面存在加减乘除符号的话,加减乘除符号前后都必须要有一个空格,否则无效 */
        height: calc(100% - 44px - 55px);
        overflow: hidden;
    }
</style>