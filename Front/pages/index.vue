<template>
  <div class="chart">
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
      step:[]
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
      this.step = data.step
      let index= 0
      let idInterval = setInterval(()=>{
        if (index === this.step.length-1){
          clearInterval(idInterval)
        }
        this.res = this.step[index].map(el=>{
          return{
            x:el.valuesNeuron[0],
            y:el.valuesNeuron[1],
          }
        })
        index++
        console.log(this.res, index)
      },2000)
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
          type:'scatter',
          backgroundColor:'black',
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

<style scoped>
.chart{
  margin: auto;
  width: 50vw;
}
</style>
