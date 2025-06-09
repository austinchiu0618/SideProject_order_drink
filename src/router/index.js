import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/orderDrink'
  },
  {
    path: '/orderDrink',
    name: 'orderFood',
    component: () => import('../views/orderFood.vue')
  },
  {
    path: '/orderCar',
    name: 'orderCar',
    component: () => import('../views/orderCar.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('../views/orderList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
