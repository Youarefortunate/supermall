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
          <tab-category-content :subcategories="subcategories" @imageLoad="imageLoad"/>
        </scroll>
    </div>

  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabLeftMenu from 'views/category/childComponents/TabLeftMenu'
  import TabCategoryContent from 'views/category/childComponents/TabCategoryContent'

  import {getLeftMenuData, getCategoryContent} from 'network/category'
  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabLeftMenu,
      TabCategoryContent
    },
    data() {
      return {
        categories: [],
        leftMenu: [],
        subcategories: []
      }
    },
    created() {
      this._getLeftMenuData();
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
        }) 
      },

      selectMenuItem(index) {
        this._getCategoryContent(index);
      },
      imageLoad() {
        this.$refs.scroll.refresh();
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