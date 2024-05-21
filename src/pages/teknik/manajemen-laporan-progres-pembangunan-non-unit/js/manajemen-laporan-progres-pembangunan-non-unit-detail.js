import { mapActions } from 'pinia'
import { laporanProgresPembangunanNonUnitStore } from '~/store/teknik/laporan-progres-pembangunan-non-unit'

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
  name: 'manajemen-laporan-progres-pembangunan-non-unit-detail',

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
      laporanProgresPembangunanNonUnit: {},
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
      this.laporanProgresPembangunanNonUnit.pekerjaans.forEach(pekerjaan => {
        price += pekerjaan.harga_total
      })
      return price
    }
  },

  created () {
    this.getLaporanProgresPembangunanNonUnit()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanNonUnitStore, [
      'fetchLaporanProgresPembangunanNonUnit',
      'deleteLaporanProgresPembangunanNonUnit',
      'generatePDF'
    ]),

    async getLaporanProgresPembangunanNonUnit () {
      try {
        const { data } = await this.fetchLaporanProgresPembangunanNonUnit(this.id)
        this.initLaporanProgresPembangunanNonUnit(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initLaporanProgresPembangunanNonUnit (data) {
      this.laporanProgresPembangunanNonUnit = data
      // this.laporanProgresPembangunanNonUnit.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
      //   jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
      //   jenisPekerjaan.actions = true
      //   jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
      //     pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
      //     pekerjaan.harga_total = parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)
      //   })
      //   jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
      //   jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      // })
      this.laporanProgresPembangunanNonUnit.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
        pekerjaan.id_table = (pekerjaanIndex + 1).toString()
      })
      this.calculatePersentasePekerjaan()
    },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseFloat(pekerjaan.harga_total)
      }, 0)
    },

    calculatePersentasePekerjaan () {
      this.laporanProgresPembangunanNonUnit.harga_total = 0
      this.laporanProgresPembangunanNonUnit.pekerjaans.forEach(pekerjaan => {
        pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice)*100
        this.laporanProgresPembangunanNonUnit.harga_total += pekerjaan.harga_total
      })
    },

    async generateLaporanProgresPembangunanNonUnitPDF (type) {
      try {
        const { data } = await this.generatePDF({ id: this.id, type })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getLaporanProgresPembangunanNonUnit()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnitEdit', {
        params: {
          id: this.laporanProgresPembangunanNonUnit.id
        }
      })
    },

    goToManajemenLaporanProgresPembangunanNonUnit () {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
    },

    getFilesUrl (identifier) {
      return this.laporanProgresPembangunanNonUnit[identifier]
    },

    isFileTypePDF (identifier) {
      const fileIdentifier = identifier.substring(0, identifier.length - 11)
      return this.laporanProgresPembangunanNonUnit[fileIdentifier]?.substring(this.laporanProgresPembangunanNonUnit[fileIdentifier].length-4, this.laporanProgresPembangunanNonUnit[fileIdentifier].length) === '.pdf'
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
        await this.handleDeleteLaporanProgresPembangunanNonUnit()
        this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
        this.showToast('Laporan progres pembangunan berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteLaporanProgresPembangunanNonUnit() {
      try {
        await this.deleteLaporanProgresPembangunanNonUnit(this.id)
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
  }
}