<template>
    <div>
        <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories">
            <div class="item" v-for="(item, index) in subcategories" :key="index">
                <a :href="item.link">
                    <img class="item-img" @load="imageLoad" :src="item.image" alt="">
                    <div class="item-text">{{item.title}}</div>
                </a>
            </div>
        </grid-view>
    </div>
</template>

<script>
    import GridView from 'components/common/gridView/GridView'
    export default {
        name: "TabCategoryContent",
        components: {
            GridView
        },
        data() {
            return {
                imagesLength: 0,
                count: 0
            }
        },
        props: {
            subcategories: {
                type: Array, 
                default: () => []
            }
        },
        methods: {
            imageLoad() {
                if(++this.count == this.imagesLength) {
                    this.$emit('imageLoad');
                }
            }
        },
        watch: {
            subcategories() {
                return this.imagesLength = this.subcategories.length;
            }
        }
    }
</script>

<style scoped>
    .item {
        text-align: center;
        font-size: 12px;
    }
    .item-img {
        width: 80%;
    }
    .item-text {
        margin-top: 15px;
    }
</style>