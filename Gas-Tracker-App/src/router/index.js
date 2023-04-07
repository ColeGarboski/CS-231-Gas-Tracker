import { createRouter, createWebHistory } from 'vue-router'
import GasPrices from '../views/GasPrices.vue'
import Add from '../views/Add.vue'
import Delete from '../views/Delete.vue'
import Update from '../views/Update.vue'
import Signup from '../views/Signup.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vueGasPrices',
      component: GasPrices // Main route
    },
    {
      path: '/add',
      name: 'vueAdd',
      component: Add // Route for adding data to DB, which loads the Add.vue component
    },
    {
      path: '/delete',
      name: 'vueDelete',
      component: Delete // Route for deleting data from DB, which loads the Delete.vue component
    },
    {
      path: '/update',
      name: 'vueUpdate',
      component: Update // Route for updating data in DB, which loads the Update.vue component
    },
    {
      path: '/signup',
      name: 'vueSignup',
      component: Signup
    },
  ]
})

export default router
