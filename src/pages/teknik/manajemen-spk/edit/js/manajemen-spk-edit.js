import { mapActions } from 'pinia'
import { SPKStore } from '~/store/teknik/spk'
import { templateSPKStore } from '~/store/teknik/template-spk'
import { unitStore } from '~/store/unit'
import { vendorStore } from '~/store/teknik/vendor'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'
import { STATUSES } from '~/data/spk'

import receiptIcon from '/receipt.svg'
import briefcaseIcon from '/briefcase.svg'

import {
  CircleCheckFilled,
  WarningFilled,
  Plus,
  Delete,
  Download,
  Edit,
  ArrowUp,
  ArrowDown,
  MoreFilled
} from '@element-plus/icons-vue'

const SATUAN_UKURANS = [
  'm³',
  'm²',
  'm',
  'bh',
  'ls',
  'ttk',
  'set'
]

export default {
  name: 'manajemen-spk-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    Plus,
    Download,
    MoreFilled,
    PageHeader,
  },

  data () {
    return {
      formData: {
        nomor: '',
        unit: '',
        awal_periode: '',
        akhir_periode: '',
        vendor: '',
        keterangan: '',
        unit: '',
        vendor: '',
        harga_total: null,
        harga_total_ppr: 0,
        harga_pekerjaan_pembangunan_rumah: 0,
        harga_subsidi: 0,
        harga_pph21: 0,
        harga_total_ppr_subsidi: 0,
        harga_total_spk: 0,
        jenis_pekerjaans: []
      },
      form: {
        jenisPekerjaan: '',
        pekerjaans: []
      },
      isSPKAddendum: false,
      selectedTipeUnitNomor: null,
      namaPekerjaan: '',
      satuanUkuran: '',
      volume: null,
      hargaSatuan: '',
      editedNamaPekerjaan: '',
      templateSPKId: null,
      templateSPKs: [],
      periodeValue: null,
      satuanUkurans: SATUAN_UKURANS,
      statuses: STATUSES,
      units: [],
      vendors: [],
      icons: {
        receipt: receiptIcon,
        briefcase: briefcaseIcon,
        delete: Delete,
        edit: Edit,
        arrowUp: ArrowUp,
        arrowDown: ArrowDown
      },
      visibleDrawer: false,
      visibleDialog: false,
      visibleLoading: {
        submitButton: false,
        unitDropdown: false,
        vendorDropdown: false
      },
      isDataFetched: false,
      isEditMode: false,
      isEditPekerjaanMode: false,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    isAllRequiredFieldsFilled () {
      const requiredFields = ['unit', 'awal_periode', 'akhir_periode', 'status']
      return requiredFields.every(field => !!this.formData[field]) && this.formData.jenis_pekerjaans.length > 0
    },
    isAddPekerjaanFormIsFilled () {
      return !!this.namaPekerjaan && !!this.satuanUkuran && !!this.volume && !!this.hargaSatuan
    },
    isAddJenisPekerjaanFormIsFilled () {
      return !!this.form.jenisPekerjaan && this.form.pekerjaans.length > 0
    },
    totalPrice () {
      let price = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseFloat(parseFloat(pekerjaan.harga_total).toFixed(2))
        }, 0)
      })
      return price
    }
  },

  created () {
    this.getSPK()
    this.getUnits()
    this.getVendors()
    this.getTemplateSPKs()
  },

  methods: {
    ...mapActions(SPKStore, ['editSPK', 'fetchSPK']),
    ...mapActions(templateSPKStore, ['fetchTemplateSPK', 'fetchTemplateSPKs']),
    ...mapActions(unitStore, ['fetchUnits']),
    ...mapActions(vendorStore, ['fetchVendors']),

    async getTemplateSPKs () {
      try {
        const { data } = await this.fetchTemplateSPKs({
          skip_pagination: true
        })
        this.templateSPKs = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getUnits () {
      this.visibleLoading.unitDropdown = true
      try {
        const { data } = await this.fetchUnits({ skip_pagination: "True", spk_creatable: true })
        this.units = [
          ...this.units,
          ...JSON.parse(JSON.stringify(data))
        ]
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoading.unitDropdown = false
      }
    },

    async getVendors () {
      this.visibleLoading.vendorDropdown = true
      try {
        const { data } = await this.fetchVendors({
          skip_pagination: true
        })
        this.vendors = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoading.vendorDropdown = false
      }
    },

    goToManajemenSPK () {
      this.redirectTo('ManajemenSPK')
    },

    async getSPK () {
      try {
        const { data } = await this.fetchSPK(this.id)

        if (data.status === 'FINAL') {
          this.redirectTo('ManajemenSPK')
          this.showToast('Status SPK sudah final, tidak bisa diubah lagi', 'error')
          return
        }

        this.initFormData(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
        this.units = [
          ...this.units,
          {
            cluster: {
              code: data.unit_cluster_code,
              nama: data.unit_cluster_nama
            },
            tipe: {
              nomor: data.unit_tipe_nomor
            },
            id: data.unit_id,
            nomor_kavling: data.unit_nomor_kavling
          }
        ]
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    async importTemplate () {
      try {
        const { data } = await this.fetchTemplateSPK(this.templateSPKId)
        this.initFormDataFromTemplate(JSON.parse(JSON.stringify(data)))
        this.templateSPKId = null
        this.toggleDialog()
        this.showToast('Import template SPK berhasil!')
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    initFormDataFromTemplate (data) {
      this.formData = {
        ...this.formData,
        ...data,
      }
      delete this.formData.id
      this.formData.unit = this.formData.unit_id
      this.formData.vendor = this.formData.vendor_id
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        delete jenisPekerjaan.id
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          delete pekerjaan.id
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString(),
          pekerjaan.harga_total = parseFloat((parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)).toFixed(2))
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
      this.selectedTipeUnitNomor = this.formData.unit_tipe_nomor
      this.periodeValue = [this.formData.awal_periode, this.formData.akhir_periode]
      this.calculatePersentasePekerjaan()
    },

    initFormData (data) {
      this.formData = {
        ...this.formData,
        ...data,
      }
      delete this.formData.id
      this.formData.unit = this.formData.unit_id
      this.formData.vendor = this.formData.vendor_id
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat((parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)).toFixed(2))
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
      this.selectedTipeUnitNomor = this.formData.unit_tipe_nomor
      this.periodeValue = [this.formData.awal_periode, this.formData.akhir_periode]
      this.calculatePersentasePekerjaan()
    },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseFloat(parseFloat(pekerjaan.harga_total).toFixed(2))
      }, 0)
    },

    calculatePersentaseJenisPekerjaan () {
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.persentase_pekerjaan = jenisPekerjaan.pekerjaans.reduce((persentase, pekerjaan) => {
          return persentase + pekerjaan.persentase_pekerjaan
        }, 0)
      })
    },

    calculateHargaTotal () {
      this.formData.harga_total_ppr = parseFloat(this.formData.harga_pekerjaan_pembangunan_rumah) * this.selectedTipeUnitNomor
      this.formData.harga_total_ppr_subsidi = parseFloat(this.formData.harga_total_ppr) + parseFloat(this.formData.harga_subsidi)
      this.formData.harga_total_spk = parseFloat(this.formData.harga_total_ppr_subsidi) - parseFloat(this.formData.harga_pph21)
    },

    addPekerjaan () {
      if (!this.form.pekerjaans.some(pekerjaan => pekerjaan.nama === this.namaPekerjaan)) {
        this.form.pekerjaans.push({
          id_table: (this.formData.jenis_pekerjaans.length + 1).toString() + (this.formData.jenis_pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
          nama: this.namaPekerjaan,
          satuan_ukuran: this.satuanUkuran,
          volume: parseFloat(this.volume),
          harga_satuan: parseFloat(parseFloat(this.hargaSatuan.replace(',','.')).toFixed(2)),
          harga_total: parseFloat((parseFloat(this.volume) * parseFloat(this.hargaSatuan.replace(',','.'))).toFixed(2))
        })
        this.clearPekerjaan()
      } else {
        this.showToast('Nama pekerjaan sudah ada', 'error')
      }
    },

    editPekerjaan () {
      this.form.pekerjaans.forEach(pekerjaan => {
        if (pekerjaan.nama === this.editedNamaPekerjaan) {
          if ((pekerjaan.nama !== this.namaPekerjaan && !this.form.pekerjaans.some(checkPekerjaan => checkPekerjaan.nama === this.namaPekerjaan)) || pekerjaan.nama === this.namaPekerjaan) {
            pekerjaan.nama = this.namaPekerjaan,
            pekerjaan.satuan_ukuran = this.satuanUkuran,
            pekerjaan.volume = parseFloat(this.volume),
            pekerjaan.harga_satuan = parseFloat(parseFloat(this.hargaSatuan.replace(',', '.')).toFixed(2)),
            pekerjaan.harga_total = parseFloat((parseFloat(this.volume) * parseFloat(this.hargaSatuan.replace(',','.'))).toFixed(2))
            this.showToast('Pekerjaan berhasil diubah')
            this.clearPekerjaan()
            this.isEditPekerjaanMode = false
            return
          } else {
            this.showToast('Nama pekerjaan sudah ada', 'error')
          }
        }
      })
    },

    clearPekerjaan () {
      this.namaPekerjaan = ''
      this.satuanUkuran = ''
      this.volume = null
      this.hargaSatuan = ''
    },

    resetFormPekerjaan () {
      this.clearPekerjaan()
      this.form = {
        jenisPekerjaan: '',
        pekerjaans: []
      }
    },

    movePekerjaan (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.form.pekerjaans[index]))
        this.form.pekerjaans[index] = JSON.parse(JSON.stringify(this.form.pekerjaans[index-1]))
        this.form.pekerjaans[index-1] = JSON.parse(JSON.stringify(temp))
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.form.pekerjaans[index]))
        this.form.pekerjaans[index] = JSON.parse(JSON.stringify(this.form.pekerjaans[index+1]))
        this.form.pekerjaans[index+1] = JSON.parse(JSON.stringify(temp))
      }
    },

    deleteAllPekerjaan () {
      this.form.pekerjaans = []
      this.showToast('Semua pekerjaan berhasil dihapus!')
    },

    deletePekerjaan (namaPekerjaan) {
      this.form.pekerjaans.splice(this.form.pekerjaans.findIndex(pekerjaan => pekerjaan.nama === namaPekerjaan), 1)
      this.isEditPekerjaanMode = false
      this.clearPekerjaan()
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    toggleEditPekerjaan (pekerjaan) {
      this.isEditPekerjaanMode = true
      this.editedNamaPekerjaan = pekerjaan.nama.toString()
      this.namaPekerjaan = pekerjaan.nama.toString()
      this.satuanUkuran = pekerjaan.satuan_ukuran.toString()
      this.volume = pekerjaan.volume.toString()
      this.hargaSatuan = pekerjaan.harga_satuan.toString()
    },

    addJenisPekerjaan () {
      if (!this.formData.jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan)) {
        const jenisPekerjaanRow = {
          id_table: this.formData.jenis_pekerjaans.length + 1,
          nama: this.form.jenisPekerjaan,
          actions: true,
          children: this.form.pekerjaans,
          pekerjaans: this.form.pekerjaans,
          harga_total: this.calculateHargaTotalJenisPekerjaan(this.form.pekerjaans),
        }
        this.formData.jenis_pekerjaans.push(jenisPekerjaanRow)
        this.calculatePersentasePekerjaan()
        this.showToast('Pekerjaan berhasil ditambahkan!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    updateJenisPekerjaan () {
      if (!this.formData.jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan) || this.form.jenisPekerjaan === this.form.currentJenisPekerjaan) {
        const updateIndex = this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === this.form.currentJenisPekerjaan)
        this.formData.jenis_pekerjaans.splice(updateIndex, 1, {
          ...this.formData.jenis_pekerjaans[updateIndex],
          nama: this.form.jenisPekerjaan,
          children: this.form.pekerjaans,
          pekerjaans: this.form.pekerjaans,
          harga_total: this.calculateHargaTotalJenisPekerjaan(this.form.pekerjaans)
        })
        this.calculatePersentasePekerjaan()
        this.calculatePersentaseJenisPekerjaan()
        this.showToast('Pekerjaan berhasil diubah!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    calculatePersentasePekerjaan () {
      this.formData.harga_total = 0
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, indexJenisPekerjaan) => {
        jenisPekerjaan.sequence = indexJenisPekerjaan + 1
        jenisPekerjaan.children.forEach((pekerjaan, indexPekerjaan) => {
          pekerjaan.sequence = indexPekerjaan + 1
          pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice)*100
          this.formData.harga_total += pekerjaan.harga_total
        })
      })
    },

    moveJenisPekerjaan (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index]))
        this.formData.jenis_pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index-1]))
        this.formData.jenis_pekerjaans[index-1] = JSON.parse(JSON.stringify(temp))
        this.formData.jenis_pekerjaans[index].id_table = index + 1
        this.formData.jenis_pekerjaans[index - 1].id_table = index
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index]))
        this.formData.jenis_pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index+1]))
        this.formData.jenis_pekerjaans[index+1] = JSON.parse(JSON.stringify(temp))
        this.formData.jenis_pekerjaans[index].id_table = index + 1
        this.formData.jenis_pekerjaans[index + 1].id_table = index + 2
      }

      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, indexJenisPekerjaan) => {
        jenisPekerjaan.sequence = indexJenisPekerjaan + 1
      })
    },

    deleteJenisPekerjaan (selectedJenisPekerjaan) {
      this.formData.jenis_pekerjaans.splice(this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === selectedJenisPekerjaan), 1)
      this.calculatePersentasePekerjaan()
      this.calculatePersentaseJenisPekerjaan()
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    handleDateRangeChange () {
      this.formData.awal_periode = this.periodeValue[0]
      this.formData.akhir_periode = this.periodeValue[1]
    },

    handleUnitChange (unit) {
      console.log('yey')
      this.selectedTipeUnitNomor = unit.tipe.nomor
      this.calculateHargaTotal()
    },

    async submit () {
      this.visibleLoading.submitButton = true
      this.calculatePersentasePekerjaan()
      try {
        await this.editSPK(this.id, this.generatePayload())
        this.redirectTo('ManajemenSPK')
        this.showToast('SPK berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.jenis_pekerjaans.forEach(data => {
        data.pekerjaans = [...data.children]
      })
      return formData
    },

    toggleDrawer (selectedJenisPekerjaan = '') {
      this.resetFormPekerjaan()
      if (selectedJenisPekerjaan) {
        this.isEditMode = true
        this.form = {
          currentJenisPekerjaan: selectedJenisPekerjaan,
          jenisPekerjaan: selectedJenisPekerjaan,
          pekerjaans: [...this.formData.jenis_pekerjaans.find(jenisPekerjaan => jenisPekerjaan.nama === selectedJenisPekerjaan).children]
        }
      } else {
        this.isEditMode = false
      }
      this.visibleDrawer = !this.visibleDrawer
    },

    toggleDialog () {
      this.visibleDialog = !this.visibleDialog
    }
  },
  watch: {
    isDataFetched () {
      
    }
  }
}
