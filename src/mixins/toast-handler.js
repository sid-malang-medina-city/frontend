export default {
  methods: {
    async showToast (
      message,
      type = 'success',
      duration = 7000,
      showClose = true
    ) {
      try {
        this.$message[type](
          {
            message,
            duration,
            showClose
          }
        )
      } catch (e) {}
    },

    /* display errors list from api response */
    showErrorResponse (error, duration) {
      if (error.response.code === 401) {
        if (error.response.code === 500) {
          this.showToast('Terjadi kesalahan. Tolong hubungi administrator terkait masalah ini.', 'error', 5000)
          return
        }
  
        const message = error.response.data.detail
        this.showToast(message, 'error', duration)
      }
    }
  }
}
