import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import Book from '../views/Book.vue'
import Login from '../components/Login.vue'
import User from '../views/User.vue'
import BookGrid from '../views/library/BookGrid.vue'
import BookPie from '../views/library/BookPie.vue'
import Update from '../views/admin/Update.vue'
import Layout2 from '../components/layout/Layout2.vue'
import Main from '../views/Main.vue'
import Regist from '../components/Regist.vue'

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
  },
  {
    path: '/users',
    name: 'Users',
    component: Layout2,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main
      },
      {
        path: '/bookgrid',
        name: 'BookGrid',
        component: BookGrid
      },
      {
        path: '/bookpie',
        name: 'BookPie',
        component: BookPie
      },
      {
        path: '/update',
        name: 'Update',
        component: Update
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
