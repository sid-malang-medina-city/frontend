import { notificationStore } from '~/store/notification'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

export default async function beforeHandler (to, from, next) {
  if (to.path !== '/login' && !localStorage.getItem('accessToken')) {
    next('/login')
    return
  }

  if (to.meta.action && !localStorage.getItem('acls').includes(to.meta.action)) {
    next('/no-access')
    return
  }

  if (to.path !== '/login' && !!localStorage.getItem('accessToken')) {
    const dokKonsumenStore = dokumenKonsumenStore()
    const notifStore = notificationStore()
    await dokKonsumenStore.triggerNotifications()
    await notifStore.fetchNotifications({
      skip_pagination: true
    })
  }

  
  next()
}
