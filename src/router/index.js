import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import Book from '../views/manage/Book.vue'
import Login from '../components/Login.vue'
import User from '../views/manage/User.vue'
import BookGrid from '../views/library/BookGrid.vue'
import BookPie from '../views/library/BookPie.vue'
import Content from '../views/library/Content.vue'
import Talk from '../views/library/Talk.vue'
import Update from '../views/admin/Update.vue'
import Layout2 from '../components/layout/Layout2.vue'
import Main from '../views/Main.vue'
import Regist from '../components/Regist.vue'
import Lend from '../views/manage/Lend.vue'
import BookShelf from '../views/admin/BookShelf.vue'
import Notice from '../views/manage/Notice.vue'
import MessageInfo from '../views/notices/MessageInfo.vue'
import MessageDetail from '../views/notices/MessageDetail.vue'

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
        path: '/notice',
        name: 'Notice',
        component: Notice
      },
      {
        path: '/lend',
        name: 'Lend',
        component: Lend
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/manage/About.vue')
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
        path: '/content',
        name: 'Content',
        component: Content
      },
      {
        path: '/messageinfo',
        name: 'MessageInfo',
        component: MessageInfo,    
      },
      {
          path: '/messagedetail',
          name: 'MessageDetail',
          component: MessageDetail 
      },
      {
        path: '/talk',
        name: 'Talk',
        component: Talk
      },
      {
        path: '/update',
        name: 'Update',
        component: Update
      },
      {
        path: '/bookshelf',
        name: 'BookShelf',
        component: BookShelf
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
