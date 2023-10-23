import { mapActions } from 'pinia'
import { fasilitasStore } from '~/store/unit/fasilitas'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-fasilitas-create',

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
    ...mapActions(fasilitasStore, ['createFasilitas']),

    goToManajemenFasilitas () {
      this.redirectTo('ManajemenFasilitas')
    },

    generateCode (val) {
      console.log(val, val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_'))
      this.formData.code = val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.createFasilitas(this.formData)
        this.redirectTo('ManajemenFasilitas')
        this.showToast('Fasilitas baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}