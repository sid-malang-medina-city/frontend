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

import fileHelpers from '~/utils/file'

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
        e_ktp_partner_file_delete: '',
        slip_gaji_file_delete: '',
        mutasi_tabungan_file_delete: '',
        surat_pernikahan_file_delete: '',
        dokumen_pendukung_file_delete: '',
        provinsi_id: '',
        kota_id: '',
        provinsi: '',
        kota: '',
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
      uploadFields: [
        {
          accessUrl: 'e_ktp_access_url',
          label: 'e-KTP'
        },
        {
          accessUrl: 'e_ktp_partner_access_url',
          label: 'e-KTP Pasangan'
        },
        {
          accessUrl: 'slip_gaji_access_url',
          label: 'Slip Gaji'
        },
        {
          accessUrl: 'kartu_keluarga_access_url',
          label: 'Kartu Keluarga'
        },
        {
          accessUrl: 'mutasi_tabungan_access_url',
          label: 'Mutasi Tabungan'
        },
        {
          accessUrl: 'surat_pernikahan_access_url',
          label: 'Surat Pernikahan'
        },
      ],
      uploadedDocuments: {
        e_ktp_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        },
        e_ktp_partner_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        },
        slip_gaji_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        },
        kartu_keluarga_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        },
        mutasi_tabungan_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        },
        surat_pernikahan_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        },
        dokumen_pendukung_access_url: {
          file: null,
          visible: false,
          error: false,
          message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
        }
      },
      uploadedImages: {
        e_ktp_access_url: {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        e_ktp_partner_access_url: {
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
        dokumen_pendukung_access_url: false
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
      const identifiers = [
        { accessUrl: 'e_ktp_access_url', file: 'e_ktp' },
        { accessUrl: 'e_ktp_partner_access_url', file: 'e_ktp_partner' },
        { accessUrl: 'slip_gaji_access_url', file: 'slip_gaji' },
        { accessUrl: 'kartu_keluarga_access_url', file: 'kartu_keluarga' },
        { accessUrl: 'mutasi_tabungan_access_url', file: 'mutasi_tabungan' },
        { accessUrl: 'surat_pernikahan_access_url', file: 'surat_pernikahan' },
        { accessUrl: 'dokumen_pendukung_access_url', file: 'dokumen_pendukung' },
      ]
      identifiers.forEach(identifier => {
        if (this.formData[identifier.accessUrl] && this.formData[identifier.file].substring(this.formData[identifier.file].length-4, this.formData[identifier.file].length) === '.pdf') {
          this.uploadedDocuments[identifier.accessUrl].visible = !!this.formData[identifier.accessUrl]
          this.uploadedDocuments[identifier.accessUrl].file = !!this.formData[identifier.accessUrl] ? this.formData[identifier.accessUrl] : ''  
        } else if (identifier.accessUrl !== 'dokumen_pendukung_access_url') {
          this.uploadedImages[identifier.accessUrl].visible = !!this.formData[identifier.accessUrl]
          this.uploadedImages[identifier.accessUrl].url = !!this.formData[identifier.accessUrl] ? this.formData[identifier.accessUrl] : ''
        }
      })
      
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

    handleSelectProvince (province) {
      this.formData.provinsi = province.name
    },

    goToManajemenDokumenKonsumen () {
      this.redirectTo('ManajemenDokumenKonsumen')
    },

    openDocumentInNewTab (identifier) {
      window.open(this.uploadedDocuments[identifier].file, '_blank');
    },

    uploadDocument (file, identifier) {
      this.formData[identifier.replace('_access_url', '_file')] = file
      var blob = new Blob([file], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      this.uploadedDocuments[identifier].file = url
      this.uploadedDocuments[identifier].visible = true
    },

    async validateUpload (file, identifier) {
      const isFileFormatImage = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      const isFileFormatPDF = file.type === 'application/pdf'
      const isFileFormatValid = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(file.type)
      const isPDFValidSize = file.size / 1024 / 1024 <= 2
      const isValidSize = file.size / 1024 / 1024 <= 1
      if (!isFileFormatValid) {
        this.showToast('Gagal upload', 'error')
        return false
      }

      let compressedFile = file

      if (!isValidSize && isFileFormatImage) {
        compressedFile = await fileHelpers.compressImage(compressedFile, 1)
      }

      if (!isPDFValidSize && isFileFormatPDF) {
        this.showToast('Gagal upload, file PDF terlalu besar (max. 2mb)', 'error')
        return
      }

      this.formData[identifier.replace('_access_url', '_file')] = compressedFile
      if (compressedFile.type === 'application/pdf') {
        this.uploadDocument(compressedFile, identifier)
        return
      }
      this.generateImage(compressedFile, identifier)
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

    handleRemoveDocument (identifier) {
      this.uploadedDocuments[identifier] = {
        file: null,
        visible: false,
        error: false,
        message: 'Ukuran dokumen yang di-upload terlalu besar. Ukuran maksimum 2mb.'
      }

      this.formData[identifier.replace('_access_url', '_file')] = ''
      this.formData[identifier.replace('_access_url', '_file_delete')] = true
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
          this.redirectTo('ManajemenDokumenKonsumen')
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
