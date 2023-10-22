import { mapActions } from 'pinia'
import { marketerStore } from '~/store/marketing/marketer'

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

import { STATUS_MARKETER } from '~/data/marketing'

export default {
  name: 'manajemen-marketer-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    View,
    Hide
  },

  data () {
    return {
      marketer: {},
      statuses: STATUS_MARKETER,
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
    this.getMarketer()
  },

  methods: {
    ...mapActions(marketerStore, [
      'fetchMarketer',
      'deleteMarketer'
    ]),

    async getMarketer () {
      try {
        const { data } = await this.fetchMarketer(this.id)
        this.marketer = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenMarketerEdit', {
        params: {
          id: this.marketer.id
        }
      })
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus marketer ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus marketer berarti menghilangkan progress data dan akses mereka',
          'Hapus Marketer',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteMarketer()
        this.showToast('Marketer berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteMarketer() {
      try {
        await this.deleteMarketer({ id: this.marketer.id })
        this.redirectTo('ManajemenMarketer')
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenMarketer () {
      this.redirectTo('ManajemenMarketer')
    }
  }
}