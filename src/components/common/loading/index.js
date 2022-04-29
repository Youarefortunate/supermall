import Loading from 'components/common/loading/Loading'
import { createApp } from 'vue'

const loadingObject = {}

loadingObject.install = app => {
    // 实例化并绑定组件
    const loadingConstructor = createApp(Loading);
    const instance = loadingConstructor.mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    // 添加原型
    app.config.globalProperties.$loading = instance;
}

export default loadingObject