import { mapActions } from 'pinia'
import { laporanProgresPOStore } from '~/store/teknik/laporan-progres-po'

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
import { STATUSES } from '~/data/po'

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
  name: 'manajemen-laporan-progres-po-detail',

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
      laporanProgresPO: {},
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
      statuses: STATUSES,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getLaporanProgresPO()
  },

  methods: {
    ...mapActions(laporanProgresPOStore, [
      'fetchLaporanProgresPO',
      'generatePDF'
    ]),

    async getLaporanProgresPO () {
      try {
        const { data } = await this.fetchLaporanProgresPO(this.id)
        this.initLaporanProgresPO(JSON.parse(JSON.stringify(data)))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initLaporanProgresPO (data) {
      this.laporanProgresPO = data
      this.laporanProgresPO.progres_jenis_pekerjaans.forEach((jenisPekerjaan, index) => {
        jenisPekerjaan.id_table = (index + 1).toString()
      })
    },

    async generateLaporanProgresPOPDF () {
      try {
        const { data } = await this.generatePDF({ id: this.id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getLaporanProgresPO()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    openDocumentInNewTab () {
      window.open(this.laporanProgresPO.progres_po_access_url, '_blank');
    },

    goToEditPage () {
      this.redirectTo('ManajemenLaporanProgresPOEdit', {
        params: {
          id: this.laporanProgresPO.id
        }
      })
    },

    goToManajemenLaporanProgresPO () {
      this.$router.back()
    },

    goToPOSupplierDetailPage () {
      this.redirectTo('ManajemenPOSupplierDetail', {
        params: {
          id: this.laporanProgresPO.po
        }
      })
    }
  }
}