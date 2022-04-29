<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
                    class="check-all" 
                    :isCheck="isSelectAll" 
                    @click="checkClick"/>
            <span style="font-size: 14px">全选</span>
        </div>

        <div class="totalPrice">
            合计: {{totalPrice}}
        </div>

        <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        methods: {
            checkClick() {
                this.$store.dispatch('checkAllClick', this.isSelectAll);
            },
            calcClick() {
                if(!this.isSelectAll) {
                    this.$toast.show("请先添加商品")
                }
            }
        },
        computed: {
            ...mapGetters(['cartList', 'isSelectAll']),
            totalPrice() {
                return "¥" + this.cartList.filter(item => {
                    return item.checked
                }).reduce((perValue, item) => {
                    return item.price * item.count + perValue
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList? this.cartList.filter(item => item.checked).length: 0
            },
            
        }
    }
</script>

<style scoped>
    .bottom-bar {
        width: 100%;
        height: 60px;
        background-color: #eee;
        position: absolute;
        left: 0;
        bottom: 49px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .check-content {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .check-all {
        width: 17px;
        height: 17px;
        margin-right: 5px;
    }

    .totalPrice {
        font-size: 14px;
        margin-left: 20px;
    }
    .calculate {
        color: #fff;
        margin-right: 10px;
        width: 100px;
        height: 40px;
        border-radius: 30px;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-image: linear-gradient(45deg, #29bdd9 0%, #276ace 100%); */
        background-image: linear-gradient(45deg, #ff9569 0%, #e92758 100%);
        /* background-image: linear-gradient(45deg, #C6FFDD 0%, #FBD786 50%, #f7797d 100%); */
        /* background-image: linear-gradient(45deg, #f12711 0%, #f5af19 100%); */
    }
</style>