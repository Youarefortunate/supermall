<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        // 模板已经渲染完成成为html
        mounted() {
            // document.querySelector('.wrapper')可以根据指定类名找到其标签
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType: this.probeType, //是否实时监听滚动
                pullUpLoad: this.pullUpLoad, // 是否监听上拉加载更多事件
                // observeImage: true,
                // observeDOM: true,
                click: true,
            })
            // 获取滚动坐标
            if(this.probeType === 2 || this.probeType === 3) {
                this.scroll.on('scroll',(position) => {
                    // console.log(position);
                    this.$emit('scroll',position);
                })
            }
            // 监听上拉事件
            if(this.pullUpLoad) {
                this.scroll.on('pullingUp',() => {
                    this.$emit('pullingUp');
                })
            }
            
        },
        methods: {
            scrollTo(x, y, time=300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp();
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0;
            }
        }
    }
</script>

<style scoped>

</style>