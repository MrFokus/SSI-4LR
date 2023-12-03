import Vue from 'vue'
import {Bar, Line, Scatter} from 'vue-chartjs'

Vue.component('BarChart', {
  extends: Scatter,
  props: {
    type:'bar',
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      }),
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
})
