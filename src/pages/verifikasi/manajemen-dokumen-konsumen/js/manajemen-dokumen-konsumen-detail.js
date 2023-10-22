import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

import {
  Delete,
  EditPen,
  View,
  Hide,
  CircleCheckFilled,
  Document
} from '@element-plus/icons-vue'

import { STATUS_VERIFIKASI, STATUS_PEMBAYARAN } from '~/data/konsumen'
import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'
import helpers from '~/utils/helpers'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'
import megaphoneIcon from '/megaphone.svg'

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
    CircleCheckFilled,
    Document,
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
        newspaperClipping: newspaperClippingIcon,
        megaphone: megaphoneIcon,
      },
      fileIdentifiers: ['e_ktp_access_url', 'slip_gaji_access_url', 'kartu_keluarga_access_url', 'mutasi_tabungan_access_url', 'akta_perkawinan_access_url'],
      fileLabels: ['e-KTP', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Akta Perkawinan'],
      verificationStatuses: STATUS_VERIFIKASI,
      paymentStatuses: STATUS_PEMBAYARAN,
      visiblePassword: false,
      visibleImagePreviewDialog: false,
      visibleImageActionIcons: {},
      selectedImageUrl: '',
      imageStartingIndex: 0,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.initVisibleImageActions()
    this.getDokumenKonsumen()
  },

  methods: {
    ...mapActions(dokumenKonsumenStore, [
      'fetchDokumenKonsumen',
      'deleteDokumenKonsumen'
    ]),

    initVisibleImageActions () {
      this.fileIdentifiers.forEach(identifier => {
        this.visibleImageActionIcons[identifier] = false
      })
    },

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

    getFilesUrl (identifier) {
      return this.dokumenKonsumen[identifier]
    },

    addVisibleImageActionIcons (identifier) {
      this.visibleImageActionIcons[identifier] = true
    },
    
    removeVisibleImageActionIcons (identifier) {
      this.visibleImageActionIcons[identifier] = false
    },

    handlePictureCardPreview (identifier) {
      this.selectedImageUrl = this.getFilesUrl(identifier)
      this.visibleImagePreviewDialog = true
    },

    openDocumentInNewTab () {
      window.open(this.dokumenKonsumen.dokumen_pendukung_access_url, '_blank');
    }
  }
}