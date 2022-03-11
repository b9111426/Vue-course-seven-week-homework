import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import CKEditor from '@ckeditor/ckeditor5-vue'

import App from './App.vue'
import router from './router'
import { date, currency } from './libs/filters'
import $httpMessageState from './libs/pushMessageState'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(router)
app.use(CKEditor)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.mount('#app')
