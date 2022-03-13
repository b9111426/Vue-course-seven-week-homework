<template>
  <h2>後台優惠卷</h2>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr class="table-light">
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <div class="d-flex justify-content-center">
              <div class="form-check form-switch">
                <input class="form-check-input me-2" type="checkbox" :id="item.id" v-model="item.is_enabled" :true-value="1" :false-value="0" @change="updateCoupon(item,item.id)">
                <label class="form-check-label" :for="`couponSwitch${item.id}`">
                  <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
                </label>
              </div>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal :coupon="tempCoupon" :is-new="isNew" ref="couponModal" @update-coupon="updateCoupon"></CouponModal>
  <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"></DelModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
export default {
  inject: ['emitter'],
  components: { CouponModal, DelModal },
  props: {
    config: Object
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false
    }
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    getCoupons() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct).then((response) => {
        this.coupons = response.data.coupons
      }).catch((err) => {
        this.$httpMessageState(err.response, '錯誤訊息')
      })
    },
    updateCoupon(item, id) {
      this.emitter.emit('loading')
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMeths = 'post'
      this.tempCoupon = item
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        httpMeths = 'put'
      }
      this.$http[httpMeths](url, { data: this.tempCoupon }).then((res) => {
        this.getCoupons()
        this.$refs.couponModal.hideModal()
        this.$httpMessageState(res, '更新付款狀態')
      }).catch((err) => {
        this.$httpMessageState(err.response, '錯誤訊息')
      })
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(url).then((res) => {
        this.emitter.emit('loading')
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.$httpMessageState(res, res.data.message)
        this.getCoupons()
      }).catch((err) => {
        this.$httpMessageState(err.response, '錯誤訊息')
      })
    }
  },
  created() {
    this.emitter.emit('loading')
    this.getCoupons()
  }

}
</script>
