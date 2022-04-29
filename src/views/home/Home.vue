<template>
    <div id="home">
        <nav-bar class="home-nav">
            <!-- 新版插槽使用方式得跟上一个template标签,在这个标签里面使用属性v-slot:插槽的name -->
            <template v-slot:center>购物街</template>
        </nav-bar>
        <tab-control 
                    :titles="['流行','新款','精选']" v-show="isTabFixed"
                    @tabClick="tabClick" ref="tabControl1" class="tab-control"/>
        <scroll class="content" ref="scroll" 
                :probe-type="3" @scroll="contentScroll"
                @pullingUp="loadMore"
                :pull-up-load="true"
                >
            <!-- home子组件轮播图 -->
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <!-- home子组件推荐列表 -->
            <home-recommend :recommends="recommends"/> 
            <feature-view/>

            <tab-control 
                    :titles="['流行','新款','精选']" v-show="!isTabFixed"
                    @tabClick="tabClick" ref="tabControl2"/>
            <!-- currentType有三个值:pop、new、sell -->
            <goods-list :goods="showGoods"/>
        </scroll>
        <!-- 也可以直接监听组件的点击 -->
        <back-top @click="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    // 公共组件NavBar
    import NavBar from 'components/common/navBar/NavBar';
    // 导入公共组件TabControl
    import TabControl from 'components/content/tabControl/TabControl';
    // 导入公共组件GoodsList
    import GoodsList from 'components/content/goods/GoodsList';
    // 导入公共组件Scroll
    import Scroll from  'components/common/scroll/Scroll';

    // 导入子组件HomeSwiper
    import HomeSwiper from 'views/home/childComponents/HomeSwiper';
    // 导入子组件推荐列表HomeRecommends
    import HomeRecommend from 'views/home/childComponents/HomeRecommend';
    // 导入子组件FeatureView
    import FeatureView from 'views/home/childComponents/FeatureView';

    import { getHomeMultiData, getHomeGoodsList } from 'network/home';

    import {itemListenerMixin, backTopMixin} from 'common/mixin'

    export default {
        name:'Home',
        components: {
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            HomeSwiper,
            HomeRecommend,
            FeatureView,
        },
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                banners: [], //轮播图列表
                recommends: [], //推荐列表
                // 商品列表展示
                goods: {
                    'pop':{page: 0, list:[]}, // 流行
                    'new':{page: 0, list:[]}, // 新款
                    'sell':{page: 0, list:[]}, // 精选
                },
                currentType: 'pop',
                isShowBackTop: false, // 是否显示返回顶部图标
                tabOffsetTop: 0, // 标签距离屏幕顶部的偏移量
                isTabFixed: false, //默认tabControl是否吸顶
                saveY: 0, // 保存离开首页时better-scroll的y值
            }
        },
        computed: {
            // 返回商品列表显示的是哪一种类型的页面(流行、新款、精选)
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            // 请求轮播图和推荐列表数据
            this.getHomeMultiData();
            // 获取商品列表展示数据
            this.getHomeGoodsList('pop');
            this.getHomeGoodsList('new');
            this.getHomeGoodsList('sell');
        },
        mounted() {
            // // 1、图片加载事件的监听
            // const refresh = debounce(this.$refs.scroll.refresh, 200);
            // // 监听发射出去的事件总线,响应
            // this.itemImgListen = () => {
            //     refresh();
            // }
            // this.$bus.on('imageLoad',this.itemImgListen);
        },
        // vue3将销毁生命周期函数destroyed修改成了unmounted
        // unmounted() {
        //     console.log("首页销毁");
        // },
        activated() {
            // 到首页处于活跃的时候将上次的y坐标值赋值给better-scroll
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.refresh();
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY();
            // 取消首页全局事件监听
            this.$bus.off('imageLoad',this.itemImgListen);
        },
        methods: { 
            // 请求轮播图和推荐列表数据(在methods里面写具体的步骤)
            getHomeMultiData() {
                getHomeMultiData().then(res => {
                // console.log(res);
                if(res.returnCode == "SUCCESS") {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                    }
                })
            },
            // 获取商品列表展示数据(在methods里面写具体的步骤)
            getHomeGoodsList(type) {
                const page = this.goods[type].page + 1;
                getHomeGoodsList(type,page).then(res => {
                    // 像这种做法是直接赋值,到时候会产生问题,第二页的数据会覆盖掉第一次得数据(不可取)
                    // this.goods[type].list = res.data.list;
                    // ...可以将res.data.list(数组)里面的元素一个一个解析出来,然后再通过push()方法一个一个推入到goods中的list数组中去(该方法不会产生覆盖问题)
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    // 上拉加载更多动作已完成
                    page > 1 && this.$refs.scroll.finishPullUp();
                })
            },
            // 接收子组件发射出来的事件并响应
            tabClick(index) {
                this.$loading.showLoading(200);
                // console.log(index);
                // 根据点击的tab的index给currentType赋值一个字符串
                switch(index) {
                    case 0: this.currentType = 'pop'; break;
                    case 1: this.currentType = 'new'; break;
                    case 2: this.currentType = 'sell'; break;
                }
                
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            // 监听滚动高度变化
            contentScroll(position) {
                // console.log(position);
                // position.y <= -500?this.isShowBackTop = true:this.isShowBackTop = false;
                // 判断backTop是否显示
                this.isShowBackTop = (-position.y) > 1000;
                // 判断tabControl是否吸顶(position:fixed),滑动距离屏幕顶部的距离是否大于tabControl距离屏幕顶部的偏移量
                this.isTabFixed = (-position.y) > this.tabOffsetTop;
            },
            // 上拉加载更多
            loadMore() {
                getHomeGoodsList(this.currentType);
            },
            // 监听轮播图是否加载完毕
            swiperImageLoad() {
                // 获取tabControl的offsetTop
                // 所以组件都有一个属性$el,该属性用于获取组件中的元素
                // console.log(this.$refs.tabControl.$el.offsetTop); 613
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            }
        }
    }
</script>

<style scoped>
    #home {
        /* padding-top: 44px; */
        /* vh  --> viewport(视口) height针对当前屏幕所能见到的屏幕高度的100% */
        height: 100vh;
        position: relative;
    }
    .home-nav {
        color: #fff;
        background-color: var(--color-tint);
        /* position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9; */
    }
    

    .content {
        height: calc(100% - 93px);
        overflow: hidden;
        /* margin-top: 44px; */
        /* position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0; */
    }

</style>