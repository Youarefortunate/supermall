<template>
    <div>
        <grid-view>
            <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"/>
        </grid-view>
    </div>
</template>

<script>
    import GridView from 'components/common/gridView/GridView'
    import GoodsListItem from 'components/content/goods/GoodsListItem'
    export default {
        name: "TabCategoryDetail",
        components: {
            GridView,
            GoodsListItem
        },
        props: {
            categoryDetail: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>

</style>