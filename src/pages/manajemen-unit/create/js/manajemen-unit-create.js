import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'
import { clusterStore } from '~/store/unit/cluster'
import { tipeUnitStore } from '~/store/unit/tipe-unit'
import { fasilitasStore } from '~/store/unit/fasilitas'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'

import fileHelpers from '~/utils/file'

import {
  Plus,
  Delete,
  View,
  WarningFilled
} from '@element-plus/icons-vue'

const NOMOR_KAVLING_REGEX = /^[A-Z]\d+$/

export default {
  name: 'manajemen-unit-create',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader,
    Plus,
    Delete,
    View,
    WarningFilled
  },

  data () {
    return {
      formData: {
        cluster_id: '',
        nomor_kavling: '',
        harga: '',
        tipe_id: '',
        luas_bangunan: '',
        luas_tanah: '',
        fasilitas_ids: '',
        daya_listrik: '',
        jadwal_bangun: '',
        jumlah_kamar_tidur: null,
        jumlah_kamar_mandi: null,
        foto_1_file: null,
        foto_2_file: null,
        foto_3_file: null
      },
      error: {
        cluster_id: '',
        nomor_kavling: '',
        harga: '',
        tipe_id: '',
      },
      uploadedImages: [
        {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        },
        {
          file: null,
          url: '',
          visible: false,
          error: false,
          message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
        }
      ],
      icons: {
        image: imageIcon,
        uploadImage: uploadImageIcon,
        signature: signatureIcon,
        newspaperClipping: newspaperClippingIcon
      },
      visibleImagePreviewDialog: false,
      visibleImageActionIcons: [false, false, false],
      selectedImageUrl: '',
      tipeUnits: [],
      clusters: [],
      fasilitass: [],
      visibleLoading: false
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = ['cluster_id', 'nomor_kavling', 'harga', 'tipe_id']
      return requiredFields.every(field => !!this.formData[field])
    },

    isSubmitButtonDisabled () {
      return this.isAllRequiredFieldsFilled
    },

    totalImagesUploaded () {
      return !!this.formData.foto_1_file + !!this.formData.foto_2_file + !!this.formData.foto_3_file
    }
  },

  created () {
    this.getTipeUnits()
    this.getClusters()
    this.getFasilitas()
  },

  methods: {
    ...mapActions(unitStore, ['createUnit']),
    ...mapActions(clusterStore, ['fetchClusters']),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),
    ...mapActions(fasilitasStore, ['fetchFasilitass']),

    goToManajemenUnit () {
      this.redirectTo('ManajemenUnit')
    },

    async getTipeUnits () {
      try {
        const { data } = await this.fetchTipeUnits({
          page: 1,
          page_size: 9999
        })
        this.tipeUnits = JSON.parse(JSON.stringify(data.data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getClusters () {
      try {
        const { data } = await this.fetchClusters({
          page: 1,
          page_size: 9999
        })
        this.clusters = JSON.parse(JSON.stringify(data.data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getFasilitas (keyword = '') {
      this.visibleLoading = true
      try {
        const { data } = await this.fetchFasilitass({
          skip_pagination: true,
          search: keyword
        })
        this.fasilitass = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoading = false
      }
    },

    async validateUpload1 (file) {
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      const isValidSize = file.size / 1024 / 1024 <= 1

      if (!isFileFormatPicture) {
        this.showToast('Gagal upload')
        return false
      }

      let compressedFile = file

      if (!isValidSize) {
        compressedFile = await fileHelpers.compressImage(compressedFile, 1)
      }

      this.formData.foto_1_file = compressedFile
      this.generateImage(compressedFile, 0)
    },

    async validateUpload2 (file) {
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      const isValidSize = file.size / 1024 / 1024 <= 1

      if (!isFileFormatPicture) {
        this.showToast('Gagal upload')
        return false
      }

      let compressedFile = file

      if (!isValidSize) {
        compressedFile = await fileHelpers.compressImage(compressedFile, 1)
      }

      this.formData.foto_2_file = compressedFile
      this.generateImage(compressedFile, 1)
    },

    async validateUpload3 (file) {
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      const isValidSize = file.size / 1024 / 1024 <= 1

      if (!isFileFormatPicture) {
        this.showToast('Gagal upload')
        return false
      }

      let compressedFile = file

      if (!isValidSize) {
        compressedFile = await fileHelpers.compressImage(compressedFile, 1)
      }

      this.formData.foto_3_file = compressedFile
      this.generateImage(compressedFile, 2)
    },

    generateImage (file, index) {
      const url = URL.createObjectURL(file)
      this.uploadedImages[index] = {
        ...this.uploadedImage,
        file,
        url,
        visible: false,
        error: false
      }

      const img = new Image()

      if (index === 0) {
        img.onload = this.setImageData1
      } else if (index === 1) {
        img.onload = this.setImageData2
      } else {
        img.onload = this.setImageData3
      }
      img.src = url
    },

    async setImageData1 (event) {
      this.uploadedImages[0].visible = true
    },
    async setImageData2 (event) {
      this.uploadedImages[1].visible = true
    },
    async setImageData3 (event) {
      this.uploadedImages[2].visible = true
    },

    toggleImagePreview () {
      this.visibleImagePreview = !this.visibleImagePreview
    },

    handlePictureCardPreview (index) {
      this.selectedImageUrl = this.uploadedImages[index].url
      this.visibleImagePreviewDialog = true
    },

    handleRemove (index) {
      this.uploadedImages[index] = {
        file: null,
        url: '',
        visible: false,
        error: false,
        message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
      }
      
      if (index === 0) {
        this.formData.foto_1_file = ""
      }
      
      if (index === 1) {
        this.formData.foto_2_file = ""
      }
      
      if (index === 2) {
        this.formData.foto_3_file = ""
      }
    },

    addVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index] = true
    },
    
    removeVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index] = false
    },

    validateNomorKavling () {
      if (!NOMOR_KAVLING_REGEX.test(this.formData.nomor_kavling)) {
        this.error.nomor_kavling = 'Gunakan format yang sesuai (contoh: A1, B12, C123)'
        return false
      }

      this.error.nomor_kavling = ''
      return true
    },

    async submit () {
      if (this.validateNomorKavling()) {
        this.visibleLoading = true
        try {
          await this.createUnit(this.formData)
          this.redirectTo('ManajemenUnit')
          this.showToast('Unit baru berhasil ditambahkan!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
      }
  }
}
