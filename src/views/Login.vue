<template>

  <div class="container">
    <div class=" vh-100 d-flex flex-column align-items-center justify-content-center">
      <div class=" row justify-content-center">
        <h1 class="h2 mb-3 font-weight-normal ">
          後台管理中心
        </h1>
        <div class="col-8 ">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" placeholder="name@example.com" v-model="user.username" required autofocus>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password" required>
              <label for="password">Password</label>
            </div>
            <div class="form-check my-3 d-flex justify-content-start">
              <input class="form-check-input me-2" type="checkbox" value="" id="loginChecked" />
              <label class="form-check-label" for="loginChecked"> 記住我 </label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click="signIn">
              登入
            </button>
          </form>
        </div>
        <p class="mt-3 mb-3 text-muted ">
          &copy; 2022 - 傑瑞
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$httpMessageState(res, '登入')
          this.$router.push('/admin')
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '發生錯誤'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
