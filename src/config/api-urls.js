export default {
  users: {
    login: '/user/login',
    acl: '/user/acl',
    list: '/user',
    me: '/user/me',
    roles: '/user/roles',
    divisions: '/user/divisions',
    refreshToken: '/user/refresh-token',
    create: '/user',
    detail: id => `/user/${encodeURIComponent(id)}`
  },
  dashboard: {
    info: '/dashboard',
    ringkasanPenjualan: '/dashboard/ringkasan-penjualan',
    ringkasanPembangunan: '/dashboard/ringkasan-pembangunan',
    demografi: '/dashboard/demografi-konsumen'
  },
  notification: {
    list: '/notifikasi',
    detail: id => `/notifikasi/${encodeURIComponent(id)}`,
    readAll: '/notifikasi/read-all'
  },
  unit: {
    list: '/unit',
    detail: id => `/unit/${encodeURIComponent(id)}`,
    cluster: {
      list: '/unit/cluster',
      detail: id => `/unit/cluster/${encodeURIComponent(id)}`
    },
    tipe: {
      list: '/unit/tipe',
      detail: id => `/unit/tipe/${encodeURIComponent(id)}`
    },
    fasilitas: {
      list: '/unit/fasilitas',
      detail: id => `/unit/fasilitas/${encodeURIComponent(id)}`
    }
  },
  konsumen: {
    list: '/konsumen',
    detail: id => `/konsumen/${encodeURIComponent(id)}`
  },
  marketing: {
    marketer: {
      list: '/marketing/marketer',
      detail: id => `/marketing/marketer/${encodeURIComponent(id)}`
    },
    laporanMarketing: {
      list: '/marketing/laporan-marketing',
      detail: id => `/marketing/laporan-marketing/${encodeURIComponent(id)}`
    },
    laporanInvoice: {
      list: '/marketing/laporan-marketing-invoice',
      generatePDF: '/marketing/laporan-marketing-invoice-generate-pdf'
    }
  },
  verifikasi: {
    dokumenKonsumen: {
      list: '/verifikasi/dokumen-konsumen',
      detail: id => `/verifikasi/dokumen-konsumen/${encodeURIComponent(id)}`,
      triggerNotifications: '/verifikasi/trigger-notifikasi'
    },
    pekerjaan: {
      list: '/verifikasi/dokumen-konsumen-pekerjaan',
      detail: id => `/verifikasi/dokumen-konsumen-pekerjaan/${encodeURIComponent(id)}`,
    },
    alasan: {
      list: '/verifikasi/dokumen-konsumen-alasan',
      detail: id => `/verifikasi/dokumen-konsumen-alasan/${encodeURIComponent(id)}`,
    },
    wilayah: {
      province: '/wilayah/provinsi',
      city: '/wilayah/kota',
    }
  },
  teknik: {
    vendor: {
      list: '/teknik/vendor',
      detail: id => `/teknik/vendor/${encodeURIComponent(id)}`
    },
    templateSPK: {
      list: '/teknik/template-spk',
      detail: id => `/teknik/template-spk/${encodeURIComponent(id)}`
    },
    SPK: {
      list: '/teknik/spk',
      detail: id => `/teknik/spk/${encodeURIComponent(id)}`,
      generateSPK: '/teknik/spk-generate-pdf'
    },
    laporanProgresPembangunan: {
      list: '/teknik/laporan-progres-pembangunan',
      detail: id => `/teknik/laporan-progres-pembangunan/${encodeURIComponent(id)}`,
      generatePDF: '/teknik/laporan-progres-pembangunan-generate-pdf'
    },
    laporanProgresPembangunanNonUnit: {
      list: '/teknik/lpp-spk-non-unit',
      detail: id => `/teknik/lpp-spk-non-unit/${encodeURIComponent(id)}`,
      generatePDF: '/teknik/lpp-spk-non-unit-generate-pdf'
    },
    laporanInvoiceProgresPembangunan: {
      list: '/teknik/laporan-invoice-progres-pembangunan'
    },
    supplier: {
      list: '/teknik/supplier',
      detail: id => `/teknik/supplier/${encodeURIComponent(id)}`
    },
    POSupplier: {
      list: '/teknik/purchase-order',
      detail: id => `/teknik/purchase-order/${encodeURIComponent(id)}`,
      generatePOSupplier: '/teknik/purchase-order-generate-pdf'
    },
    laporanProgresPO: {
      list: '/teknik/progres-purchase-order',
      detail: id => `/teknik/progres-purchase-order/${encodeURIComponent(id)}`,
      generateLaporanProgresPO: '/teknik/progres-purchase-order-generate-pdf'
    },
    SPKNonUnit: {
      list: '/teknik/spk-non-unit',
      detail: id => `/teknik/spk-non-unit/${encodeURIComponent(id)}`,
      generateSPKNonUnit: '/teknik/spk-non-unit-generate-pdf'
    }
  }
}
