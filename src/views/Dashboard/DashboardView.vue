<template>
  <AdminNavbar></AdminNavbar>
  <div class="container-fluid mt-3 position-relative">
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar
  },
  mounted() {
    this.emitter.emit('loading')
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http.post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch(() => {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '請先登入'
            })
            this.$router.push('/login')
          })
      } else {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '請先登入'
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>
