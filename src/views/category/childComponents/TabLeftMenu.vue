<template>
    <scroll id="tab-menu" ref="scroll">
        <div class="menu-list">
            <div   
                v-for="(item, index) in leftMenu" :key="index" 
                class="menu-list-item" @click="menuListClick(index)"
                :class="{menuListActive:currentTarget === index} ">{{item}}</div>
        </div>
    </scroll>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll'
    export default {
        name: "TabLeftMenu",
        components: {
            Scroll
        },
        data() {
            return {
                currentTarget: 0
            }
        },
        props: {
            leftMenu: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            menuListClick(index) {
                this.currentTarget = index;
                this.$emit('selectMenuItem', index);
            }
        }
    }
</script>

<style scoped>
    #tab-menu {
        height: 100%;
        overflow: hidden;
        background-color: #eee;
    }
    .menu-list {
        width: 100px;
        
    }
    .menu-list-item {
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
    }
    .menuListActive {
        font-weight: 700;
        color: var(--color-high-text);
        background-color: #fff;
        border-left: 3px solid var(--color-high-text);
    }
</style>