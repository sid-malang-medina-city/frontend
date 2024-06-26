import { mapActions } from 'pinia'
import { clusterStore } from '~/store/unit/cluster'

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
    ...mapActions(clusterStore, [
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
      this.$router.back()
    },

    generateCode (val) {
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