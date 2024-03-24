import { mapActions } from 'pinia'
import { POSupplierStore } from '~/store/teknik/po-supplier'

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
  name: 'manajemen-po-supplier-detail',

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
      POSupplier: {},
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
    this.getPOSupplier()
  },

  methods: {
    ...mapActions(POSupplierStore, [
      'fetchPOSupplier',
      'generatePDF'
    ]),

    async getPOSupplier () {
      try {
        const { data } = await this.fetchPOSupplier(this.id)
        this.initPOSupplier(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initPOSupplier (data) {
      this.POSupplier = data
      this.POSupplier.barangs.forEach((barang, index) => {
        barang.id_table = (index + 1).toString()
      })
    },

    async generatePOSupplierPDF () {
      try {
        const { data } = await this.generatePDF({ id: this.id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getPOSupplier()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('ManajemenPOSupplierEdit', {
        params: {
          id: this.POSupplier.id
        }
      })
    },

    goToManajemenPOSupplier () {
      this.redirectTo('ManajemenPOSupplier')
    },

    goToSupplierDetailPage () {
      this.redirectTo('ManajemenSupplierDetail', {
        params: {
          id: this.POSupplier.supplier_id
        }
      })
    }
  }
}