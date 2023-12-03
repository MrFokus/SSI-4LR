<template>
  <div class="chart">
    <div class="container">
      <div class="input-clusters">
        <p>Введите количество кластеров</p>
        <input v-model="clusters" type="number">
      </div>
      <div class="input-points">
        <p>Введите точки</p>
        <textarea v-model="inputPoints"/>
      </div>
      <button @click="getData">Расчитать</button>
    </div>
    <client-only>
      <BarChart class="graph" :data="chartData" />
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
      clusters:3,
      inputPoints:`-1, -6\n-2, -3\n-2, -5\n2, 6\n3, 7\n3, 5\n2, 7\n9, 1\n8, 2\n10, 3\n1, -6\n2, -5`,
      data:[],
      res:[],
      step:[]
    }
  },
  methods:{
    async getData(){
      let {data} = await this.$axios.post('http://localhost:3001/',{points:this.points,clusters:+this.clusters})
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
  // mounted() {
  //   this.getData()
  //   console.log(this.points)
  // },
  computed: {
    points(){
      return this.inputPoints.trim().split('\n').map(arr=>{
        return arr.split(',').map(el=>+el)
      })
    },
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
  max-width: 100vw;
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  margin: auto;
  max-height: 70vh;
  .container{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    .input-points{
     height: 100%;
      textarea{
        min-height: 200px;
      }
    }
  }
}
</style>
<style>
*{
  transition: none;
  animation: none;
}
canvas,.graph{
  width: 100%;
}

</style>
