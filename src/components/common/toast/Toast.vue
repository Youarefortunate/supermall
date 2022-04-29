<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data() {
            return {
                message: '',
                isShow: false
            }
        },
        methods: {
            show(message='默认文本', duration=2000) {
                this.isShow = true;
                this.message = message;

                setTimeout(() => {
                    this.isShow = false,
                    this.message = ''
                }, duration)
            }
        }
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 8px 10px;
        color: #fff;
        background-color: rgb(0, 0, 0, .8);
        opacity: 70%;
    }
</style>