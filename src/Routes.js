import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout/Layout'
import LayoutStudent from '@/components/LayoutStudent/Layout'

// Pages
// import Maps from '@/pages/Maps/Google'
// import Tables from '@/pages/Tables/Basic'
// import Charts from '@/pages/Charts/Charts'
// import Icons from '@/pages/Icons/Icons'
// import Typography from '@/pages/Typography/Typography'
// import Notifications from '@/pages/Notifications/Notifications'

import Error from "@/pages/Error/Error"
import Login from "@/pages/Login/Login"
import Majors from '@/pages/Majors/Majors'
import Courses from '@/pages/Courses/Courses'
import AddMajor from '@/pages/Majors/AddMajor'
import EditMajor from '@/pages/Majors/EditMajor'
import Students from '@/pages/Students/Students'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Employees from '@/pages/Employees/Employees'
import AddStudent from '@/pages/Students/AddStudent'
import EditStudent from '@/pages/Students/EditStudent'
import StudentMajors from '@/pages/StudentMajors/Majors'
import StudentHome from '@/pages/StudentHome/StudentHome'
import StudentCourses from '@/pages/StudentCourses/Courses'

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
          path: 'courses',
          name: 'Courses',
          component: Courses,
        },
        {
          path: 'majors',
          name: 'Majors',
          component: Majors,
        },
        {
          path: 'majors/edit',
          name: 'EditMajor',
          component: EditMajor,
        },
        {
          path: 'majors/add',
          name: 'AddMajor',
          component: AddMajor,
        },
        {
          path: 'students',
          name: 'Students',
          component: Students,
        },
        {
          path: 'students/edit',
          name: 'EditStudent',
          component: EditStudent,
        },
        {
          path: 'students/add',
          name: 'AddStudent',
          component: AddStudent,
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
      ],
    },
    {
      path: '/s',
      redirect: '/s/home',
      name: 'LayoutStudent',
      component: LayoutStudent,
      children: [
        {
          path: 'home',
          name: 'StudentHome',
          component: StudentHome,
        },
        {
          path: 'uni-majors',
          name: 'StudentMajors',
          component: StudentMajors,
        },
        {
          path: 'uni-courses',
          name: 'StudentCourses',
          component: StudentCourses,
        },
      ]
    },
    {
      path: '*',
      meta: { nf: true },
      name: 'Error',
      component: Error
    }
  ],
});

router.beforeEach(({meta, path}, from, next) => {
  const { nf } = meta

  const publicPages = ['/login']
  const studentPages = ['/s', '/s/home', '/s/uni-majors', '/s/uni-courses']

  const authRequired = !publicPages.includes(path)
  const tokenAd = localStorage.getItem('token-a')
  const tokenStu = localStorage.getItem('token-s')
  
  if (studentPages.includes(path)) {
    const isTokenStuValid = verifyToken(tokenStu)
  
    if (!isTokenStuValid && tokenStu)
      localStorage.removeItem('token-s')
      
    if (authRequired && !isTokenStuValid && !nf)
      return next('/login')
  } else {
    const isTokenAdValid = verifyToken(tokenAd)
  
    if (!isTokenAdValid && tokenAd)
      localStorage.removeItem('token-a')
      
    if (authRequired && !isTokenAdValid && !nf)
      return next('/login')
  }

  next()
})

export default router;