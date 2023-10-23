import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'

import {
  STATUS_VERIFIKASI_EDIT,
  STATUS_PEMBAYARAN_EDIT
} from '~/data/konsumen'

import {
  Plus,
  Delete,
  View,
  Document,
  CircleCheckFilled
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-dokumen-konsumen-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader,
    Plus,
    Delete,
    View,
    Document,
    CircleCheckFilled
  },

  data () {
    return {
      formData: {
        status_verifikasi: '',
        status_pembayaran: '',
        tanggal_verifikasi: '',
        tanggal_booking: '',
        keterangan: '',
        e_ktp_file_delete: '',
        slip_gaji_file_delete: '',
        mutasi_tabungan_file_delete: '',
        surat_pernikahan_file_delete: '',
        dokumen_pendukung_file_delete: ''
      },
      error: {
        nomor_kavling: '',
        harga: '',
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
      paymentStatuses: {},
      selectedImageUrl: '',
      tipeUnits: [],
      clusters: [],
      fasilitass: [],
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
    
    isEndVerificationStatus () {
      return this.status_verifikasi === 'CANCEL' || this.status_verifikasi === 'TIDAK_LOLOS'
    },
  },

  created () {
    this.getDokumenKonsumen()
  },

  methods: {
    ...mapActions(dokumenKonsumenStore, [
      'editDokumenKonsumen',
      'fetchDokumenKonsumen'
    ]),

    async getDokumenKonsumen () {
      try {
        const { data } = await this.fetchDokumenKonsumen(this.id)
        console.log(data)
        this.initFormData(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initFormData (data) {
      this.formData = data
      const imagesIdentifier = ['e_ktp_access_url', 'slip_gaji_access_url', 'kartu_keluarga_access_url', 'mutasi_tabungan_access_url', 'surat_pernikahan_access_url']
      imagesIdentifier.forEach(identifier => {
        this.uploadedImages[identifier].visible = !!this.formData[identifier]
        this.uploadedImages[identifier].url = !!this.formData[identifier] ? this.formData[identifier] : ''
      })
      this.uploadedDocument.visible = !!this.formData['dokumen_pendukung_access_url']
      this.uploadedDocument.file = !!this.formData['dokumen_pendukung_access_url'] ? this.formData['dokumen_pendukung_access_url'] : ''
      this.initStatuses()
    },

    initStatuses () {
      this.verificationStatuses = STATUS_VERIFIKASI_EDIT[this.formData.status_verifikasi]
      this.paymentStatuses = STATUS_PEMBAYARAN_EDIT[this.formData.status_pembayaran]
    },

    goToManajemenDokumenKonsumen () {
      this.redirectTo('ManajemenDokumenKonsumen')
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
      console.log('masuk gen image', file)
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
      console.log(this.visibleImageActionIcons[identifier])
      this.visibleImageActionIcons[identifier] = true
      console.log(this.visibleImageActionIcons[identifier])
      // console.log(this.visibleImageActionIcons)
    },
    
    removeVisibleImageActionIcons (identifier) {
      this.visibleImageActionIcons[identifier] = false
      console.log(this.visibleImageActionIcons)
    },

    async submit () {
      this.visibleLoading = true
      try {
        console.log('coba')
        await this.editDokumenKonsumen(this.id, this.formData)
        console.log('berhasil')
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