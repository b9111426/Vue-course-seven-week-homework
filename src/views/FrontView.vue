<template>
  <FrontNavbar></FrontNavbar>
  <div class="container-fluid mt-3 position-relative">
    <router-view></router-view>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: {
    FrontNavbar
  }
}
</script>
