import Vue from 'vue'
import VueRouter from 'vue-router'
import Myorder from '../components/Myorder'
import Addr from '../components/Addr'
Vue.use(VueRouter)
  const routes = [
    {
      path: '/Addr',
      component: Addr
    },
    {
      path: '/Myorder',
      component: Myorder
    },
    {
      path: '/updatAddress',
      name: 'updatAddress',
      component: () => import(/* webpackChunkName: "updatAddress" */ '../components/updatAddress.vue'),
    },
    {
      path: '/xinaddress',
      name: 'xinaddress',
      component: () => import(/* webpackChunkName: "xinaddress" */ '../components/xinaddress.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import(/* webpackChunkName: "pay" */ '../components/pay.vue'),
      meta:{keepAlive:true}
    },
  {
    path: '/Step/:did',
    name: 'Step',
    component: () => import(/* webpackChunkName: "Step" */ '../components/Step.vue'),
    props:true
  },
  {
    path: '/Cookbook/:tid',
    name: 'Cookbook',
    component: () => import(/* webpackChunkName: "Cookbook" */ '../components/Cookbook.vue'),
    props:true
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: () => import(/* webpackChunkName: "confirmOrder" */ '../components/confirmOrder.vue'),
    meta:{keepAlive:true}
  },
  {
    path: '/shoppingpage',
    name: 'shoppingpage',
    component: () => import(/* webpackChunkName: "shoppingpage" */ '../components/shoppingpage.vue')
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "Cart" */ '../components/Cart.vue')
  },
  {
    path: '/Shopping',
    name: 'Shopping',
    component: () => import(/* webpackChunkName: "Shopping" */ '../components/Shopping.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../components/Login.vue')
  },
  {
    path: '/My',
    name: 'My',
    component: () => import(/* webpackChunkName: "My" */ '../components/My.vue')
  },
  {
    path: '/Regsiter',
    name: 'Regsiter',
    component: () => import(/* webpackChunkName: "Regsiter" */ '../components/Regsiter.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../components/Search.vue')
  },
//  菜谱分类
  {
    path: '/Order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order" */ '../components/Order.vue')
  },
  // 主页
    {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../components/Index.vue')
  }
]

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  // mode:"history",
  routes
  
})

export default router
