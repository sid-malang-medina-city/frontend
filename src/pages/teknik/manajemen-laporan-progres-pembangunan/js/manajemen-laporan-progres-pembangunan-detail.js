import { mapActions } from 'pinia'
import { laporanProgresPembangunanStore } from '~/store/teknik/laporan-progres-pembangunan'

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
  name: 'manajemen-laporan-progres-pembangunan-detail',

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
      laporanProgresPembangunan: {},
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
      isDataFetched: false,
      visiblePassword: false,
      visibleImagePreviewDialog: false,
      visibleImageActionIcons: {},
      selectedImageUrl: '',
      statuses: STATUSES,
      imageStartingIndex: 0,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    totalPrice () {
      let price = 0
      this.laporanProgresPembangunan.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseInt(pekerjaan.harga_total)
        }, 0)
      })
      return price
    }
  },

  created () {
    // this.initVisibleImageActions()
    this.getLaporanProgresPembangunan()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanStore, [
      'fetchLaporanProgresPembangunan',
      'deleteLaporanProgresPembangunan',
      'generatePDF'
    ]),

    initVisibleImageActions () {
      this.fileIdentifiers.forEach(identifier => {
        this.visibleImageActionIcons[identifier] = false
      })
    },

    async getLaporanProgresPembangunan () {
      try {
        const { data } = await this.fetchLaporanProgresPembangunan(this.id)
        this.initLaporanProgresPembangunan(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initLaporanProgresPembangunan (data) {
      this.laporanProgresPembangunan = data
      delete this.laporanProgresPembangunan.id
      this.laporanProgresPembangunan.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
      this.calculatePersentasePekerjaan()
    },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseFloat(pekerjaan.harga_total)
      }, 0)
    },

    calculatePersentasePekerjaan () {
      this.laporanProgresPembangunan.harga_total = 0
      this.laporanProgresPembangunan.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.children.forEach(pekerjaan => {
          pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice)*100
          this.laporanProgresPembangunan.harga_total += pekerjaan.harga_total
        })
      })
    },

    async generateLaporanProgresPembangunanPDF (type) {
      try {
        const { data } = await this.generatePDF({ id: this.id, type })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getLaporanProgresPembangunan()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenLaporanProgresPembangunanEdit', {
        params: {
          id: this.laporanProgresPembangunan.id
        }
      })
    },

    goToManajemenLaporanProgresPembangunan () {
      this.redirectTo('ManajemenLaporanProgresPembangunan')
    },

    getFilesUrl (identifier) {
      return this.laporanProgresPembangunan[identifier]
    },

    isFileTypePDF (identifier) {
      const fileIdentifier = identifier.substring(0, identifier.length - 11)
      return this.laporanProgresPembangunan[fileIdentifier]?.substring(this.laporanProgresPembangunan[fileIdentifier].length-4, this.laporanProgresPembangunan[fileIdentifier].length) === '.pdf'
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

    openDocumentInNewTab (accessUrl) {
      window.open(accessUrl, '_blank');
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus laporan progres pembangunan ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus laporan progres pembangunan berarti menghilangkan progres data LPP',
          'Hapus Laporan Progres Pembangunan',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteLaporanProgresPembangunan()
        this.redirectTo('ManajemenLaporanProgresPembangunan')
        this.showToast('Laporan progres pembangunan berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteLaporanProgresPembangunan() {
      try {
        await this.deleteLaporanProgresPembangunan(this.id)
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
  }
}