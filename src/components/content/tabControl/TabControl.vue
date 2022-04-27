<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" @click="itemClick(index)"
                class="tab-control-item" :class="{active: index === currentIndex}">
            <span>{{item}}</span>
        </div>
    </div>  
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                // 子组件发送事件传递到父组件中并携带参数
                this.$emit('tabClick',index);
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item {
        flex: 1;
    }
    .tab-control-item span {
        padding: 5px;
    }
    /* 活跃时的状态样式 */
    .active {
        color: var(--color-high-text);
        
    }
    .active span {
        border-bottom: 3px solid var(--color-tint);
    }
</style>