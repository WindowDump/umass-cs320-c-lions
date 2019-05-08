import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify)

Vue.config.productionTip = false
;(async () => {
  let shouldVisitLogin = false
  try {
    const { data } = await Axios.get('/users/me')
    ;(window as any).$user = data
  } catch (e) {
    shouldVisitLogin = true
  }

  const vue = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')

  if (shouldVisitLogin) {
    vue.$router.replace('login')
  }
})()
