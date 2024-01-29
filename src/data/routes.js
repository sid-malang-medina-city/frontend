import { defineAsyncComponent } from 'vue'

const Dashboard = defineAsyncComponent(() => import(/* webpackChunkName: "p-dashboard" */ '~/pages/dashboard/Dashboard.vue'))
const NoAccess = defineAsyncComponent(() => import(/* webpackChunkName: "p-no-access" */ '~/pages/NoAccess.vue'))
const Login = defineAsyncComponent(() => import(/* webpackChunkName: "p-login" */ '~/pages/login/Login.vue'))
const UserProfile = defineAsyncComponent(() => import(/* webpackChunkName: "p-user-profile" */ '~/pages/user-profile/UserProfile.vue'))
const ChangePassword = defineAsyncComponent(() => import(/* webpackChunkName: "p-change-password" */ '~/pages/user-profile/change-password/ChangePassword.vue'))
const ManajemenUser = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user" */ '~/pages/manajemen-user/ManajemenUser.vue'))
const ManajemenUserDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-detail" */ '~/pages/manajemen-user/ManajemenUserDetail.vue'))
const ManajemenUserCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-create" */ '~/pages/manajemen-user/create/ManajemenUserCreate.vue'))
const ManajemenUserEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-edit" */ '~/pages/manajemen-user/edit/ManajemenUserEdit.vue'))
const ManajemenUserEditChangePassword = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-user-edit-change-password" */ '~/pages/manajemen-user/edit/ManajemenUserEditChangePassword.vue'))
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
const ManajemenKonsumenDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-konsumen-detail" */ '~/pages/manajemen-konsumen/ManajemenKonsumenDetail.vue'))
const ManajemenKonsumenCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-konsumen-create" */ '~/pages/manajemen-konsumen/create/ManajemenKonsumenCreate.vue'))
const ManajemenKonsumenEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-konsumen-edit" */ '~/pages/manajemen-konsumen/edit/ManajemenKonsumenEdit.vue'))
const ManajemenMarketer = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-marketer" */ '~/pages/marketing/manajemen-marketer/ManajemenMarketer.vue'))
const ManajemenMarketerDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-marketer-detail" */ '~/pages/marketing/manajemen-marketer/ManajemenMarketerDetail.vue'))
const ManajemenMarketerCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-marketer-create" */ '~/pages/marketing/manajemen-marketer/create/ManajemenMarketerCreate.vue'))
const ManajemenMarketerEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-marketer-edit" */ '~/pages/marketing/manajemen-marketer/edit/ManajemenMarketerEdit.vue'))
const LaporanMarketing = defineAsyncComponent(() => import(/* webpackChunkName: "p-laporan-marketing" */ '~/pages/marketing/laporan-marketing/LaporanMarketing.vue'))
const LaporanMarketingDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-laporan-marketing-detail" */ '~/pages/marketing/laporan-marketing/LaporanMarketingDetail.vue'))
const LaporanMarketingEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-laporan-marketing-edit" */ '~/pages/marketing/laporan-marketing/edit/LaporanMarketingEdit.vue'))
const LaporanInvoiceMarketing = defineAsyncComponent(() => import(/* webpackChunkName: "p-laporan-invoice-marketing" */ '~/pages/marketing/laporan-invoice/LaporanInvoice.vue'))
const ManajemenDokumenKonsumen = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-dokumen-konsumen" */ '~/pages/verifikasi/manajemen-dokumen-konsumen/ManajemenDokumenKonsumen.vue'))
const ManajemenDokumenKonsumenDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-dokumen-konsumen-detail" */ '~/pages/verifikasi/manajemen-dokumen-konsumen/ManajemenDokumenKonsumenDetail.vue'))
const ManajemenDokumenKonsumenEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-dokumen-konsumen-edit" */ '~/pages/verifikasi/manajemen-dokumen-konsumen/edit/ManajemenDokumenKonsumenEdit.vue'))
const ManajemenPekerjaan = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-pekerjaan" */ '~/pages/verifikasi/pekerjaan/ManajemenPekerjaan.vue'))
const ManajemenPekerjaanCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-pekerjaan-create" */ '~/pages/verifikasi/pekerjaan/create/ManajemenPekerjaanCreate.vue'))
const ManajemenPekerjaanEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-pekerjaan-edit" */ '~/pages/verifikasi/pekerjaan/edit/ManajemenPekerjaanEdit.vue'))
const ManajemenAlasan = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-alasan" */ '~/pages/verifikasi/alasan/ManajemenAlasan.vue'))
const ManajemenAlasanCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-alasan-create" */ '~/pages/verifikasi/alasan/create/ManajemenAlasanCreate.vue'))
const ManajemenAlasanEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-alasan-edit" */ '~/pages/verifikasi/alasan/edit/ManajemenAlasanEdit.vue'))
const KeuanganLaporanMarketing = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-laporan-marketing" */ '~/pages/keuangan/LaporanMarketing.vue'))
const KeuanganLaporanMarketingDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-laporan-marketing-detail" */ '~/pages/keuangan/LaporanMarketingDetail.vue'))
const KeuanganLaporanMarketingEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-laporan-marketing-edit" */ '~/pages/keuangan/edit/LaporanMarketingEdit.vue'))
const KeuanganLaporanInvoiceMarketing = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-laporan-invoice-marketing" */ '~/pages/keuangan/LaporanInvoice.vue'))
const KeuanganManajemenDokumenKonsumen = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-manajemen-dokumen-konsumen" */ '~/pages/keuangan/ManajemenDokumenKonsumen.vue'))
const KeuanganManajemenDokumenKonsumenDetail = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-manajemen-dokumen-konsumen-detail" */ '~/pages/keuangan/ManajemenDokumenKonsumenDetail.vue'))
const KeuanganManajemenDokumenKonsumenEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-keuangan-manajemen-dokumen-konsumen-edit" */ '~/pages/keuangan/edit/ManajemenDokumenKonsumenEdit.vue'))
const ManajemenVendor = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-vendor" */ '~/pages/teknik/manajemen-vendor/ManajemenVendor.vue'))
const ManajemenVendorCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-vendor-create" */ '~/pages/teknik/manajemen-vendor/create/ManajemenVendorCreate.vue'))
const ManajemenVendorEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-vendor-edit" */ '~/pages/teknik/manajemen-vendor/edit/ManajemenVendorEdit.vue'))
const ManajemenTemplateSPK = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-template-spk" */ '~/pages/teknik/manajemen-template-spk/ManajemenTemplateSPK.vue'))
const ManajemenTemplateSPKCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-template-spk-create" */ '~/pages/teknik/manajemen-template-spk/create/ManajemenTemplateSPKCreate.vue'))
const ManajemenTemplateSPKEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-template-spk-edit" */ '~/pages/teknik/manajemen-template-spk/edit/ManajemenTemplateSPKEdit.vue'))
const ManajemenSPK = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-spk" */ '~/pages/teknik/manajemen-spk/ManajemenSPK.vue'))
const ManajemenSPKCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-spk-create" */ '~/pages/teknik/manajemen-spk/create/ManajemenSPKCreate.vue'))
const ManajemenSPKEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-spk-edit" */ '~/pages/teknik/manajemen-spk/edit/ManajemenSPKEdit.vue'))
const ManajemenLaporanProgresPembangunan = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-laporan-progres-pembangunan" */ '~/pages/teknik/manajemen-laporan-progres-pembangunan/ManajemenLaporanProgresPembangunan.vue'))
const ManajemenLaporanProgresPembangunanCreate = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-laporan-progres-pembangunan-create" */ '~/pages/teknik/manajemen-laporan-progres-pembangunan/create/ManajemenLaporanProgresPembangunanCreate.vue'))
const ManajemenLaporanProgresPembangunanEdit = defineAsyncComponent(() => import(/* webpackChunkName: "p-manajemen-laporan-progres-pembangunan-edit" */ '~/pages/teknik/manajemen-laporan-progres-pembangunan/edit/ManajemenLaporanProgresPembangunanEdit.vue'))

export default [
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NoAccess,
    meta: {
      title: 'Page Not Found'
    }
  },
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
    path: '/no-access',
    name: 'NoAccess',
    component: NoAccess,
    meta: {
      title: 'No Access',
      requiredLogin: true
    }
  },
  {
    path: '/edit-profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      title: 'User Profile',
      requireLogin: true
    }
  },
  {
    path: '/edit-profile/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      title: 'Ubah Kata Sandi',
      requireLogin: true
    }
  },
  {
    path: '',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      action: 'DASHBOARD',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user',
    name: 'ManajemenUser',
    component: ManajemenUser,
    meta: {
      title: 'Manajemen User',
      action: 'LIST_USER',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user/:id',
    name: 'ManajemenUserDetail',
    component: ManajemenUserDetail,
    meta: {
      title: 'Manajemen User Detail',
      action: 'READ_USER',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user/create',
    name: 'ManajemenUserCreate',
    component: ManajemenUserCreate,
    meta: {
      title: 'Manajemen User Create',
      action: 'CREATE_USER',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user/edit/:id',
    name: 'ManajemenUserEdit',
    component: ManajemenUserEdit,
    meta: {
      title: 'Manajemen User Edit',
      action: 'UPDATE_USER',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-user/edit/change-password/:id',
    name: 'ManajemenUserEditChangePassword',
    component: ManajemenUserEditChangePassword,
    meta: {
      title: 'Manajemen User Ubah Kata Sandi',
      action: 'UPDATE_USER_PASSWORD',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit',
    name: 'ManajemenUnit',
    component: ManajemenUnit,
    meta: {
      title: 'Manajemen Unit',
      action: 'LIST_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/create',
    name: 'ManajemenUnitCreate',
    component: ManajemenUnitCreate,
    meta: {
      title: 'Manajemen Unit Create',
      action: 'CREATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/:id',
    name: 'ManajemenUnitDetail',
    component: ManajemenUnitDetail,
    meta: {
      title: 'Manajemen Unit Detail',
      action: 'READ_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/edit/:id',
    name: 'ManajemenUnitEdit',
    component: ManajemenUnitEdit,
    meta: {
      title: 'Manajemen Unit Edit',
      action: 'UPDATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/cluster',
    name: 'ManajemenCluster',
    component: ManajemenCluster,
    meta: {
      title: 'Manajemen Cluster',
      action: 'LIST_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/cluster/create',
    name: 'ManajemenClusterCreate',
    component: ManajemenClusterCreate,
    meta: {
      title: 'Manajemen Cluster Create',
      action: 'CREATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/cluster/edit/:id',
    name: 'ManajemenClusterEdit',
    component: ManajemenClusterEdit,
    meta: {
      title: 'Manajemen Cluster Edit',
      action: 'UPDATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/tipe-unit',
    name: 'ManajemenTipeUnit',
    component: ManajemenTipeUnit,
    meta: {
      title: 'Manajemen Tipe Unit',
      action: 'LIST_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/tipe-unit/create',
    name: 'ManajemenTipeUnitCreate',
    component: ManajemenTipeUnitCreate,
    meta: {
      title: 'Manajemen Tipe Unit Create',
      action: 'CREATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/tipe-unit/edit/:id',
    name: 'ManajemenTipeUnitEdit',
    component: ManajemenTipeUnitEdit,
    meta: {
      title: 'Manajemen Tipe Unit Edit',
      action: 'UPDATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/fasilitas',
    name: 'ManajemenFasilitas',
    component: ManajemenFasilitas,
    meta: {
      title: 'Manajemen Fasilitas',
      action: 'LIST_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/fasilitas/create',
    name: 'ManajemenFasilitasCreate',
    component: ManajemenFasilitasCreate,
    meta: {
      title: 'Manajemen Fasilitas Create',
      action: 'CREATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-unit/fasilitas/edit/:id',
    name: 'ManajemenFasilitasEdit',
    component: ManajemenFasilitasEdit,
    meta: {
      title: 'Manajemen Fasilitas Edit',
      action: 'UPDATE_UNIT',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-konsumen',
    name: 'ManajemenKonsumen',
    component: ManajemenKonsumen,
    meta: {
      title: 'Manajemen Konsumen',
      action: 'LIST_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-konsumen/:id',
    name: 'ManajemenKonsumenDetail',
    component: ManajemenKonsumenDetail,
    meta: {
      title: 'Manajemen Konsumen Detail',
      action: 'READ_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-konsumen/create',
    name: 'ManajemenKonsumenCreate',
    component: ManajemenKonsumenCreate,
    meta: {
      title: 'Manajemen Konsumen Create',
      action: 'CREATE_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/manajemen-konsumen/edit/:id',
    name: 'ManajemenKonsumenEdit',
    component: ManajemenKonsumenEdit,
    meta: {
      title: 'Manajemen Konsumen Edit',
      action: 'UPDATE_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/marketing/manajemen-marketer',
    name: 'ManajemenMarketer',
    component: ManajemenMarketer,
    meta: {
      title: 'Manajemen Marketer',
      action: 'LIST_MARKETER',
      requireLogin: true
    }
  },
  {
    path: '/marketing/manajemen-marketer/:id',
    name: 'ManajemenMarketerDetail',
    component: ManajemenMarketerDetail,
    meta: {
      title: 'Manajemen Marketer Detail',
      action: 'READ_MARKETER',
      requireLogin: true
    }
  },
  {
    path: '/marketing/manajemen-marketer/create',
    name: 'ManajemenMarketerCreate',
    component: ManajemenMarketerCreate,
    meta: {
      title: 'Manajemen Marketer Create',
      action: 'CREATE_MARKETER',
      requireLogin: true
    }
  },
  {
    path: '/marketing/manajemen-marketer/edit/:id',
    name: 'ManajemenMarketerEdit',
    component: ManajemenMarketerEdit,
    meta: {
      title: 'Manajemen Marketer Edit',
      action: 'UPDATE_MARKETER',
      requireLogin: true
    }
  },
  {
    path: '/marketing/laporan-marketing',
    name: 'LaporanMarketing',
    component: LaporanMarketing,
    meta: {
      title: 'Laporan Marketing',
      action: 'LIST_LAPORAN_MARKETING',
      requireLogin: true
    }
  },
  {
    path: '/marketing/laporan-marketing/:id',
    name: 'LaporanMarketingDetail',
    component: LaporanMarketingDetail,
    meta: {
      title: 'Laporan Marketing Detail',
      action: 'READ_LAPORAN_MARKETING',
      requireLogin: true
    }
  },
  {
    path: '/marketing/laporan-marketing/edit/:id',
    name: 'LaporanMarketingEdit',
    component: LaporanMarketingEdit,
    meta: {
      title: 'Laporan Marketing Edit',
      action: 'UPDATE_LAPORAN_MARKETING',
      requireLogin: true
    }
  },
  {
    path: '/marketing/laporan-invoice',
    name: 'LaporanMarketingInvoice',
    component: LaporanInvoiceMarketing,
    meta: {
      title: 'Laporan Invoice Marketing',
      action: 'LIST_LAPORAN_MARKETING_INVOICE',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-dokumen-konsumen',
    name: 'ManajemenDokumenKonsumen',
    component: ManajemenDokumenKonsumen,
    meta: {
      title: 'Dokumen Konsumen',
      action: 'LIST_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-dokumen-konsumen/:id',
    name: 'ManajemenDokumenKonsumenDetail',
    component: ManajemenDokumenKonsumenDetail,
    meta: {
      title: 'Dokumen Konsumen',
      action: 'READ_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-dokumen-konsumen/edit/:id',
    name: 'ManajemenDokumenKonsumenEdit',
    component: ManajemenDokumenKonsumenEdit,
    meta: {
      title: 'Dokumen Konsumen Edit',
      action: 'UPDATE_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-pekerjaan',
    name: 'ManajemenPekerjaan',
    component: ManajemenPekerjaan,
    meta: {
      title: 'Manajemen Pekerjaan',
      action: 'LIST_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-pekerjaan/create',
    name: 'ManajemenPekerjaanCreate',
    component: ManajemenPekerjaanCreate,
    meta: {
      title: 'Manajemen Pekerjaan Create',
      action: 'UPDATE_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-pekerjaan/edit/:id',
    name: 'ManajemenPekerjaanEdit',
    component: ManajemenPekerjaanEdit,
    meta: {
      title: 'Manajemen Pekerjaan Edit',
      action: 'UPDATE_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-alasan',
    name: 'ManajemenAlasan',
    component: ManajemenAlasan,
    meta: {
      title: 'Manajemen Alasan',
      action: 'LIST_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-alasan/create',
    name: 'ManajemenAlasanCreate',
    component: ManajemenAlasanCreate,
    meta: {
      title: 'Manajemen Alasan Create',
      action: 'UPDATE_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/verifikasi/manajemen-alasan/edit/:id',
    name: 'ManajemenAlasanEdit',
    component: ManajemenAlasanEdit,
    meta: {
      title: 'Manajemen Alasan Edit',
      action: 'UPDATE_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/manajemen-dokumen-konsumen',
    name: 'KeuanganManajemenDokumenKonsumen',
    component: KeuanganManajemenDokumenKonsumen,
    meta: {
      title: 'Dokumen Konsumen',
      action: 'LIST_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/manajemen-dokumen-konsumen/:id',
    name: 'KeuanganManajemenDokumenKonsumenDetail',
    component: KeuanganManajemenDokumenKonsumenDetail,
    meta: {
      title: 'Dokumen Konsumen',
      action: 'READ_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/manajemen-dokumen-konsumen/edit/:id',
    name: 'KeuanganManajemenDokumenKonsumenEdit',
    component: KeuanganManajemenDokumenKonsumenEdit,
    meta: {
      title: 'Dokumen Konsumen Edit',
      action: 'UPDATE_DOKUMEN_KONSUMEN',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/laporan-marketing',
    name: 'KeuanganLaporanMarketing',
    component: KeuanganLaporanMarketing,
    meta: {
      title: 'Laporan Marketing',
      action: 'LIST_LAPORAN_MARKETING',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/laporan-marketing/:id',
    name: 'KeuanganLaporanMarketingDetail',
    component: KeuanganLaporanMarketingDetail,
    meta: {
      title: 'Laporan Marketing Detail',
      action: 'READ_LAPORAN_MARKETING',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/laporan-marketing/edit/:id',
    name: 'KeuanganLaporanMarketingEdit',
    component: KeuanganLaporanMarketingEdit,
    meta: {
      title: 'Laporan Marketing Edit',
      action: 'UPDATE_LAPORAN_MARKETING',
      requireLogin: true
    }
  },
  {
    path: '/keuangan/laporan-invoice',
    name: 'KeuanganLaporanMarketingInvoice',
    component: KeuanganLaporanInvoiceMarketing,
    meta: {
      title: 'Laporan Invoice Marketing',
      action: 'LIST_LAPORAN_MARKETING_INVOICE',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-vendor',
    name: 'ManajemenVendor',
    component: ManajemenVendor,
    meta: {
      title: 'Manajemen Vendor',
      action: 'LIST_VENDOR',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-vendor/create',
    name: 'ManajemenVendorCreate',
    component: ManajemenVendorCreate,
    meta: {
      title: 'Manajemen Vendor Create',
      action: 'CREATE_VENDOR',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-vendor/edit/:id',
    name: 'ManajemenVendorEdit',
    component: ManajemenVendorEdit,
    meta: {
      title: 'Manajemen Vendor Edit',
      action: 'UPDATE_VENDOR',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-template-spk',
    name: 'ManajemenTemplateSPK',
    component: ManajemenTemplateSPK,
    meta: {
      title: 'Manajemen Template SPK',
      action: 'LIST_TEMPLATE_SPK',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-template-spk/create',
    name: 'ManajemenTemplateSPKCreate',
    component: ManajemenTemplateSPKCreate,
    meta: {
      title: 'Manajemen Template SPK Create',
      action: 'CREATE_TEMPLATE_SPK',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-template-spk/edit/:id',
    name: 'ManajemenTemplateSPKEdit',
    component: ManajemenTemplateSPKEdit,
    meta: {
      title: 'Manajemen Template SPK Edit',
      action: 'UPDATE_TEMPLATE_SPK',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-spk',
    name: 'ManajemenSPK',
    component: ManajemenSPK,
    meta: {
      title: 'Manajemen SPK',
      action: 'LIST_SPK',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-spk/create',
    name: 'ManajemenSPKCreate',
    component: ManajemenSPKCreate,
    meta: {
      title: 'Manajemen SPK Create',
      action: 'CREATE_SPK',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-spk/edit/:id',
    name: 'ManajemenSPKEdit',
    component: ManajemenSPKEdit,
    meta: {
      title: 'Manajemen SPK Edit',
      action: 'UPDATE_SPK',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-laporan-progres-pembangunan',
    name: 'ManajemenLaporanProgresPembangunan',
    component: ManajemenLaporanProgresPembangunan,
    meta: {
      title: 'Manajemen Laporan Progres Pembangunan',
      action: 'LIST_LAPORAN_PROGRES_PEMBANGUNAN',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-laporan-progres-pembangunan/create',
    name: 'ManajemenLaporanProgresPembangunanCreate',
    component: ManajemenLaporanProgresPembangunanCreate,
    meta: {
      title: 'Manajemen Laporan Progres Pembangunan Create',
      action: 'CREATE_LAPORAN_PROGRES_PEMBANGUNAN',
      requireLogin: true
    }
  },
  {
    path: '/teknik/manajemen-laporan-progres-pembangunan/edit/:id',
    name: 'ManajemenLaporanProgresPembangunanEdit',
    component: ManajemenLaporanProgresPembangunanEdit,
    meta: {
      title: 'Manajemen Laporan Progres Pembangunan Edit',
      action: 'UPDATE_LAPORAN_PROGRES_PEMBANGUNAN',
      requireLogin: true
    }
  },
]