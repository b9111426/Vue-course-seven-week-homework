import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/CouponView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: 'quest',
        component: () => import('../views/QuestionView.vue')
      },
      {
        path: 'newer',
        component: () => import('../views/NewUser.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Dashboard/AdminProducts.vue')
      },
      {
        path: 'order',
        component: () => import('../views/Dashboard/AdminOrder.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/Dashboard/AdminCoupon.vue')
      },
      {
        path: 'article',
        component: () => import('../views/Dashboard/AdminArticle.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Dashboard/AdminCart.vue')
      }
    ]
  },
  {
    path: '/:patchMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
