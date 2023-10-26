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

    getCalculatedYBasedOnAddress (arrayLength) {
      if (arrayLength === 1) {
        return 7
      } else if (arrayLength === 2) {
        return 12
      }
      return 17
    },

    getPDFValue (text) {
      if (!text) {
        return '-'
      }

      return text
    },

    async generatePDF(laporanInvoice) {
      var doc = new jsPDF();
      var img = new Image()
      img.src = '/logo.png'
      doc.addImage(img, 'png', 80, 18, 42, 23)
      doc.text('LAPORAN MARKETING INVOICE', 58, 50)
      doc.line(58, 51, 145, 51)
      doc.text('LAPORAN MARKETING INVOICE', 58, 50)
      doc.setFontSize(12).text(`No: ${laporanInvoice.code}`, 64, 60)
      let currentY = 72
      doc.setFontSize(12).text('Permohonan komisi untuk marketer untuk penjualan unit rumah dengan informasi:', 24, 72)
      currentY += 8
      doc.setFontSize(12).text('Nama User', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.konsumen_nama), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Alamat Rumah', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      let splitAlamat = doc.splitTextToSize(this.getPDFValue(laporanInvoice.konsumen_alamat), 100)
      doc.setFontSize(12).text(splitAlamat, 90, currentY)
      currentY += this.getCalculatedYBasedOnAddress(splitAlamat.length)
      doc.setFontSize(12).text('No. Telp/HP', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.konsumen_nomor_telepon), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Cluster Unit', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.unit_cluster_nama), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Nomor Kavling', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.unit_nomor_kavling), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Bangunan', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.unit_tipe), 90, currentY)
      currentY += 12
      doc.setFontSize(12).text('Ditujukan untuk marketer dengan informasi:', 24, currentY)
      currentY += 8
      doc.setFontSize(12).text('Nama Marketer', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.nama), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Alamat Rumah', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      splitAlamat = doc.splitTextToSize(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.alamat), 100)
      doc.setFontSize(12).text(splitAlamat, 90, currentY)
      currentY += this.getCalculatedYBasedOnAddress(splitAlamat.length)
      doc.setFontSize(12).text('No. Telp/HP', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.nomor_telepon), 90, currentY)
      currentY += 12
      doc.setFontSize(12).text('Dengan informasi komisi di bawah ini:', 24, currentY)
      currentY += 8
      doc.setFontSize(12).text('Jumlah Komisi', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(helpers.convertPriceToRupiah(this.getPDFValue(laporanInvoice.laporan_marketing.jumlah_fee)), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('NPWP', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.npwp), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Nomor Rekening', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.nomor_rekening), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Nama Bank', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.rekening_bank), 90, currentY)
      currentY += 7
      doc.setFontSize(12).text('Atas Nama', 44, currentY)
      doc.setFontSize(12).text(':', 84, currentY)
      doc.setFontSize(12).text(this.getPDFValue(laporanInvoice.laporan_marketing.marketer.nama_rekening), 90, currentY)
      currentY += 10
      doc.setFontSize(12).text('· Jumlah komisi akan dipotong PPh (pajak penghasilan)', 24, currentY)
      currentY += 20
      doc.setFontSize(12).text(`Malang, ${helpers.getCurrentDate()}`, 130, currentY)
      currentY += 6
      doc.setFontSize(12).text('Disetujui/Pihak', 140, currentY)
      currentY += 22
      doc.setFontSize(12).text('Henny Trisnowati', 153 - doc.getTextWidth('Henny Trisnowati')/2, currentY)
      currentY += 6
      doc.setFontSize(12).text('Manager Divisi Marketing', 129, currentY)
      doc.output('dataurlnewwindow');
    }
  }
}
