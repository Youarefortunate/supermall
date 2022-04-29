<template>
    <div v-if="isShowLoading">
        <div class="container"></div>
        <div class="loadingGif">
            <img src="~assets/img/loadingGif/loading.gif" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name:"Loading",
        data() {
            return {
                isShowLoading: false
            }
        },
        methods: {
            showLoading(delay=1000) {
                this.isShowLoading = true;
                setTimeout(() => {
                    this.isShowLoading = false;
                }, delay)
            }
        }
    }
</script>

<style scoped>
    /* 加载图标的那个div */
    .container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background:rgb(126, 126, 126);
        opacity: 50%;
        z-index: 1;
    }
    .loadingGif {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
    }
    /* gif图 */
    .loadingGif img {
        width: 130px;
        height: 110px;
        border-radius: 10px;
        opacity: 80%;
    }
</style>