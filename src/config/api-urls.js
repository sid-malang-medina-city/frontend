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
    ringkasanPembangunan: '/dashboard/ringkasan-pembangunan'
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
      list: '/marketing/laporan-marketing-invoice'
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
  }
}
