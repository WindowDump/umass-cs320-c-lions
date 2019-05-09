import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify)

Vue.config.productionTip = false
;(async () => {
  let forcedPage: string | undefined
  try {
    const { data } = await Axios.get('/users/me')
    ;(window as any).$user = data
    ;(window as any).Axios = Axios
  } catch (e) {
    forcedPage = 'login'
  }

  const vue = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')

  if (forcedPage) {
    vue.$router.replace(forcedPage)
  }
})()
