import Vue from 'vue'
import VueRouter from 'vue-router'
import Book from '../views/Book.vue'
import Login from '../components/Login.vue'
import Layout from '../components/layout/Layout.vue'
import AppIndex from '../components/home/Appindex.vue'
import Regist from '../components/Regist.vue'
import User from '../views/User.vue'
import BookGrid from '../views/BookGrid.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/index',
    name: 'AppIndex',
    component: AppIndex
  },
  {
    path: '/',
    component: Layout,
    redirect: '/book',
    children: [
      {
        path: '/book',
        name: 'Book',
        component: Book
      },
      {
        path:'/bookgrid',
        name:'BookGrid',
        component:BookGrid
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
