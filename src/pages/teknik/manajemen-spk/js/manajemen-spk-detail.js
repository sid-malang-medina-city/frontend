import { mapActions } from 'pinia'
import { SPKStore } from '~/store/teknik/spk'

import {
  Delete,
  EditPen,
  Hide,
  CircleCheckFilled,
  CircleCloseFilled,
  Document,
  Stamp,
  View,
  MoreFilled
} from '@element-plus/icons-vue'

import { STATUSES } from '~/data/spk'
import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'
import helpers from '~/utils/helpers'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'
import megaphoneIcon from '/megaphone.svg'
import receiptIcon from '/receipt.svg'
import briefcaseIcon from '/briefcase.svg'

import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

export default {
  name: 'manajemen-spk-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    Hide,
    CircleCheckFilled,
    CircleCloseFilled,
    Document,
    Stamp,
    View,
    StatusBadge
  },

  data () {
    return {
      SPK: {},
      icons: {
        delete: Delete,
        moreFilled: MoreFilled,
        image: imageIcon,
        uploadImage: uploadImageIcon,
        signature: signatureIcon,
        newspaperClipping: newspaperClippingIcon,
        megaphone: megaphoneIcon,
        receipt: receiptIcon,
        briefcase: briefcaseIcon,
      },
      fileIdentifiers: ['e_ktp_access_url', 'e_ktp_partner_access_url', 'slip_gaji_access_url', 'kartu_keluarga_access_url', 'mutasi_tabungan_access_url', 'surat_pernikahan_access_url', 'dokumen_pendukung_access_url'],
      checkboxIdentifiers: ['e_ktp', 'e_ktp_partner', 'slip_gaji', 'kartu_keluarga', 'mutasi_tabungan', 'surat_pernikahan', 'dokumen_pendukung'],
      fileLabels: ['e-KTP', 'e-KTP Pasangan', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Surat Pernikahan', 'Dokumen Pendukung'],
      checkboxLabels: ['e-KTP', 'e-KTP Pasangan', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Surat Pernikahan', 'Dokumen Pendukung'],
      statuses: STATUSES,
      isDataFetched: false,
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
    // this.initVisibleImageActions()
    this.getSPK()
  },

  methods: {
    ...mapActions(SPKStore, [
      'fetchSPK',
      'generatePDF'
    ]),

    initVisibleImageActions () {
      this.fileIdentifiers.forEach(identifier => {
        this.visibleImageActionIcons[identifier] = false
      })
    },

    async getSPK () {
      try {
        const { data } = await this.fetchSPK(this.id)
        this.initSPK(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initSPK (data) {
      this.SPK = data
      delete this.SPK.id
      this.SPK.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
    },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseFloat(pekerjaan.harga_total)
      }, 0)
    },

    async generateSPKPDF () {
      try {
        const { data } = await this.generatePDF({ id: this.id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getSPK()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenSPKEdit', {
        params: {
          id: this.SPK.id
        }
      })
    },

    goToManajemenSPK () {
      this.redirectTo('ManajemenSPK')
    },

    getFilesUrl (identifier) {
      return this.SPK[identifier]
    },

    isFileTypePDF (identifier) {
      const fileIdentifier = identifier.substring(0, identifier.length - 11)
      return this.SPK[fileIdentifier]?.substring(this.SPK[fileIdentifier].length-4, this.SPK[fileIdentifier].length) === '.pdf'
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
      window.open(this.SPK[identifier], '_blank');
    }
  }
}