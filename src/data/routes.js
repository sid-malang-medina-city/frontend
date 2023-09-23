const Dashboard = () => import(/* webpackChunkName: "p-dashboard" */ '~/pages/dashboard/Dashboard.vue')
const Login = () => import(/* webpackChunkName: "p-login" */ '~/pages/login/Login.vue')

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
  }
]