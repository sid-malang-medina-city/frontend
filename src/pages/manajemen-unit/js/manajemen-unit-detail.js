import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'

import {
  Delete,
  EditPen,
  View,
  Hide
} from '@element-plus/icons-vue'

import { STATUSES } from '~/data/unit'
import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'
import helpers from '~/utils/helpers'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'

import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

export default {
  name: 'manajemen-unit-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    View,
    Hide,
    StatusBadge
  },

  data () {
    return {
      unit: {},
      icons: {
        delete: Delete,
        image: imageIcon,
        uploadImage: uploadImageIcon,
        signature: signatureIcon,
        newspaperClipping: newspaperClippingIcon
      },
      statuses: STATUSES,
      visiblePassword: false,
      visibleImagePreviewDialog: false,
      visibleImageActionIcons: [false, false, false],
      selectedImageUrl: '',
      imageStartingIndex: 0,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    isImagesExists () {
      return !!this.unit.foto_1_access_url || !!this.unit.foto_2_access_url || !!this.unit.foto_3_access_url
    }
  },

  created () {
    this.getUnit()
  },

  methods: {
    ...mapActions(unitStore, [
      'fetchUnit',
      'deleteUnit'
    ]),

    async getUnit () {
      try {
        const { data } = await this.fetchUnit(this.id)
        this.unit = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    toggleVisiblePassword () {
      this.visiblePassword = !this.visiblePassword
    },

    goToEditPage () {
      this.redirectTo('ManajemenUnitEdit', {
        params: {
          id: this.unit.id
        }
      })
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus unit ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus unit berarti menghilangkan progress data dan akses mereka',
          'Hapus Unit',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteUnit()
        this.showToast('Unit berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteUnit() {
      try {
        await this.deleteUnit(id)
        this.redirectTo('ManajemenUnit')
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenUnit () {
      this.redirectTo('ManajemenUnit')
    },

    getImageUrl (index) {
      if (index === 1) {
        return this.unit.foto_1_access_url
      }
      if (index === 2) {
        return this.unit.foto_2_access_url
      }
      if (index === 3) {
        return this.unit.foto_3_access_url
      }
    },

    addVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index-1] = true
    },
    
    removeVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index-1] = false
    },

    handlePictureCardPreview (index) {
      this.selectedImageUrl = this.getImageUrl(index)
      this.visibleImagePreviewDialog = true
    },
  }
}