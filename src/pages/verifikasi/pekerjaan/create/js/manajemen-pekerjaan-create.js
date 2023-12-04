import { mapActions } from 'pinia'
import { pekerjaanStore } from '~/store/verifikasi/pekerjaan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-pekerjaan-create',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader
  },

  data () {
    return {
      formData: {
        nama: ''
      },
      visibleLoading: false
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      return !!this.formData.nama
    }
  },

  methods: {
    ...mapActions(pekerjaanStore, ['createPekerjaan']),

    goToManajemenPekerjaan () {
      this.redirectTo('ManajemenPekerjaan')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.createPekerjaan(this.formData)
        this.redirectTo('ManajemenPekerjaan')
        this.showToast('Pekerjaan baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}