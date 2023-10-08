const Dashboard = () => import(/* webpackChunkName: "p-dashboard" */ '~/pages/dashboard/Dashboard.vue')
const Login = () => import(/* webpackChunkName: "p-login" */ '~/pages/login/Login.vue')
const ManajemenUser = () => import(/* webpackChunkName: "p-manajemen-user" */ '~/pages/manajemen-user/ManajemenUser.vue')
const ManajemenUserDetail = () => import(/* webpackChunkName: "p-manajemen-user-detail" */ '~/pages/manajemen-user/ManajemenUserDetail.vue')
const ManajemenUserCreate = () => import(/* webpackChunkName: "p-manajemen-user-create" */ '~/pages/manajemen-user/create/ManajemenUserCreate.vue')
const ManajemenUserEdit = () => import(/* webpackChunkName: "p-manajemen-user-edit" */ '~/pages/manajemen-user/edit/ManajemenUserEdit.vue')
const ManajemenUnit = () => import(/* webpackChunkName: "p-manajemen-unit" */ '~/pages/manajemen-unit/ManajemenUnit.vue')
const ManajemenUnitCreate = () => import(/* webpackChunkName: "p-manajemen-unit-create" */ '~/pages/manajemen-unit/create/ManajemenUnitCreate.vue')
const ManajemenUnitDetail = () => import(/* webpackChunkName: "p-manajemen-unit-detail" */ '~/pages/manajemen-unit/ManajemenUnitDetail.vue')
const ManajemenUnitEdit = () => import(/* webpackChunkName: "p-manajemen-unit-edit" */ '~/pages/manajemen-unit/edit/ManajemenUnitEdit.vue')
const ManajemenKonsumen = () => import(/* webpackChunkName: "p-manajemen-konsumen" */ '~/pages/manajemen-konsumen/ManajemenKonsumen.vue')
const ManajemenKonsumenCreate = () => import(/* webpackChunkName: "p-manajemen-konsumen-create" */ '~/pages/manajemen-konsumen/create/ManajemenKonsumenCreate.vue')

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
  },
  {
    path: '/manajemen-unit',
    name: 'ManajemenUnit',
    component: ManajemenUnit,
    meta: {
      title: 'Manajemen Unit',
      module: 'MANAJEMEN_UNIT',
      action: 'MANAJEMEN_UNIT_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/create',
    name: 'ManajemenUnitCreate',
    component: ManajemenUnitCreate,
    meta: {
      title: 'Manajemen Unit Create',
      module: 'MANAJEMEN_UNIT',
      action: 'MANAJEMEN_UNIT_CREATE',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/:id',
    name: 'ManajemenUnitDetail',
    component: ManajemenUnitDetail,
    meta: {
      title: 'Manajemen Unit Detail',
      module: 'MANAJEMEN_UNIT',
      action: 'MANAJEMEN_UNIT_DETAIL',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/edit/:id',
    name: 'ManajemenUnitEdit',
    component: ManajemenUnitEdit,
    meta: {
      title: 'Manajemen Unit Edit',
      module: 'MANAJEMEN_UNIT',
      action: 'MANAJEMEN_UNIT_EDIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-konsumen',
    name: 'ManajemenKonsumen',
    component: ManajemenKonsumen,
    meta: {
      title: 'Manajemen Konsumen',
      module: 'MANAJEMEN_KONSUMEN',
      action: 'MANAJEMEN_KONSUMEN_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-konsumen/create',
    name: 'ManajemenKonsumenCreate',
    component: ManajemenKonsumenCreate,
    meta: {
      title: 'Manajemen Konsumen Create',
      module: 'MANAJEMEN_KONSUMEN',
      action: 'MANAJEMEN_KONSUMEN_CREATE',
      requireLogin: true
    }
  }
]