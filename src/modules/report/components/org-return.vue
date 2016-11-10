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
		<line-chart id="org-increase-chart" :options="option"></line-chart>
		<div class="report-table" style="margin-left: 20px;">
			<!-- <div class="table-title">省份分布</div> -->
			<el-table :data="tableData">
		      <el-table-column property="date" label="日期" width="150" align="center">
		      </el-table-column>
		      <el-table-column property="name" label="新增回访数" width="150" align="center">
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
            name:  '机构数据报表',
            path: '/report/orgdata'
        },
        {
        	name: '新增机构回访报表',
        	path: '/report/orgdata'
        }
    ];
	import LineChart from '../../../common/components/charts/line-chart.vue';
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
				    title: {
				        text: '堆叠区域图'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
				    },
				    toolbox: {
				        feature: {
				            saveAsImage: {}
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
				            boundaryGap : false,
				            data : ['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'邮件营销',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name:'联盟广告',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name:'视频广告',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name:'直接访问',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name:'搜索引擎',
				            type:'line',
				            stack: '总量',
				            label: {
				                normal: {
				                    show: true,
				                    position: 'top'
				                }
				            },
				            areaStyle: {normal: {}},
				            data:[820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ]
				}
			}
		},
		components: {
			LineChart
		}
	}
</script>