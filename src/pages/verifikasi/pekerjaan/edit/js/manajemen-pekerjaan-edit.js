import { mapActions } from 'pinia'
import { pekerjaanStore } from '~/store/verifikasi/pekerjaan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-pekerjaan-edit',

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
    },

    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.initData()
  },

  methods: {
    ...mapActions(pekerjaanStore, [
      'fetchPekerjaan',
      'editPekerjaan'
    ]),

    async initData () {
      try {
        const { data } = await this.fetchPekerjaan(this.id)
        const { nama } = JSON.parse(JSON.stringify(data))
        this.formData = {
          nama: nama
        }
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenPekerjaan () {
      this.redirectTo('ManajemenPekerjaan')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editPekerjaan(this.id, this.formData)
        this.redirectTo('ManajemenPekerjaan')
        this.showToast('Data pekerjaan berhasil diperbaharui!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}