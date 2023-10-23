import { mapActions } from 'pinia'
import { konsumenStore } from '~/store/konsumen'

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

import { STATUS_KONSUMEN, STATUS_VERIFIKASI, STATUS_PEMBAYARAN } from '~/data/konsumen'

export default {
  name: 'manajemen-konsumen-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    View,
    Hide
  },

  data () {
    return {
      konsumen: {},
      statuses: STATUS_KONSUMEN,
      verificationStatuses: STATUS_VERIFIKASI,
      paymentStatuses: STATUS_PEMBAYARAN,
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
    this.getKonsumen()
  },

  methods: {
    ...mapActions(konsumenStore, [
      'fetchKonsumen',
      'deleteKonsumen'
    ]),

    async getKonsumen () {
      try {
        const { data } = await this.fetchKonsumen(this.id)
        this.konsumen = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenKonsumenEdit', {
        params: {
          id: this.konsumen.id
        }
      })
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus konsumen ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus konsumen berarti menghilangkan progress data dan akses mereka',
          'Hapus Konsumen',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteKonsumen()
        this.showToast('Konsumen berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteKonsumen() {
      try {
        await this.deleteKonsumen({ id: this.konsumen.id })
        this.redirectTo('ManajemenKonsumen')
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenKonsumen () {
      this.redirectTo('ManajemenKonsumen')
    },
    
    goToMarketerDetailPage () {
      this.redirectTo('ManajemenMarketerDetail', {
        params: {
          id: this.konsumen.dokumen_konsumen_marketer_id
        }
      })
    },

    goToUnitDetailPage () {
      this.redirectTo('ManajemenUnitDetail', {
        params: {
          id: this.konsumen.dokumen_konsumen_unit_id
        }
      })
    },

    goToDokumenKonsumenDetailPage () {
      this.redirectTo('ManajemenDokumenKonsumenDetail', {
        params: {
          id: this.konsumen.dokumen_konsumen_id
        }
      })
    }
  }
}