<template>
<div>

  <el-card>
    <div>
      <h1>
        达成度对比
      </h1>
      <el-form :inline="true" :model="formInline2"  class="demo-form-inline3" >
        <el-form-item label="专业">
          <el-input v-model="formInline2.majorid" placeholder="专业"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="formInline2.grade" placeholder="年级">
            <el-option label="2019" value="2019"></el-option>
            <el-option label="2020" value="2020"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit2">分析</el-button>
        </el-form-item>
      </el-form>
      <div id="echarts_box3" style="width: 1200px;height:400px;float: left;display: inline"></div>

    </div>
  </el-card>

</div>


</template>

<script>
//导入echarts
import * as echarts from "echarts";

export default {
  data() {
    return{
      formInline2: {
        majorid: '',
        grade: ''

      },
      tableData2:{
        xlable: [],
        ydata: [],
        classdata: [],
        seresdata: []
      }

    }
  },
  created() {

  },
  async mounted(){

  },
  methods: {
    onSubmit2() {
      console.log(this.formInline2);
      this.findDataList2(this.formInline2.grade,this.formInline2.majorid)
    },
    findDataList2() {
      // this.request.get("/data/find",{
      //   params: {
      //     grade2: this.formInline2.grade,
      //     majorid2: this.formInline2.majorid
      //   }
      // }).then(res=>{
      //   console.log(res.data)
      //   this.drawChart(res.data)
      // }).catch(err=>{
      //   console.log(err)
      // })
      var data = [
        {class: "1班",seres: [0.6,0.7,0.8,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.7]},
        {class: "2班",seres: [0.7,0.8,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.7,0.6]},
        {class: "3班",seres: [0.8,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.7,0.6,0.5]},
      ]
      this.drawChart(data)
    },
    drawChart(obj){
      this.tableData2.xlable = []
      this.tableData2.ydata = []
      this.tableData2.classdata = []
      this.tableData2.seresdata = []
      this.myChart = echarts.init(document.getElementById('echarts_box3'));
      let option3 = {
        title: {
          text: '达程度对比分析'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#76baf1"
            }
          }
        },
        legend:{
          data: []
        },
        xAxis:{
          type: "category",
          //这里的data属性，是显示在X轴上的值，指标写死了，后期可以改成动态的，从后台获取，反正一共就12个指标，在多加一个数组传给xAxis.data就行了
          data: ['指标一','指标二','指标三','指标四','指标五','指标六','指标七','指标八','指标九','指标十','指标十一','指标十二']
        },
        yAxis:{
          type: "value"
        },
        series:[
          {name: "",type: "line",stack: "达成度",areaStyle:{normal:{}},data: []},
          {name: "",type: "line",stack: "达成度",areaStyle:{normal:{}},data: []},
          {name: "",type: "line",stack: "达成度",areaStyle:{normal:{}},data: []}
        ]



      }
      for(let i = 0;i<obj.length;i++){

        this.tableData2.classdata.push(obj[i].class)
        this.tableData2.seresdata.push(obj[i].seres)
      }
      option3.legend.data = this.tableData2.classdata
      option3.series[0].name = this.tableData2.classdata[0]
      option3.series[0].data = this.tableData2.seresdata[0]
      option3.series[1].name = this.tableData2.classdata[1]
      option3.series[1].data = this.tableData2.seresdata[1]
      option3.series[2].name = this.tableData2.classdata[2]
      option3.series[2].data = this.tableData2.seresdata[2]

      this.myChart.setOption(option3)

    }
  }
}

</script>

<style>


</style>

