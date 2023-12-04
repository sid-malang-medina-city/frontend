import { notificationStore } from '~/store/notification'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'
import ToastHandler from '~/mixins/toast-handler'

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
    try {
      await dokKonsumenStore.triggerNotifications()
      await notifStore.fetchNotifications({
        skip_pagination: true,
        days_back: 10
      })
    } catch (e) {
      ToastHandler.methods.showErrorResponse(e)
    }
  }
  
  next()
}
