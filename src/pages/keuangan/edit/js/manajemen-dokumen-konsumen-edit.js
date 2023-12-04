import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'
import { wilayahStore } from '~/store/verifikasi/wilayah'
import { pekerjaanStore } from '~/store/verifikasi/pekerjaan'
import { alasanStore } from '~/store/verifikasi/alasan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'

import {
  STATUS_VERIFIKASI_EDIT,
  STATUS_PEMBAYARAN_EDIT,
  STATUS_PEMBAYARAN_EDIT_FAILED_BOOKING
} from '~/data/konsumen'

import {
  Plus,
  Delete,
  View,
  Document,
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-dokumen-konsumen-edit',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    PageHeader,
    Plus,
    Delete,
    View,
    Document,
    CircleCheckFilled,
    WarningFilled
  },

  data () {
    return {
      formData: {
        status_verifikasi: '',
        status_pembayaran: '',
        tanggal_verifikasi: '',
        tanggal_booking: '',
        keterangan: '',
        harga_deal_awal: '',
        nominal_diskon: '',
        kategori_diskon: '',
        harga_cash_setelah_diskon: '',
        harga_deal_akhir: '',
        skema_bayar: '',
        tanggal_ppjb: '',
        keterangan_deal: '',
        e_ktp_file_delete: '',
        slip_gaji_file_delete: '',
        mutasi_tabungan_file_delete: '',
        surat_pernikahan_file_delete: '',
        dokumen_pendukung_file_delete: '',
        provinsi_id: '',
        kota_id: '',
        pekerjaan_id: '',
        gaji_per_bulan: '',
        alasan_ids: []
      },
      error: {
        nomor_kavling: '',
        harga: '',
        nominal_diskon: '',
        tipe: '',
      },
      uploadedDocument: {
        file: null,
        visible: false,
        error: false,
        message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
      },
      uploadedImages: {
        e_ktp_access_url: {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        slip_gaji_access_url: {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        kartu_keluarga_access_url: {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        mutasi_tabungan_access_url: {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        surat_pernikahan_access_url: {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        }
      },
      currentData: {},
      icons: {
        image: imageIcon,
        uploadImage: uploadImageIcon,
        signature: signatureIcon,
        newspaperClipping: newspaperClippingIcon
      },
      visibleImagePreviewDialog: false,
      visibleImageActionIcons: {
        e_ktp_access_url: false,
        slip_gaji_access_url: false,
        kartu_keluarga_access_url: false,
        mutasi_tabungan_access_url: false,
        surat_pernikahan_access_url: false,
        document_pendukung_file: false
      },
      verificationStatuses: {},
      paymentBookingStatuses: {},
      paymentFailedBookingStatuses: {},
      selectedImageUrl: '',
      tipeUnits: [],
      clusters: [],
      fasilitass: [],
      cities: [],
      provinces: [],
      filteredProvinces: [],
      filteredCities: [],
      pekerjaans: [],
      alasans: [],
      loading: {
        city: true,
        province: true
      },
      visibleLoading: false
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = ['status_verifikasi', 'status_pembayaran']
      if (this.formData.status_verifikasi === 'TERJADWAL_VERIFIKASI') {
        requiredFields.push('tanggal_verifikasi')  
      }

      return requiredFields.every(field => !!this.formData[field])
    },

    isSubmitButtonDisabled () {
      return this.isAllRequiredFieldsFilled
    },

    id () {
      return this.$route.params.id
    },
    
    isCurrentEndVerificationStatus () {
      return this.currentData.status_verifikasi === 'CANCEL' || this.currentData.status_verifikasi === 'TIDAK_LOLOS'
    },
    
    isEndVerificationStatus () {
      return this.formData.status_verifikasi === 'CANCEL' || this.formData.status_verifikasi === 'TIDAK_LOLOS' || this.isCurrentEndVerificationStatus
    },

    paymentStatuses () {
      return this.isEndVerificationStatus ? this.paymentFailedBookingStatuses : this.paymentBookingStatuses
    }
  },

  created () {
    this.getPekerjaans()
    this.getAlasans()
    this.getProvinces()
    this.getDokumenKonsumen()
  },

  methods: {
    ...mapActions(dokumenKonsumenStore, [
      'editDokumenKonsumen',
      'fetchDokumenKonsumen'
    ]),
    ...mapActions(wilayahStore, [
      'fetchProvinces',
      'fetchCities'
    ]),
    ...mapActions(pekerjaanStore, [
      'fetchPekerjaans'
    ]),
    ...mapActions(alasanStore, [
      'fetchAlasans'
    ]),

    async getProvinces () {
      const payload = {
        page: 1,
        page_size: 9999
      }
      try {
        const { data } = await this.fetchProvinces(payload)
        this.provinces = JSON.parse(JSON.stringify(data.data))
        this.filteredProvinces = JSON.parse(JSON.stringify(data.data))
        this.loading.province = false
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getCities () {
      const payload = {
        page: 1,
        page_size: 9999,
        provinsi_id: this.formData.provinsi_id
      }
      try {
        const { data } = await this.fetchCities(payload)
        this.cities = JSON.parse(JSON.stringify(data.data))
        this.filteredCities = JSON.parse(JSON.stringify(data.data))
        this.loading.city = false
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    reGetCities () {
      this.loading.city = true
      this.formData.kota_id = ''
      this.getCities()
    },

    async getPekerjaans () {
      try {
        const { data } = await this.fetchPekerjaans({
          skip_pagination: true
        })
        this.pekerjaans = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getAlasans () {
      try {
        const { data } = await this.fetchAlasans({
          skip_pagination: true
        })
        this.alasans = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getDokumenKonsumen () {
      try {
        const { data } = await this.fetchDokumenKonsumen(this.id)
        this.initFormData(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initFormData (data) {
      this.formData = JSON.parse(JSON.stringify(data))
      this.formData.alasan_ids = JSON.parse(JSON.stringify(this.formData.alasans)).map(alasan => alasan.id)
      this.formData.pekerjaan_id = this.formData.pekerjaan ? this.formData.pekerjaan.id : ''
      this.formData.provinsi_id = this.formData.provinsi ? this.formData.provinsi.id : ''
      this.formData.kota_id = this.formData.kota ? this.formData.kota.id : ''
      this.currentData = JSON.parse(JSON.stringify(data))
      const imagesIdentifier = ['e_ktp_access_url', 'slip_gaji_access_url', 'kartu_keluarga_access_url', 'mutasi_tabungan_access_url', 'surat_pernikahan_access_url']
      imagesIdentifier.forEach(identifier => {
        this.uploadedImages[identifier].visible = !!this.formData[identifier]
        this.uploadedImages[identifier].url = !!this.formData[identifier] ? this.formData[identifier] : ''
      })
      this.uploadedDocument.visible = !!this.formData['dokumen_pendukung_access_url']
      this.uploadedDocument.file = !!this.formData['dokumen_pendukung_access_url'] ? this.formData['dokumen_pendukung_access_url'] : ''
      
      if (this.formData.provinsi_id) {
        this.getCities()
      }
      this.calculateHargaAkhir()
      this.initStatuses()
    },

    initStatuses () {
      this.verificationStatuses = STATUS_VERIFIKASI_EDIT[this.formData.status_verifikasi]
      this.paymentBookingStatuses = STATUS_PEMBAYARAN_EDIT[this.formData.status_pembayaran]
      this.paymentFailedBookingStatuses = STATUS_PEMBAYARAN_EDIT_FAILED_BOOKING[this.formData.status_pembayaran]
    },

    goToManajemenDokumenKonsumen () {
      this.redirectTo('KeuanganManajemenDokumenKonsumen')
    },

    openDocumentInNewTab () {
      window.open(this.uploadedDocument.file, '_blank');
    },

    uploadDocument (file) {
      this.formData.dokumen_pendukung_file = file
      var blob = new Blob([file], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      this.uploadedDocument.file = url
      this.uploadedDocument.visible = true
      // const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      // if (!isFileFormatPicture) {
      //   // this.uploadedImages[identifier].message = 'Format foto harus JPG/PNG. Max. size: 2 MB.'
      //   // this.uploadedImages[identifier].error = true
      //   this.showToast('Gagal upload')
      //   return false
      // }

      // this.formData[identifier.replace('_access_url', '_file')] = file
      // this.generateImage(file, identifier)
    },

    validateUpload (file, identifier) {
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      if (!isFileFormatPicture) {
        // this.uploadedImages[identifier].message = 'Format foto harus JPG/PNG. Max. size: 2 MB.'
        // this.uploadedImages[identifier].error = true
        this.showToast('Gagal upload')
        return false
      }

      this.formData[identifier.replace('_access_url', '_file')] = file
      this.generateImage(file, identifier)
    },

    generateImage (file, identifier) {
      const url = URL.createObjectURL(file)
      this.uploadedImages[identifier] = {
        ...this.uploadedImage,
        file,
        url,
        visible: false,
        error: false
      }
      const img = new Image()
      img.src = url
      this.uploadedImages[identifier].visible = true
    },

    toggleImagePreview () {
      this.visibleImagePreview = !this.visibleImagePreview
    },

    handlePictureCardPreview (index) {
      this.selectedImageUrl = this.uploadedImages[index].url
      this.visibleImagePreviewDialog = true
    },

    handleRemove (identifier) {
      this.uploadedImages[identifier] = {
        file: null,
        url: '',
        visible: false,
        error: false,
        message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
      }

      this.formData[identifier.replace('_access_url', '_file')] = ''
      this.formData[identifier.replace('_access_url', '_file_delete')] = true
    },

    handleRemoveDocument () {
      this.uploadedDocument = {
        file: null,
        visible: false,
        error: false,
        message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
      }

      this.formData.dokumen_pendukung_file = ''
      this.formData.dokumen_pendukung_file_delete = true
    },

    addVisibleImageActionIcons (identifier) {
      this.visibleImageActionIcons[identifier] = true
    },
    
    removeVisibleImageActionIcons (identifier) {
      this.visibleImageActionIcons[identifier] = false
    },

    validateDiskon () {
      if (+this.formData.nominal_diskon > +this.formData.harga_deal_awal || +this.formData.nominal_diskon > +this.formData.unit_harga) {
        this.error.diskon = 'Harga Diskon tidak boleh melebihi harga deal awal atau harga unit'
        return false
      }
      this.calculateHargaAkhir()
      this.error.diskon = ''
      return true
    },

    calculateHargaAkhir () {
      this.formData.harga_cash_setelah_diskon = (this.formData.unit_harga - +this.formData.nominal_diskon).toString()
      this.formData.harga_deal_akhir = (this.formData.harga_deal_awal - +this.formData.nominal_diskon).toString()
    },

    async submit () {
      if (Object.values(this.error).every(value => value === '')) {
        this.visibleLoading = true
        try {
          await this.editDokumenKonsumen(this.id, this.formData)
          this.redirectTo('KeuanganManajemenDokumenKonsumen')
          this.showToast('Data dokumen konsumen berhasil diperbarui!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    }
  }
}
