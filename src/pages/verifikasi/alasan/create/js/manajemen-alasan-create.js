import { mapActions } from 'pinia'
import { alasanStore } from '~/store/verifikasi/alasan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-alasan-create',

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
    ...mapActions(alasanStore, ['createAlasan']),

    goToManajemenAlasan () {
      this.redirectTo('ManajemenAlasan')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.createAlasan(this.formData)
        this.redirectTo('ManajemenAlasan')
        this.showToast('Alasan baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}