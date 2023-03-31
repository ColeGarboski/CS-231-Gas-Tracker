import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: App // Main route
    },
    {
      path: '/prices/:fuelType/:company',
      name: 'prices',
      component: App // Route for prices, which loads the App component
    }
  ]
})

export default router
