export default async function checkACL (to, from, next) {
  if (to.path !== '/login' && !localStorage.getItem('accessToken')) {
    next('/login')
    return
  }
  
  next()
}
