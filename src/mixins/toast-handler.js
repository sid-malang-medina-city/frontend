export default {
  methods: {
    async showToast (
      message,
      type = 'success',
      duration = 7000,
      dangerouslyUseHTMLString = false,
      showClose = true
    ) {
      try {
        this.$message[type](
          {
            message,
            duration,
            dangerouslyUseHTMLString,
            showClose
          }
        )
      } catch (e) {}
    },

    /* display errors list from api response */
    showErrorResponse (error, duration = 3000) {
      if (error.response.data.detail) {
        let message = error.response.data.detail
        this.showToast(message, 'error', duration)
        return
      }

      if (error.response.status === 500) {
        this.showToast('Terjadi kesalahan. Tolong hubungi administrator terkait masalah ini.', 'error', 5000)
        return
      }

      let errors = error.response.data.errors
      let message = `<div class="alert-list" style="display: flex; flex-direction: column; justify-content: center; gap: 5px;">`

      for (const key in errors) {
        const errorMessages = errors[key]
        message += `
          <div class="alert-list__item item">
        `
        message += errorMessages.reduce((acc, msg) => {
          acc += `
            <div class="item__list">
              ${msg}
            </div>
          `
          return acc
        }, '')
        message += '</div>'
      }
      message += '</div>'

      this.showToast(message, 'error', 20000, true)
    }
  }
}
