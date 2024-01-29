import { mapActions } from 'pinia'
import { dashboardStore } from '~/store/dashboard'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import ToastHandler from '~/mixins/toast-handler'
import RouterHandler from '~/mixins/router-handler'

import { Bar, Line, Pie } from 'vue-chartjs'
import 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

import fileTextIcon from '/file-text.svg'
import packageIcon from '/package.svg'
import coinsIcon from '/coins.svg'
import trucksIcon from '/trucks.svg'
import clockCountdownIcon from '/clock-countdown.svg'
import usersThreeIcon from '/users-three.svg'
import buildingIcon from '/building.svg'
import buildingBlueIcon from '/building-blue.svg'
import buildingOrangeIcon from '/building-orange.svg'

import { InfoFilled } from '@element-plus/icons-vue'

const DASHBOARD_CARDS = {
  total_unit: {
    icon: buildingBlueIcon,
    title: 'Total Unit',
    code: 'total_unit',
    description: 'Jumlah keseluruhan unit',
    routeName: 'ManajemenUnit',
    params: {}
  },
  total_unit_terjual: {
    icon: coinsIcon,
    title: 'Unit Terjual',
    code: 'total_unit_terjual',
    description: 'Jumlah unit terjual',
    routeName: 'ManajemenUnit',
    params: {
      status: 'TERJUAL'
    }
  },
  total_unit_booking: {
    icon: packageIcon,
    title: 'Unit Booking',
    code: 'total_unit_booking',
    description: 'Jumlah unit terbooking',
    routeName: 'ManajemenUnit',
    params: {
      status: 'BOOKING'
    }
  },
  total_unit_hold: {
    icon: buildingOrangeIcon,
    title: 'Unit hold',
    code: 'total_unit_hold',
    description: 'Jumlah unit terhold',
    routeName: 'ManajemenUnit',
    params: {
      status: 'HOLD'
    }
  },
  total_unit_tersedia: {
    icon: buildingIcon,
    title: 'Unit Tersedia',
    code: 'total_unit_tersedia',
    description: 'Jumlah unit tersedia',
    routeName: 'ManajemenUnit',
    params: {
      status: 'TERSEDIA'
    }
  },
  total_unit_stb: {
    icon: trucksIcon,
    title: 'Unit STB',
    code: 'total_unit_stb',
    description: 'Jumlah unit yang sudah diserahkan',
    routeName: 'ManajemenUnit',
    params: {
      status: 'STB'
    }
  },
  total_unit_in_progress_pembangunan: {
    icon: clockCountdownIcon,
    title: 'Unit Progress',
    code: 'total_unit_in_progress_pembangunan',
    description: 'Jumlah unit dalam proses pembangunan',
    routeName: 'ManajemenUnit',
    params: {
      status: 'IN_PROGRESS_PEMBANGUNAN'
    }
  },
  total_dokumen_konsumen_progress_verifikasi: {
    icon: fileTextIcon,
    title: 'Progress Verifikasi Konsumen',
    code: 'total_dokumen_konsumen_progress_verifikasi',
    description: 'Jumlah konsumen yang perlu diverifikasi',
    routeName: 'ManajemenDokumenKonsumen',
    params: {
      status_verifikasi: 'IN_PROGRESS'
    }
  },
  total_dokumen_konsumen_ppjb: {
    icon: usersThreeIcon,
    title: 'Konsumen PPJB',
    code: 'total_dokumen_konsumen_ppjb',
    description: 'Jumlah konsumen yang telah membayar PPJB'
  }
}

const RINGKASAN_PENJUALAN_CHART_COLORS = [
  '#61876E',
  '#EAE7B1',
  '#E7B10A',
  '#FF613A',
  '#74C627',
  '#0BB1C4',
  '#FF613A',
  '#898121',
  '#3C6255',
  '#74C627'
]

export default {
  name: 'dashboard',
  
  mixins: [ToastHandler, RouterHandler],

  components: {
    PageHeader,
    Bar,
    Line,
    InfoFilled,
    Pie
  },

  data () {
    return {
      dashboardInfo: {},
      filterPenjualan: '',
      filterPembangunan: '',
      visibleFilterModal: false,
      cards: DASHBOARD_CARDS,
      checkAll: true,
      isIndeterminate: true,
      shortcuts: [
        {
          text: 'Tahun ini',
          value: () => {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            return [start, end]
          },
        },
        {
          text: 'Tahun lalu',
          value: () => {
            const end = new Date(new Date().getFullYear()-1, 11)
            const start = new Date(new Date().getFullYear()-1, 0)
            return [start, end]
          },
        },
        {
          text: 'Bulan ini',
          value: () => {
            const end = new Date()
            const start = new Date()
            return [start, end]
          },
        },
        {
          text: 'Bulan lalu',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            end.setMonth(end.getMonth() - 1)
            return [start, end]
          },
        },
        {
          text: '6 bulan terakhir',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 5)
            return [start, end]
          },
        },
      ],
      charts: [
        'Penjualan Unit',
        'Progress Pembangunan Unit',
        'Demografi Provinsi',
        'Demografi Kota di Jawa Timur',
        'Demografi Usia',
        'Demografi Gaji',
        'Demografi Pekerjaan',
        'Demografi Alasan'
      ],
      visibleCharts: [
        'Penjualan Unit',
        'Progress Pembangunan Unit',
        'Demografi Provinsi',
        'Demografi Kota di Jawa Timur',
        'Demografi Usia',
        'Demografi Gaji',
        'Demografi Pekerjaan',
        'Demografi Alasan'
      ],
      checkedCharts: [
        'Penjualan Unit',
        'Progress Pembangunan Unit',
        'Demografi Provinsi',
        'Demografi Kota di Jawa Timur',
        'Demografi Usia',
        'Demografi Gaji',
        'Demografi Pekerjaan',
        'Demografi Alasan'
      ],
      barChartData: {
        labels: [],
        datasets: []
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          y: {
            ticks: {
              callback: function(value, index, ticks) {
                return value + ' unit';
              },
              stepSize: 1
            },
            min: 0
          }
        }
      },
      wilayahChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value, index, ticks) {
                return value + ' unit';
              },
              stepSize: 1
            },
            min: 0
          }
        }
      },
      lineChartData: {
        labels: [],
        datasets: [],
      },
      lineChartOptions: {
        responsive: true
      },
      usiaChart: {
        labels: [],
        datasets: []
      },
      gajiChart: {
        labels: [],
        datasets: []
      },
      kotaChart: {
        labels: [],
        datasets: []
      },
      provinsiChart: {
        labels: [],
        datasets: []
      },
      alasanChart: {
        labels: [],
        datasets: []
      },
      pekerjaanChart: {
        labels: [],
        datasets: []
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  created () {
    this.initDefaultFilter()
    this.getDashboard()
    this.getRingkasanPenjualan()
    this.getRingkasanPembangunan()
    this.getDemografiUsia()
    this.getDemografiGaji()
    this.getDemografiKota()
    this.getDemografiProvinsi()
    this.getDemografiAlasan()
    this.getDemografiPekerjaan()
  },

  methods: {
    ...mapActions(dashboardStore, [
      'fetchDashboard',
      'fetchRingkasanPenjualan',
      'fetchRingkasanPembangunan',
      'fetchDemografi'
    ]),

    async getDashboard () {
      try {
        const { data } = await this.fetchDashboard()
        this.dashboardInfo = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getRingkasanPenjualan (params = this.getDefaultFilter()) {
      try {
        const { data } = await this.fetchRingkasanPenjualan(params)
        this.initBarChart(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getRingkasanPembangunan (params = this.getDefaultFilter()) {
      try {
        const { data } = await this.fetchRingkasanPembangunan(params)
        this.initLineChart(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getDemografiUsia () {
      try {
        const { data } = await this.fetchDemografi({ type: 'USIA'} )
        this.initDemografiUsia(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initDemografiUsia (data) {
      this.usiaChart = {
        labels: data.labels,
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#0BB1C4'],
          data: data.values
        }]
      }
    },
    
    async getDemografiGaji () {
      try {
        const { data } = await this.fetchDemografi({ type: 'GAJI'} )
        this.initDemografiGaji(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initDemografiGaji (data) {
      this.gajiChart = {
        labels: data.labels,
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#0BB1C4', '#FF613A'],
          data: data.values
        }]
      }
    },
    
    async getDemografiKota () {
      try {
        const { data } = await this.fetchDemografi({ type: 'WILAYAH_KOTA_DI_JAWA_TIMUR' } )
        this.initDemografiKota(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initDemografiKota (data) {
      this.kotaChart = {
        labels: data.labels,
        datasets: [{
          backgroundColor: RINGKASAN_PENJUALAN_CHART_COLORS,
          data: data.values
        }]
      }
    },
    
    async getDemografiProvinsi () {
      try {
        const { data } = await this.fetchDemografi({ type: 'WILAYAH_PROVINSI' } )
        this.initDemografiProvinsi(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initDemografiProvinsi (data) {
      this.provinsiChart = {
        labels: data.labels,
        datasets: [{
          backgroundColor: RINGKASAN_PENJUALAN_CHART_COLORS,
          data: data.values
        }]
      }
    },
  
    async getDemografiAlasan () {
      try {
        const { data } = await this.fetchDemografi({ type: 'ALASAN'} )
        this.initDemografiAlasan(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initDemografiAlasan (data) {
      this.alasanChart = {
        labels: data.labels,
        datasets: [{
          backgroundColor: RINGKASAN_PENJUALAN_CHART_COLORS,
          data: data.values
        }]
      }
    },
    
    async getDemografiPekerjaan () {
      try {
        const { data } = await this.fetchDemografi({ type: 'PEKERJAAN'} )
        this.initDemografiPekerjaan(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initDemografiPekerjaan (data) {
      this.pekerjaanChart = {
        labels: data.labels,
        datasets: [{
          backgroundColor: RINGKASAN_PENJUALAN_CHART_COLORS,
          data: data.values
        }]
      }
    },

    initBarChart (data) {
      let chartData = {}
      chartData.labels = data.labels
      chartData.datasets = []
      data.values.forEach((value, index) => {
        let dataset = {}
        dataset.label = value.type
        dataset.backgroundColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        dataset.borderColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        dataset.data = value.numbers
        chartData.datasets.push(dataset)
      })
      this.barChartData = chartData
    },
    
    
    initLineChart (data) {
      let chartData = {}
      chartData.labels = data.labels
      chartData.datasets = []
      data.values.forEach((value, index) => {
        let dataset = {}
        dataset.label = value.type
        dataset.backgroundColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        dataset.borderColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        dataset.data = value.numbers
        chartData.datasets.push(dataset)
      })
      this.lineChartData = chartData
      this.lineChartOptions = {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          xPadding: 12,
          yPadding: 12
        },
        scales: {
          y: {
            ticks: {
              callback: function(value, index, ticks) {
                return value + ' unit';
              },
              stepSize: 1
            },
            min: 0
          }
        }
      }
    },

    initDefaultFilter () {
      const defaultFilter = this.getDefaultFilter()
      this.filterPenjualan = [
        defaultFilter.start_month,
        defaultFilter.end_month
      ]
      this.filterPembangunan = [
        defaultFilter.start_month,
        defaultFilter.end_month
      ]
    },

    getDefaultFilter () {
      const end = new Date()
      const start = new Date(new Date().getFullYear(), 1)
      start.setMonth(start.getMonth() - 5);
      return {
        start_month: `${start.getFullYear()}-${(start.getMonth()).toString().padStart(2, '0')}`,
        end_month: `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, '0')}`
      }
    },

    handleFilterPenjualanChange () {
      this.getRingkasanPenjualan({
        start_month: this.filterPenjualan[0],
        end_month: this.filterPenjualan[1]
      })
    },

    handleFilterPembangunanChange () {
      this.getRingkasanPembangunan({
        start_month: this.filterPembangunan[0],
        end_month: this.filterPembangunan[1]
      })
    },

    toggleFilterModal () {
      this.checkedCharts = [...this.visibleCharts]
      this.visibleFilterModal = !this.visibleFilterModal
    },

    handleCheckAllChange (val) {
      this.checkedCharts = val ? this.charts : []
      this.isIndeterminate = false
    },
    
    handleCheckedChartsChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.charts.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.charts.length
    },

    resetFilterChart () {
      this.visibleCharts = [...this.charts]
      this.toggleFilterModal()
    },

    updateFilterChart () {
      this.visibleCharts = [...this.checkedCharts]
      this.toggleFilterModal()
    },

    goToListPage (identifier) {
      this.redirectTo(this.cards[identifier].routeName, { query: this.cards[identifier].params })
    }
  }
}
