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
    list: '/units',
    detail: id => `/unit/${encodeURIComponent(id)}`
  },
  konsumen: {
    list: '/konsumen',
    detail: id => `konsumen/${encodeURIComponent(id)}`
  },
  marketer: {
    list: '/marketer'
  }
}
