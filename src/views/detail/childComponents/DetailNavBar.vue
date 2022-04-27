<template>
    <div >
        <nav-bar>
            <template v-slot:left>
                <div class="back" @click="backClick">
                    <img src="~assets/img/common/back.svg" alt="">
                </div>
            </template>
            <template v-slot:center>
                <div class="titles">
                    <div v-for="(item, index) in titles" :key="index" @click="titleClick(index)"
                    class="title-item" :class="{active: currentIndex === index}">
                        {{item}}
                    </div>
                </div>
            </template>
        </nav-bar>
    </div>
</template>

<script>
    // 公共组件NavBar
    import NavBar from 'components/common/navBar/NavBar';
    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        methods: {
            // 返回首页商品列表
            backClick() {
                // 返回上一级路由
                // this.$router.go(-1);
                this.$router.back();
            },
            titleClick(index) {
                this.currentIndex = index;
                // 将点击的详情页tab的index传递出去给父组件
                this.$emit('titleClick', index);
            }
        }
    }
</script>

<style scoped>
    .back img {
        vertical-align: middle;
    }
    .titles {
        display: flex;
        font-size: 13px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
</style>