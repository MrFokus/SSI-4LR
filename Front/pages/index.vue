<template>
  <div class="p-2 border border-gray-500 mt-4">
    <label class="block mb-2 font-bold"> Coba Chart </label>

    <client-only>
      <BarChart :data="chartData" />
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    penilaian: {
      type: Object,
      required: true,
    },
  },
  data(){
    return{
      data:[],
      res:[],
    }
  },
  methods:{
    async getData(){
      let {data} = await this.$axios.get('http://localhost:3001/')
      console.log(data)
      this.data =  data.inputData.map(el=>{
        return{
          x:el[0],
          y:el[1],
        }
      })
      this.res = data.step[data.step.length-1].map(el=>{
        return{
          x:el.valuesNeuron[0],
          y:el.valuesNeuron[1],
        }
      })
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    chartData() {
      return {
        datasets: [{
          label: 'Bar Dataset',
          data:this.data,
          // this dataset is drawn below
          order: 1,
          type:'scatter'
        }, {
          label: 'Line Dataset',
          data: this.res,
          type: 'scatter',
          // this dataset is drawn on top
          order:0,
          backgroundColor:'red',
          pointRadius:7
        }],
        labels:this.res.map(el=>el.x).sort((a, b)=>a-b)
      }
    },
  },
}
</script>
