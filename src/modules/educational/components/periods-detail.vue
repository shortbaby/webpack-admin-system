<template>
	<div class="periods-detail-div">
		<top-head title="导师课时详情" v-on:clickright="hide"></top-head>
		<div class="info-panel">
			<span class="iconfont icon-teacher"></span>
			<span class="name">{{info.name}}</span>
			<span class="role">{{info.company}}、{{info.position}}</span>
		</div>
		<div class="info-table">
			<div class="top-tab">
				<div class="left">
					<span class="num">{{pageDto.count}}</span>
					<span>条课时信息</span>
				</div>
				
				<div class="right">
					<region mode="city" :all="true" @selectcity="selectCity"></region>
					<el-date-picker
                      v-model="dateRange"
                      type="daterange"
                      align="right"
                      placeholder="选择日期范围"
                      :picker-options="pickerOptions"
                      style="width: 220px">
                    </el-date-picker>
				    <el-button type="primary" v-if="$TX_AUTH[155]" @click.native="exportData">导出</el-button>
				</div>
			</div>
			<div>
				<el-table :data="list" selection-mode="multiple" style="width: 100%" @selectionchange="handleMultipleSelectionChange">
				    <el-table-column type="selection" width="50"></el-table-column>
				    <el-table-column inline-template label="上课时间" align="center">
				    	<span>
				    		{{row.startTime | date('yyyy.MM.dd')}} 
				    		{{row.startTime | date('HH:mm')}} ~ {{row.endTime | date('HH:mm')}}
				    	</span>
				    </el-table-column>
				    <el-table-column property="address" label="上课地址" align="center"></el-table-column>
				    <el-table-column property="className" label="班级名称" align="center"></el-table-column>
				    <el-table-column property="theme" label="主题" align="center"></el-table-column>
				    <el-table-column property="duration" label="时长" align="center"></el-table-column>
				    <el-table-column property="arriveStudentNum" label="到课学生数" align="center"></el-table-column>
				</el-table>
				<div class="none-list" v-if="!list || list.length == 0">
                    <span>没有搜索到信息</span>
                </div>
                <div class="pager">
                    <tx-pagination  @currentchange="handleCurrentChange" :page-dto="pageDto"></tx-pagination>
                </div>
			</div>
		</div>	
	</div>
</template>
<script>
	const getDuration = function(startTime, endTime) {
        let diffTime = endTime - startTime;
        if (diffTime <= 0) {
            return '时间错误';
        } else {
            let hour = parseInt(diffTime / (3600 * 1000));
            let minute = parseInt((diffTime % (3600 * 1000)) / (60 * 1000));
            if (hour > 0 && minute > 0) {
                return `${hour}小时${minute}分钟`;
            } else if (minute > 0) {
                return `${minute}分钟`;
            } else if (hour > 0){
                return `${hour}小时`;
            }
        }
	}
	import Region from '../../../common/components/region/region.vue';
	import TopHead from '../../../common/components/TopHead.vue';
	import TxPagination from '../../../common/components/TxPagination.vue';

	import {teacherStatisticDetail, getTeacherById, teacherStatisticDetailExport} from '../request';
	export default {
		props: {
			id: Number,
			date: null
		},
		data() {
			return {
				info: {},
				dateRange: '',
				list: [],
				cityId: 0,
				pickerOptions: {
					disabledDate(time) {
		            	return time.getTime() > Date.now();
		          	},
					shortcuts: [
					  {
	                    text: '清除',
	                    onClick(picker) {
	                       picker.$emit('pick', []); 
	                    }
	                  },
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
					  }
					]
                },
                pageDto: {
                    "count": 0,
                    "curPageCount": 0,
                    "pageNum": 1,
                    "pageSize": 20,
                    "totalPageNum": 0
                },
		        multipleSelection: []
			}
		},
		created() {
			if (this.id) {
				this.getTeacherInfo();
				this.getListData();
			}
			if (this.date && this.date instanceof Array) {
				this.dateRange = this.date;
			}
			
		},
		watch: {
			dateRange(val, olv) {
				let eq = true;
                if (val instanceof Array && olv instanceof Array && val.length == olv.length) {
                    let l = val.length;
                    for (let i = 0; i < l; i++) {
                        if (val[i] && (val[i].getTime() != olv[i].getTime())) {
                            eq = false;
                        }
                    };
                } else {
                    eq = false;
                }
                if (!eq) {
                   this.query(); 
                }
			}
		},
		methods: {
			getTeacherInfo() {
				getTeacherById({
					id: this.id
				})
					.then((res) => {
						this.info = res.data;
					})
			},
			query() {
				this.pageDto.pageNum = 1;
				this.getListData();
			},
			adapt(data) {
				if (Array.isArray(data)) {
					data.forEach((item) => {
						item.duration = getDuration(item.startTime, item.endTime);
					});
				}
				return data;
			},
			getListData() {
				let params = {};
				params.pageNum = this.pageDto.pageNum;
				params.teacherId = this.id;
				if (this.cityId) {
					params.cityId = this.cityId;
				}
				if (this.dateRange instanceof Array && (this.dateRange[0] instanceof Date) 
					&& (this.dateRange[1] instanceof Date)) {
					params.startTimeStr = this.dateRange[0].toFormattedString('yyyy-MM-dd');
					params.endTimeStr = this.dateRange[1].toFormattedString('yyyy-MM-dd');
				}
				this.$store.dispatch('showLoading');
				teacherStatisticDetail(params)
					.then((res) => {
						this.list = this.adapt(res.data);
						this.pageDto = res.pageDto;
					})	
					.always(() => {
						this.$store.dispatch('hideLoading');
					})

			},
			hide() {
				this.$emit('hidedetail');
			},
			selectCity(val) {
				if (val.areaLevel == 'city') {
					this.cityId = val.areaId;
					this.query();
				}
			},
			handleCurrentChange(val) {
				this.pageDto.pageNum = val;
				this.getListData();
			},
			handleMultipleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    exportData() {
		    	let params = {};
				params.teacherId = this.id;
				if (this.cityId) {
					params.cityId = this.cityId;
				}
				if (this.dateRange instanceof Array && (this.dateRange[0] instanceof Date) 
					&& (this.dateRange[1] instanceof Date)) {
					params.startTimeStr = this.dateRange[0].toFormattedString('yyyy-MM-dd');
					params.endTimeStr = this.dateRange[1].toFormattedString('yyyy-MM-dd');
				}
		    	teacherStatisticDetailExport(params);
		    }
		},
		components: {
			Region,
			TopHead,
			TxPagination
		}
	}
</script>