<template>
  <h2>產品列表</h2>
  <div class="container text-start">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr class="table-light">
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120" class="text-end">
            原價
          </th>
          <th width="120" class="text-end">
            售價
          </th>
          <th width="130" class="text-center">
            是否啟用
          </th>
          <th width="120" class="text-center">
            編輯
          </th>
        </tr>
      </thead>
      <tbody v-for="item in products" :key="item.id">
        <tr>
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-end">{{item.origin_price}}</td>
          <td class="text-end">{{item.price}}</td>
          <td>
            <div class="container">
              <div class="d-flex flex-row">
                <div class="form-check form-switch">
                  <input class="form-check-input me-2" type="checkbox" :id="item.id" v-model="item.is_enabled" @change="updateProduct(item,item.id)">
                  <label class="form-check-label" :for="`flexSwitchCheckDefault${item.id}`">
                    <span v-if="item.is_enabled" class="text-success">啟用</span>
                    <span v-else>未啟用</span>
                  </label>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 分頁 -->
  <Pagination :pages='pagination' @emit-pages="getProducts"></Pagination>

  <!-- 刪除產品 -->
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"></DelModal>

  <!-- 新增、編輯產品 -->
  <ProductModifyModal @update-product="updateProduct" :product="tempProduct" :isNew="isNew" ref="productModal"></ProductModifyModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import DelModal from '@/components/DelModal.vue'
import ProductModifyModal from '@/components/ProductModifyModal.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      products: [],
      isNew: false,
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      currentPage: 1
    }
  },
  components: {
    Pagination,
    DelModal,
    ProductModifyModal
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    openModal(isNew, product) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...product }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    updateProduct(product, id) {
      this.emitter.emit('loading')
      this.tempProduct = product
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          productComponent.hideModal()
          this.$httpMessageState(res, '更新付款狀態')
          this.getProducts(this.currentPage)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息')
        })
    },
    openDelModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((res) => {
        const delComponent = this.$refs.delModal
        this.emitter.emit('loading')
        delComponent.hideModal()
        this.$httpMessageState(res, res.data.message)
        this.getProducts(this.currentPage)
      }).catch((err) => {
        this.$httpMessageState(err.response, '錯誤訊息')
      })
    }
  },
  mounted() {
    this.emitter.emit('loading')
    this.getProducts()
  }
}
</script>
