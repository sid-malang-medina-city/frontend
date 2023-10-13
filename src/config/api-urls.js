export default {
  users: {
    login: '/user/login',
    list: '/user',
    roles: '/user/roles',
    divisions: '/user/divisions',
    refreshToken: '/user/refresh-token',
    create: '/user',
    detail: id => `/user/${encodeURIComponent(id)}`
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
    detail: id => `konsumen/${encodeURIComponent(id)}`
  },
  marketing: {
    marketer: {
      list: '/marketing/marketer',
      detail: id => `/marketing/marketer/${encodeURIComponent(id)}`
    }
  }
}
