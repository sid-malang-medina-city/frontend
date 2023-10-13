import { defineAsyncComponent } from 'vue'

const Dashboard = defineAsyncComponent(() => import(/* webpackChunkName: "p-dashboard" */ '~/pages/dashboard/Dashboard.vue'))
const Login = defineAsyncComponent(() => import(/* webpackChunkName: "p-login" */ '~/pages/login/Login.vue'))
const ManajemenUser = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user" */ '~/pages/manajemen-user/ManajemenUser.vue'))
const ManajemenUserDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-detail" */ '~/pages/manajemen-user/ManajemenUserDetail.vue'))
const ManajemenUserCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-create" */ '~/pages/manajemen-user/create/ManajemenUserCreate.vue'))
const ManajemenUserEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-edit" */ '~/pages/manajemen-user/edit/ManajemenUserEdit.vue'))
const ManajemenUnit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-unit" */ '~/pages/manajemen-unit/ManajemenUnit.vue'))
const ManajemenUnitCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-unit-create" */ '~/pages/manajemen-unit/create/ManajemenUnitCreate.vue'))
const ManajemenUnitDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-unit-detail" */ '~/pages/manajemen-unit/ManajemenUnitDetail.vue'))
const ManajemenUnitEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-unit-edit" */ '~/pages/manajemen-unit/edit/ManajemenUnitEdit.vue'))
const ManajemenCluster = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-cluster" */ '~/pages/manajemen-unit/cluster/ManajemenCluster.vue'))
const ManajemenClusterCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-cluster-create" */ '~/pages/manajemen-unit/cluster/create/ManajemenClusterCreate.vue'))
const ManajemenClusterEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-cluster-edit" */ '~/pages/manajemen-unit/cluster/edit/ManajemenClusterEdit.vue'))
const ManajemenTipeUnit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-tipe-unit" */ '~/pages/manajemen-unit/tipe-unit/ManajemenTipeUnit.vue'))
const ManajemenTipeUnitCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-tipe-unit-create" */ '~/pages/manajemen-unit/tipe-unit/create/ManajemenTipeUnitCreate.vue'))
const ManajemenTipeUnitEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-tipe-unit-edit" */ '~/pages/manajemen-unit/tipe-unit/edit/ManajemenTipeUnitEdit.vue'))
const ManajemenFasilitas = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-fasilitas" */ '~/pages/manajemen-unit/fasilitas/ManajemenFasilitas.vue'))
const ManajemenFasilitasCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-fasilitas-create" */ '~/pages/manajemen-unit/fasilitas/create/ManajemenFasilitasCreate.vue'))
const ManajemenFasilitasEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-fasilitas-edit" */ '~/pages/manajemen-unit/fasilitas/edit/ManajemenFasilitasEdit.vue'))
const ManajemenKonsumen = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-konsumen" */ '~/pages/manajemen-konsumen/ManajemenKonsumen.vue'))
const ManajemenKonsumenCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-konsumen-create" */ '~/pages/manajemen-konsumen/create/ManajemenKonsumenCreate.vue'))

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
    path: '/manajemen-unit/cluster',
    name: 'ManajemenCluster',
    component: ManajemenCluster,
    meta: {
      title: 'Manajemen Cluster',
      module: 'MANAJEMEN_CLUSTER',
      action: 'MANAJEMEN_CLUSTER_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/cluster/create',
    name: 'ManajemenClusterCreate',
    component: ManajemenClusterCreate,
    meta: {
      title: 'Manajemen Cluster Create',
      module: 'MANAJEMEN_CLUSTER',
      action: 'MANAJEMEN_CLUSTER_CREATE',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/cluster/edit/:id',
    name: 'ManajemenClusterEdit',
    component: ManajemenClusterEdit,
    meta: {
      title: 'Manajemen Cluster Edit',
      module: 'MANAJEMEN_CLUSTER',
      action: 'MANAJEMEN_CLUSTER_EDIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/tipe-unit',
    name: 'ManajemenTipeUnit',
    component: ManajemenTipeUnit,
    meta: {
      title: 'Manajemen Tipe Unit',
      module: 'MANAJEMEN_TIPE_UNIT',
      action: 'MANAJEMEN_TIPE_UNIT_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/tipe-unit/create',
    name: 'ManajemenTipeUnitCreate',
    component: ManajemenTipeUnitCreate,
    meta: {
      title: 'Manajemen Tipe Unit Create',
      module: 'MANAJEMEN_TIPE_UNIT',
      action: 'MANAJEMEN_TIPE_UNIT_CREATE',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/tipe-unit/edit/:id',
    name: 'ManajemenTipeUnitEdit',
    component: ManajemenTipeUnitEdit,
    meta: {
      title: 'Manajemen Tipe Unit Edit',
      module: 'MANAJEMEN_TIPE_UNIT',
      action: 'MANAJEMEN_TIPE_UNIT_EDIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/fasilitas',
    name: 'ManajemenFasilitas',
    component: ManajemenFasilitas,
    meta: {
      title: 'Manajemen Fasilitas',
      module: 'MANAJEMEN_FASILITAS',
      action: 'MANAJEMEN_FASILITAS_VIEW',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/fasilitas/create',
    name: 'ManajemenFasilitasCreate',
    component: ManajemenFasilitasCreate,
    meta: {
      title: 'Manajemen Fasilitas Create',
      module: 'MANAJEMEN_FASILITAS',
      action: 'MANAJEMEN_FASILITAS_CREATE',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/fasilitas/edit/:id',
    name: 'ManajemenFasilitasEdit',
    component: ManajemenFasilitasEdit,
    meta: {
      title: 'Manajemen Fasilitas Edit',
      module: 'MANAJEMEN_FASILITAS',
      action: 'MANAJEMEN_FASILITAS_EDIT',
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