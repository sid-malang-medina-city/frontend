import { mapActions } from 'pinia'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-tipe-unit-create',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader
  },

  data () {
    return {
      formData: {
        nama: '',
        code: ''
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
    ...mapActions(tipeUnitStore, ['createTipeUnit']),

    goToManajemenTipeUnit () {
      this.redirectTo('ManajemenTipeUnit')
    },

    generateCode (val) {
      this.formData.code = val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.createTipeUnit(this.formData)
        this.redirectTo('ManajemenTipeUnit')
        this.showToast('Tipe unit baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}