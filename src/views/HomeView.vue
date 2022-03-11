<template>
  <img class="min-vw-100" src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="">
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
    }
  },
  mounted() {
    this.emitter.emit('loading')
  }
}
</script>
