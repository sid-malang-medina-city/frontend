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

const DASHBOARD_CARDS = {
  total_unit_booking: {
    icon: packageIcon,
    title: 'Unit Booking',
    code: 'total_unit_booking'
  },
  total_unit_terjual: {
    icon: coinsIcon,
    title: 'Unit Terjual',
    code: 'total_unit_terjual'
  },
  total_unit_stb: {
    icon: trucksIcon,
    title: 'Unit STB',
    code: 'total_unit_stb'
  },
  total_unit_in_progress_pembangunan: {
    icon: clockCountdownIcon,
    title: 'Unit Progress',
    code: 'total_unit_in_progress_pembangunan'
  },
  total_dokumen_konsumen_progress_verifikasi: {
    icon: fileTextIcon,
    title: 'Progress Verifikasi Konsumen',
    code: 'total_dokumen_konsumen_progress_verifikasi'
  },
  total_dokumen_konsumen_ppjb: {
    icon: usersThreeIcon,
    title: 'Konsumen PPJB',
    code: 'total_dokumen_konsumen_ppjb'
  }
}

const RINGKASAN_PENJUALAN_CHART_COLORS = [
  '#61876E',
  '#EAE7B1',
  '#E7B10A',
  '#FF613A',
]

export default {
  name: 'dashboard',

  components: {
    PageHeader,
    Bar,
    Line
  },

  data () {
    return {
      dashboardInfo: {},
      cards: DASHBOARD_CARDS,
      // chartData: {},
      // chartOptions: {}
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
        responsive: true,
        // maintainAspectRatio: false,
      }
    }
  },

  created () {
    this.getDashboard()
    // this.initChart()
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
      console.log(data.values)
      data.values.forEach((value, index) => {
        console.log(value, index)
        let dataset = {}
        dataset.label = value.type
        dataset.backgroundColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        dataset.borderColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        // temporary data
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
      // this.chartData = {
      //   labels,
      //   datasets: [{
      //     backgroundColor: 'rgba(100, 119, 206, 0.5)',
      //     data: dataSetsData,
      //     barThickness: 30
      //   }]
      // }
      this.barChartOptions = {
        responsive: true,
        // maintainAspectRatio: false,
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
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                return value + ' unit';
              }
            }
          }
        }
      }
    },
    
    
    initLineChart (data) {
      let chartData = {}
      chartData.labels = data.labels
      chartData.datasets = []
      console.log(data.values)
      data.values.forEach((value, index) => {
        console.log(value, index)
        let dataset = {}
        dataset.label = value.type
        dataset.backgroundColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        dataset.borderColor = RINGKASAN_PENJUALAN_CHART_COLORS[index]
        // temporary data
        // dataset.data = [90,20,10,40,50,30,100]
        dataset.data = value.numbers
        chartData.datasets.push(dataset)
      })
      this.lineChartData = chartData

      // const ticks = {
      //   min: 0,
      //   fontSize: 14,
      //   padding: 8,
      //   maxRotation: 0,
      //   minRotation: 0,
      //   callback: (label) => {
      //     if (/\s/.test(label)) {
      //       return label.split(' ')
      //     } else {
      //       return label
      //     }
      //   }
      // }
      // const scaleLabel = {
      //   display: true,
      //   fontColor: 'rgba(0, 0, 0, 0.38)',
      //   fontSize: 14
      // }
      // const gridLines = {
      //   drawOnChartArea: false,
      //   drawTicks: false
      // }
      // this.chartData = {
      //   labels,
      //   datasets: [{
      //     backgroundColor: 'rgba(100, 119, 206, 0.5)',
      //     data: dataSetsData,
      //     barThickness: 30
      //   }]
      // }
      this.lineChartOptions = {
        responsive: true,
        // maintainAspectRatio: false,
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
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                return value + ' unit';
              }
            }
          }
        }
      }
    },
  }
}
