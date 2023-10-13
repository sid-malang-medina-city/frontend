import { mapActions } from 'pinia'
import { clusterStore } from '~/store/unit/cluster'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

export default {
  name: 'manajemen-cluster-create',

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
    }
  },

  methods: {
    ...mapActions(clusterStore, ['createCluster']),

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
        await this.createCluster(this.formData)
        this.redirectTo('ManajemenCluster')
        this.showToast('Cluster baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}