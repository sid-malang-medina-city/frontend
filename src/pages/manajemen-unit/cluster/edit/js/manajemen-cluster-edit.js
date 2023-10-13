import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-cluster-edit',

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
    ...mapActions(unitStore, [
      'fetchCluster',
      'editCluster'
    ]),

    async initData () {
      try {
        const { data } = await this.fetchCluster(this.id)
        const { code, nama } = JSON.parse(JSON.stringify(data))
        this.formData = {
          nama: nama,
          code: code
        }
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenCluster () {
      this.redirectTo('ManajemenCluster')
    },

    generateCode (val) {
      console.log(val, val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_'))
      this.formData.code = val.trim().toUpperCase().replace(/[^a-zA-Z 0-9]+/g, '').replaceAll(' ', '_')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editCluster(this.id, this.formData)
        this.redirectTo('ManajemenCluster')
        this.showToast('Data cluster berhasil diperbaharui!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}