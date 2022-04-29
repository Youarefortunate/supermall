<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar class="navBar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <!-- 外套一个div的目的是是两个组件在一行显示 -->
    <div class="content">
        <!-- 左侧菜单 -->
        <tab-left-menu 
                :leftMenu="leftMenu" 
                @selectMenuItem="selectMenuItem"/>
        
        <scroll class="tab-content" ref="scroll">
          <!-- 每个分类菜单对应的商品信息 -->
          <tab-category-content :subcategories="subcategories" @imageLoad="imageLoad"/>
          <!-- tabControl -->
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
          <tab-category-detail :categoryDetail="categoryDetail"/>
        </scroll>
    </div>

  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'

  import TabLeftMenu from 'views/category/childComponents/TabLeftMenu'
  import TabCategoryContent from 'views/category/childComponents/TabCategoryContent'
  import TabCategoryDetail from 'views/category/childComponents/TabCategoryDetail'

  import {getLeftMenuData, getCategoryContent, getCategoryDetail} from 'network/category'

  import {itemListenerMixin} from 'common/mixin'
  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabControl,
      TabLeftMenu,
      TabCategoryContent,
      TabCategoryDetail
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        categories: [],
        leftMenu: [],
        subcategories: [],
        menuCurrentIndex: 0,
        categoryDetail: [],
        saveY: 0
      }
    },
    created() {
      this._getLeftMenuData();
    },
    activated() {
      // 到首页处于活跃的时候将上次的y坐标值赋值给better-scroll
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.off('imageLoad',this.itemImgListen);
    },
    methods: {
      // 请求左侧分类菜单数据
      _getLeftMenuData() {
        getLeftMenuData().then(res => {
          // console.log(res);
          this.categories = res.data.category.list;
          for(let i = 0; i < this.categories.length; i++) {
            this.leftMenu[i] = this.categories[i].title;
          }
          this._getCategoryContent(0);
        })
      },
      _getCategoryContent(index) {
        // 根据点击左侧菜单的下标值,取出数组categories中的maitKey
        const maitKey = this.categories[index].maitKey;
        getCategoryContent(maitKey).then(res => {
          // console.log(res);
          this.subcategories = res.data.list;

          // 当请求左侧菜单对应的右侧子类商品数据回来时就去请求下面的分类商品列表
          this._getCategoryDetail('pop');
        }) 
      },
      _getCategoryDetail(tabType) {
        const miniWallkey = this.categories[this.menuCurrentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, tabType).then(res => {
          this.categoryDetail = res;
        })
      },

      // 根据选择的左侧菜单的下标index来发送相应的商品分类的网络请求
      selectMenuItem(index) {
        this.menuCurrentIndex = index;
        this._getCategoryContent(index);
      },
      // 监听图片全部加载完成之后统一刷新
      imageLoad() {
        this.$refs.scroll.refresh();
      },
      // 点击tabControl
      tabClick(index, tabType) {
        this.$loading.showLoading(200);
        this._getCategoryDetail(tabType);
      }
    }
  }
</script>

<style  scoped>
  #category {
    height: 100vh;
  }
  .navBar {
    color: #fff;
    background-color: var(--color-tint);
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  .tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>