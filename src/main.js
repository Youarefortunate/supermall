import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //路由
import store from './store' // vuex

import FastClick from 'fastclick'
import toast from 'components/common/toast'
import mitt from 'mitt'
let app = createApp(App)

// vue3新的加入原型方式 createApp(App).config.globalProperties
app.config.globalProperties.$bus = new mitt()//使用mitt创建事件总线

// 解决移动端300ms点击延迟
FastClick.attach(document.body);
// 使用懒加载插件

app.use(store)
    .use(router)
    .use(toast)
    .mount('#app')

