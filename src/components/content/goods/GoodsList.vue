<template>
    <div class="goods">
        <!-- goods是一个数组,循环之后的item是数组里面的每一个对象元素 -->
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'
    export default {
        name: "GoodsList",
        components: {
            GoodsListItem
        },
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>