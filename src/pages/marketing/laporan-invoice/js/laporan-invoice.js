import jsPDF from "jspdf";

import { mapActions } from 'pinia'
import { laporanInvoiceStore } from '~/store/marketing/laporan-invoice'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import helpers from '~/utils/helpers'

import logo from '/logo.svg'
import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'laporan-invoice',

  mixins: [RouterHandler, ToastHandler, DebounceHandler],

  components: {
    PageHeader,
    ArrowDown,
    ArrowUp,
    Plus,
    Search
  },

  data () {
    return {
      filters: {
        search: this.$route.query.search || null,
      },
      pagination: {
        page: 1,
        size: 10
      },
      laporanInvoices: [],
      exportedLaporanInvoice: {},
      totalLaporanInvoices: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      },
      helpers,
      logo
    }
  },

  computed: {
    totalShownLaporanInvoices () {
      const totalItems = this.totalLaporanInvoices
      const { page, size } = this.pagination
      const totalSize = page * size
      const lastPageSize = totalItems % size

      return (totalItems >= totalSize) ? size : lastPageSize
    },

    generateFilters () {
      return {
        ...this.filters,
        ...this.pagination
      }
    }
  },

  created () {
    this.visibleFilter = !!this.filters.search
    this.getLaporanInvoices()
  },

  methods: {
    ...mapActions(laporanInvoiceStore, ['fetchLaporanInvoices']),

    async getLaporanInvoices () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchLaporanInvoices(this.generateFilters)
        this.laporanInvoices = JSON.parse(JSON.stringify(data.data))
        this.totalLaporanInvoices = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getLaporanInvoices()
    },

    handleFilterChange () {
      this.setRouteParam('LaporanMarketingInvoice', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    goToLaporanMarketingDetailPage (id) {
      this.redirectTo('LaporanMarketingDetail', {
        params: {
          id: id
        }
      })
    },

    getCalculatedYBasedOnKategori (arrayLength) {
      if (arrayLength === 1) {
        return 14
      } else if (arrayLength === 2) {
        return 19
      }
      return 24
    },

    getPDFValue (text) {
      if (!text) {
        return '-'
      }

      return text
    },

    async generatePDF(laporanInvoice) {
      var doc = new jsPDF('p', 'mm', [148.5, 210]);
      var img = new Image()
      img.src = '/logo.png'
      doc.addImage(img, 'png', 53, 9, 42, 23)
      doc.text('FORM PENGAJUAN FEE MARKETING', 26, 40)
      doc.line(26, 41, 126, 41)
      doc.setFontSize(12).text(`No: ${laporanInvoice.code}`, 37, 47)
      let currentY = 62
      doc.setFontSize(12).text('Permohonan fee atas penjualan unit rumah dengan informasi:', 14, currentY)
      currentY += 8
      let splitNama = doc.splitTextToSize(this.getPDFValue(laporanInvoice.konsumen_nama), 60)
      doc.setFontSize(12).text('Nama User', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.konsumen_nama), 75, currentY)
      if (splitNama.length === 1) {
        currentY += 7
      } else if (splitNama.length === 2) {
        currentY += 12
      } else {
        currentY += 17
      }
      doc.setFontSize(12).text('Cluster Unit', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.unit_cluster_nama), 75, currentY)
      currentY += 7
      doc.setFontSize(12).text('Nomor Kavling', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.unit_nomor_kavling), 75, currentY)
      currentY += 7
      doc.setFontSize(12).text('LB/LT	', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(`${this.getPDFValue(laporanInvoice.unit_luas_bangunan)}/${this.getPDFValue(laporanInvoice.unit_luas_tanah)}`, 75, currentY)
      currentY += 7
      doc.setFontSize(12).text('Bangunan', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.unit_tipe), 75, currentY)
      currentY += 7
      doc.setFontSize(12).text('Jumlah Komisi', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(`Rp. ${this.helpers.convertPriceToRupiah(laporanInvoice.laporan_marketing.jumlah_fee, false)}*`, 75, currentY)
      currentY += 7
      let splitKategori = doc.splitTextToSize(this.getPDFValue(laporanInvoice.laporan_marketing.keterangan), 60)
      doc.setFontSize(12).text('Kategori', 30, currentY)
      doc.setFontSize(12).text(':', 65, currentY)
      doc.setFontSize(12).text(splitKategori, 75, currentY)
      currentY += this.getCalculatedYBasedOnKategori(splitKategori.length)
      doc.setFontSize(10).text('*Fee belum dipotong PPh 21', 14, currentY)
      currentY = 160
      doc.setFontSize(12).text(`Malang, ${helpers.getCurrentDate()}`, 80, currentY)
      currentY += 6
      doc.setFontSize(12).text('Disetujui/Pihak', 91, currentY)
      currentY += 22
      doc.setFontSize(12).text('Aida Noviasari', 91, currentY)
      currentY += 6
      doc.setFontSize(12).text('Manager Divisi Marketing', 81, currentY)
      doc.output('dataurlnewwindow');
    }
  }
}
