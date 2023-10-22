export default {
  methods: {
    hasAccess (acl) {
      console.log(acl, localStorage.getItem('acls'))
      return localStorage.getItem('acls').includes(acl)
    }
  }
}
