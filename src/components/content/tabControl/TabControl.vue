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
                default: () => []
            }
        },
        data() {
            return {
                currentIndex: 0, 
                tabType: 'pop'
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                const currentTitle = this.titles[this.currentIndex];
                if(currentTitle == '综合') {
                    this.tabType = 'pop'
                } else if(currentTitle == '新品') {
                    this.tabType = 'new'
                } else {
                    this.tabType = 'sell'
                }
                // 子组件发送事件传递到父组件中并携带多个参数
                this.$emit('tabClick',index, this.tabType);
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