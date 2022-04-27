import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  { // 首页
    path: "/home",
    component: () => import("views/home/Home"),
    meta: {
      // 用于控制tabBar是否可见
      footShow: true
    }
  },
  { // 详情页(动态路由)
    path: "/detail/:iid",
    component: () => import("views/detail/Detail"),
    meta: {
      footShow: false
    }
  },
  { // 分类
    path: "/category",
    component: () => import("views/category/Category"),
    meta: {
      footShow: true
    }
  },
  { // 购物车
    path: "/cart",
    component: () => import("views/cart/Cart"),
    meta: {
      footShow: true
    }
  },
  { // 我的
    path: "/profile",
    component: () => import("views/profile/Profile"),
    meta: {
      footShow: true
    }
  },
]

const router = createRouter({
  // mode: 'history'
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
