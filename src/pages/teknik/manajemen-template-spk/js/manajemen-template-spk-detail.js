import { mapActions } from 'pinia'
import { templateSPKStore } from '~/store/teknik/template-spk'

import {
  Delete,
  EditPen,
  View,
  Hide,
  CircleCheckFilled,
  CircleCloseFilled,
  Document
} from '@element-plus/icons-vue'

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
  name: 'manajemen-template-spk-detail',

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
      templateSPK: {},
      icons: {
        delete: Delete,
        image: imageIcon,
        uploadImage: uploadImageIcon,
        signature: signatureIcon,
        newspaperClipping: newspaperClippingIcon,
        megaphone: megaphoneIcon,
        receipt: receiptIcon,
        briefcase: briefcaseIcon
      },
      fileIdentifiers: ['e_ktp_access_url', 'e_ktp_partner_access_url', 'slip_gaji_access_url', 'kartu_keluarga_access_url', 'mutasi_tabungan_access_url', 'surat_pernikahan_access_url', 'dokumen_pendukung_access_url'],
      checkboxIdentifiers: ['e_ktp', 'e_ktp_partner', 'slip_gaji', 'kartu_keluarga', 'mutasi_tabungan', 'surat_pernikahan', 'dokumen_pendukung'],
      fileLabels: ['e-KTP', 'e-KTP Pasangan', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Surat Pernikahan', 'Dokumen Pendukung'],
      checkboxLabels: ['e-KTP', 'e-KTP Pasangan', 'Slip Gaji', 'Kartu Keluarga', 'Mutasi Tabungan', 'Surat Pernikahan', 'Dokumen Pendukung'],
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
    this.getTemplateSPK()
  },

  methods: {
    ...mapActions(templateSPKStore, [
      'fetchTemplateSPK',
      'deleteTemplateSPK'
    ]),

    initVisibleImageActions () {
      this.fileIdentifiers.forEach(identifier => {
        this.visibleImageActionIcons[identifier] = false
      })
    },

    async getTemplateSPK () {
      try {
        const { data } = await this.fetchTemplateSPK(this.id)
        this.initTemplateSPK(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initTemplateSPK (data) {
      this.templateSPK = data
      delete this.templateSPK.id
      this.templateSPK.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
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

    getAlasansRepresentation (alasans) {
      return alasans.map(alasan => alasan.nama).join(', ')
    },

    toggleVisiblePassword () {
      this.visiblePassword = !this.visiblePassword
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus template SPK ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus template SPK berarti menghilangkan progress data',
          'Hapus Template SPK',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteTemplateSPK()
        this.showToast('Template SPK berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteTemplateSPK() {
      try {
        await this.deleteTemplateSPK(this.id)
        this.goToManajemenTemplateSPK()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenTemplateSPKEdit', {
        params: {
          id: this.templateSPK.id
        }
      })
    },

    goToManajemenTemplateSPK () {
      this.redirectTo('ManajemenTemplateSPK')
    },

    goToMarketerDetailPage () {
      // this.redirectTo('ManajemenMarketerDetail', {
      //   params: {
      //     id: this.templateSPK.marketer_id
      //   }
      // })
    },

    goToKonsumenDetailPage () {
      // this.redirectTo('ManajemenKonsumenDetail', {
      //   params: {
      //     id: this.templateSPK.konsumen_id
      //   }
      // })
    },
    
    goToUnitDetailPage () {
      // this.redirectTo('ManajemenUnitDetail', {
      //   params: {
      //     id: this.templateSPK.unit_id
      //   }
      // })
    },

    getFilesUrl (identifier) {
      return this.templateSPK[identifier]
    },

    isFileTypePDF (identifier) {
      const fileIdentifier = identifier.substring(0, identifier.length - 11)
      return this.templateSPK[fileIdentifier]?.substring(this.templateSPK[fileIdentifier].length-4, this.templateSPK[fileIdentifier].length) === '.pdf'
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
      window.open(this.templateSPK[identifier], '_blank');
    }
  }
}