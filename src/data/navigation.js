import dashboardIcon from '/dashboard.svg'
import marketingIcon from '/marketing.svg'
import verifikasiIcon from '/verifikasi.svg'
import manajemenUnitIcon from '/manajemen-unit.svg'
import manajemenKonsumenIcon from '/manajemen-konsumen.svg'
import manajemenUserIcon from '/manajemen-user.svg'
import keuanganIcon from '/keuangan.svg'
import teknikIcon from '/teknik.svg'

export const NAVIGATION_ITEMS = [
  {
    label: 'Dashboard',
    iconPath: dashboardIcon,
    menuCode: 'DASHBOARD',
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
        menuCode: 'LIST_MARKETER',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Laporan Marketing',
        path: '/marketing/laporan-marketing',
        routeName: 'LaporanMarketing',
        menuCode: 'LIST_LAPORAN_MARKETING',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Laporan Invoice',
        path: '/marketing/laporan-invoice',
        menuCode: 'LIST_LAPORAN_MARKETING_INVOICE',
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
        menuCode: 'LIST_DOKUMEN_KONSUMEN',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Pekerjaan',
        path: '/verifikasi/manajemen-pekerjaan',
        routeName: 'ManajemenPekerjaan',
        menuCode: 'LIST_DOKUMEN_KONSUMEN',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Alasan',
        path: '/verifikasi/manajemen-alasan',
        routeName: 'ManajemenAlasan',
        menuCode: 'LIST_DOKUMEN_KONSUMEN',
        labelIndex: 3,
        childRoutes: [],
        iconPath: null
      }
    ]
  },
  {
    label: 'Keuangan',
    iconPath: keuanganIcon,
    type: 'root',
    path: '',
    routeName: '',
    menuCode: 'MODULE_KEUANGAN',
    labelIndex: 4,
    children: [
      {
        label: 'Manajemen Dokumen Konsumen',
        path: '/keuangan/manajemen-dokumen-konsumen',
        routeName: 'KeuanganManajemenDokumenKonsumen',
        menuCode: 'MODULE_KEUANGAN',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Laporan Marketing',
        path: '/keuangan/laporan-marketing',
        routeName: 'KeuanganLaporanMarketing',
        menuCode: 'MODULE_KEUANGAN',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Laporan Invoice',
        path: '/keuangan/laporan-invoice',
        routeName: 'KeuanganLaporanMarketingInvoice',
        menuCode: 'MODULE_KEUANGAN',
        labelIndex: 3,
        childRoutes: [],
        iconPath: null
      }
    ]
  },
  {
    label: 'Teknik',
    iconPath: teknikIcon,
    type: 'root',
    path: '',
    routeName: '',
    labelIndex: 5,
    children: [
      {
        label: 'Manajemen Vendor',
        path: '/teknik/manajemen-vendor',
        routeName: 'ManajemenVendor',
        menuCode: 'LIST_VENDOR',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Template SPK',
        path: '/teknik/manajemen-template-spk',
        routeName: 'ManajemenTemplateSPK',
        menuCode: 'LIST_TEMPLATE_SPK',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen SPK',
        path: '/teknik/manajemen-spk',
        routeName: 'ManajemenSPK',
        menuCode: 'LIST_SPK',
        labelIndex: 3,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Laporan Progres Pembangunan',
        path: '/teknik/manajemen-laporan-progres-pembangunan',
        routeName: 'ManajemenLaporanProgresPembangunan',
        menuCode: 'LIST_LAPORAN_PROGRES_PEMBANGUNAN',
        labelIndex: 4,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Supplier',
        path: '/teknik/manajemen-supplier',
        routeName: 'ManajemenSupplier',
        menuCode: 'LIST_SUPPLIER',
        labelIndex: 5,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen PO Supplier',
        path: '/teknik/manajemen-po-supplier',
        routeName: 'ManajemenPOSupplier',
        menuCode: 'LIST_PO_SUPPLIER',
        labelIndex: 6,
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
        menuCode: 'LIST_UNIT',
        labelIndex: 1,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Cluster',
        path: '/manajemen-unit/cluster',
        menuCode: 'LIST_UNIT',
        routeName: 'ManajemenCluster',
        labelIndex: 2,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Tipe Unit',
        path: '/manajemen-unit/tipe',
        menuCode: 'LIST_UNIT',
        routeName: 'ManajemenTipeUnit',
        labelIndex: 3,
        childRoutes: [],
        iconPath: null
      },
      {
        label: 'Manajemen Fasilitas',
        path: '/manajemen-unit/fasilitas',
        menuCode: 'LIST_UNIT',
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
    menuCode: 'LIST_KONSUMEN',
    type: 'root',
    path: '',
    routeName: 'ManajemenKonsumen',
    labelIndex: 2,
    children: []
  },
  {
    label: 'Manajemen User',
    iconPath: manajemenUserIcon,
    menuCode: 'LIST_USER',
    type: 'root',
    path: '',
    routeName: 'ManajemenUser',
    labelIndex: 3,
    children: []
  }
]
