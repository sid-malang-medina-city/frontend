import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import imageIcon from '/image.svg'
import uploadImageIcon from '/upload-image.svg'
import signatureIcon from '/signature.svg'
import newspaperClippingIcon from '/newspaper-clipping.svg'

import {
  Plus,
  Delete,
  View
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-unit-create',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader,
    Plus,
    Delete,
    View
  },

  data () {
    return {
      formData: {
        nomor_kavling: '',
        harga: '',
        tipe: '',
        luas_bangunan: '',
        luas_tanah: '',
        fasilitas: [],
        daya_listrik: '',
        jumlah_kamar_tidur: null,
        jumlah_kamar_mandi: null,
        foto_1_file: null,
        foto_2_file: null,
        foto_3_file: null
      },
      error: {
        nomor_kavling: '',
        harga: '',
        tipe: '',
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
      // divisions: [],
      // roles: []
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = ['nomor_kavling', 'harga', 'tipe']
      return requiredFields.every(field => !!this.formData[field])
    },

    isSubmitButtonDisabled () {
      return this.isAllRequiredFieldsFilled && this.totalImagesUploaded > 0
    },

    totalImagesUploaded () {
      return !!this.formData.foto_1_file + !!this.formData.foto_2_file + !!this.formData.foto_3_file
    }
  },

  created () {
    // this.getRoles()
    // this.getDivisions()
  },

  methods: {
    // ...mapActions(userStore, [
    //   'createUser',
    //   'fetchDivisions',
    //   'fetchRoles'
    // ]),

    ...mapActions(unitStore, ['createUnit']),

    goToManajemenUnit () {
      this.redirectTo('ManajemenUnit')
    },

    validateUpload1 (file) {
      console.log(file)
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)

      if (!isFileFormatPicture) {
        // this.uploadedImages[index-1].message = 'Format foto harus JPG/PNG. Max. size: 2 MB.'
        // this.uploadedImages[index-1].error = true
        this.showToast('Failed to upload')
        return false
      }

      this.formData.foto_1_file = file
      this.generateImage(file, 0)
    },

    validateUpload2 (file) {
      console.log(file)
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)

      if (!isFileFormatPicture) {
        // this.uploadedImages[index-1].message = 'Format foto harus JPG/PNG. Max. size: 2 MB.'
        // this.uploadedImages[index-1].error = true
        this.showToast('Failed to upload')
        return false
      }

      this.formData.foto_2_file = file
      this.generateImage(file, 1)
    },
    validateUpload3 (file) {
      console.log(file)
      const isFileFormatPicture = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)

      if (!isFileFormatPicture) {
        // this.uploadedImages[index-1].message = 'Format foto harus JPG/PNG. Max. size: 2 MB.'
        // this.uploadedImages[index-1].error = true
        this.showToast('Failed to upload')
        return false
      }

      this.formData.foto_3_file = file
      this.generateImage(file, 2)
    },

    generateImage (file, index) {
      console.log('masuk gen image', file)
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
      console.log('img', img)
    },

    // validateImageDimensions1 (event) {
    //   // const image = event.target
    //   // const isValid = image.width >= 800 && image.height >= 800

    //   // this.uploadedImage.error = !isValid
    //   // if (!isValid) {
    //   //   this.showToast('Failed to upload')
    //   //   return
    //   // }
    //   this.setImageData(this.uploadedImages[index].file, index)
    // },

    async setImageData1 (event) {
      // console.log('masuk set img data', file)
      this.uploadedImages[0].visible = true
      // this.formData.images.push(await helpers.fileToByteArray(file))
      console.log('selesai set img data')
    },
    async setImageData2 (event) {
      // console.log('masuk set img data', file)
      this.uploadedImages[1].visible = true
      // this.formData.images.push(await helpers.fileToByteArray(file))
      console.log('selesai set img data')
    },
    async setImageData3 (event) {
      // console.log('masuk set img data', file)
      this.uploadedImages[2].visible = true
      // this.formData.images.push(await helpers.fileToByteArray(file))
      console.log('selesai set img data')
    },

    toggleImagePreview () {
      this.visibleImagePreview = !this.visibleImagePreview
    },

    handlePictureCardPreview (index) {
      // console.log('preview', file)
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
      // console.log(this.visibleImageActionIcons)
    },
    
    removeVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index] = false
      // console.log(this.visibleImageActionIcons)
    },

    async submit () {
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
