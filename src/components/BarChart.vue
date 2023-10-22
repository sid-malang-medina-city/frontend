<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,

  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
