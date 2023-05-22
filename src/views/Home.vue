
<template>

  <div>

    <el-row>
      <el-col
            :span="24"
            style="margin-bottom: 15px"
        >
          <el-card>
            <div>
              <h1>达成度查询</h1>
              <el-row :gutter="5">
                <el-col :span="10">

                  <el-form :inline="true" :model="formInline"  class="demo-form-inline" >
                    <el-form-item label="专业">
                      <el-input v-model="formInline.majorid" placeholder="专业"></el-input>
                    </el-form-item>
                    <el-form-item label="年级">
                      <el-select v-model="formInline.grade" placeholder="年级">
                        <el-option label="2019" value="2019"></el-option>
                        <el-option label="2020" value="2020"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                  </el-form>

                </el-col>
                <el-col :span="14">

                  <el-form :inline="true" :model="formInline1" :label-position="right" :label-width="auto" class="demo-form-inline1">
                    <el-form-item label="专业">
                      <el-input v-model="formInline1.majorid" placeholder="专业"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业要求">
                      <el-select v-model="formInline1.requirements" placeholder="要求">
                        <el-option label="1" value="1"></el-option><el-option label="2" value="2"></el-option><el-option label="3" value="3"></el-option><el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option><el-option label="6" value="6"></el-option><el-option label="7" value="7"></el-option><el-option label="8" value="8"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit1">查询</el-button>
                    </el-form-item>
                  </el-form>

                </el-col>
              </el-row>
              <div id="echarts_box" style="width: 600px;height:400px;float: left;display: inline"></div>
              <div id="echarts_box2" style="width: 600px;height:400px;float: right;display: inline"></div>
            </div>
          </el-card>

<!--          <el-card>-->

<!--          </el-card>-->

        </el-col>
      </el-row>
  </div>




</template>

<script>
import * as echarts from 'echarts';
import request from "@/utils/request";
import {left, right} from "core-js/internals/array-reduce";
// 获取数据的api

export default {
  name: '毕业要求达成度分析',
  data() {

    return {
      formInline: {
        grade: '',
        majorid: ''
      },

      tableData1:{
        xlable:[],
        ydata:[]

      },
      formInline1:{
        majorid: '',
        requirements: ''
    },
      tableData2:{
        xlable:[],
        ydata:[]

      },

    }
  },
  //初始化
  created() {
    //可以写get方法获取json数据
  },
  //挂载，渲染完成触发
  async mounted() {
  //   // 基于准备好的dom，初始化echarts实例
  //   this.myChart = echarts.init(document.getElementById('echarts_box'))
  //   this.myChart2 = echarts.init(document.getElementById('echarts_box2'))
  //   this.myChart3 = echarts.init(document.getElementById('echarts_box3'))
  //
  //   //发起请求，获取数据
  //
  //   var option = {
  //     title: {
  //       text: 'ECharts 入门示例'
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子"]
  //     },
  //     yAxis: {},
  //     series: [{
  //       name: '销量',
  //       type: 'bar',
  //       data: [5, 20, 36, 10]
  //     }]
  //   };
  //   var option2 = {
  //     title: {
  //       text: 'ECharts 入门示例'
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       data: ["衬衫2", "羊毛衫2", "雪纺衫2", "裤子2"]
  //     },
  //     yAxis: {},
  //     series: [{
  //       name: '销量2',
  //       type: 'bar',
  //       data: [5, 20, 36, 10]
  //     }]
  //   };
  //   var option3 = {
  //     // 标题
  //     title: {
  //       text: '用户来源'
  //     },
  //     // 提示框
  //     tooltip: {
  //       trigger: "axis",
  //       axisPointer: {
  //         type: "cross",
  //         label: {
  //           backgroundColor: "#76baf1"
  //         }
  //       }
  //     },
  //     // 图例
  //     legend: {
  //       data: ["华东","华南","华北","西部","其他"]
  //     },
  //     // x轴
  //     xAxis: {
  //       data: ["2017-12-27","2017-12-28","2017-12-29","2017-12-30","2017-12-31", "2018-1-1"]
  //     },
  //     yAxis: {},
  //     // 数据,type:图表类型,stack:数据堆叠,areaStyle:区域填充样式,normal:默认,smooth:平滑曲线
  //     series: [
  //       { name: "华东", type: "line", stack: "总量", areaStyle: {normal: {}}, data: [999,3111,4100,3565,3528,6000] },
  //       { name: "华南", type: "line", stack: "总量", areaStyle: {normal: {}}, data: [5090,2500,3400,6000,6400,7800] },
  // ]
  //
  // };
  //   // 绘制图表
  //   this.myChart.setOption(option)
  //   this.myChart2.setOption(option2)
  //   this.myChart3.setOption(option3)


  },
  methods: {
    right,
    left,
    onSubmit() {
      console.log('专业年级查询');
      console.log(this.formInline)
      this.findDataList(this.formInline.grade,this.formInline.majorid)
    },
    onSubmit1(){
      console.log('毕业要求查询')
      console.log(this.formInline1)
      this.findDataList1(this.formInline1.majorid,this.formInline1.requirements)

    },
    findDataList(){

      // this.request.get("/data/findDataList",{
      //   params:{
      //     grade1: this.formInline.grade,
      //     majorid1: this.formInline.majorid
      //   }
      // }).then(res=>{
      //   console.log(res)
      //
      //   this.RenderEcharts(res.data)
      // }).catch(err=>{
      //   console.log(err)
      // })

      //测试数据
      var data = [
        {name:  "指标1",value:  0.76},
        {name:  "指标2",value:  0.79},
        {name:  "指标3",value:  0.86},
        {name:  "指标4",value:  0.57},
        {name:  "指标1",value:  0.76},
        {name:  "指标2",value:  0.79},
        {name:  "指标3",value:  0.86},
        {name:  "指标4",value:  0.57},
      ]
      this.RenderEcharts(data)
    },
    findDataList1(){
      // this.request.get("/data/findDataList1",{
      //   params:{
      //     majorid1: this.formInline1.majorid,
      //     requirements: this.formInline1.requirements
      //   }
      //     }).then(res=>{
      //       console.log(res)
      //       this.RenderEcharts1(res.data)
      // }).catch(err=>{
      //   console.log(err)
      // })
      var data1 = [
        {name:  "班级一",value:  0.76},
        {name:  "班级二",value:  0.79},
        {name:  "班级三",value:  0.86},
        {name:  "班级四",value:  0.57}
      ]
      this.RenderEcharts1(data1)
    },
    //作图，obj是作图需要的数据对象
    RenderEcharts(obj) {
      this.tableData1.xlable = []
      this.tableData1.ydata = []
      for (let i = 0; i < obj.length; i++) {
        this.tableData1.xlable.push(obj[i].name)
        this.tableData1.ydata.push(obj[i].value)
      }
      this.myChart = echarts.init(document.getElementById('echarts_box'))

      let option = {
        title: {
          text: '毕业要求达成度'
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '达成度',
          type: 'effectScatter',
          data: []
        }]
      };

      option.xAxis.data = this.tableData1.xlable
      option.series[0].data = this.tableData1.ydata

      this.myChart.setOption(option)
    },
    RenderEcharts1(obj1){
      this.tableData2.xlable = []
      this.tableData2.ydata = []
      for (let i = 0; i < obj1.length; i++) {
        this.tableData2.xlable.push(obj1[i].name)
        this.tableData2.ydata.push(obj1[i].value)
      }
      this.myChart2 = echarts.init(document.getElementById('echarts_box2'))
      let option1 = {
        title: {
          text: '班级毕业要求'+this.formInline1.requirements+'达成度'
        },
        grid:{
          left:'1%',
          right:'18%',
          bottom:'1%',
          containLabel:true
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '达成度',
          type: 'bar',
          data: []
        }]
      };
      option1.xAxis.data = this.tableData2.xlable
      option1.series[0].data = this.tableData2.ydata
      this.myChart2.setOption(option1)
    }
  }

}

</script>


<style>

</style>