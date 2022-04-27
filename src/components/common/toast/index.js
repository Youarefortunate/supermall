import Toast from 'components/common/toast/Toast'
import { createApp } from 'vue'

const obj = {}

// 封装自定义插件
obj.install = app => {

    // 实例化并绑定组件
    const toastConstructor = createApp(Toast);
    const instance = toastConstructor.mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    // 添加原型
    app.config.globalProperties.$toast = instance;


}
export default obj