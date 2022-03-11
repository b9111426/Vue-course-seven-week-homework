<template>
  <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500">
    <div v-for="(msg, key) in messages" :key="key" class="toast show" :class="`toast${key}`" role="alert">
      <div class="toast-header">
        <i v-if="msg.style === 'success'" :class="`text-${msg.style}`" class="bi bi-check-square-fill fs-3  me-2"></i>
        <i v-else :class="`text-${msg.style}`" class="bi bi-exclamation-square-fill fs-3  me-2"></i>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" @click="clearToast(key)" aria-label="Close"></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift()
      }, 4000)
    },
    clearToast(index) {
      this.messages.splice(index, 1)
    }
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      // 接收資料
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
