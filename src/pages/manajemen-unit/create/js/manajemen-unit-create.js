import { mapActions } from 'pinia'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'

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
  name: 'manajemen-user-create',

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
        noKavling: '',
        price: '',
        type: '',
        floorArea: '',
        landArea: '',
        facility: [],
        powerCapacity: '',
        totalBedrooms: null,
        totalBathrooms: null,
        images: []
      },
      error: {
        noKavling: '',
        price: '',
        type: '',
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
      const requiredFields = ['noKavling', 'price', 'type']
      return requiredFields.every(field => !!this.formData[field])
    },

    isSubmitButtonDisabled () {
      return this.isAllRequiredFieldsFilled
    },

    totalImagesUploaded () {
      return this.formData.images.length
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

    goToManajemenUnit () {
      this.redirectTo('ManajemenUnit')
    },

    handlePictureCardPreview (file) {
      console.log('preview', file)
    },
    
    handleRemove (file) {
      console.log('remove', file)
    },

    validateUpload (file) {
      console.log('yes')
      // const isJPG = file.type === 'image/jpeg'
      // const isValidSize = file.size / 1024 / 1024 <= 2
      // const isValid = isJPG && isValidSize

      // this.uploadedImage.message = 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
      // this.uploadedImage.error = !isValid
      // if (!isValid) {
      //   console.log('not valid')
      //   this.showToast('Failed to upload')
      //   return false
      // }
      this.generateImage(file)
    },

    generateImage (file) {
      console.log('masuk gen image')
      const url = URL.createObjectURL(file)
      this.uploadedImages[this.formData.images.length] = {
        ...this.uploadedImage,
        file,
        url,
        visible: false,
        error: false
      }

      const img = new Image()
      img.onload = this.validateImageDimensions
      img.src = url
      console.log('img', img)
    },

    validateImageDimensions (event) {
      // const image = event.target
      // const isValid = image.width >= 800 && image.height >= 800

      // this.uploadedImage.error = !isValid
      // if (!isValid) {
      //   this.showToast('Failed to upload')
      //   return
      // }
      this.setImageData(this.uploadedImages[this.formData.images.length].file)
    },

    async setImageData (file) {
      console.log('masuk set img data', file)
      this.uploadedImages[this.formData.images.length].visible = true
      this.formData.images.push(await helpers.fileToByteArray(file))
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
      this.uploadedImages.splice(index, 1)
      this.uploadedImages.push({
        file: null,
        url: '',
        visible: false,
        error: false,
        message: 'Image must be in JPG and at least 800 x 800 pixels. Max. size: 2 MB.'
      })
      this.formData.images.splice(index, 1)
    },

    addVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index] = true
      console.log(this.visibleImageActionIcons)
    },
    
    removeVisibleImageActionIcons (index) {
      this.visibleImageActionIcons[index] = false
      console.log(this.visibleImageActionIcons)
    },

    // async submit () {
    //   if (this.validateEmail() && this.validatePassword()) {
    //     this.visibleLoading = true
    //     try {
    //       await this.createUser(this.formData)
    //       this.redirectTo('ManajemenUser')
    //       this.showToast('User baru berhasil ditambahkan!')
    //     } catch (e) {
    //       this.showErrorResponse(e)
    //     } finally {
    //       this.visibleLoading = false
    //     }
    //   }
    // }
  }
}
