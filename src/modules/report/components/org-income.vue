<template>
	<div class="org-report_wrap">
		<div class="top-div">
			<label>筛选日期:</label>
			<el-date-picker v-model="startDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
		    </el-date-picker>
		    <span>至</span>
		    <el-date-picker v-model="endDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
		    </el-date-picker>
		</div>
		<pie-chart id="org-income-chart" :options="option"></pie-chart>
		<div class="report-table">
			<el-table :data="tableData">
		      <el-table-column property="date" label="机构收入" width="150">
		      </el-table-column>
		      <el-table-column property="name" label="机构数" width="150">
		      </el-table-column>
		      <el-table-column property="address" label="占比" width="150">
		      </el-table-column>
		    </el-table>
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
            name:  '机构详情列表',
            path: '/report/orgdetail'
        },
        {
        	name: '机构年收入结构分布',
        	path: '/report/orgdetail'
        }
    ];
	import PieChart from '../../../common/components/charts/pie-chart.vue';
	export default {
		mounted() {
            this.$store.dispatch('updateBreadNavs', breadcrumbs);
        },
		data() {
			return {
				startDate: null,
				endDate: null,
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
				pickerOptions: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        },
				option: {
				    title : {
				        text: '某站点用户访问来源',
				        subtext: '纯属虚构',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
				    },
				    series : [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value:335, name:'直接访问'},
				                {value:310, name:'邮件营销'},
				                {value:234, name:'联盟广告'},
				                {value:135, name:'视频广告'},
				                {value:1548, name:'搜索引擎'}
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				}
			}
		},
		components: {
			PieChart
		}
	}
</script>