<template>
    <!-- 轮播图 -->
    <swiper>
        <swiper-item v-for="item in banners" :key="item">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    // 对象解构
    import {Swiper,SwiperItem} from 'components/common/swiper';
    export default {
        name: "HomeSwiper",
        props: {
            banners: {
                type:Array,
                // 这里需要注意一下,如果当父传子的时候传递的是一个数组或者对象的话,default这个东西需要是一个函数,并且里面return出一个默认的空对象或者空数组
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                isLoad: false
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        methods: {
            imageLoad() {
                if(!this.isLoad) {
                    this.$emit('swiperImageLoad');
                    this.isLoad = true;
                }
                
            }
        }
    }
</script>

<style scoped>
    /* 轮播图图片完全显示 */
    img {
        width: 100%;
    }
</style>