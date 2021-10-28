import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout/Layout'

// Pages
// import Maps from '@/pages/Maps/Google'
// import Tables from '@/pages/Tables/Basic'
// import Charts from '@/pages/Charts/Charts'
// import Icons from '@/pages/Icons/Icons'
// import Typography from '@/pages/Typography/Typography'
// import Notifications from '@/pages/Notifications/Notifications'

import Error from "@/pages/Error/Error"
import Login from "@/pages/Login/Login"
import Dashboard from '@/pages/Dashboard/Dashboard'
import Employees from '@/pages/Employees/Employees'
import Departments from '@/pages/Departments/Departments'

import verifyToken from './utils/checkTokenExp';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: 'login',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'employees',
          name: 'Employees',
          component: Employees,
        },
        {
          path: 'departments',
          name: 'Departments',
          component: Departments,
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        // {
        //   path: 'typography',
        //   name: 'Typography',
        //   component: Typography,
        // },
        // {
        //   path: 'tables',
        //   name: 'Tables',
        //   component: Tables
        // },
        // {
        //   path: 'notifications',
        //   name: 'Notifications',
        //   component: Notifications
        // },
        // {
        //   path: 'icons',
        //   name: 'Icons',
        //   component: Icons
        // },
        // {
        //   path: 'charts',
        //   name: 'Charts',
        //   component: Charts
        // },
        // {
        //   path: 'maps',
        //   name: 'Maps',
        //   component: Maps
        // },
        {
          path: '404',
          name: 'Error',
          meta: {
            nf: true
          },
          component: Error
        },
      ],
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
});

router.beforeEach(({meta, path}, from, next) => {
  const { nf } = meta

  const publicPages = ['/login']
  const authRequired = !publicPages.includes(path)
  const token = localStorage.getItem('token')
  
  const isTokenValid = verifyToken(token)

  if (!isTokenValid && token)
    localStorage.removeItem('token')
    
  if (authRequired && !isTokenValid && !nf)
    return next('/login')

  next()
})

export default router;