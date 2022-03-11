<template>
  <div class="topHeader">
    <nav class="navbar navbar-expand-lg navbar-light bg-light position-relative">
      <div class="container mt-5">
        <div class="d-flex align-items-end">
          <router-link class="navbar-brand fs-2 pb-2" style="line-height: 1;" to="/">橘子咖啡</router-link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav   mb-lg-0 mx-5">
              <li class="nav-item">
                <router-link class="nav-link" to="/products">所有商品</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/coupon">取得優惠卷</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">關於橘子</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/quest">常見問題</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/newer">新手專區</router-link>
              </li>
              <li class="nav-item adminBtn">
                <router-link class="nav-link" to="/admin">後台管理</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FrontAdmin class="position-absolute  top-0 end-0  me-2 mt-2"></FrontAdmin>
    </nav>
  </div>
</template>

<script>
import FrontAdmin from './FrontAdmin.vue'

export default {
  components: {
    FrontAdmin
  }
}
</script>

<style lang="scss" scoped>
.topHeader .navbar-nav li > a {
  text-transform: capitalize;
  color: #333;
  transition: background-color 0.2s, color 0.2s;

  &:hover,
  &:focus {
    background-color: #333;
    color: #fff;
  }
}
</style>
