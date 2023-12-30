import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

import {
  Delete,
  EditPen,
  View,
  Hide,
  CircleCheckFilled,
  CircleCloseFilled,
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
    CircleCloseFilled,
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
      fileIdentifiers: ['e_ktp_access_url', 'e_ktp_partner_access_url', 'slip_gaji_access_url', 'kartu_keluarga_access_url', 'mutasi_tabungan_access_url', 'surat_pernikahan_access_url', 'dokumen_pendukung_access_url'],
      checkboxIdentifiers: ['e_ktp', 'e_ktp_partner', 'slip_gaji', 'kartu_keluarga', 'mutasi_tabungan', 'surat_pernikahan', 'dokumen_pendukung'],
      fileLabels: ['e-KTP', 'e-KTP Pasangan', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Surat Pernikahan', 'Dokumen Pendukung'],
      checkboxLabels: ['e-KTP', 'e-KTP Pasangan', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Surat Pernikahan', 'Dokumen Pendukung'],
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
        const { data } = await this.fetchDokumenKonsumen(this.id)
        this.dokumenKonsumen = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    getAlasansRepresentation (alasans) {
      return alasans.map(alasan => alasan.nama).join(', ')
    },

    toggleVisiblePassword () {
      this.visiblePassword = !this.visiblePassword
    },

    goToEditPage () {
      this.redirectTo('KeuanganManajemenDokumenKonsumenEdit', {
        params: {
          id: this.dokumenKonsumen.id
        }
      })
    },

    goToManajemenDokumenKonsumen () {
      this.redirectTo('KeuanganManajemenDokumenKonsumen')
    },

    goToMarketerDetailPage () {
      this.redirectTo('ManajemenMarketerDetail', {
        params: {
          id: this.dokumenKonsumen.marketer_id
        }
      })
    },

    goToKonsumenDetailPage () {
      this.redirectTo('ManajemenKonsumenDetail', {
        params: {
          id: this.dokumenKonsumen.konsumen_id
        }
      })
    },
    
    goToUnitDetailPage () {
      this.redirectTo('ManajemenUnitDetail', {
        params: {
          id: this.dokumenKonsumen.unit_id
        }
      })
    },

    getFilesUrl (identifier) {
      return this.dokumenKonsumen[identifier]
    },

    isFileTypePDF (identifier) {
      const fileIdentifier = identifier.substring(0, identifier.length - 11)
      return this.dokumenKonsumen[fileIdentifier]?.substring(this.dokumenKonsumen[fileIdentifier].length-4, this.dokumenKonsumen[fileIdentifier].length) === '.pdf'
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

    openDocumentInNewTab (identifier) {
      window.open(this.dokumenKonsumen[identifier], '_blank');
    }
  }
}