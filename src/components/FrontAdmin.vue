<template>
  <div class="d-flex flex-row">
    <a href="#" class="btn btn-outline-secondary btn-sm mx-1" type="button" @click.prevent="checkLogin">
      <i class="bi bi-person-fill"></i>
      登入會員
    </a>

    <router-link type="button" to="/cart" class="btn btn-outline-secondary btn-sm mx-1 position-relative ">
      <i class="bi bi-cart-fill"></i>
      購物車
      <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" v-if="cartData.carts?.length>0">{{cartData.carts?.length}}</span>
    </router-link>
    <button type="button" class="btn btn-outline-secondary btn-sm mx-1">
      <i class="bi bi-chat-fill"></i>
      聯絡我們
    </button>
    <button type="button" class="btn btn-outline-secondary btn-sm mx-1">
      <i class="bi bi-geo-alt-fill"></i>
      門市查詢
    </button>
    <button type="button" class="btn btn-outline-secondary btn-sm mx-1">
      <i class="bi bi-search"></i>
      找產品
    </button>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data() {
    return {
      cartData: {
        carts: []
      }
    }
  },
  methods: {
    getCart() {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
    },
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http.post(api, { api_token: this.token })
          .then(() => {
            this.$router.push('/admin')
          }).catch(() => {
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
  },
  mounted() {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
