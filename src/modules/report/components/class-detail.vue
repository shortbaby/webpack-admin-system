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
		<bar-chart id="class-detail-chart" :options="option"></bar-chart>
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
            name:  '报班情况报表',
            path: '/report/joinclass'
        }
    ];
	import BarChart from '../../../common/components/charts/bar-chart.vue';
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
				    title : {
				        text: '某地区蒸发量和降水量',
				        subtext: '纯属虚构'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['蒸发量','降水量']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'蒸发量',
				            type:'bar',
				            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
				            markPoint : {
				                data : [
				                    {type : 'max', name: '最大值'},
				                    {type : 'min', name: '最小值'}
				                ]
				            },
				            markLine : {
				                data : [
				                    {type : 'average', name: '平均值'}
				                ]
				            }
				        },
				        {
				            name:'降水量',
				            type:'bar',
				            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
				            markPoint : {
				                data : [
				                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
				                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
				                ]
				            },
				            markLine : {
				                data : [
				                    {type : 'average', name : '平均值'}
				                ]
				            }
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