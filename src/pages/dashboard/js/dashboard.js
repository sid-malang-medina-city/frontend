import { mapActions } from 'pinia'
import { dashboardStore } from '~/store/dashboard'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import fileTextIcon from '/file-text.svg'
import packageIcon from '/package.svg'
import coinsIcon from '/coins.svg'
import trucksIcon from '/trucks.svg'
import clockCountdownIcon from '/clock-countdown.svg'
import usersThreeIcon from '/users-three.svg'
import buildingIcon from '/building.svg'

import { InfoFilled } from '@element-plus/icons-vue'

const DASHBOARD_CARDS = {
  total_unit_tersedia: {
    icon: buildingIcon,
    title: 'Unit Tersedia',
    code: 'total_unit_tersedia',
    description: 'Jumlah unit tersedia'
  },
  total_unit_booking: {
    icon: packageIcon,
    title: 'Unit Booking',
    code: 'total_unit_booking',
    description: 'Jumlah unit terbooking'
  },
  total_unit_terjual: {
    icon: coinsIcon,
    title: 'Unit Terjual',
    code: 'total_unit_terjual',
    description: 'Jumlah unit terbooking'
  },
  total_unit_stb: {
    icon: trucksIcon,
    title: 'Unit STB',
    code: 'total_unit_stb',
    description: 'Jumlah unit yang sudah diserahkan'
  },
  total_unit_in_progress_pembangunan: {
    icon: clockCountdownIcon,
    title: 'Unit Progress',
    code: 'total_unit_in_progress_pembangunan',
    description: 'Jumlah unit dalam proses pembangunan'
  },
  total_dokumen_konsumen_progress_verifikasi: {
    icon: fileTextIcon,
    title: 'Progress Verifikasi Konsumen',
    code: 'total_dokumen_konsumen_progress_verifikasi',
    description: 'Jumlah konsumen yang perlu diverifikasi'
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

  components: {
    PageHeader,
    Bar,
    Line,
    InfoFilled
  },

  data () {
    return {
      dashboardInfo: {},
      cards: DASHBOARD_CARDS,
      barChartData: {
        labels: [],
        datasets: []
      },
      barChartOptions: {
        responsive: true
      },
      lineChartData: {
        labels: [],
        datasets: [],
      },
      lineChartOptions: {
        responsive: true
      }
    }
  },

  created () {
    this.getDashboard()
    this.getRingkasanPenjualan()
    this.getRingkasanPembangunan()
  },

  methods: {
    ...mapActions(dashboardStore, [
      'fetchDashboard',
      'fetchRingkasanPenjualan',
      'fetchRingkasanPembangunan'
    ]),

    async getDashboard () {
      try {
        const { data } = await this.fetchDashboard()
        this.dashboardInfo = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getRingkasanPenjualan () {
      try {
        const { data } = await this.fetchRingkasanPenjualan()
        this.initBarChart(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getRingkasanPembangunan () {
      try {
        const { data } = await this.fetchRingkasanPembangunan()
        this.initLineChart(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
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

      const ticks = {
        min: 0,
        fontSize: 14,
        padding: 8,
        maxRotation: 0,
        minRotation: 0,
        callback: (label) => {
          if (/\s/.test(label)) {
            return label.split(' ')
          } else {
            return label
          }
        }
      }
      const scaleLabel = {
        display: true,
        fontColor: 'rgba(0, 0, 0, 0.38)',
        fontSize: 14
      }
      const gridLines = {
        drawOnChartArea: false,
        drawTicks: false
      }
      this.barChartOptions = {
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
  }
}
