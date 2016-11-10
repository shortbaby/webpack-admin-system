<template>
	<div class="org-city_wrap clearfix">
		<div class="top-div">
			<label>筛选日期:</label>
			<el-date-picker v-model="startDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
		    </el-date-picker>
		    <span>至</span>
		    <el-date-picker v-model="endDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
		    </el-date-picker>
		    <label>快速查看:</label>
		    <span class="b-spn">最近7天</span>
		    <span class="b-spn">最近30天</span>
		    <span class="b-spn">本月</span>
		    <span class="b-spn">上个月</span>
		</div>
		<map-chart id="org-city-chart" :options="option"></map-chart>
		<div class="report-table">
			<div class="table-title">省份分布</div>
			<el-table :data="tableData">
		      <el-table-column property="date" label="机构收入" width="150">
		      </el-table-column>
		      <el-table-column property="name" label="机构数" width="150">
		      </el-table-column>
		      <el-table-column property="address" label="占比" width="150">
		      </el-table-column>
		    </el-table>
		</div>
		<div class="org-table city-table">
			<div class="table-title">城市分布</div>
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
        	name: '各城市客户数量分布',
        	path: '/report/orgdetail'
        }
    ];
	function randomData() {
	    return Math.round(Math.random()*1000);
	}
	import MapChart from '../../../common/components/charts/map-chart.vue';
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
				option:{
				    title: {
				        text: 'iphone销量',
				        subtext: '纯属虚构',
				        left: 'center'
				    },
				    tooltip: {
				        trigger: 'item'
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data:['iphone3','iphone4','iphone5']
				    },
				    visualMap: {
				        min: 0,
				        max: 2500,
				        left: 'left',
				        top: 'bottom',
				        text: ['高','低'],           // 文本，默认为数值文本
				        calculable: true
				    },
				    // toolbox: {
				    //     show: true,
				    //     orient: 'vertical',
				    //     left: 'right',
				    //     top: 'center',
				    //     feature: {
				    //         dataView: {readOnly: false},
				    //         restore: {},
				    //         saveAsImage: {}
				    //     }
				    // },
				    series: [
				        {
				            name: 'iphone3',
				            type: 'map',
				            mapType: 'china',
				            roam: false,
				            label: {
				                normal: {
				                    show: true
				                },
				                emphasis: {
				                    show: true
				                }
				            },
				            data:[
				                {name: '北京',value: randomData() },
				                {name: '天津',value: randomData() },
				                {name: '上海',value: randomData() },
				                {name: '重庆',value: randomData() },
				                {name: '河北',value: randomData() },
				                {name: '河南',value: randomData() },
				                {name: '云南',value: randomData() },
				                {name: '辽宁',value: randomData() },
				                {name: '黑龙江',value: randomData() },
				                {name: '湖南',value: randomData() },
				                {name: '安徽',value: randomData() },
				                {name: '山东',value: randomData() },
				                {name: '新疆',value: randomData() },
				                {name: '江苏',value: randomData() },
				                {name: '浙江',value: randomData() },
				                {name: '江西',value: randomData() },
				                {name: '湖北',value: randomData() },
				                {name: '广西',value: randomData() },
				                {name: '甘肃',value: randomData() },
				                {name: '山西',value: randomData() },
				                {name: '内蒙古',value: randomData() },
				                {name: '陕西',value: randomData() },
				                {name: '吉林',value: randomData() },
				                {name: '福建',value: randomData() },
				                {name: '贵州',value: randomData() },
				                {name: '广东',value: randomData() },
				                {name: '青海',value: randomData() },
				                {name: '西藏',value: randomData() },
				                {name: '四川',value: randomData() },
				                {name: '宁夏',value: randomData() },
				                {name: '海南',value: randomData() },
				                {name: '台湾',value: randomData() },
				                {name: '香港',value: randomData() },
				                {name: '澳门',value: randomData() }
				            ]
				        },
				        {
				            name: 'iphone4',
				            type: 'map',
				            mapType: 'china',
				            label: {
				                normal: {
				                    show: true
				                },
				                emphasis: {
				                    show: true
				                }
				            },
				            data:[
				                {name: '北京',value: randomData() },
				                {name: '天津',value: randomData() },
				                {name: '上海',value: randomData() },
				                {name: '重庆',value: randomData() },
				                {name: '河北',value: randomData() },
				                {name: '安徽',value: randomData() },
				                {name: '新疆',value: randomData() },
				                {name: '浙江',value: randomData() },
				                {name: '江西',value: randomData() },
				                {name: '山西',value: randomData() },
				                {name: '内蒙古',value: randomData() },
				                {name: '吉林',value: randomData() },
				                {name: '福建',value: randomData() },
				                {name: '广东',value: randomData() },
				                {name: '西藏',value: randomData() },
				                {name: '四川',value: randomData() },
				                {name: '宁夏',value: randomData() },
				                {name: '香港',value: randomData() },
				                {name: '澳门',value: randomData() }
				            ]
				        },
				        {
				            name: 'iphone5',
				            type: 'map',
				            mapType: 'china',
				            label: {
				                normal: {
				                    show: true
				                },
				                emphasis: {
				                    show: true
				                }
				            },
				            data:[
				                {name: '北京',value: randomData() },
				                {name: '天津',value: randomData() },
				                {name: '上海',value: randomData() },
				                {name: '广东',value: randomData() },
				                {name: '台湾',value: randomData() },
				                {name: '香港',value: randomData() },
				                {name: '澳门',value: randomData() }
				            ]
				        }
				    ]
				}
			}
		},
		components: {
			MapChart
		}
	}
</script>