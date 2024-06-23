import { mapActions } from 'pinia'
import { vendorStore } from '~/store/teknik/vendor'

import helpers from '~/utils/helpers'

import {
  Delete,
  EditPen,
  View,
  Hide
} from '@element-plus/icons-vue'

import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

export default {
  name: 'manajemen-vendor-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    View,
    Hide
  },

  data () {
    return {
      vendor: {},
      icons: {
        delete: Delete
      },
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getVendor()
  },

  methods: {
    ...mapActions(vendorStore, [
      'fetchVendor',
      'deleteVendor'
    ]),

    async getVendor () {
      try {
        const { data } = await this.fetchVendor(this.id)
        this.vendor = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenVendorEdit', {
        params: {
          id: this.vendor.id
        }
      })
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus vendor ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus vendor berarti menghilangkan spk (jika ada), laporan progress pembangunan (jika ada), dan progress data',
          'Hapus Vendor',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteVendor()
        this.showToast('Vendor berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteVendor() {
      try {
        await this.deleteVendor(this.vendor.id)
        this.redirectTo('ManajemenVendor')
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenVendor () {
      this.$router.back()
    }
  }
}