import { createPinia } from 'pinia'

export default {
    install: (app) => {
        app.use(createPinia())

        //https://uniapp.dcloud.io/api/router.html#navigateto
        app.config.globalProperties.$navigateTo = (path, options = {}) => uni.navigateTo({url: path, ...options})
    }
}