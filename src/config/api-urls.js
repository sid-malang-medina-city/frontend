export default {
  users: {
    login: '/users/login/',
    list: '/users/',
    roles: '/users/roles/',
    divisions: '/users/divisions/',
    edit: id => `/users/${encodeURIComponent(id)}`
  },
  unit: {
    list: '/unit/'
  }
}
