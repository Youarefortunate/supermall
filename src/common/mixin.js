import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListen: null 
        }
    },
    mounted() {
        // 1、图片加载事件的监听
        const refresh = debounce(this.$refs.scroll.refresh, 200);
        // 监听发射出去的事件总线,响应
        this.itemImgListen = () => {
            refresh();
        }
        this.$bus.on('imageLoad', this.itemImgListen);
    },
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        // 返回顶部
        backTopClick() {
            this.$refs.scroll.scrollTo(0, 0);
        }
    },
    components: {
        BackTop
    }
}