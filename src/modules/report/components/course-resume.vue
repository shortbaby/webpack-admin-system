<template>
	<div class="course-resume_wrap clearfix">
		<div class="top-div">
			<label>筛选日期:</label>
			<el-date-picker
              v-model="dateRange"
              type="daterange"
              align="left"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
              style="width: 220px">
            </el-date-picker>
		</div>
		<bar-chart id="course-resume-chart" :options="option"></bar-chart>
		<div class="report-table" style="margin-left: 20px;">
			<!-- <div class="table-title">省份分布</div> -->
			<el-table :data="tableData" style="width: 800px;">
		      <el-table-column property="date" label="课程" width="500">
		      </el-table-column>
		      <el-table-column property="name" label="消耗次数" width="300">
		      </el-table-column>
		</div>
	</div>
</template>
<script>
	const breadcrumbs = [
        {
            name: '报表中心',
            path: '/report/orgdetail'
        },
        {
            name:  '课程消耗报表',
            path: '/report/course'
        }
    ];
	import BarChart from '../../../common/components/charts/bar-chart.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';
	export default {
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		data() {
			return {
				dateRange: '',
                pickerOptions: {
                  shortcuts: [
                      {
                          text: '最近一周',
                          onClick(picker) {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                              picker.$emit('pick', [start, end]);
                          } 
                      }, 
                      {
                          text: '最近一个月',
                          onClick(picker) {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                              picker.$emit('pick', [start, end]);
                          }
                      }, 
                      {
                          text: '最近三个月',
                          onClick(picker) {
                              const end = new Date();
                              const start = new Date();
                              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                              picker.$emit('pick', [start, end]);
                          }
                      }
                  ]
                },
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '1518 弄'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: '上海市 弄'
		          }, {
		            date: '2016-05-01',
		            name: '王小虎',
		            address: '上海市'
		          }, {
		            date: '2016-05-03',
		            name: '王小虎',
		            address: '上海市'
		        }],
				option:{
				    color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'直接访问',
				            type:'bar',
				            barWidth: '60%',
				            data:[10, 52, 200, 334, 390, 330, 220]
				        }
				    ]
				}
			}
		},
		components: {
			BarChart
		}
	}
</script>