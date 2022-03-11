<template>
  <Loading :active="isLoading" :z-index="1060" :color="'#F19757'"></Loading>
  <ToastMessages></ToastMessages>
  <router-view />
</template>

<script>
import emitter from '@/libs/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
export default {
  components: { ToastMessages },
  data() {
    return {
      isLoading: false
    }
  },
  provide() {
    return {
      emitter
    }
  },
  methods: {
    loading() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },
  mounted() {
    emitter.on('loading', () => {
      this.loading()
    })
  }
}
</script>
<style lang="scss">
@import 'bootstrap/scss/bootstrap';

#app {
  text-align: center;
  color: #2c3e50;
}
</style>
