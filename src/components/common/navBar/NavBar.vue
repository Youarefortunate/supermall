<template>
    <!-- 导航栏插槽组件 -->
    <div class="nav-bar">
        <!-- 因为到时候slot标签会被替换掉,存在slot标签上面的class、id等样式也会被抹去 -->
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    .nav-bar {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100,100,100,.1);
    }
    .left, .right {
        width: 60px;
    }
    .center {
        flex: 1;
    }
</style>