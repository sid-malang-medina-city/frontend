import { mapActions } from 'pinia'
import { alasanStore } from '~/store/verifikasi/alasan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-alasan-edit',

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
    ...mapActions(alasanStore, [
      'fetchAlasan',
      'editAlasan'
    ]),

    async initData () {
      try {
        const { data } = await this.fetchAlasan(this.id)
        const { nama } = JSON.parse(JSON.stringify(data))
        this.formData = {
          nama: nama
        }
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenAlasan () {
      this.$router.back()
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editAlasan(this.id, this.formData)
        this.redirectTo('ManajemenAlasan')
        this.showToast('Data alasan berhasil diperbaharui!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}