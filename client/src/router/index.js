import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogueView from '@/views/CatalogueView.vue'
import AddProductView from '@/views/AddProductView.vue'
import EditProductView from '@/views/EditProductView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: CatalogueView
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProductView
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProductView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router
