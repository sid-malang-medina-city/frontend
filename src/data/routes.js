const Dashboard = () => import(/* webpackChunkName: "p-dashboard" */ '~/pages/dashboard/Dashboard.vue')
const Login = () => import(/* webpackChunkName: "p-login" */ '~/pages/login/Login.vue')
const ManajemenUser = () => import(/* webpackChunkName: "p-manajemen-user" */ '~/pages/manajemen-user/ManajemenUser.vue')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiredLogin: false
    }
  },
  {
    path: '',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      module: 'DASHBOARD',
      action: 'DASHBOARD_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user',
    name: 'ManajemenUser',
    component: ManajemenUser,
    meta: {
      title: 'Manajemen User',
      module: 'MANAJEMEN_USER',
      action: 'MANAJEMEN_USER_VIEW',
      requireLogin: true
    }
  }
]