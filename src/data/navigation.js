import dashboardIcon from '/dashboard.svg'
import marketingIcon from '/marketing.svg'
import verifikasiIcon from '/verifikasi.svg'
import manajemenUnitIcon from '/manajemen-unit.svg'
import manajemenKonsumenIcon from '/manajemen-konsumen.svg'
import manajemenUserIcon from '/manajemen-user.svg'

export const NAVIGATION_ITEMS = [
  {
    label: 'Dashboard',
    iconPath: dashboardIcon,
    menuCode: 'DASHBOARD_ACCESS',
    type: 'root',
    path: '',
    routeName: 'Dashboard',
    labelIndex: 1,
    children: []
  },
  {
    label: 'Marketing',
    iconPath: marketingIcon,
    type: 'root',
    path: '',
    routeName: '',
    labelIndex: 2,
    children: [
      {
        label: 'Manajemen Marketer',
        path: '/marketing/manajemen-marketer',
        routeName: 'ManajemenMarketer',
        menuCode: 'DATA_MARKETER_ACCESS',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Laporan Marketing',
        path: '/marketing/laporan-marketing',
        routeName: 'LaporanMarketing',
        menuCode: 'LAPORAN_MARKETING_ACCESS',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Laporan Invoice',
        path: '/marketing/laporan-invoice',
        menuCode: 'LAPORAN_MARKETING_INVOICE_ACCESS',
        routeName: 'LaporanMarketingInvoice',
        labelIndex: 3,
        childRoutes: [],
        iconPath: null
      }
    ]
  },
  {
    label: 'Verifikasi',
    iconPath: verifikasiIcon,
    type: 'root',
    path: '',
    routeName: '',
    labelIndex: 3,
    children: [
      {
        label: 'Manajemen Dokumen Konsumen',
        path: '/verifikasi/manajemen-dokumen-konsumen',
        routeName: 'ManajemenDokumenKonsumen',
        menuCode: 'MANAJEMEN_DOKUMEN_KONSUMEN_ACCESS',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      }
    ]
  }
]

export const ADMIN_NAVIGATION_ITEMS = [
  {
    label: 'Unit',
    iconPath: manajemenUnitIcon,
    type: 'root',
    path: '',
    routeName: '',
    labelIndex: 1,
    children: [
      {
        label: 'Manajemen Unit',
        path: '/manajemen-unit',
        routeName: 'ManajemenUnit',
        menuCode: 'DATA_MARKETER_ACCESS',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Cluster',
        path: '/manajemen-unit/cluster',
        menuCode: 'LAPORAN_MARKETING_ACCESS',
        routeName: 'ManajemenCluster',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Tipe Unit',
        path: '/manajemen-unit/tipe',
        menuCode: 'LAPORAN_MARKETING_INVOICE_ACCESS',
        routeName: 'ManajemenTipeUnit',
        labelIndex: 3,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Fasilitas',
        path: '/manajemen-unit/fasilitas',
        menuCode: 'LAPORAN_MARKETING_INVOICE_ACCESS',
        routeName: 'ManajemenFasilitas',
        labelIndex: 4,
        childRoutes: [],
        iconPath: null
      }
    ]
  },
  {
    label: 'Manajemen Konsumen',
    iconPath: manajemenKonsumenIcon,
    menuCode: 'MANAJEMEN_KONSUMEN_ACCESS',
    type: 'root',
    path: '',
    routeName: 'ManajemenKonsumen',
    labelIndex: 2,
    children: []
  },
  {
    label: 'Manajemen User',
    iconPath: manajemenUserIcon,
    menuCode: 'MANAJEMEN_USER_ACCESS',
    type: 'root',
    path: '',
    routeName: 'ManajemenUser',
    labelIndex: 3,
    children: []
  }
]
