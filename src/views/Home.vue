
<template>
<!--      template下面不能有两个根组件并列，如果组合报错请适当利用div把他们组在一块      -->
  <div>
<!--   格式控制 -->
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
                  <!--  第一个查询组件  -->
                  <el-form :inline="true" :model="formInline"  class="demo-form-inline" >
                    <el-form-item label="专业">
                      <el-input v-model="formInline.majorid" placeholder="专业"></el-input>
                    </el-form-item>
                    <el-form-item label="年级">
                      <el-select v-model="formInline.grade" placeholder="年级">
<!--                        自定义年级       -->
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
                  <!-- 第二个查询组件 -->
                  <el-form :inline="true" :model="formInline1" :label-position="right" :label-width="auto" class="demo-form-inline1">
                    <el-form-item label="专业">
                      <el-input v-model="formInline1.majorid" placeholder="专业"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业要求">
                      <el-select v-model="formInline1.requirements" placeholder="要求">
                        <el-option label="1" value="1"></el-option><el-option label="2" value="2"></el-option><el-option label="3" value="3"></el-option><el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option><el-option label="6" value="6"></el-option><el-option label="7" value="7"></el-option><el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option><el-option label="10" value="10"></el-option><el-option label="11" value="11"></el-option><el-option label="12" value="12"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit1">查询</el-button>
                    </el-form-item>
                  </el-form>

                </el-col>
              </el-row>
<!--              图标作图的div区域      -->
              <div id="echarts_box" style="width: 600px;height:400px;float: left;display: inline"></div>
              <div id="echarts_box2" style="width: 600px;height:400px;float: right;display: inline"></div>

            </div>
          </el-card>



        </el-col>
      </el-row>

  </div>




</template>

<script>
  // 引入echarts
import * as echarts from 'echarts';
import request from "@/utils/request";
import {left, right} from "core-js/internals/array-reduce";
// 获取数据的api

export default {
  name: '毕业要求达成度分析',
  data() {

    return {
      // 专业年级查询，第一个查询组件的数据
      formInline: {
        grade: '',
        majorid: ''
      },
      // 第一个图表的数据
      tableData1:{
        xlable:[],
        ydata:[]

      },
      // 毕业要求查询，第二个查询组件的数据
      formInline1:{
        majorid: '',
        requirements: ''
    },
      // 第二个图表的数据
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

  },
  methods: {
    right,
    left,
    //提交查询
    onSubmit() {
      console.log('专业年级查询');
      console.log(this.formInline)
      //获取数据
      this.findDataList(this.formInline.grade,this.formInline.majorid)
    },
    //提交查询
    onSubmit1(){
      console.log('毕业要求查询')
      console.log(this.formInline1)
      this.findDataList1(this.formInline1.majorid,this.formInline1.requirements)

    },
    //获取数据
    findDataList(){
      //获取数据,链接直接到后台，自己看着改链接
      this.request.get("/data/findDataList",{
        params:{
          grade1: this.formInline.grade,
          majorid1: this.formInline.majorid
        }
      }).then(res=>{
        //打印数据
        console.log(res)
        //渲染图表
        this.RenderEcharts(res.data)
      }).catch(err=>{
        console.log(err)
      })

      //测试用数据，如果是用后台获取数据，就注释掉151-162行
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
    //仍然是获取数据，结构同上
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
    //作图，obj是作图需要的数据对象，也就是前面获取的数据，例如测试数据data或者res.data
    RenderEcharts(obj) {
      this.tableData1.xlable = []
      this.tableData1.ydata = []
      for (let i = 0; i < obj.length; i++) {
        this.tableData1.xlable.push(obj[i].name)
        this.tableData1.ydata.push(obj[i].value)
      }
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('echarts_box'))
      // 绘制图表框架
      let option = {
        // 标题
        title: {
          text: '毕业要求达成度'
        },
        tooltip: {},
        // 图例x轴
        xAxis: {
          data: []
        },
        // 图例y轴
        yAxis: {},
        // 数据
        series: [{
          name: '达成度',
          type: 'effectScatter',
          data: []
        }]
      };
      // 使用刚指定的配置项和数据显示图表。如果在option里直接this.的话，会报错，例如
      // xAxis: {
      //data: this.tableData1.xlable
      //},
      // 所以用option传递一下数据
      option.xAxis.data = this.tableData1.xlable
      option.series[0].data = this.tableData1.ydata
      // 渲染图表
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