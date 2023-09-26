export default {
  users: {
    login: '/users/login/',
    list: '/users/',
    edit: id => `/users/${encodeURIComponent(id)}`
  },
  unit: {
    list: '/unit/'
  }
}
