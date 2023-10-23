export default {
  methods: {
    hasAccess (acl) {
      return localStorage.getItem('acls').includes(acl)
    }
  }
}
