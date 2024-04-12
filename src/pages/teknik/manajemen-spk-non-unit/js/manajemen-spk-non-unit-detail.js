import { mapActions } from 'pinia'
import { SPKNonUnitStore } from '~/store/teknik/spk-non-unit'

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
  name: 'manajemen-spk-non-unit-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    Delete,
    EditPen,
    Hide,
    CircleCheckFilled,
    CircleCloseFilled,
    Document,
    Stamp,
    View
  },

  data () {
    return {
      SPKNonUnit: {},
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
      isDataFetched: false,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getSPKNonUnit()
  },

  methods: {
    ...mapActions(SPKNonUnitStore, [
      'fetchSPKNonUnit',
      'generatePDF'
    ]),

    async getSPKNonUnit () {
      try {
        const { data } = await this.fetchSPKNonUnit(this.id)
        this.initSPKNonUnit(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initSPKNonUnit (data) {
      this.SPKNonUnit = data
      this.SPKNonUnit.pekerjaans.forEach((pekerjaan, index) => {
        pekerjaan.id_table = (index + 1).toString()
      })
    },

    async generateSPKNonUnitPDF () {
      try {
        const { data } = await this.generatePDF({ id: this.id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getSPKNonUnit()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    openDocumentInNewTab () {
      window.open(this.SPKNonUnit.spk_non_unit_access_url, '_blank');
    },

    goToEditPage () {
      this.redirectTo('ManajemenSPKNonUnitEdit', {
        params: {
          id: this.SPKNonUnit.id
        }
      })
    },

    goToManajemenSPKNonUnit () {
      this.redirectTo('ManajemenSPKNonUnit')
    },

    goToVendorDetailPage () {
      this.redirectTo('ManajemenVendorDetail', {
        params: {
          id: this.SPKNonUnit.vendor_id
        }
      })
    }
  }
}