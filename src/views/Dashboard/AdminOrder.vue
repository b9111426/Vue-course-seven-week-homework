<template>
  <h2>後台訂單</h2>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr class="table-light">
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <div class="form-check form-switch">
                  <input class="form-check-input me-2" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid" @change="updatePaid(item)" />
                  <label class="form-check-label" :for="`paidSwitch${item.id}`">
                    <span v-if="item.is_paid" class="text-success">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" type="button" @click="openModal(item)">
                  檢視
                </button>
                <button class="btn btn-outline-danger btn-sm" type="button" @click="openDelOrderModal(item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
</template>
<script>
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
import OrderModal from '@/components/OrderModal.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
      }).catch((err) => {
        this.$httpMessageState(err.response, '錯誤訊息')
      })
    },
    openModal(item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updatePaid(item) {
      this.emitter.emit('loading')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((res) => {
        const orderComponent = this.$refs.orderModal
        orderComponent.hideModal()
        this.getOrders(this.currentPage)
        this.$httpMessageState(res, res.data.message)
      }).catch((err) => {
        this.$httpMessageState(err.response, '錯誤訊息')
      })
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(url)
        .then((res) => {
          this.emitter.emit('loading')
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getOrders(this.currentPage)
          this.$httpMessageState(res, '刪除')
        }).catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    }
  },
  mounted() {
    this.emitter.emit('loading')
    this.getOrders()
  }
}
</script>
