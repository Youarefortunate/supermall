<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages" :key="item">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
    import { Swiper, SwiperItem } from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        // 传递商品详情页的轮播图数据
        props: {
            topImages: {
                type: Array,
                default() {
                    return []
                }
            }
        },
    }
</script>

<style scoped>
    /* 这里的类名不要用swiper */
    .detail-swiper {
        height: 300px;
        overflow: hidden;
    }

    img { 
        width: 100%;
    }
</style>