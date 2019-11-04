import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    
    beforeEnter(to, from, next) {
      if (localStorage.getItem('token')) {
        next('/')
      } else {
        next()
      }
    },
  },
  {
    path: '/board',
    name: 'board',
    component: () => import('@/views/PostList.vue'),
  },
  {
    path: '/board/write',
    name: 'write',
    component: () => import('@/views/Write.vue'),
  },
  {
    path: '/board/:id',
    name: 'post',
    component: () => import('@/views/Post.vue'),
  },
  {
    path: '/board/:id/edit',
    name: 'edit',
    component: () => import('@/views/Write.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
