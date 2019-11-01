import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
