import { mapActions } from 'pinia'
import { supplierStore } from '~/store/teknik/supplier'

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
  name: 'manajemen-supplier-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    View,
    Hide
  },

  data () {
    return {
      supplier: {},
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
    this.getSupplier()
  },

  methods: {
    ...mapActions(supplierStore, [
      'fetchSupplier',
      'deleteSupplier'
    ]),

    async getSupplier () {
      try {
        const { data } = await this.fetchSupplier(this.id)
        this.supplier = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenSupplierEdit', {
        params: {
          id: this.supplier.id
        }
      })
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus supplier ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus supplier berarti menghilangkan spk (jika ada), laporan progress pembangunan (jika ada), dan progress data',
          'Hapus Supplier',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteSupplier()
        this.showToast('Supplier berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteSupplier() {
      try {
        await this.deleteSupplier(this.supplier.id)
        this.redirectTo('ManajemenSupplier')
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenSupplier () {
      this.$router.back()
    }
  }
}