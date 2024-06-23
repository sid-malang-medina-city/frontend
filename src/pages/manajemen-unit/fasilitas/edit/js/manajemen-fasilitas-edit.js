import { mapActions } from 'pinia'
import { fasilitasStore } from '~/store/unit/fasilitas'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-fasilitas-edit',

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
    },

    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.initData()
  },

  methods: {
    ...mapActions(fasilitasStore, [
      'fetchFasilitas',
      'editFasilitas'
    ]),

    async initData () {
      try {
        const { data } = await this.fetchFasilitas(this.id)
        const { code, nama } = JSON.parse(JSON.stringify(data))
        this.formData = {
          nama: nama,
          code: code
        }
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenFasilitas () {
      this.$router.back()
    },

    generateCode (val) {
      this.formData.code = val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editFasilitas(this.id, this.formData)
        this.redirectTo('ManajemenFasilitas')
        this.showToast('Data fasilitas berhasil diperbaharui!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}