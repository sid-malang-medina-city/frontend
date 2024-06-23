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
      helpers,
      spkLanjutans: [
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
        {id: 1, nomor: 'test abncsaenfjkeajnskfjnasjkfnjkaesnfkjanfjkeasnfjk'},
      ]
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    totalPrice () {
      let price = 0
      this.SPK.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseFloat(pekerjaan.harga_total)
        }, 0)
      })
      return price
    },
    totalPricePengurangan () {
      let price = 0
      this.SPK.jenis_pekerjaan_pengurangans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseFloat(pekerjaan.harga_total)
        }, 0)
      })
      return price
    }
  },

  created () {
    // this.initVisibleImageActions()
    this.getSPK()
  },

  methods: {
    ...mapActions(SPKStore, [
      'fetchSPK',
      'deleteSPK',
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
      this.SPK.jenis_pekerjaan_pengurangans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaan_pengurangans.forEach((pekerjaan, pekerjaanIndex) => {
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaan_pengurangans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaan_pengurangans]
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
      this.$router.back()
    },

    async goToManajemenSPKDetail (id) {
      await this.redirectTo('ManajemenSPKDetail', {
        params: { id }
      })
      this.getSPK()
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

    openDocumentInNewTab (accessUrl) {
      window.open(accessUrl, '_blank');
    },

    async openModalConfirmation () {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus SPK ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus SPK berarti menghilangkan data SPK dan LPP yang telah ada',
          'Hapus SPK',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteSPK()
        this.redirectTo('ManajemenSPK')
        this.showToast('SPK berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteSPK() {
      try {
        await this.deleteSPK(this.id)
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
  }
}