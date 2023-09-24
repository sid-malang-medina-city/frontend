const Dashboard = () => import(/* webpackChunkName: "p-dashboard" */ '~/pages/dashboard/Dashboard.vue')
const Login = () => import(/* webpackChunkName: "p-login" */ '~/pages/login/Login.vue')
const ManajemenUser = () => import(/* webpackChunkName: "p-manajemen-user" */ '~/pages/manajemen-user/ManajemenUser.vue')
const ManajemenUserDetail = () => import(/* webpackChunkName: "p-manajemen-user-detail" */ '~/pages/manajemen-user/ManajemenUserDetail.vue')
const ManajemenUserCreate = () => import(/* webpackChunkName: "p-manajemen-user-create" */ '~/pages/manajemen-user/create/ManajemenUserCreate.vue')
const ManajemenUserEdit = () => import(/* webpackChunkName: "p-manajemen-user-edit" */ '~/pages/manajemen-user/edit/ManajemenUserEdit.vue')

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
  },
  {
    path: '/manajemen-user/:id',
    name: 'ManajemenUserDetail',
    component: ManajemenUserDetail,
    meta: {
      title: 'Manajemen User Detail',
      module: 'MANAJEMEN_USER',
      action: 'MANAJEMEN_USER_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user/create',
    name: 'ManajemenUserCreate',
    component: ManajemenUserCreate,
    meta: {
      title: 'Manajemen User Create',
      module: 'MANAJEMEN_USER',
      action: 'MANAJEMEN_USER_CREATE',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user/edit/:id',
    name: 'ManajemenUserEdit',
    component: ManajemenUserEdit,
    meta: {
      title: 'Manajemen User Edit',
      module: 'MANAJEMEN_USER',
      action: 'MANAJEMEN_USER_EDIT',
      requireLogin: true
    }
  }
]