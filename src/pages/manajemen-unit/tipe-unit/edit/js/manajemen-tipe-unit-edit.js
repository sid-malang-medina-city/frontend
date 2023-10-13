import { mapActions } from 'pinia'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-tipe-unit-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader
  },

  data () {
    return {
      formData: {
        nama: '',
        code: ''
      }
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
    ...mapActions(tipeUnitStore, [
      'fetchTipeUnit',
      'editTipeUnit'
    ]),

    async initData () {
      try {
        const { data } = await this.fetchTipeUnit(this.id)
        const { code, nama } = JSON.parse(JSON.stringify(data))
        this.formData = {
          nama: nama,
          code: code
        }
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenTipeUnit () {
      this.redirectTo('ManajemenTipeUnit')
    },

    generateCode (val) {
      console.log(val, val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_'))
      this.formData.code = val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editTipeUnit(this.id, this.formData)
        this.redirectTo('ManajemenTipeUnit')
        this.showToast('Data tipe unit berhasil diperbaharui!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}