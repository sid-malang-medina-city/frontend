import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

import {
  Delete,
  EditPen,
  View,
  Hide
} from '@element-plus/icons-vue'

import { STATUS_VERIFIKASI, STATUS_PEMBAYARAN } from '~/data/konsumen'
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
  name: 'manajemen-dokumen-konsumen-detail',

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
      dokumenKonsumen: {},
      icons: {
        delete: Delete,
        image: imageIcon,
        uploadImage: uploadImageIcon,
        signature: signatureIcon,
        newspaperClipping: newspaperClippingIcon
      },
      verificationStatuses: STATUS_VERIFIKASI,
      paymentStatuses: STATUS_PEMBAYARAN,
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
      return !!this.dokumenKonsumen.foto_1_access_url || !!this.dokumenKonsumen.foto_2_access_url || !!this.dokumenKonsumen.foto_3_access_url
    }
  },

  created () {
    this.getDokumenKonsumen()
  },

  methods: {
    ...mapActions(dokumenKonsumenStore, [
      'fetchDokumenKonsumen',
      'deleteDokumenKonsumen'
    ]),

    async getDokumenKonsumen () {
      try {
        console.log('masuk')
        const { data } = await this.fetchDokumenKonsumen(this.id)
        this.dokumenKonsumen = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    toggleVisiblePassword () {
      this.visiblePassword = !this.visiblePassword
    },

    goToEditPage () {
      this.redirectTo('ManajemenDokumenKonsumenEdit', {
        params: {
          id: this.dokumenKonsumen.id
        }
      })
    },

    goToManajemenDokumenKonsumen () {
      this.redirectTo('ManajemenDokumenKonsumen')
    },

    getImageUrl (index) {
      if (index === 1) {
        return this.dokumenKonsumen.foto_1_access_url
      }
      if (index === 2) {
        return this.dokumenKonsumen.foto_2_access_url
      }
      if (index === 3) {
        return this.dokumenKonsumen.foto_3_access_url
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